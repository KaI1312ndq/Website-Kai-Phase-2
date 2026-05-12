import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { consumeAIFeedback, getQuotaStatus } from "@/lib/cv/quota";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { CVData, AIFeedback } from "@/lib/cv/types";

/**
 * AI feedback CV.
 *   POST /api/cv/feedback  body: { data: CVData, cvId?: string }
 *
 * Gọi GPT-4o-mini (qua OpenAI compatible API) để feedback.
 * Fallback: nếu OPENAI_API_KEY chưa set, trả về heuristic feedback đơn giản.
 */
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Cần đăng nhập" }, { status: 401 });

  const status = await getQuotaStatus(userId);
  if (status.aiFeedbackRemaining <= 0) {
    return NextResponse.json({
      error: status.isPro ? "Hết lượt AI feedback tháng này (50)" : "Hết lượt AI feedback miễn phí. Upgrade Pro để dùng thêm.",
      needsUpgrade: !status.isPro,
    }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  const data = body?.data as CVData;
  const cvId = body?.cvId as string | undefined;
  if (!data?.personal?.fullName) {
    return NextResponse.json({ error: "Thiếu dữ liệu CV" }, { status: 400 });
  }

  const feedback = await generateFeedback(data);

  // Consume quota
  await consumeAIFeedback(userId);

  // Save vào draft nếu có cvId
  if (cvId) {
    try {
      const sb = getSupabaseAdmin();
      await sb.from("cv_drafts").update({ ai_feedback: feedback }).eq("id", cvId).eq("user_id", userId);
    } catch {}
  }

  return NextResponse.json({ ok: true, feedback });
}

async function generateFeedback(data: CVData): Promise<AIFeedback> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return heuristicFeedback(data);
  }

  const cvText = JSON.stringify(data, null, 2);
  const prompt = `Bạn là expert tuyển dụng Marketing/Ecom tại Việt Nam. Phân tích CV này và trả về JSON:

${cvText}

Trả về JSON theo schema sau (KHÔNG được wrap trong markdown code block):
{
  "atsScore": <số 1-10>,
  "strengths": [<3-5 câu tiếng Việt về điểm mạnh CV này>],
  "weaknesses": [<3-5 câu tiếng Việt về điểm yếu / chỗ cần cải thiện>],
  "suggestions": [
    { "section": "<tên section vd 'Kinh nghiệm tại UpBase'>", "original": "<bullet gốc nếu có>", "tip": "<gợi ý cụ thể để sửa>" }
  ]
}

Tập trung:
- Bullet có metric chưa? (số người, ngân sách, ROAS, kết quả)
- Action verb đầu câu chưa?
- Phù hợp ATS scan không? (keyword match, format chuẩn)
- Skills section đủ thông tin không?

Strict JSON, không text ngoài JSON.`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Bạn là expert tuyển dụng VN. Trả về JSON strict." },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
        response_format: { type: "json_object" },
      }),
    });
    if (!res.ok) {
      console.warn("[cv-feedback] OpenAI error", res.status);
      return heuristicFeedback(data);
    }
    const json = await res.json();
    const content = json?.choices?.[0]?.message?.content || "{}";
    const parsed = JSON.parse(content);
    return {
      atsScore: clamp(Number(parsed.atsScore) || 5, 1, 10),
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 5).map(String) : [],
      weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses.slice(0, 5).map(String) : [],
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions.slice(0, 8) : [],
      generatedAt: new Date().toISOString(),
    };
  } catch (e) {
    console.warn("[cv-feedback] exception", e);
    return heuristicFeedback(data);
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

// Fallback: simple heuristic check khi chưa setup OpenAI
function heuristicFeedback(data: CVData): AIFeedback {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: AIFeedback["suggestions"] = [];

  let score = 5;

  if (data.personal.tagline) {
    strengths.push("Có tagline ngắn ở header - giúp recruiter hiểu ngay role bạn target");
    score += 0.5;
  } else {
    weaknesses.push("Chưa có tagline - nên thêm 1 dòng vd 'Performance Marketer · 3 năm exp · TikTok Ads'");
    suggestions.push({ section: "Personal", tip: "Thêm tagline ngắn dưới tên để recruiter biết bạn target role gì" });
  }

  if (data.summary && data.summary.length > 30) {
    strengths.push("Có summary intro - giúp recruiter hiểu nhanh trong 5s đầu tiên");
    score += 0.5;
  } else {
    weaknesses.push("Thiếu summary 2-3 câu intro mô tả background + skill chính");
  }

  // Check experience bullets
  const totalBullets = data.experience.reduce((s, e) => s + e.bullets.length, 0);
  const bulletsWithMetric = data.experience.flatMap((e) => e.bullets).filter((b) => /\d/.test(b));
  if (totalBullets > 0) {
    const metricRatio = bulletsWithMetric.length / totalBullets;
    if (metricRatio >= 0.7) {
      strengths.push(`${Math.round(metricRatio * 100)}% bullets có số liệu cụ thể - rất tốt cho recruiter`);
      score += 1.5;
    } else if (metricRatio >= 0.4) {
      weaknesses.push(`Chỉ ${Math.round(metricRatio * 100)}% bullets có metric - nên thêm số (ngân sách, ROAS, % tăng)`);
      score += 0.5;
    } else {
      weaknesses.push(`Quá ít bullets có số liệu (${Math.round(metricRatio * 100)}%) - khó thuyết phục recruiter`);
      score -= 1;
    }

    // Find bullets without metrics
    data.experience.forEach((e) => {
      e.bullets.forEach((b) => {
        if (!/\d/.test(b) && b.length > 10) {
          suggestions.push({
            section: `Kinh nghiệm tại ${e.company}`,
            original: b,
            tip: "Thêm số liệu cụ thể: ngân sách, doanh thu, team size, hoặc % tăng trưởng",
          });
        }
      });
    });
  } else {
    weaknesses.push("Chưa có kinh nghiệm nào - thêm internship hoặc project cá nhân");
  }

  // Skills check
  if (data.skills.hard.length >= 5) {
    strengths.push(`Có ${data.skills.hard.length} hard skills cụ thể - dễ keyword match ATS`);
    score += 0.5;
  } else {
    weaknesses.push(`Chỉ có ${data.skills.hard.length} hard skills - nên thêm 5-10 tool/platform bạn biết`);
  }

  if (data.skills.languages.length > 0) {
    score += 0.3;
  }

  // Contact completeness
  if (!data.personal.linkedinUrl) {
    suggestions.push({ section: "Personal", tip: "Thêm LinkedIn URL - 70% recruiter check LinkedIn trước khi gọi" });
  }

  return {
    atsScore: clamp(Math.round(score), 1, 10),
    strengths: strengths.slice(0, 5),
    weaknesses: weaknesses.slice(0, 5),
    suggestions: suggestions.slice(0, 6),
    generatedAt: new Date().toISOString(),
  };
}
