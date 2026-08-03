import { supabaseAdmin } from "./supabase";

// ============================================================================
// Transactional email via Resend (Phase 4). Gated on RESEND_API_KEY — every
// function is a safe no-op when the key is absent, so the app runs without email
// configured. Uses the Resend REST API directly (no SDK dependency).
// ============================================================================

const RESEND_API_KEY =
  (import.meta.env.RESEND_API_KEY as string | undefined) ??
  (typeof process !== "undefined" ? process.env.RESEND_API_KEY : undefined);
const EMAIL_FROM = (import.meta.env.EMAIL_FROM as string | undefined) ?? "Try This Play <no-reply@trythisplay.com>";
const SITE = (import.meta.env.SITE as string | undefined) ?? "https://trythisplay.vercel.app";
// Internal notifications (contact form, creator applications) land here.
const EMAIL_TO_INFO = (import.meta.env.CONTACT_EMAIL as string | undefined) ?? "info@trythisplay.com";

export const emailConfigured = Boolean(RESEND_API_KEY);

async function send(to: string, subject: string, html: string, replyTo?: string): Promise<boolean> {
  if (!emailConfigured || !to) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ from: EMAIL_FROM, to, subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
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

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const row = (label: string, value: string | undefined | null) =>
  value ? `<p style="margin:6px 0"><b>${label}:</b> ${escapeHtml(String(value))}</p>` : "";

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

/** Internal notification: a contact-form message arrived. */
export async function sendContactNotification(opts: {
  name: string;
  email: string;
  gamertag?: string;
  inquiryType: string;
  orderNumber?: string;
  message: string;
}): Promise<boolean> {
  const subject = `Contact form: ${opts.inquiryType} — ${opts.name}`;
  const body =
    row("Name", opts.name) +
    row("Email", opts.email) +
    row("Gamertag", opts.gamertag) +
    row("Inquiry", opts.inquiryType) +
    row("Order #", opts.orderNumber) +
    `<p style="margin:12px 0 4px"><b>Message:</b></p><p style="white-space:pre-wrap">${escapeHtml(opts.message)}</p>`;
  return send(EMAIL_TO_INFO, subject, shell(subject, body), opts.email);
}

/** Internal notification: a creator application arrived. */
export async function sendApplicationNotification(opts: {
  name: string;
  email: string;
  gamertag: string;
  discord?: string;
  category: string;
  audienceSize?: string;
  experience: string;
  productConcept: string;
  socials: string[];
  contentLinks: string[];
}): Promise<boolean> {
  const subject = `Creator application: ${opts.gamertag} (${opts.category})`;
  const body =
    row("Name", opts.name) +
    row("Email", opts.email) +
    row("Gamertag", opts.gamertag) +
    row("Discord", opts.discord) +
    row("Category", opts.category) +
    row("Audience", opts.audienceSize) +
    (opts.socials.length ? row("Socials", opts.socials.join("  ·  ")) : "") +
    (opts.contentLinks.length ? row("Content", opts.contentLinks.join("  ·  ")) : "") +
    `<p style="margin:12px 0 4px"><b>Experience:</b></p><p style="white-space:pre-wrap">${escapeHtml(opts.experience)}</p>` +
    `<p style="margin:12px 0 4px"><b>Product concept:</b></p><p style="white-space:pre-wrap">${escapeHtml(opts.productConcept)}</p>` +
    `<p style="margin-top:16px"><a href="${SITE}/admin/applications/">Open the applications queue</a></p>`;
  return send(EMAIL_TO_INFO, subject, shell(subject, body), opts.email);
}
