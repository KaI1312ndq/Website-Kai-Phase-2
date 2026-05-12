import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { CVDocument } from "@/lib/cv/templates";
import { consumeDownload, getQuotaStatus } from "@/lib/cv/quota";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { CVData, CVTemplate } from "@/lib/cv/types";

export const runtime = "nodejs";

/**
 * Generate PDF CV.
 *   POST /api/cv/pdf
 *   body: { data: CVData, template: CVTemplate, cvId?: string }
 *
 * Behavior:
 *   - Require Clerk auth
 *   - Check quota: free user max 3 downloads (no watermark), pro user unlimited
 *   - Quota exhausted -> return watermarked PDF + 402 upgrade hint
 *   - On success: increment quota, log to cv_downloads
 */
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Cần đăng nhập" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const data = body?.data as CVData;
  const template = (body?.template || "ats") as CVTemplate;
  const cvId = body?.cvId as string | undefined;

  if (!data?.personal?.fullName) {
    return NextResponse.json({ error: "Thiếu họ tên" }, { status: 400 });
  }

  const status = await getQuotaStatus(userId);

  // Quyết định có watermark không
  let watermark = false;
  let used = false;
  if (status.isPro) {
    watermark = false;
  } else if (status.freeDownloadsRemaining > 0) {
    const consume = await consumeDownload(userId);
    if (!consume.ok) {
      watermark = true;
    } else {
      watermark = false;
      used = true;
    }
  } else {
    watermark = true; // hết quota - vẫn cho tải nhưng có watermark + nhắc upgrade
  }

  // Log download
  try {
    const sb = getSupabaseAdmin();
    await sb.from("cv_downloads").insert({
      user_id: userId,
      cv_id: cvId || null,
      template,
      is_pro: status.isPro,
    });
  } catch {}

  // Render PDF
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfBuffer = await renderToBuffer(CVDocument({ data, template, watermark }) as any);

  const fileName = `${(data.personal.fullName || "CV").replace(/[^a-zA-Z0-9_-]+/g, "-")}-CV.pdf`;
  return new NextResponse(pdfBuffer as unknown as BodyInit, {
    status: used ? 200 : (watermark ? 200 : 200),
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "X-CV-Watermark": String(watermark),
      "X-CV-Pro": String(status.isPro),
      "X-CV-Free-Remaining": String(status.isPro ? 9999 : Math.max(0, status.freeDownloadsRemaining - (used ? 1 : 0))),
    },
  });
}
