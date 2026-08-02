import OpenAI from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? (typeof process !== "undefined" ? process.env.OPENAI_API_KEY : void 0);
const aiConfigured = Boolean(OPENAI_API_KEY);
let _client = null;
function client() {
  if (!aiConfigured) return null;
  if (!_client) _client = new OpenAI({ apiKey: OPENAI_API_KEY });
  return _client;
}
async function transcribeUrl(mediaUrl) {
  const ai = client();
  if (!ai) return null;
  const res = await fetch(mediaUrl);
  if (!res.ok) throw new Error(`fetch media ${res.status}`);
  const blob = await res.blob();
  const file = new File([blob], "lesson-audio.mp4", { type: blob.type || "video/mp4" });
  const out = await ai.audio.transcriptions.create({
    file,
    model: "whisper-1"
  });
  return out.text ?? null;
}
async function draftWrittenSetup(transcript) {
  const ai = client();
  if (!ai) return null;
  const system = "You convert a Madden football video-lesson transcript into a concise, structured written setup. Only use information supported by the transcript; do not invent plays. Return strict JSON.";
  const user = `Transcript:
"""
${transcript.slice(0, 12e3)}
"""

Produce JSON with keys: formation (string), play (string), audibles (string[]), pre_snap (string[]), reads (string[] in order), counters (string[]), notes (string). Keep each array item short and actionable.`;
  const completion = await ai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user }
    ]
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
      notes: String(j.notes ?? "")
    };
  } catch {
    return null;
  }
}

export { aiConfigured as a, draftWrittenSetup as d, transcribeUrl as t };
