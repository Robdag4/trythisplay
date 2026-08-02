import type { APIRoute } from "astro";
import { supabaseAdmin } from "../../../lib/supabase";
import { MUX_WEBHOOK_SECRET, muxClient } from "../../../lib/mux";

export const prerender = false;

/**
 * Mux webhook. Verifies the signature, then:
 *  - video.upload.asset_created : link asset id to the lesson (by upload id)
 *  - video.asset.ready          : store playback id + runtime, set lesson ready
 *  - video.asset.errored        : set lesson error
 */
export const POST: APIRoute = async ({ request }) => {
  if (!MUX_WEBHOOK_SECRET) {
    return new Response("webhook not configured", { status: 503 });
  }

  const raw = await request.text();
  const headers = Object.fromEntries(request.headers.entries());

  const mux = muxClient();
  if (!mux) return new Response("webhook not configured", { status: 503 });
  try {
    await mux.webhooks.verifySignature(raw, headers, MUX_WEBHOOK_SECRET);
  } catch (err) {
    console.error("mux webhook signature failed:", (err as Error).message);
    return new Response("bad signature", { status: 400 });
  }

  const event = JSON.parse(raw);
  const admin = supabaseAdmin();

  try {
    if (event.type === "video.upload.asset_created") {
      const uploadId = event.data?.id;
      const assetId = event.data?.asset_id;
      if (uploadId && assetId) {
        await admin
          .from("lessons")
          .update({ mux_asset_id: assetId, status: "processing" })
          .eq("mux_upload_id", uploadId);
      }
    } else if (event.type === "video.asset.ready") {
      const assetId = event.data?.id;
      const playbackId = event.data?.playback_ids?.[0]?.id ?? null;
      const duration = event.data?.duration ?? null;
      if (assetId) {
        await admin
          .from("lessons")
          .update({
            mux_playback_id: playbackId,
            runtime_seconds: duration ? Math.round(duration) : null,
            status: "ready",
          })
          .eq("mux_asset_id", assetId);
      }
    } else if (event.type === "video.asset.errored") {
      const assetId = event.data?.id;
      if (assetId) {
        await admin.from("lessons").update({ status: "error" }).eq("mux_asset_id", assetId);
      }
    }
  } catch (err) {
    console.error("mux webhook handling error:", (err as Error).message);
    return new Response("handler error", { status: 500 });
  }

  return new Response("ok", { status: 200 });
};
