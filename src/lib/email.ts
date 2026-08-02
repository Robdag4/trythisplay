import { supabaseAdmin } from "./supabase";

// ============================================================================
// Transactional email via Resend (Phase 4). Gated on RESEND_API_KEY — every
// function is a safe no-op when the key is absent, so the app runs without email
// configured. Uses the Resend REST API directly (no SDK dependency).
// ============================================================================

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY as string | undefined;
const EMAIL_FROM = (import.meta.env.EMAIL_FROM as string | undefined) ?? "Try This Play <no-reply@trythisplay.com>";
const SITE = (import.meta.env.SITE as string | undefined) ?? "https://trythisplay.vercel.app";

export const emailConfigured = Boolean(RESEND_API_KEY);

async function send(to: string, subject: string, html: string): Promise<boolean> {
  if (!emailConfigured || !to) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ from: EMAIL_FROM, to, subject, html }),
    });
    if (!res.ok) {
      console.error("resend send failed:", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("resend send error:", (err as Error).message);
    return false;
  }
}

/** Look up a user's email by auth id (service role). */
async function emailForUser(userId: string | undefined): Promise<string | null> {
  if (!userId) return null;
  const admin = supabaseAdmin();
  const { data } = await admin.auth.admin.getUserById(userId);
  return data?.user?.email ?? null;
}

const shell = (title: string, body: string) => `
  <div style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto;color:#111">
    <h2 style="color:#E11D2E">${title}</h2>
    ${body}
    <p style="margin-top:24px;font-size:12px;color:#888">Try This Play</p>
  </div>`;

/** Notify a creator of a submission decision. */
export async function sendSubmissionDecision(opts: {
  productTitle: string;
  decision: "published" | "changes_requested" | "rejected";
  creatorId?: string;
  note?: string;
}): Promise<boolean> {
  const to = await emailForUser(opts.creatorId);
  if (!to) return false;
  const url = `${SITE}/creator/`;
  let subject = "";
  let body = "";
  if (opts.decision === "published") {
    subject = `Your ebook "${opts.productTitle}" is live`;
    body = `<p>Great news — <b>${opts.productTitle}</b> passed review and is now live on the marketplace.</p><p><a href="${url}">Open your creator portal</a></p>`;
  } else if (opts.decision === "changes_requested") {
    subject = `Changes requested on "${opts.productTitle}"`;
    body = `<p>Our reviewer asked for some changes on <b>${opts.productTitle}</b>.</p>${opts.note ? `<blockquote style="border-left:3px solid #ddd;padding-left:12px;color:#444">${opts.note}</blockquote>` : ""}<p><a href="${url}">Review and resubmit</a></p>`;
  } else {
    subject = `Update on "${opts.productTitle}"`;
    body = `<p>Unfortunately <b>${opts.productTitle}</b> wasn't approved for the marketplace at this time.</p><p><a href="${url}">Open your creator portal</a></p>`;
  }
  return send(to, subject, shell(subject, body));
}

/** Branded "your ebook is ready" purchase email (Stripe receipt stays on too). */
export async function sendPurchaseReady(opts: {
  buyerId?: string;
  buyerEmail?: string;
  productTitle: string;
  productSlug: string;
}): Promise<boolean> {
  const to = opts.buyerEmail ?? (await emailForUser(opts.buyerId));
  if (!to) return false;
  const url = `${SITE}/library/${opts.productSlug}/`;
  const subject = `Your ebook "${opts.productTitle}" is ready`;
  const body = `<p>Thanks for your purchase! <b>${opts.productTitle}</b> is in your library now.</p><p><a href="${url}">Start watching</a></p>`;
  return send(to, subject, shell(subject, body));
}
