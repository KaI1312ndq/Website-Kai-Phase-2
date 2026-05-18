import { cookies } from "next/headers";
import AnalyticsClient from "./AnalyticsClient";

export const metadata = {
  title: "Analytics - Blog Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const ADMIN_SECRET = process.env.SEED_SECRET || "kai-seed-2026";

export default async function Page() {
  const c = await cookies();
  const authed = c.get("admin_session")?.value === ADMIN_SECRET;
  return <AnalyticsClient authed={authed} />;
}
