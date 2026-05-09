import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, stage, goal, hasLaptop, commit, slot } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 });
    }

    const stageLabel: Record<string, string> = {
      student: "Sinh viên",
      fresher: "Mới đi làm",
      marketer: "Đang làm Marketing",
      other: "Khác",
    };
    const slotLabel: Record<string, string> = {
      morning: "Sáng (9–11h)",
      afternoon: "Chiều (14–16h)",
      evening: "Tối (19–21h)",
    };

    if (process.env.RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "noreply@nguyenducquang.website",
          to: [process.env.CONTACT_EMAIL || "qforwork13@gmail.com"],
          subject: `[Ecom Foundation · Cohort 01] Application — ${name}`,
          html: `
            <h2>Application mới — Foundation Ecommerce</h2>
            <table style="border-collapse:collapse">
              <tr><td style="padding:6px 12px"><strong>Họ tên</strong></td><td style="padding:6px 12px">${name}</td></tr>
              <tr><td style="padding:6px 12px"><strong>Email</strong></td><td style="padding:6px 12px">${email}</td></tr>
              <tr><td style="padding:6px 12px"><strong>Zalo / SĐT</strong></td><td style="padding:6px 12px">${phone}</td></tr>
              <tr><td style="padding:6px 12px"><strong>Giai đoạn</strong></td><td style="padding:6px 12px">${stageLabel[stage] || stage || "—"}</td></tr>
              <tr><td style="padding:6px 12px"><strong>Mục tiêu</strong></td><td style="padding:6px 12px">${(goal || "—").replace(/\n/g, "<br/>")}</td></tr>
              <tr><td style="padding:6px 12px"><strong>Laptop + Excel</strong></td><td style="padding:6px 12px">${hasLaptop === "yes" ? "Có" : hasLaptop === "no" ? "Không" : "—"}</td></tr>
              <tr><td style="padding:6px 12px"><strong>Cam kết tham dự</strong></td><td style="padding:6px 12px">${commit === "yes" ? "Có" : commit === "try" ? "Sẽ cố gắng" : commit === "no" ? "Không" : "—"}</td></tr>
              <tr><td style="padding:6px 12px"><strong>Slot quick meet</strong></td><td style="padding:6px 12px">${slotLabel[slot] || slot || "—"}</td></tr>
            </table>
          `,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
