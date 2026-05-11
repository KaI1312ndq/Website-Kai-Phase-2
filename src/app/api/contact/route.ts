import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, type, who } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Thiếu thông tin" }, { status: 400 });
    }

    const subject = `[NĐQ] Liên hệ mới từ ${name}${type ? ` - ${type}` : ""}`;
    const fields: Record<string, string> = {
      "Họ tên": name,
      Email: email,
      "SĐT / Zalo": phone || "-",
      "Quan tâm": type || "-",
      "Đối tượng": who || "-",
      "Lời nhắn": message || "-",
    };

    let delivered = false;

    if (process.env.WEB3FORMS_KEY) {
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
          from_name: `Liên hệ website · ${name}`,
          email,
          replyto: email,
          botcheck: "",
          ...fields,
        }),
      });
      const data = await res.json().catch(() => ({} as any));
      if (res.ok && data?.success) delivered = true;
    }

    if (!delivered && process.env.RESEND_API_KEY) {
      const html = `
        <h2>Liên hệ mới từ website</h2>
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
      console.warn("[contact] No email provider configured or all failed. Submission:", JSON.stringify({ name, email, type }));
      return NextResponse.json({ error: "no_provider", message: "Email chưa cấu hình. Inbox Zalo trực tiếp." }, { status: 503 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] error:", err);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
