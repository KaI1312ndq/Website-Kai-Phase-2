import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, type } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Thiếu thông tin" }, { status: 400 });
    }

    // Option 1: Resend (recommended)
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "noreply@yourdomain.com",
          to: [process.env.CONTACT_EMAIL || "qforwork13@gmail.com"],
          subject: `[NĐQ Portfolio] Liên hệ mới từ ${name}${type ? ` — ${type}` : ""}`,
          html: `
            <h2>Liên hệ mới từ website</h2>
            <p><strong>Tên:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Loại:</strong> ${type || "Không xác định"}</p>
            <p><strong>Tin nhắn:</strong></p>
            <p>${message.replace(/\n/g, "<br/>")}</p>
          `,
        }),
      });
      if (!res.ok) throw new Error("Resend error");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
