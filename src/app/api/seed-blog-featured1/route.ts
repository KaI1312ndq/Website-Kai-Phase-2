import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

/**
 * Seed featured post 1:
 * "Shopee Mall cán mốc >30% phí sàn - 4 hướng đi cho nhà bán"
 */

function b(key: string, style: "normal" | "h2" | "h3" | "blockquote", text: string, bold?: boolean) {
  return {
    _type: "block", _key: key, style, markDefs: [],
    children: [{ _type: "span", _key: `${key}s`, text, marks: bold ? ["strong"] : [] }],
  };
}

function p(key: string, ps: { text: string; bold?: boolean }[]) {
  return {
    _type: "block", _key: key, style: "normal" as const, markDefs: [],
    children: ps.map((x, i) => ({ _type: "span", _key: `${key}s${i}`, text: x.text, marks: x.bold ? ["strong"] : [] })),
  };
}

const POST = {
  _id: "blog-shopee-mall-vuot-30-phi-san-4-huong-di",
  _type: "post",
  title: "Shopee Mall chính thức vượt 30% phí sàn - 4 hướng đi cho nhà bán trong bối cảnh mới",
  slug: { _type: "slug", current: "shopee-mall-vuot-30-phi-san-4-huong-di" },
  publishedAt: "2026-05-14T07:00:00Z",
  featured: true,
  category: "Unit Economics",
  tags: [
    "shopee mall", "phi san", "phi hoa hong", "unit economics", "p&l",
    "ecom", "tiktok", "contribution margin", "shopee", "chien luoc gia",
  ],
  excerpt: "TikTok Shop tăng phí từ 9/5, Shopee Non-Mall từ 8/5, và Shopee Mall cũng tăng nốt. Mình ngồi tính thử trên 1 sản phẩm 300.000đ - kết quả là lỗ ở cả 3/4 kịch bản. Đây là 4 hướng đi thực tế cho nhà bán.",
  body: [
    b("f1", "normal", "TikTok Shop tăng phí từ 9/5. Shopee Non-Mall từ 8/5. Và 23/5 tới, Shopee Mall cũng tăng nốt."),
    b("f2", "normal", "Mình ngồi build lại một bài tính thử trên 1 sản phẩm giá 300.000đ, COGS 80.000đ, voucher seller 10%, và giữ nguyên mức chi phí marketing như trong hình - kết quả là lỗ ở 3/4 kịch bản. Con số duy nhất có lãi là Shopee Non-Mall với margin 0.5% - tức 1.600đ/đơn."),
    b("f3", "normal", "Cùng 1 sản phẩm, cùng giá bán, cùng chi phí marketing - chỉ khác loại gian hàng thôi mà ra 2 kết quả hoàn toàn khác nhau."),
    b("f4", "blockquote", "Shopee Mall: phí sàn 32% -> lỗ 16.760đ/đơn (-5.6% margin). TikTok Mall: phí sàn 29% -> lỗ 7.580đ/đơn (-2.5% margin)."),
    b("f5", "normal", "Và đây là con số chưa tính thuế, chi phí booking KOL/KOC, sản xuất video, vận hành livestream, hay các rủi ro hàng hoàn trả. Nếu tính hết vào, bức tranh còn khó nhìn hơn nhiều."),
    b("f6", "normal", "Mình hiểu áp lực này đang đè lên vai rất nhiều nhà bán. Nên cũng có tổng hợp một số hướng đi có thể làm trong lúc này."),

    b("f7", "h2", "1. Nhìn bức tranh P&L toàn bộ hệ thống"),
    b("f8", "normal", "Nhiều nhà bán đang tối ưu trong sàn mà quên mất bức tranh lớn hơn."),
    b("f9", "normal", "Nếu margin trên sàn đang bị bào mòn tới mức này, câu hỏi cần đặt ra không phải là 'tối ưu camp thế nào' - mà là kênh nào trong hệ thống của mình đang thực sự có lợi nhuận?"),
    b("f10", "normal", "Website D2C, Fanpage, kênh offline, đại lý - những kênh này không phải chịu phí sàn 32%. Chi phí có thể khác, nhưng margin thường tốt hơn đáng kể nếu vận hành đúng."),
    b("f11", "normal", "Và nếu sản phẩm của bạn không đủ margin để sống khoẻ trên sàn trong bối cảnh phí này - thì đây là lúc cân nhắc dùng sàn như một phễu traffic, thay vì kênh chốt đơn chính. Để sàn làm việc kéo khách hàng mới, xây nhận diện - rồi chuyển hoá họ sang các kênh có chi phí thấp hơn về lâu dài."),

    b("f12", "h2", "2. Chiến lược giá - 4 hướng tuỳ tình trạng brand"),
    b("f13", "normal", "Đây đang là con đường tối ưu nhất cho mọi nhà bán trong bối cảnh hiện tại. Tuỳ vào thực tế của từng brand mà có 4 hướng để cân nhắc:"),
    p("f14", [
      { text: "Giữ giá, giảm voucher/quà 5-10%: ", bold: true },
      { text: "phù hợp nếu brand nhạy cảm về giá hiển thị, không muốn khách thấy giá tăng đột ngột." },
    ]),
    p("f15", [
      { text: "Tăng giá daily, giữ giá camp/KOL: ", bold: true },
      { text: "phù hợp nếu brand vừa có đợt tăng giá trước đó, cần lộ trình từ từ. Có thể tăng dần 5% tháng đầu, 5% quý tiếp theo. Tăng chậm và đo lường hiệu ứng theo từng bước." },
    ]),
    p("f16", [
      { text: "Tăng giá 5% + cắt quà 5%: ", bold: true },
      { text: "hướng mix, phù hợp đa số. Đỡ làm mất khách giai đoạn đầu." },
    ]),
    p("f17", [
      { text: "Tăng giá toàn bộ: ", bold: true },
      { text: "chỉ nên làm nếu brand có vị thế mạnh, ít đối thủ trực tiếp." },
    ]),
    b("f18", "normal", "Một lưu ý nhỏ: đừng tăng quá 10% một lần. Nên chia 2 phase - tháng 5 và tháng 6 - để traffic và conversion kịp thích nghi, tránh bị sụt đột ngột."),

    b("f19", "h2", "3. Tối ưu marketing - không phải cắt đồng đều, mà phân bổ lại"),
    b("f20", "normal", "Cắt ngân sách marketing đồng đều là cách dễ làm nhất nhưng cũng tệ nhất. Thay vào đó nên rà lại từng hạng mục:"),
    b("f21", "h3", "Shopee"),
    p("f22", [
      { text: "Live Affiliate: ", bold: true },
      { text: "đánh giá lại hiệu quả từng tier. Brand dưới 1 tỷ/tháng nên tập trung mục tiêu traffic, không cần ôm Tier 1 chi phí cao." },
    ]),
    p("f23", [
      { text: "Live AI: ", bold: true },
      { text: "phù hợp với brand có kho video sẵn, sản phẩm dễ tư vấn - chi phí thấp hơn live người thật đáng kể. Hiện sàn đã có rule cho phần này và nhiều brand đang thử nghiệm, đây là hướng khả thi nhất để turn on ngay." },
    ]),
    p("f24", [
      { text: "Voucher Co-fund & Xtra: ", bold: true },
      { text: "rà lại tần suất và voucher bị áp - đây là chi phí ẩn cộng dồn rất lớn nếu không theo dõi sát." },
    ]),
    p("f25", [
      { text: "Ads: ", bold: true },
      { text: "follow từng khung giờ với các mốc ngân sách nhỏ. Sự cần cù và kỷ luật theo dõi sẽ bù được phần nào phí tăng." },
    ]),
    b("f26", "h3", "TikTok Shop"),
    p("f27", [
      { text: "Booking KOL: ", bold: true },
      { text: "chuyển từ dàn trải nhiều KL sang tập trung KL hiệu quả + mở rộng TAP/Freecast để tăng độ phủ với chi phí thấp hơn." },
    ]),
    p("f28", [
      { text: "Commission KOC: ", bold: true },
      { text: "âm thầm nhưng cộng dồn rất lớn, nên review lại định kỳ. Hạn chế hoa hồng quảng cáo xuông 1-4% - tập trung vào ra đơn tự nhiên từ KOC và không tính vào quảng cáo." },
    ]),
    p("f29", [
      { text: "Ads: ", bold: true },
      { text: "ưu tiên sản phẩm có lượng video >300/tháng và mở rộng video bằng mọi cách. Tương tự Shopee - cần cù theo dõi theo khung giờ." },
    ]),

    b("f30", "h2", "4. Đẩy combo - đòn tăng margin mà không cần tăng giá"),
    b("f31", "normal", "Khi phí sàn tính theo % GMV, một trong những cách hiệu quả nhất để cải thiện lợi nhuận mà không ảnh hưởng đến giá hiển thị là tăng AOV."),
    b("f32", "normal", "Combo/Bundle có mức chiết khấu thấp hơn SKU lẻ, nhưng vẫn hấp dẫn khách vì cảm giác 'được nhiều hơn'. Và quan trọng hơn - cùng 1 đơn hàng nhưng giá trị cao hơn, chi phí cố định chia đều ra thì margin tốt hơn rõ rệt."),
    b("f33", "normal", "Dễ nhất là bundle hợp lý mọi sản phẩm trong shop, tăng giá SKU lẻ và giảm giá combo về mức giá cũ. Khách có cảm giác hời hơn, AOV nâng cao tối ưu được các chi phí trên 1 đơn hàng."),

    b("f34", "h2", "Kết lại"),
    b("f35", "normal", "Không ai muốn phí sàn tăng cả. Tuy nhiên, nhìn ở phía khác - đây cũng là tín hiệu tích cực: thanh lọc các sản phẩm kém chất lượng và đẩy sân chơi cho những nhà bán thật sự hiểu và làm chủ business của mình."),
    b("f36", "normal", "Ai đủ năng lực và chơi được thì vẫn sẽ growth khi người khác dần bỏ đi."),
    b("f37", "normal", "Brand nào hiểu P&L thực, phân bổ lại chi phí đúng chỗ và có đòn tăng AOV - sẽ đi qua giai đoạn này ổn hơn nhiều so với những ai đang chờ sàn có một phép màu nào đó."),
    b("f38", "normal", "Mà phép màu thì không có đâu. Mình cùng thích nghi thôi."),
  ],
};

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    token: process.env.SANITY_API_WRITE_TOKEN,
    apiVersion: "2024-01-01",
    useCdn: false,
  });

  try {
    const doc = await client.createOrReplace(POST as any);
    return NextResponse.json({ success: true, id: doc._id, status: "created" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
