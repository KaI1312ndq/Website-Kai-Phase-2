import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const STAGE: Record<string, string> = {
  student: "Sinh viên",
  fresher: "Mới đi làm",
  marketer: "Đang làm Marketing",
  other: "Khác",
};
const SLOT: Record<string, string> = {
  morning: "Sáng (9–11h)",
  afternoon: "Chiều (14–16h)",
  evening: "Tối (19–21h)",
};
const COMMIT: Record<string, string> = {
  yes: "Có",
  try: "Sẽ cố gắng",
  no: "Chưa cam kết",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, stage, goal, hasLaptop, commit, slot } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 });
    }

    // Persist application vào Supabase (luôn lưu, kể cả email gửi fail)
    let dbSaved = false;
    let dbError: string | null = null;
    try {
      const { error: insErr } = await getSupabaseAdmin().from("course_applications").insert({
        course_slug: "ecom-foundation-k1",
        name,
        email,
        phone,
        motivation: typeof goal === "string" ? goal : null,
        experience: typeof stage === "string" ? stage : null,
        meta: { stage, hasLaptop, commit, slot },
      });
      if (insErr) {
        dbError = `${insErr.code || ""} ${insErr.message}`.trim();
        console.error("[course-apply] Supabase insert error:", insErr);
      } else {
        dbSaved = true;
      }
    } catch (e) {
      dbError = e instanceof Error ? e.message : String(e);
      console.error("[course-apply] Supabase insert exception:", e);
    }

    const subject = `[Ecom Foundation · K1] Application - ${name}${dbSaved ? "" : " ⚠ DB-FAILED"}`;
    const fields = {
      "Họ tên": name,
      Email: email,
      "Zalo / SĐT": phone,
      "Giai đoạn": STAGE[stage] || stage || "-",
      "Mục tiêu": goal || "-",
      "Laptop + Excel": hasLaptop === "yes" ? "Có" : hasLaptop === "no" ? "Chưa" : "-",
      "Cam kết tham dự": COMMIT[commit] || "-",
      "Slot quick meet": SLOT[slot] || slot || "-",
      ...(dbSaved ? {} : { "⚠ DB Save": `FAILED - ${dbError || "unknown"} (backfill manually)` }),
    };

    let delivered = false;
    let providerError: string | null = null;

    // Provider 1 - Web3Forms (free, no domain verification needed)
    if (process.env.WEB3FORMS_KEY) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Origin: "https://www.nguyenducquang.website",
            Referer: "https://www.nguyenducquang.website/",
          },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_KEY,
            subject,
            from_name: `Ecom Foundation Apply · ${name}`,
            email,
            replyto: email,
            botcheck: "",
            ...fields,
          }),
        });
        const text = await res.text();
        let data: any = {};
        try { data = JSON.parse(text); } catch { data = { _raw: text.slice(0, 200) }; }
        console.log("[course-apply] Web3Forms response:", res.status, data);
        if (res.ok && data?.success) {
          delivered = true;
        } else {
          providerError = `Web3Forms: ${data?.message || `HTTP ${res.status}`}`;
        }
      } catch (e) {
        providerError = `Web3Forms exception: ${e instanceof Error ? e.message : String(e)}`;
        console.error("[course-apply] Web3Forms fetch failed:", e);
      }
    }

    // Provider 2 - Resend (requires verified domain)
    if (!delivered && process.env.RESEND_API_KEY) {
      const html = `
        <h2>Application mới - Foundation Ecommerce</h2>
        <table style="border-collapse:collapse">
          ${Object.entries(fields)
            .map(([k, v]) => `<tr><td style="padding:6px 12px"><strong>${k}</strong></td><td style="padding:6px 12px">${String(v).replace(/\n/g, "<br/>")}</td></tr>`)
            .join("")}
        </table>
      `;
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "onboarding@resend.dev",
          to: [process.env.CONTACT_EMAIL || "qforwork13@gmail.com"],
          subject,
          html,
        }),
      });
      if (res.ok) delivered = true;
    }

    if (!delivered) {
      console.warn("[course-apply] Delivery failed:", providerError, "Submission:", JSON.stringify({ name, email, phone, stage }));
      return NextResponse.json({ error: "delivery_failed", detail: providerError || "no_provider", message: "Không gửi được email. Inbox Zalo trực tiếp." }, { status: 503 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[course-apply] error:", err);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
