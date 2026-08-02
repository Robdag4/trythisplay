import type { APIRoute } from "astro";
import { getUser } from "../../lib/auth";

export const prerender = false;

/** Toggles a lesson's completed state for the signed-in customer. */
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
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
      lesson_index: lessonIndex,
    });
  } else {
    await supabase
      .from("lesson_progress")
      .delete()
      .match({ user_id: user.id, product_slug: slug, lesson_index: lessonIndex });
  }
  return redirect(`/library/${slug}/`);
};
