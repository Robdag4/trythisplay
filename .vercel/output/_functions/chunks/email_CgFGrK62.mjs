import { s as supabaseAdmin } from './supabase_w_KyqO0O.mjs';

const RESEND_API_KEY = undefined                              ;
const EMAIL_FROM = "Try This Play <no-reply@trythisplay.com>";
const SITE = "https://trythisplay.com";
const emailConfigured = Boolean(RESEND_API_KEY);
async function send(to, subject, html) {
  if (!emailConfigured || !to) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({ from: EMAIL_FROM, to, subject, html })
    });
    if (!res.ok) {
      console.error("resend send failed:", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("resend send error:", err.message);
    return false;
  }
}
async function emailForUser(userId) {
  if (!userId) return null;
  const admin = supabaseAdmin();
  const { data } = await admin.auth.admin.getUserById(userId);
  return data?.user?.email ?? null;
}
const shell = (title, body) => `
  <div style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto;color:#111">
    <h2 style="color:#E11D2E">${title}</h2>
    ${body}
    <p style="margin-top:24px;font-size:12px;color:#888">Try This Play</p>
  </div>`;
async function sendSubmissionDecision(opts) {
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
async function sendPurchaseReady(opts) {
  const to = opts.buyerEmail ?? await emailForUser(opts.buyerId);
  if (!to) return false;
  const url = `${SITE}/library/${opts.productSlug}/`;
  const subject = `Your ebook "${opts.productTitle}" is ready`;
  const body = `<p>Thanks for your purchase! <b>${opts.productTitle}</b> is in your library now.</p><p><a href="${url}">Start watching</a></p>`;
  return send(to, subject, shell(subject, body));
}

export { sendPurchaseReady as a, sendSubmissionDecision as s };
