import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs/server";

// Server-side Supabase client authenticated qua Clerk JWT (cho user-scoped reads/writes via RLS).
export async function getSupabaseServer() {
  const cookieStore = await cookies();
  const { getToken } = await auth();
  const supabaseToken = await getToken({ template: "supabase" }).catch(() => null);

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (list) => {
          try {
            list.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Server Component context - cookies are read-only, ignore
          }
        },
      },
      global: supabaseToken
        ? { headers: { Authorization: `Bearer ${supabaseToken}` } }
        : undefined,
    },
  );
}
