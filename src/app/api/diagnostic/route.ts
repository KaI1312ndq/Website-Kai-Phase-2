import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const test = url.searchParams.get("test") === "1";

  const w = process.env.WEB3FORMS_KEY;
  const r = process.env.RESEND_API_KEY;
  const c = process.env.CONTACT_EMAIL;

  const result: any = {
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
      w ? "Web3Forms (primary)" : r ? "Resend (fallback)" : "NONE - emails won't be sent",
  };

  // ?test=1 -> actually fire a test submission to Web3Forms
  if (test && w) {
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
          access_key: w,
          subject: "[NĐQ Diagnostic] Test email from /api/diagnostic?test=1",
          from_name: "Diagnostic Test",
          email: c || "qforwork13@gmail.com",
          message: `Sent at ${new Date().toISOString()}. If you see this, Web3Forms is fully wired.`,
          botcheck: "",
        }),
      });
      const text = await res.text();
      let data: any = {};
      try { data = JSON.parse(text); } catch { data = { _raw: text.slice(0, 200) }; }
      result.web3forms_test = {
        http_status: res.status,
        body: data,
        verdict: res.ok && data?.success ? "✅ Sent - check inbox + spam" : `❌ Failed: ${data?.message || `HTTP ${res.status}`}`,
      };
    } catch (e) {
      result.web3forms_test = {
        verdict: "❌ Network error",
        error: e instanceof Error ? e.message : String(e),
      };
    }
  }

  return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
}
