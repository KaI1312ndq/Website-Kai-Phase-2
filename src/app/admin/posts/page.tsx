import { cookies } from "next/headers";
import PostsClient from "./PostsClient";

export const metadata = {
  title: "Blog Admin",
  robots: { index: false, follow: false },
};

// No ISR - always fresh
export const dynamic = "force-dynamic";

const ADMIN_SECRET = process.env.SEED_SECRET || "kai-seed-2026";

export default async function AdminPostsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  const authed = session === ADMIN_SECRET;

  return <PostsClient authed={authed} />;
}
