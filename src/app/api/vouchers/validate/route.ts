import { NextRequest, NextResponse } from "next/server";
import { getVoucherByCode } from "@/lib/queries";
import { normalizeCode, validateVoucher } from "@/lib/voucher";

/**
 * Preview voucher validity + discount for UI.
 * Server still re-validates at order create.
 * POST /api/vouchers/validate
 *   body: { code: string, subtotal: number }
 */

const RATE_LIMIT = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT.get(ip);
  if (!entry || entry.resetAt < now) {
    RATE_LIMIT.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 20) return false;
  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ ok: false, error: "Quá nhiều yêu cầu, vui lòng đợi" }, { status: 429 });
    }

    const body = await req.json();
    const rawCode = typeof body?.code === "string" ? body.code : "";
    const subtotal = typeof body?.subtotal === "number" ? body.subtotal : 0;

    const code = normalizeCode(rawCode);
    if (!code || code.length < 3 || code.length > 40) {
      return NextResponse.json({ ok: false, error: "Mã không hợp lệ" }, { status: 400 });
    }
    if (subtotal <= 0) {
      return NextResponse.json({ ok: false, error: "Giỏ hàng trống" }, { status: 400 });
    }

    const voucher = await getVoucherByCode(code);
    const result = validateVoucher(voucher, subtotal);
    if (!result.ok) return NextResponse.json({ ok: false, error: result.error }, { status: 400 });

    return NextResponse.json({
      ok: true,
      discount: result.discount,
      finalTotal: result.finalTotal,
      isFree: result.isFree,
      voucher: {
        code: result.voucher.code,
        displayName: result.voucher.displayName,
        type: result.voucher.type,
        value: result.voucher.value,
      },
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "unknown" },
      { status: 500 }
    );
  }
}
