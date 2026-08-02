import { r as requireCreator } from '../../../../../chunks/creator_lgkQp4MY.mjs';
import { s as supabaseAdmin } from '../../../../../chunks/supabase_w_KyqO0O.mjs';
import { m as muxSigningConfigured, a as signedAudioUrl } from '../../../../../chunks/mux_DWQFda0h.mjs';
import { a as aiConfigured, t as transcribeUrl, d as draftWrittenSetup } from '../../../../../chunks/ai_9Wk3Q3iz.mjs';
export { renderers } from '../../../../../renderers.mjs';

const prerender = false;
const MAX_PER_HOUR = 10;
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
const POST = async ({ params, request, cookies }) => {
  const { lessonId } = params;
  const guard = await requireCreator(request, cookies, "/creator/");
  if (!guard.ok) return json({ error: "unauthorized" }, 401);
  if (!aiConfigured) return json({ error: "AI drafting isn't connected yet." }, 503);
  const admin = supabaseAdmin();
  const { data: lesson } = await admin.from("lessons").select("id, product_id, status, mux_playback_id, transcript, transcribe_count, last_transcribe_at, products!inner(creator_id, status)").eq("id", lessonId).maybeSingle();
  const owner = lesson?.products?.creator_id;
  const prodStatus = lesson?.products?.status;
  if (!lesson || owner !== guard.creator.id) return json({ error: "not found" }, 404);
  if (prodStatus !== "draft" && prodStatus !== "changes_requested") return json({ error: "locked" }, 409);
  if (lesson.status !== "ready" || !lesson.mux_playback_id) {
    return json({ error: "Upload and process a video first." }, 409);
  }
  if (!muxSigningConfigured) return json({ error: "Video signing keys not configured." }, 503);
  const last = lesson.last_transcribe_at ? new Date(lesson.last_transcribe_at).getTime() : 0;
  const withinHour = Date.now() - last < 36e5;
  if (withinHour && (lesson.transcribe_count ?? 0) >= MAX_PER_HOUR) {
    return json({ error: "Too many attempts this hour. Try again later." }, 429);
  }
  try {
    let transcript = lesson.transcript ?? "";
    if (!transcript) {
      const audioUrl = await signedAudioUrl(lesson.mux_playback_id);
      if (!audioUrl) return json({ error: "Could not build audio URL." }, 500);
      transcript = await transcribeUrl(audioUrl) ?? "";
      if (!transcript) return json({ error: "Transcription returned empty." }, 502);
    }
    const setup = await draftWrittenSetup(transcript);
    if (!setup) return json({ error: "Could not draft a setup from the transcript." }, 502);
    await admin.from("lessons").update({
      transcript,
      written_setup: setup,
      // draft only — not approved
      written_setup_approved_at: null,
      transcribe_count: withinHour ? (lesson.transcribe_count ?? 0) + 1 : 1,
      last_transcribe_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", lessonId);
    return json({ written_setup: setup });
  } catch (err) {
    console.error("draft-setup failed:", err.message);
    return json({ error: "AI drafting failed. Try again." }, 502);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
