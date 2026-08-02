import type { APIRoute } from "astro";
import type Stripe from "stripe";
import { stripe } from "../../../lib/stripe";
import { supabaseAdmin } from "../../../lib/supabase";
import { sendPurchaseReady } from "../../../lib/email";

export const prerender = false;

/**
 * Stripe webhook: on successful checkout, records the purchase, which is
 * what grants library access. Verifies Stripe's signature before trusting
 * anything in the payload.
 */
export const POST: APIRoute = async ({ request }) => {
  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      await request.text(),
      signature,
      import.meta.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { user_id, product_slug, product_id, product_title } = session.metadata ?? {};

    if (user_id && product_slug) {
      const { error } = await supabaseAdmin()
        .from("purchases")
        .upsert(
          {
            user_id,
            product_slug,
            product_id: product_id || null,
            product_title: product_title ?? product_slug,
            amount_cents: session.amount_total ?? 0,
            currency: session.currency ?? "usd",
            stripe_session_id: session.id,
            stripe_payment_intent:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : null,
            status: "completed",
          },
          { onConflict: "stripe_session_id" }
        );
      if (error) {
        console.error("Failed to record purchase:", error.message);
        return new Response("Database error", { status: 500 });
      }
      // Branded "your ebook is ready" email (Stripe receipt stays on separately).
      await sendPurchaseReady({
        buyerId: user_id,
        buyerEmail: session.customer_details?.email ?? undefined,
        productTitle: product_title ?? product_slug,
        productSlug: product_slug,
      }).catch(() => {});
    }
  } else if (event.type === "charge.refunded") {
    // Sync refunds initiated from the Stripe dashboard back to our purchases.
    const charge = event.data.object as Stripe.Charge;
    const pi = typeof charge.payment_intent === "string" ? charge.payment_intent : null;
    if (pi) {
      await supabaseAdmin()
        .from("purchases")
        .update({ status: "refunded", refunded_at: new Date().toISOString(), stripe_refund_id: charge.refunds?.data?.[0]?.id ?? null })
        .eq("stripe_payment_intent", pi);
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
};
