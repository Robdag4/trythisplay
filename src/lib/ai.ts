import OpenAI from "openai";

// ============================================================================
// AI helpers (Phase 3.5) — transcription + structured written-setup drafting.
// Gated on OPENAI_API_KEY; degrades gracefully when absent.
// Provider is abstracted here so it can be swapped later.
// ============================================================================

// Read at runtime (Vercel serverless) OR build-time inline. process.env is the
// reliable source for server-only secrets on Vercel.
const OPENAI_API_KEY =
  (import.meta.env.OPENAI_API_KEY as string | undefined) ??
  (typeof process !== "undefined" ? process.env.OPENAI_API_KEY : undefined);
export const aiConfigured = Boolean(OPENAI_API_KEY);

let _client: OpenAI | null = null;
function client(): OpenAI | null {
  if (!aiConfigured) return null;
  if (!_client) _client = new OpenAI({ apiKey: OPENAI_API_KEY! });
  return _client;
}

export interface DraftPlay {
  play: string;
  /** Pre-snap adjustments keyed by coverage: any, cover0..cover4 */
  pre_snap: Record<string, string[]>;
  reads: string[];
  notes: string;
}

export interface WrittenSetup {
  formation: string;
  /** Formation-level audibles (the set to configure from this formation). */
  audibles: string[];
  plays: DraftPlay[];
}

/** Transcribe an audio/video URL (e.g. a Mux static rendition) to text. */
export async function transcribeUrl(mediaUrl: string): Promise<string | null> {
  const ai = client();
  if (!ai) return null;
  const res = await fetch(mediaUrl);
  if (!res.ok) throw new Error(`fetch media ${res.status}`);
  const blob = await res.blob();
  // The Mux static rendition is an M4A audio file — the filename extension
  // must match or OpenAI rejects it with "Invalid file format".
  const file = new File([blob], "lesson-audio.m4a", { type: "audio/mp4" });
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
    "You convert a Madden football video-lesson transcript into a concise, structured written setup " +
    "matching a specific editor layout. Only use information supported by the transcript; do not invent " +
    "plays or adjustments. Return strict JSON.";
  const user =
    `Transcript:\n"""\n${transcript.slice(0, 12000)}\n"""\n\n` +
    "Produce JSON with EXACTLY these keys:\n" +
    '- "formation": string — the ONE formation this lesson teaches from (e.g. "Gun Bunch").\n' +
    '- "audibles": string[] — the audibles the creator says to set up from this formation (play names to audible to). Formation-level, NOT per play.\n' +
    '- "plays": array — one entry PER PLAY/CONCEPT taught in the lesson. Each play object has:\n' +
    '    - "play": string — the play name.\n' +
    '    - "pre_snap": object — pre-snap adjustments GROUPED BY THE COVERAGE THEY BEAT. Allowed keys: "any", "cover0", "cover1", "cover2", "cover3", "cover4". Each value is a string[] of short adjustments (hot routes, motions, protection changes). When the creator says an adjustment is for a specific coverage ("against Cover 3, streak the X"), put it under that coverage key; adjustments that always apply go under "any". Omit empty keys.\n' +
    '    - "reads": string[] — the read progression IN ORDER (first read first).\n' +
    '    - "notes": string — anything else important for this play (timing, hash, situations).\n' +
    "Keep every array item short and actionable. If the lesson only teaches one play, plays has one entry.";

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
    const strs = (a: any) => (Array.isArray(a) ? a.map(String).filter(Boolean) : []);
    const COVER_KEYS = ["any", "cover0", "cover1", "cover2", "cover3", "cover4"];
    const normPlay = (p: any): DraftPlay => {
      const ps: Record<string, string[]> = {};
      const src = p?.pre_snap;
      if (Array.isArray(src)) {
        const v = strs(src);
        if (v.length) ps.any = v;
      } else if (src && typeof src === "object") {
        for (const k of COVER_KEYS) {
          const v = strs(src[k]);
          if (v.length) ps[k] = v;
        }
      }
      return {
        play: String(p?.play ?? ""),
        pre_snap: ps,
        reads: strs(p?.reads),
        notes: String(p?.notes ?? ""),
      };
    };
    let plays: DraftPlay[] = Array.isArray(j.plays) ? j.plays.map(normPlay) : [];
    // Tolerate a legacy/misshaped single-play response.
    if (!plays.length && (j.play || j.pre_snap || j.reads)) plays = [normPlay(j)];
    return {
      formation: String(j.formation ?? ""),
      audibles: strs(j.audibles),
      plays,
    };
  } catch {
    return null;
  }
}
