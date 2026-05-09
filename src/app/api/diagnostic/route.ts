import { NextResponse } from "next/server";

export async function GET() {
  const w = process.env.WEB3FORMS_KEY;
  const r = process.env.RESEND_API_KEY;
  const c = process.env.CONTACT_EMAIL;

  return NextResponse.json({
    web3forms: {
      configured: !!w,
      key_preview: w ? `${w.slice(0, 4)}…${w.slice(-4)} (${w.length} chars)` : null,
    },
    resend: {
      configured: !!r,
      key_preview: r ? `${r.slice(0, 4)}…${r.slice(-4)}` : null,
    },
    contact_email: c || "fallback: qforwork13@gmail.com",
    delivery_will_use:
      w ? "Web3Forms (primary)" : r ? "Resend (fallback)" : "NONE — emails won't be sent",
  });
}
