import Mux from "@mux/mux-node";

// ============================================================================
// Mux integration (Phase 3.4). All functions degrade gracefully when the Mux
// env vars aren't set yet, so the portal builds and runs before keys land.
//
// Env:
//   MUX_TOKEN_ID, MUX_TOKEN_SECRET         — API access token (Video R/W)
//   MUX_WEBHOOK_SECRET                      — verify webhook signatures
//   MUX_SIGNING_KEY_ID, MUX_SIGNING_KEY_PRIVATE — mint signed playback JWTs
// ============================================================================

const TOKEN_ID = import.meta.env.MUX_TOKEN_ID as string | undefined;
const TOKEN_SECRET = import.meta.env.MUX_TOKEN_SECRET as string | undefined;
export const MUX_WEBHOOK_SECRET = import.meta.env.MUX_WEBHOOK_SECRET as string | undefined;
const SIGNING_KEY_ID = import.meta.env.MUX_SIGNING_KEY_ID as string | undefined;
const SIGNING_KEY_PRIVATE = import.meta.env.MUX_SIGNING_KEY_PRIVATE as string | undefined;

export const muxConfigured = Boolean(TOKEN_ID && TOKEN_SECRET);
export const muxSigningConfigured = Boolean(SIGNING_KEY_ID && SIGNING_KEY_PRIVATE);

let _client: Mux | null = null;
export function muxClient(): Mux | null {
  if (!muxConfigured) return null;
  if (!_client) _client = new Mux({ tokenId: TOKEN_ID!, tokenSecret: TOKEN_SECRET! });
  return _client;
}

// A signing-only client (works even if API token isn't set) for minting JWTs.
let _signer: Mux | null = null;
function signerClient(): Mux | null {
  if (!muxSigningConfigured) return null;
  if (!_signer) {
    _signer = new Mux({
      tokenId: TOKEN_ID ?? "unused",
      tokenSecret: TOKEN_SECRET ?? "unused",
      jwtSigningKey: SIGNING_KEY_ID!,
      jwtPrivateKey: SIGNING_KEY_PRIVATE!,
    });
  }
  return _signer;
}

/**
 * Create a Direct Upload with signed playback policy. Returns the upload URL
 * (for the browser uploader) and the Mux upload id (stored on the lesson).
 */
export async function createDirectUpload(corsOrigin: string): Promise<{ url: string; uploadId: string } | null> {
  const mux = muxClient();
  if (!mux) return null;
  const upload = await mux.video.uploads.create({
    cors_origin: corsOrigin,
    new_asset_settings: {
      playback_policies: ["signed"],
    },
  });
  if (!upload.url) return null;
  return { url: upload.url, uploadId: upload.id };
}

/**
 * Mint a short-lived signed playback token for a playback id.
 * `type` is "video" for playback or "thumbnail"/"storyboard" for images.
 */
export async function signPlayback(
  playbackId: string,
  type: "video" | "thumbnail" | "storyboard" = "video",
  ttlSeconds = 3600
): Promise<string | null> {
  const mux = signerClient();
  if (!mux) return null;
  const token = await mux.jwt.signPlaybackId(playbackId, {
    keyId: SIGNING_KEY_ID!,
    keySecret: SIGNING_KEY_PRIVATE!,
    type,
    expiration: `${ttlSeconds}s`,
  });
  return token as string;
}

/** Retrieve an asset's playback id + duration (used as a webhook fallback). */
export async function getAssetInfo(assetId: string) {
  const mux = muxClient();
  if (!mux) return null;
  const asset = await mux.video.assets.retrieve(assetId);
  const playbackId = asset.playback_ids?.[0]?.id ?? null;
  return { playbackId, duration: asset.duration ?? null, status: asset.status };
}

/**
 * Build a signed URL to the asset's audio rendition (m4a) for transcription.
 * Signed-policy assets require a token; the `audio.m4a` static rendition is a
 * lightweight audio-only file suitable for speech-to-text.
 */
export async function signedAudioUrl(playbackId: string, ttlSeconds = 900): Promise<string | null> {
  const token = await signPlayback(playbackId, "video", ttlSeconds);
  if (!token) return null;
  return `https://stream.mux.com/${playbackId}/audio.m4a?token=${token}`;
}
