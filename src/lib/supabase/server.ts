import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs/server";

// Server-side Supabase client authenticated qua Clerk (Third-Party Auth flow).
// Supabase validate Clerk session token qua Clerk JWKS - không cần JWT template,
// không cần shared secret. Setup ở Supabase: Auth > Sign In/Up > Third Party Auth > Clerk.
export async function getSupabaseServer() {
  const cookieStore = await cookies();
  const { getToken } = await auth();
  const token = await getToken().catch(() => null);

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
            // Server Component context - cookies read-only
          }
        },
      },
      global: token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
    },
  );
}
