import type { APIRoute } from "astro";
import { stripe } from "../../lib/stripe";
import { getUser, siteOrigin } from "../../lib/auth";
import { getPublishedProductBySlug } from "../../lib/products";

export const prerender = false;

/**
 * Creates a Stripe Checkout session for one product.
 * Price is read server-side from the catalog; the client only sends a slug.
 */
export const POST: APIRoute = async ({ request, cookies, redirect, url }) => {
  const form = await request.formData();
  const slug = String(form.get("slug") ?? "");

  const { user } = await getUser(request, cookies);
  if (!user) {
    return redirect(`/login/?next=${encodeURIComponent(`/ebooks/${slug}/`)}`);
  }

  // Price + product come from the DB (published only). Client only sends a slug.
  const ebook = await getPublishedProductBySlug(slug);
  if (!ebook) {
    return redirect("/ebooks/?error=not-found");
  }

  const origin = siteOrigin(request, url);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: user.email ?? undefined,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: ebook.data.priceCents,
          product_data: {
            name: ebook.data.title,
            description: ebook.data.shortDescription.slice(0, 300),
          },
        },
      },
    ],
    metadata: {
      user_id: user.id,
      product_slug: ebook.slug,
      product_id: ebook.id,
      product_title: ebook.data.title,
    },
    success_url: `${origin}/checkout/success/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/ebooks/${ebook.slug}/`,
  });

  return redirect(session.url ?? "/ebooks/", 303);
};
