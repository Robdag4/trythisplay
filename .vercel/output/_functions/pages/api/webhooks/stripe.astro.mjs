import { s as stripe } from '../../../chunks/stripe_Da_YONpy.mjs';
import { s as supabaseAdmin } from '../../../chunks/supabase_w_KyqO0O.mjs';
import { a as sendPurchaseReady } from '../../../chunks/email_CgFGrK62.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      await request.text(),
      signature,
      undefined                                     
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { user_id, product_slug, product_id, product_title } = session.metadata ?? {};
    if (user_id && product_slug) {
      const { error } = await supabaseAdmin().from("purchases").upsert(
        {
          user_id,
          product_slug,
          product_id: product_id || null,
          product_title: product_title ?? product_slug,
          amount_cents: session.amount_total ?? 0,
          currency: session.currency ?? "usd",
          stripe_session_id: session.id,
          stripe_payment_intent: typeof session.payment_intent === "string" ? session.payment_intent : null,
          status: "completed"
        },
        { onConflict: "stripe_session_id" }
      );
      if (error) {
        console.error("Failed to record purchase:", error.message);
        return new Response("Database error", { status: 500 });
      }
      await sendPurchaseReady({
        buyerId: user_id,
        buyerEmail: session.customer_details?.email ?? void 0,
        productTitle: product_title ?? product_slug,
        productSlug: product_slug
      }).catch(() => {
      });
    }
  } else if (event.type === "charge.refunded") {
    const charge = event.data.object;
    const pi = typeof charge.payment_intent === "string" ? charge.payment_intent : null;
    if (pi) {
      await supabaseAdmin().from("purchases").update({ status: "refunded", refunded_at: (/* @__PURE__ */ new Date()).toISOString(), stripe_refund_id: charge.refunds?.data?.[0]?.id ?? null }).eq("stripe_payment_intent", pi);
    }
  }
  return new Response(JSON.stringify({ received: true }), { status: 200 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
