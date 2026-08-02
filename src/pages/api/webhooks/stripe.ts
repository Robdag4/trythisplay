import type { APIRoute } from "astro";
import type Stripe from "stripe";
import { stripe } from "../../../lib/stripe";
import { supabaseAdmin } from "../../../lib/supabase";

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
    const { user_id, product_slug, product_title } = session.metadata ?? {};

    if (user_id && product_slug) {
      const { error } = await supabaseAdmin()
        .from("purchases")
        .upsert(
          {
            user_id,
            product_slug,
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
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
};
