import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = undefined                                   ;
const SUPABASE_ANON_KEY = undefined                                        ;
function supabaseServer(request, cookies) {
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get("Cookie") ?? "").map(
          (c) => ({
            name: c.name,
            value: c.value ?? ""
          })
        );
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(
          ({ name, value, options }) => cookies.set(name, value, options)
        );
      }
    }
  });
}
function supabaseAdmin() {
  return createClient(
    SUPABASE_URL,
    undefined                                         ,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

export { supabaseServer as a, supabaseAdmin as s };
