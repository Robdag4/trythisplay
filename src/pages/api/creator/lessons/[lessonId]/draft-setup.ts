import type { APIRoute } from "astro";
import { requireCreator } from "../../../../../lib/creator";
import { supabaseAdmin } from "../../../../../lib/supabase";
import { signedAudioUrl, muxSigningConfigured } from "../../../../../lib/mux";
import { transcribeUrl, draftWrittenSetup, aiConfigured } from "../../../../../lib/ai";

export const prerender = false;

const MAX_PER_HOUR = 10; // simple per-lesson transcribe rate limit

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

/**
 * POST /api/creator/lessons/[lessonId]/draft-setup
 * Transcribes the lesson's uploaded video (Mux audio rendition) and drafts a
 * structured written setup. Saves the transcript + draft (NOT approved). The
 * creator then edits and approves separately.
 */
export const POST: APIRoute = async ({ params, request, cookies }) => {
  const { lessonId } = params;
  const guard = await requireCreator(request, cookies, "/creator/");
  if (!guard.ok) return json({ error: "unauthorized" }, 401);

  if (!aiConfigured) return json({ error: "AI drafting isn't connected yet." }, 503);

  const admin = supabaseAdmin();
  const { data: lesson } = await admin
    .from("lessons")
    .select("id, product_id, status, mux_playback_id, transcript, transcribe_count, last_transcribe_at, products!inner(creator_id, status)")
    .eq("id", lessonId)
    .maybeSingle();

  const owner = (lesson as any)?.products?.creator_id;
  const prodStatus = (lesson as any)?.products?.status;
  if (!lesson || owner !== guard.creator.id) return json({ error: "not found" }, 404);
  if (prodStatus !== "draft" && prodStatus !== "changes_requested") return json({ error: "locked" }, 409);
  if (lesson.status !== "ready" || !lesson.mux_playback_id) {
    return json({ error: "Upload and process a video first." }, 409);
  }
  if (!muxSigningConfigured) return json({ error: "Video signing keys not configured." }, 503);

  // Rate limit: MAX_PER_HOUR per lesson.
  const last = lesson.last_transcribe_at ? new Date(lesson.last_transcribe_at).getTime() : 0;
  const withinHour = Date.now() - last < 3600_000;
  if (withinHour && (lesson.transcribe_count ?? 0) >= MAX_PER_HOUR) {
    return json({ error: "Too many attempts this hour. Try again later." }, 429);
  }

  try {
    // Reuse an existing transcript if we have one; else transcribe the audio.
    let transcript = lesson.transcript ?? "";
    if (!transcript) {
      const audioUrl = await signedAudioUrl(lesson.mux_playback_id);
      if (!audioUrl) return json({ error: "Could not build audio URL." }, 500);
      transcript = (await transcribeUrl(audioUrl)) ?? "";
      if (!transcript) return json({ error: "Transcription returned empty." }, 502);
    }

    const setup = await draftWrittenSetup(transcript);
    if (!setup) return json({ error: "Could not draft a setup from the transcript." }, 502);

    await admin
      .from("lessons")
      .update({
        transcript,
        written_setup: setup,
        // draft only — not approved
        written_setup_approved_at: null,
        transcribe_count: withinHour ? (lesson.transcribe_count ?? 0) + 1 : 1,
        last_transcribe_at: new Date().toISOString(),
      })
      .eq("id", lessonId);

    return json({ written_setup: setup });
  } catch (err) {
    console.error("draft-setup failed:", (err as Error).message);
    return json({ error: "AI drafting failed. Try again." }, 502);
  }
};
