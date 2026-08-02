import OpenAI from "openai";

// ============================================================================
// AI helpers (Phase 3.5) — transcription + structured written-setup drafting.
// Gated on OPENAI_API_KEY; degrades gracefully when absent.
// Provider is abstracted here so it can be swapped later.
// ============================================================================

const OPENAI_API_KEY = import.meta.env.OPENAI_API_KEY as string | undefined;
export const aiConfigured = Boolean(OPENAI_API_KEY);

let _client: OpenAI | null = null;
function client(): OpenAI | null {
  if (!aiConfigured) return null;
  if (!_client) _client = new OpenAI({ apiKey: OPENAI_API_KEY! });
  return _client;
}

export interface WrittenSetup {
  formation: string;
  play: string;
  audibles: string[];
  pre_snap: string[];
  reads: string[];
  counters: string[];
  notes: string;
}

/** Transcribe an audio/video URL (e.g. a Mux static rendition) to text. */
export async function transcribeUrl(mediaUrl: string): Promise<string | null> {
  const ai = client();
  if (!ai) return null;
  const res = await fetch(mediaUrl);
  if (!res.ok) throw new Error(`fetch media ${res.status}`);
  const blob = await res.blob();
  const file = new File([blob], "lesson-audio.mp4", { type: blob.type || "video/mp4" });
  const out = await ai.audio.transcriptions.create({
    file,
    model: "whisper-1",
  });
  return out.text ?? null;
}

/**
 * Convert a Madden lesson transcript into a structured written setup.
 * Returns a WrittenSetup draft the creator then edits + approves. Never
 * auto-published.
 */
export async function draftWrittenSetup(transcript: string): Promise<WrittenSetup | null> {
  const ai = client();
  if (!ai) return null;

  const system =
    "You convert a Madden football video-lesson transcript into a concise, structured written setup. " +
    "Only use information supported by the transcript; do not invent plays. Return strict JSON.";
  const user =
    `Transcript:\n"""\n${transcript.slice(0, 12000)}\n"""\n\n` +
    "Produce JSON with keys: formation (string), play (string), audibles (string[]), " +
    "pre_snap (string[]), reads (string[] in order), counters (string[]), notes (string). " +
    "Keep each array item short and actionable.";

  const completion = await ai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });

  const text = completion.choices[0]?.message?.content;
  if (!text) return null;
  try {
    const j = JSON.parse(text);
    return {
      formation: String(j.formation ?? ""),
      play: String(j.play ?? ""),
      audibles: Array.isArray(j.audibles) ? j.audibles.map(String) : [],
      pre_snap: Array.isArray(j.pre_snap) ? j.pre_snap.map(String) : [],
      reads: Array.isArray(j.reads) ? j.reads.map(String) : [],
      counters: Array.isArray(j.counters) ? j.counters.map(String) : [],
      notes: String(j.notes ?? ""),
    };
  } catch {
    return null;
  }
}
