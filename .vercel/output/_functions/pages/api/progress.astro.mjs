import { g as getUser } from '../../chunks/auth_DJPD9eSZ.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const slug = String(form.get("slug") ?? "");
  const lessonIndex = Number(form.get("lesson") ?? -1);
  const done = form.get("done") === "1";
  const { supabase, user } = await getUser(request, cookies);
  if (!user || !slug || lessonIndex < 0) return redirect("/library/");
  if (done) {
    await supabase.from("lesson_progress").upsert({
      user_id: user.id,
      product_slug: slug,
      lesson_index: lessonIndex
    });
  } else {
    await supabase.from("lesson_progress").delete().match({ user_id: user.id, product_slug: slug, lesson_index: lessonIndex });
  }
  return redirect(`/library/${slug}/`);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
