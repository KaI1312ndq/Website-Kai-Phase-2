import { Resend } from "resend";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nguyenducquang.website";

export type DeliveryEmailParams = {
  to: string;
  customerName: string;
  orderNumber: string;
  total: number;
  items: Array<{ title: string }>;
  downloadToken: string;
  expiresAt: string; // ISO date
};

export async function sendDeliveryEmail(params: DeliveryEmailParams): Promise<{ ok: boolean; error?: string; emailId?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: "RESEND_API_KEY not set" };

  const resend = new Resend(apiKey);

  const expiresDate = new Date(params.expiresAt);
  const expiresStr = expiresDate.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const downloadUrl = `${SITE_URL}/shop/download/${params.downloadToken}`;

  const itemsHtml = params.items
    .map(
      (it) =>
        `<li style="margin: 0 0 6px; color: #333;">${escapeHtml(it.title)}</li>`
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Đơn hàng ${escapeHtml(params.orderNumber)} — File đã sẵn sàng</title>
</head>
<body style="margin: 0; padding: 0; background: #f5f7fb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: #f5f7fb;">
  <tr>
    <td align="center" style="padding: 32px 16px;">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
        <!-- Header -->
        <tr>
          <td style="background: linear-gradient(135deg, #146ef5 0%, #7a3dff 100%); padding: 32px 32px 24px; color: white;">
            <div style="font-size: 13px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.85; margin-bottom: 6px;">nguyenducquang.website</div>
            <h1 style="margin: 0; font-size: 24px; font-weight: 800; line-height: 1.2;">Cảm ơn ${escapeHtml(params.customerName)}!</h1>
            <p style="margin: 8px 0 0; opacity: 0.9; font-size: 15px;">Đơn hàng <strong>${escapeHtml(params.orderNumber)}</strong> đã được xác nhận. File đính kèm bên dưới.</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding: 28px 32px;">
            <h2 style="margin: 0 0 12px; font-size: 16px; color: #111;">Sản phẩm bạn đã mua</h2>
            <ul style="margin: 0 0 24px; padding-left: 20px; font-size: 14px; line-height: 1.6;">
              ${itemsHtml}
            </ul>

            <div style="background: #f5f7fb; border-radius: 10px; padding: 12px 16px; margin-bottom: 24px;">
              <div style="font-size: 13px; color: #666; margin-bottom: 4px;">Tổng thanh toán</div>
              <div style="font-size: 22px; font-weight: 800; color: #146ef5;">${params.total.toLocaleString("vi-VN")}đ</div>
            </div>

            <!-- CTA Button -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto 16px;">
              <tr>
                <td align="center" style="border-radius: 10px; background: linear-gradient(135deg, #146ef5 0%, #7a3dff 100%);">
                  <a href="${downloadUrl}" style="display: inline-block; padding: 14px 32px; color: white; text-decoration: none; font-weight: 700; font-size: 16px; border-radius: 10px;">
                    Tải file ngay →
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin: 0 0 8px; font-size: 13px; color: #666; text-align: center;">
              Hoặc copy link: <br/>
              <a href="${downloadUrl}" style="color: #146ef5; word-break: break-all;">${downloadUrl}</a>
            </p>
            <p style="margin: 16px 0 0; font-size: 12px; color: #999; text-align: center;">
              Link tải có hiệu lực đến <strong>${expiresStr}</strong>. Lưu file về máy ngay để dùng lâu dài.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="border-top: 1px solid #eee; padding: 20px 32px; background: #fafbfc;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #666; line-height: 1.6;">
              <strong>Cần hỗ trợ?</strong> Reply email này hoặc liên hệ Quảng qua Zalo <a href="https://zalo.me/0868464658" style="color: #146ef5;">0868464658</a>.
            </p>
            <p style="margin: 12px 0 0; font-size: 11px; color: #aaa;">
              Email tự động — không reply spam. Quảng đọc mọi reply hợp lệ.
            </p>
          </td>
        </tr>
      </table>
      <p style="margin: 24px 0 0; font-size: 11px; color: #aaa;">
        © ${new Date().getFullYear()} Nguyễn Đức Quảng — Ecom Growth Expert · 60+ project
      </p>
    </td>
  </tr>
</table>
</body>
</html>`;

  try {
    const { data, error } = await resend.emails.send({
      from: "Nguyễn Đức Quảng <noreply@nguyenducquang.website>",
      to: [params.to],
      subject: `[${params.orderNumber}] File đã sẵn sàng — tải về tại đây`,
      html,
      replyTo: "qforwork13@gmail.com",
    });

    if (error) return { ok: false, error: typeof error === "string" ? error : error.message };
    return { ok: true, emailId: data?.id };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Unknown error" };
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] || c));
}
