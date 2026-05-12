import { currentUser } from "@clerk/nextjs/server";

// Email được phép vào /account/admin/*. Có thể chuyển sang ENV var hoặc DB role sau.
const ADMIN_EMAILS = new Set<string>([
  "qforwork13@gmail.com",
  "quangkenno13122003@gmail.com",
]);

export async function isAdmin(): Promise<boolean> {
  try {
    const user = await currentUser();
    if (!user) return false;
    const emails = (user.emailAddresses || []).map((e) => e.emailAddress.toLowerCase());
    return emails.some((e) => ADMIN_EMAILS.has(e));
  } catch {
    return false;
  }
}
