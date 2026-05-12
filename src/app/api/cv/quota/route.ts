import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getQuotaStatus } from "@/lib/cv/quota";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Cần đăng nhập" }, { status: 401 });
  const status = await getQuotaStatus(userId);
  return NextResponse.json(status);
}
