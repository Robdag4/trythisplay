import Mux from '@mux/mux-node';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://trythisplay.com", "SSR": true};
const env = (k) => Object.assign(__vite_import_meta_env__, { _: process.env._, status: process.env.status })[k] ?? (typeof process !== "undefined" ? process.env[k] : void 0);
const TOKEN_ID = env("MUX_TOKEN_ID");
const TOKEN_SECRET = env("MUX_TOKEN_SECRET");
const MUX_WEBHOOK_SECRET = env("MUX_WEBHOOK_SECRET");
const SIGNING_KEY_ID = env("MUX_SIGNING_KEY_ID");
const SIGNING_KEY_PRIVATE = env("MUX_SIGNING_KEY_PRIVATE");
const muxConfigured = Boolean(TOKEN_ID && TOKEN_SECRET);
const muxSigningConfigured = Boolean(SIGNING_KEY_ID && SIGNING_KEY_PRIVATE);
let _client = null;
function muxClient() {
  if (!muxConfigured) return null;
  if (!_client) _client = new Mux({ tokenId: TOKEN_ID, tokenSecret: TOKEN_SECRET });
  return _client;
}
let _signer = null;
function signerClient() {
  if (!muxSigningConfigured) return null;
  if (!_signer) {
    _signer = new Mux({
      tokenId: TOKEN_ID ?? "unused",
      tokenSecret: TOKEN_SECRET ?? "unused",
      jwtSigningKey: SIGNING_KEY_ID,
      jwtPrivateKey: SIGNING_KEY_PRIVATE
    });
  }
  return _signer;
}
async function createDirectUpload(corsOrigin) {
  const mux = muxClient();
  if (!mux) return null;
  const upload = await mux.video.uploads.create({
    cors_origin: corsOrigin,
    new_asset_settings: {
      playback_policies: ["signed"]
    }
  });
  if (!upload.url) return null;
  return { url: upload.url, uploadId: upload.id };
}
async function signPlayback(playbackId, type = "video", ttlSeconds = 3600) {
  const mux = signerClient();
  if (!mux) return null;
  const token = await mux.jwt.signPlaybackId(playbackId, {
    keyId: SIGNING_KEY_ID,
    keySecret: SIGNING_KEY_PRIVATE,
    type,
    expiration: `${ttlSeconds}s`
  });
  return token;
}
async function signedAudioUrl(playbackId, ttlSeconds = 900) {
  const token = await signPlayback(playbackId, "video", ttlSeconds);
  if (!token) return null;
  return `https://stream.mux.com/${playbackId}/audio.m4a?token=${token}`;
}

export { MUX_WEBHOOK_SECRET as M, signedAudioUrl as a, muxConfigured as b, createDirectUpload as c, muxClient as d, muxSigningConfigured as m, signPlayback as s };
