import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { stripe } from "../../lib/stripe";
import { getUser } from "../../lib/auth";

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

  const ebooks = await getCollection("ebooks");
  const ebook = ebooks.find((e) => e.slug === slug && e.data.published);
  if (!ebook) {
    return redirect("/ebooks/?error=not-found");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: user.email ?? undefined,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(ebook.data.price * 100),
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
      product_title: ebook.data.title,
    },
    success_url: `${url.origin}/checkout/success/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${url.origin}/ebooks/${ebook.slug}/`,
  });

  return redirect(session.url ?? "/ebooks/", 303);
};
