import { s as stripe } from '../../chunks/stripe_Da_YONpy.mjs';
import { g as getUser, s as siteOrigin } from '../../chunks/auth_DJPD9eSZ.mjs';
import { g as getPublishedProductBySlug } from '../../chunks/products_X9YWEcqr.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request, cookies, redirect, url }) => {
  const form = await request.formData();
  const slug = String(form.get("slug") ?? "");
  const { user } = await getUser(request, cookies);
  if (!user) {
    return redirect(`/login/?next=${encodeURIComponent(`/ebooks/${slug}/`)}`);
  }
  const ebook = await getPublishedProductBySlug(slug);
  if (!ebook) {
    return redirect("/ebooks/?error=not-found");
  }
  const origin = siteOrigin(request, url);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: user.email ?? void 0,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: ebook.data.priceCents,
          product_data: {
            name: ebook.data.title,
            description: ebook.data.shortDescription.slice(0, 300)
          }
        }
      }
    ],
    metadata: {
      user_id: user.id,
      product_slug: ebook.slug,
      product_id: ebook.id,
      product_title: ebook.data.title
    },
    success_url: `${origin}/checkout/success/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/ebooks/${ebook.slug}/`
  });
  return redirect(session.url ?? "/ebooks/", 303);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
