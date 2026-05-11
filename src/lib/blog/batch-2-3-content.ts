/**
 * Batch 2 + 3 full content — 20 bài blog 1500-2000 từ, tables + Unsplash images + FAQ + cluster links.
 * Override DRAFT_POSTS có cùng ID. Seed-blog-bulk filter DRAFT_POSTS để skip 20 ID này.
 */

import type { DraftPost } from "./groups-bcdef-drafts";

function post(opts: {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt?: string;
  readTime?: number;
  seoTitle?: string;
  seoDescription?: string;
  content: string;
}): DraftPost {
  return {
    id: opts.id,
    title: opts.title,
    slug: opts.slug,
    excerpt: opts.excerpt,
    category: opts.category,
    readTime: opts.readTime ?? 8,
    publishedAt: opts.publishedAt ?? new Date(2026, 4, 11, 10, 0).toISOString(),
    featured: false,
    seoTitle: opts.seoTitle ?? opts.title,
    seoDescription: opts.seoDescription ?? opts.excerpt,
    content: opts.content,
  };
}

const B15 = post({
  id: "blog-B15-test-ads-a-b-test-khong-ton-ngan-sach",
  title: "Test ads đúng cách - A/B test mà không tốn ngân sách",
  slug: "test-ads-a-b-test-khong-ton-ngan-sach",
  excerpt: "Cấu trúc A/B test ads chuẩn: 1 biến tại 1 lúc, ngân sách tối thiểu để có ý nghĩa thống kê, ngưỡng impression đủ kết luận, time window 3-7-14 ngày. Khung 5 test/tháng cho shop ecom Việt.",
  category: "performance",
  seoTitle: "Test ads A/B đúng cách 2026 - không tốn ngân sách",
  seoDescription: "Hướng dẫn A/B test ads ecom 2026: ngân sách tối thiểu, ngưỡng impression, time window, document kết quả. Khung 5 test/tháng giúp shop tiết kiệm 30% ngân sách thử nghiệm.",
  content: `
![A/B test ads ecom](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80)

Phần lớn seller test ads kiểu "đoán" - đổi 3-4 thứ cùng lúc rồi nhìn doanh thu hôm đó để quyết định. Đó không phải test, đó là gambling. Và đó là lý do 60-70% ngân sách test bị lãng phí.

Sau 60+ project, tôi rút ra một sự thật khá phũ: **shop nào có quy trình test bài bản thì sau 6 tháng ROAS cao hơn shop test "free-style" ít nhất 25-40%**. Lý do không phải vì họ giỏi hơn, mà vì họ tích luỹ được "knowledge base" về cái gì work với buyer của mình.

Bài này tóm tắt khung test ads ecom mà tôi đang dùng cho client - không cần ngân sách lớn, chỉ cần kỷ luật.

## Tại sao đa số seller test sai

Có 4 lỗi phổ biến tôi gặp gần như mỗi tuần:

1. **Test nhiều biến cùng lúc** - đổi hình + caption + target + giờ chạy. Khi có kết quả không biết biến nào tạo ra khác biệt.
2. **Ngân sách quá thấp** - test 200k/ngày trong 2 ngày rồi kết luận. Data không đủ ý nghĩa thống kê.
3. **Time window quá ngắn** - dừng test sau 24h vì "thấy không ra đơn". Algorithm chưa đủ thời gian learning.
4. **Không document** - test xong không ghi lại, 2 tháng sau lặp lại y chang.

Tổng hợp 4 lỗi này = lãng phí trung bình 30% ngân sách test mỗi tháng.

## Nguyên tắc 1 biến tại 1 lúc

Đây là nguyên tắc gốc của A/B test khoa học. Nếu test 2 hình ảnh khác nhau với 2 caption khác nhau, kết quả khác biệt không thể attribute cho biến nào.

**Quy tắc:** Trong 1 test, chỉ thay đổi đúng 1 element. Mọi thứ khác giữ nguyên 100%.

Ngoại lệ duy nhất là khi 2 biến **bị ràng buộc logic** (vd: đổi sản phẩm thì caption phải đổi theo). Khi đó test "combo" và document rõ.

## Ngân sách tối thiểu cho test có ý nghĩa

Để có dữ liệu đủ kết luận, cần đạt ngưỡng impression nhất định. Đây là benchmark tôi dùng:

| Loại test | Impression tối thiểu | Ngân sách ước tính (CPM 60k) | Time window |
|-----------|---------------------|------------------------------|-------------|
| Creative (hook/hình) | 10.000 | 600k-900k | 3 ngày |
| Caption / Copy | 15.000 | 900k-1.2M | 3-5 ngày |
| Target audience | 20.000 | 1.2-1.8M | 5-7 ngày |
| Landing page | 30.000 click | 2-3M | 7-14 ngày |
| Pricing / Voucher | 50.000 impression | 3-5M | 7-14 ngày |

Với shop GMV 100-300tr/tháng, ngân sách test 5-7% tổng ngân sách ads là hợp lý. Shop trên 1 tỷ GMV có thể đẩy lên 10-15%.

## Ngưỡng kết luận

Khi nào tuyên bố "variant A thắng B"? Đây là 3 ngưỡng tối thiểu:

- **Impression đạt mức bảng trên** với cả 2 variant
- **Chênh lệch CTR / CVR ≥ 20%** giữa 2 variant
- **Chênh lệch duy trì ít nhất 3 ngày liên tục**, không phải spike 1 ngày

Nếu chênh lệch dưới 20% sau khi đạt impression target, kết luận là "không khác biệt đáng kể" - không nên đổi creative chỉ vì variant A nhỉnh hơn 5%.

![A/B test framework](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80)

## Test elements ưu tiên

Không phải biến nào cũng đáng test. Thứ tự ROI giảm dần:

1. **Hook 3 giây đầu (video) / Visual chính (image)** - tác động CTR mạnh nhất, ROI test cao nhất
2. **Offer / Voucher mix** - tác động CVR
3. **Target audience interest** - tác động cả CPM lẫn CVR
4. **Caption / Copy** - tác động CTR vừa
5. **Giờ chạy / Day-part** - tác động ngân sách phân bổ
6. **Landing page elements** - tác động CVR, khó test với ads platform

Khi vào quy trình test mới, bắt đầu từ #1. Đừng test caption khi chưa biết hook nào win.

## Khung 5 test/tháng

Sample plan cho shop GMV 200tr với ngân sách test 12tr/tháng:

| Tuần | Test | Variant A | Variant B | Ngân sách |
|------|------|-----------|-----------|-----------|
| 1 | Hook video | Hook "pain point" | Hook "result" | 2M |
| 1-2 | Hình chính ads | Hình lifestyle | Hình close-up sản phẩm | 2M |
| 2 | Voucher mix | 10% off | Freeship + 5% off | 2.5M |
| 3 | Audience | Interest "Beauty" | Lookalike 1% buyer | 2.5M |
| 4 | CTA | "Mua ngay" | "Săn deal hôm nay" | 1.5M |

Mỗi test chạy song song với always-on campaign (không thay thế). Winner integrate vào always-on tuần sau.

## Document kết quả thành knowledge base

Sau mỗi test, ghi vào file (Notion / Sheet) với 5 cột:

1. **Ngày test** - tháng/năm
2. **Biến** - cái gì thay đổi
3. **Variant winner** - A hay B, hay không kết luận
4. **% improvement** - cụ thể số %
5. **Hypothesis lý do thắng** - giải thích tại sao

Sau 6 tháng có 30 test, đây là "moat" của shop. Khi onboard ads runner mới, đưa file này thay vì training lại từ đầu.

## FAQ

**Hỏi: Test 2 ad set giống hệt, kết quả khác nhau - bình thường không?**
Trả lời: Bình thường. Algorithm random phân phối khác nhau. Đó là lý do cần ngưỡng impression cao và chênh lệch ≥20% mới kết luận. Variance tự nhiên có thể 10-15%.

**Hỏi: Có nên test với ngân sách lớn để rút kết luận nhanh?**
Trả lời: Không. Ngân sách lớn không rút ngắn được thời gian algorithm learning (3-5 ngày). Test với ngân sách quá lớn chỉ làm tăng cost variance. Stick với benchmark bảng trên.

**Hỏi: Sau bao lâu nên test lại creative cũ?**
Trả lời: 3-6 tháng. Vì target audience thay đổi (mới vào, cũ ra), seasonality, và competitor landscape thay đổi. Creative win Q1 có thể không win Q3.

**Hỏi: Test pricing có an toàn không?**
Trả lời: Có nhưng cần cẩn thận. Test 2 mức giá nhưng đừng cho buyer thấy chênh lệch quá rõ. Tốt nhất là test 2 voucher mix khác nhau thay vì test giá niêm yết. Nếu test giá thực, làm trong 2-3 ngày short window.

---

**Tools liên quan:**
- [ROAS Calculator](/tools/roas-calculator) - tính break-even và target ROAS để biết test có hiệu quả không
- [Mẫu P&L Ecom](/tools/pnl-ecom) - check profit/đơn của variant thắng

**Đọc tiếp:**
- [Đừng chỉ nhìn CPC - 5 chỉ số quan trọng hơn](/blog/khong-chi-nhin-cpc-5-chi-so-ads-quan-trong-hon)
- [Ads không ra đơn - Checklist 7 bước chẩn đoán](/blog/ads-khong-ra-don-checklist-7-buoc)
- [Khi nào tăng, khi nào giảm ROAS target](/blog/khi-nao-tang-roas-khi-nao-giam)
- [Quy tắc 3-7-3 - Ít chỉnh ads vẫn giữ phong độ](/blog/it-chinh-ads-quy-tac-3-7-3)
`,
});

const B16 = post({
  id: "blog-B16-tu-duy-moi-ve-cpm-cao-la-tot",
  title: "Tư duy mới về CPM - Khi nào CPM cao lại là tốt?",
  slug: "tu-duy-moi-ve-cpm-cao-la-tot",
  excerpt: "CPM cao bị hiểu nhầm là 'xấu' nhưng thực tế phản ánh target chất lượng. So sánh CPM của 3 loại campaign Awareness vs Consideration vs Conversion, và benchmark CPM theo ngành 2026.",
  category: "performance",
  seoTitle: "CPM cao là tốt hay xấu? Tư duy mới 2026 cho seller TMĐT",
  seoDescription: "Hướng dẫn đọc CPM ads ecom 2026: khi nào CPM cao là dấu hiệu tốt, benchmark theo ngành, công thức kết hợp CPM với CVR và profit/đơn để ra quyết định scaling chính xác.",
  content: `
![CPM ads ecom](https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1600&q=80)

"CPM của em tăng 40% rồi anh ơi, làm sao?" - đây là câu tôi nghe ít nhất 3 lần/tuần từ client. Và câu trả lời gần như luôn là: **CPM tăng có thể là dấu hiệu tốt, đừng panic**.

CPM là một trong những chỉ số bị hiểu lầm nhất trong ads ecom. Thấp = tốt, cao = xấu - đó là tư duy quá đơn giản. Bài này giải thích góc nhìn ngược: tại sao CPM cao thường là dấu hiệu của một campaign đang đi đúng hướng.

## CPM là gì và bị hiểu sai như nào

CPM = Cost Per Mille = chi phí cho 1.000 lần hiển thị. Số càng thấp = càng nhiều người thấy ads với cùng ngân sách. Logic đơn giản: CPM thấp = tốt.

Nhưng logic này bỏ qua một sự thật: **không phải 1.000 lượt hiển thị nào cũng giá trị như nhau**. CPM thấp cho 1.000 buyer không liên quan = vô giá trị. CPM cao cho 1.000 buyer đang sẵn sàng mua = vàng.

CPM thực ra phản ánh **mức độ cạnh tranh để show ads cho 1 phân khúc cụ thể**. Phân khúc càng giá trị (intent cao, mua mạnh), CPM càng cao.

## CPM của 3 loại campaign

Đây là benchmark CPM trung bình 2026 theo loại campaign trên Shopee/TikTok Shop:

| Loại campaign | CPM trung bình | Ý nghĩa |
|---------------|----------------|---------|
| Awareness (top funnel) | 30-50k | Phân khúc rộng, intent thấp |
| Consideration (mid funnel) | 50-90k | Đã quan tâm category |
| Conversion (bottom funnel) | 80-150k | Intent cao, sẵn sàng mua |
| Retargeting cart abandon | 120-200k | Đã ATC, gần như sẽ mua |
| Retargeting buyer | 100-180k | Đã mua, target cross-sell |

Nhìn bảng này có thể thấy: **CPM cao 3-4 lần ở retargeting là chuyện bình thường, thậm chí phải vui**. Vì target đó có CVR cao hơn 5-8 lần phân khúc rộng.

## CPM cao + CTR cao = quality target

Combination quan trọng nhất khi đọc CPM là kết hợp với CTR và CVR.

**Scenario 1 - CPM cao + CTR cao + CVR cao:** Đây là campaign vàng. Target đúng buyer, content match. Scale ngân sách.

**Scenario 2 - CPM thấp + CTR thấp + CVR thấp:** Đây mới là alarm. Algorithm "throw away" ads cho cheap impression. Audience không liên quan. Cần re-target.

**Scenario 3 - CPM thấp + CTR cao + CVR thấp:** Hook hay nhưng landing/giá không match. Fix landing trước khi đụng ads.

**Scenario 4 - CPM cao + CTR thấp:** Đang trả tiền premium nhưng creative không hấp dẫn audience đó. Fix creative.

![Funnel ads](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80)

## Khi CPM thấp + CTR thấp = traffic rác

Đây là pattern nguy hiểm nhất tôi gặp. Seller mới hay vào ads platform thấy "CPM rẻ" thì hứng khởi, set ngân sách lớn. Sau 5-7 ngày impression cao ngất ngưởng nhưng đơn 0.

Lý do: thuật toán đang spend ngân sách cho phân khúc cheap nhất (vd: video viewer 1 giây, scrolling không chủ đích). Reach lớn nhưng không phải buyer.

Cách fix: **đặt mục tiêu campaign là Purchase / Conversion, không phải Reach hay Engagement**. Khi đó algorithm sẽ chấp nhận CPM cao hơn để target đúng intent.

## Benchmark CPM theo ngành 2026

Đây là CPM trung bình cho campaign conversion theo ngành (target phụ nữ HCM/HN 22-35):

| Ngành | CPM trung bình | Range |
|-------|----------------|-------|
| Beauty Skincare | 95k | 70-130k |
| Fashion Nữ | 75k | 50-110k |
| Mother & Baby | 110k | 80-150k |
| Home & Living | 65k | 45-90k |
| F&B Snack | 55k | 40-80k |
| Electronics | 85k | 60-120k |
| Sports / Fitness | 70k | 50-100k |

Ngành nào CPM thấp hơn benchmark = audience chưa đủ relevant. Cao hơn = đang cạnh tranh prime audience.

## Khi nào chấp nhận CPM cao để target chất lượng

Quy tắc đơn giản: **đo CPO thay vì CPM**. Nếu campaign CPM cao nhưng CPO trong ngưỡng, vẫn là campaign tốt.

Công thức: CPO = CPM / (CTR × CVR × 1000)

Ví dụ:
- Campaign A: CPM 50k, CTR 1%, CVR 2% -> CPO = 250k
- Campaign B: CPM 120k, CTR 3%, CVR 4% -> CPO = 100k

Campaign B đắt gấp 2.4 lần về CPM nhưng CPO thấp hơn 2.5 lần. Là campaign tốt hơn.

## Strategy bidding theo CPM target

Khi cài bid trên ads platform, có 3 chiến lược:

1. **Auto bid** - để algorithm tự tối ưu, CPM dao động mạnh. Phù hợp campaign mới.
2. **Cost cap CPM** - set ngưỡng CPM max. Phù hợp khi đã hiểu audience.
3. **Target ROAS / CPA** - không quan tâm CPM, chỉ quan tâm output. Phù hợp khi đã tracking đầy đủ.

Lời khuyên: 70% campaign nên dùng Auto Bid hoặc Target ROAS. Cost cap chỉ dùng khi rõ ràng audience giá trị nhưng cần kiểm soát chi phí.

## FAQ

**Hỏi: CPM tăng đột biến 50% trong 1 ngày - chuyện gì?**
Trả lời: 3 nguyên nhân chính: (1) Competitor lớn bid mạnh vào audience của bạn, (2) Algorithm refresh learning, (3) Sàn thay đổi format quảng cáo. Đợi 3-5 ngày xem có ổn định không trước khi đụng campaign.

**Hỏi: Có nên target CPM thấp bằng cách mở rộng audience không?**
Trả lời: Tùy mục tiêu. Mở rộng audience làm CPM thấp nhưng CVR giảm theo. Chỉ làm khi đang ở stage scale và đã có baseline CPO ổn định.

**Hỏi: CPM mùa sale (11.11) tăng 2-3 lần có normal không?**
Trả lời: Có. Mùa sale tất cả seller đẩy ngân sách, đấu giá impression tăng. Lúc đó tăng CPO ceiling 20-30% là hợp lý, đừng cố pull về CPM bình thường.

**Hỏi: CPM TikTok thường cao hơn Shopee Ads, đúng không?**
Trả lời: Tùy ngành. TikTok Shop CPM video format thường 60-90k, Shopee CPC ads quy đổi ra CPM khoảng 50-80k. Nhưng TikTok CTR thường cao hơn 2-3 lần nên CPC cuối cùng comparable.

---

**Tools liên quan:**
- [ROAS Calculator](/tools/roas-calculator) - quy đổi CPM, CTR, CVR ra CPO và check break-even
- [Tool tính phí sàn](/tools/tinh-phi-san) - tính phí thực để biết CPO max acceptable

**Đọc tiếp:**
- [Đừng chỉ nhìn CPC - 5 chỉ số quan trọng hơn](/blog/khong-chi-nhin-cpc-5-chi-so-ads-quan-trong-hon)
- [Đặt ngưỡng CPO theo biên lợi nhuận](/blog/dat-nguong-cpo-theo-bien-loi-nhuan)
- [Đọc dữ liệu ads khi chưa có đơn - Đừng dừng quá sớm](/blog/doc-data-ads-khi-chua-co-don-dung-dung-som)
- [Test ads đúng cách](/blog/test-ads-a-b-test-khong-ton-ngan-sach)
`,
});

const B17 = post({
  id: "blog-B17-scale-ads-tang-ngan-sach-khong-mat-roas",
  title: "Scale ads đúng cách - Tăng ngân sách x2 mà không mất ROAS",
  slug: "scale-ads-tang-ngan-sach-khong-mat-roas",
  excerpt: "4 cách scale an toàn: tăng % nhỏ theo campaign, duplicate winning, scale theo giờ vàng, audience expansion. Plan 90 ngày để x2 ngân sách mà giữ ROAS từ kinh nghiệm 60+ project.",
  category: "performance",
  seoTitle: "Scale ads ecom x2 mà không mất ROAS - hướng dẫn 2026",
  seoDescription: "4 phương pháp scale ads ecom an toàn 2026: scale % nhỏ, duplicate, scale giờ vàng, audience expansion. Plan 90 ngày tăng ngân sách x2 mà giữ ROAS từ portfolio 60+ shop.",
  content: `
![Scale ads ecom](https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80)

"Em vừa tăng ngân sách campaign từ 5tr lên 15tr, ROAS rớt từ 7 xuống 3.2, làm sao bây giờ?" - tin nhắn này tôi nhận ít nhất 1 lần/tuần. Và câu chuyện luôn giống nhau: scale quá nhanh, algorithm phải re-learn, ROAS rớt 30-50%.

Scale ads không phải "tăng số" trên ad manager. Đó là chiến lược 90 ngày với checkpoint rõ ràng. Bài này tóm tắt 4 phương pháp scale tôi dùng cho client - từ shop GMV 100tr lên 500tr trong 6 tháng mà ROAS chỉ giảm 10-15%.

## Tại sao scale làm ROAS giảm

Có 3 nguyên nhân kỹ thuật:

1. **Algorithm cần re-learn** - khi ngân sách thay đổi đột biến (>30%), Facebook/TikTok/Shopee algorithm reset partial learning phase. Cần 3-7 ngày để stable lại.
2. **Audience saturation** - target audience hữu hạn. Khi spend gấp đôi nhưng audience không tăng tương ứng, frequency tăng, CPM tăng, CVR giảm.
3. **Diminishing returns** - 1tr đầu reach buyer intent cao. 1tr tiếp theo reach buyer intent thấp hơn. CVR giảm dần theo ngân sách.

Hiểu 3 nguyên nhân này thì 4 phương pháp dưới đây sẽ make sense.

## Nguyên tắc 'Algorithm need time to relearn'

Khi tăng ngân sách campaign quá 30% trong 1 lần, algorithm coi như "campaign mới" và reset learning. Quy tắc đã được test trên cả Shopee Ads, TikTok Shop và Meta:

- Tăng <15%: algorithm coi như "fluctuation", không reset
- Tăng 15-30%: micro-relearn, 1-3 ngày stable
- Tăng >30%: full relearn, 5-7 ngày ROAS giảm
- Tăng >100%: full relearn + risk audience drift

Phương pháp 1 dưới đây tận dụng quy tắc này.

## Phương pháp 1: Scale % nhỏ liên tục

Cách dùng: tăng ngân sách 15-25% mỗi 3-4 ngày, không bao giờ vượt 30% trong 1 nhịp.

Example timeline scale từ 5tr/ngày lên 15tr/ngày (x3):

| Tuần | Ngày | Ngân sách/ngày | % tăng | Note |
|------|------|----------------|--------|------|
| 1 | Day 1 | 5M | baseline | - |
| 1 | Day 4 | 6.2M | +24% | monitor 3 ngày |
| 1 | Day 7 | 7.5M | +21% | ROAS ổn |
| 2 | Day 10 | 9M | +20% | - |
| 2 | Day 14 | 10.8M | +20% | - |
| 3 | Day 17 | 13M | +20% | - |
| 3 | Day 21 | 15M | +15% | đạt target |

Tổng 3 tuần để x3. Tốc độ chậm nhưng ROAS giữ trong khoảng -10% so với baseline.

## Phương pháp 2: Duplicate winning campaign

Thay vì tăng ngân sách 1 campaign, **clone campaign winning sang ad set mới** với audience tương tự nhưng không trùng.

Lợi ích:
- 2 campaign cùng tận dụng creative win
- Audience không saturation
- Nếu 1 campaign hỏng, campaign kia vẫn chạy

Cách làm:
1. Identify campaign ROAS >5 trong 14 ngày
2. Clone với target audience giống nhưng exclude buyer cũ
3. Set ngân sách bằng 50-70% campaign gốc
4. Monitor 7 ngày, nếu ROAS đạt 80% gốc -> scale tiếp

Phương pháp này phù hợp shop có ngân sách 200tr+/tháng. Shop nhỏ hơn sẽ split audience quá nhỏ, không hiệu quả.

![Scale strategy](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80)

## Phương pháp 3: Scale theo giờ vàng (peak hour)

Sau 14 ngày data ổn định, audit performance theo giờ. Pattern thường thấy:

| Khung giờ | Share ngân sách | Share đơn | ROAS |
|-----------|-----------------|-----------|------|
| 6-10h sáng | 15% | 18% | x1.2 |
| 10-14h trưa | 20% | 15% | x0.75 |
| 14-18h chiều | 18% | 12% | x0.67 |
| 18-22h tối | 32% | 42% | x1.31 |
| 22-6h đêm | 15% | 13% | x0.87 |

Hành động: tăng bid 20-30% trong khung 18-22h tối (peak ROAS), giảm 15% trong khung 14-18h (lowest ROAS). Tổng spend không tăng nhưng tổng đơn tăng 10-15%.

Cách làm trên Shopee Ads: dùng "Bid by Time" feature. TikTok Shop: tạo schedule riêng cho golden hour.

## Phương pháp 4: Audience expansion

Khi đã scale hết audience hiện tại, mở rộng theo 3 hướng:

1. **Lookalike từ buyer cao giá trị** - export top 10% buyer (theo AOV hoặc LTV), build lookalike 1-3%
2. **Interest expansion** - thêm interest liên quan (vd: Beauty -> +Skincare, Wellness)
3. **Geo expansion** - thêm tỉnh khác (HCM/HN -> Đà Nẵng, Cần Thơ)

Audience expansion an toàn nhất là Lookalike 1% buyer. CPM thường cao hơn nhưng CVR tương đương buyer cũ.

## Khi nào pull back

Đôi khi market saturated, không thể scale tiếp mà không lỗ. Dấu hiệu:

- CPM tăng >40% sau scale, không phục hồi sau 7 ngày
- CPO vượt CPO max (break-even), kéo dài 5+ ngày
- Frequency >5 trên cùng audience -> creative fatigue

Khi gặp 1 trong 3 dấu hiệu trên: pull ngân sách về mức trước scale, đầu tư vào creative mới hoặc audience mới trước khi scale tiếp.

## Plan scale 90 ngày

Template cho shop GMV 200tr muốn lên 500tr:

| Tháng | Hành động | Ngân sách target | Risk |
|-------|-----------|------------------|------|
| Tháng 1 | Scale % nhỏ phương pháp 1 | 200 -> 280tr | Low |
| Tháng 2 | Add duplicate + audience expansion | 280 -> 400tr | Medium |
| Tháng 3 | Optimize golden hour + retargeting | 400 -> 500tr | Low |

Checkpoint cuối mỗi tháng: ROAS, CPO, CM%. Nếu CM giảm >3 điểm % -> pause scale, fix unit economics trước.

## FAQ

**Hỏi: Scale 50% trong 1 lần có sao không nếu ngân sách nhỏ?**
Trả lời: Vẫn risk. Quy tắc 30% áp dụng % chứ không tuyệt đối. Shop 1tr/ngày tăng lên 1.5tr cũng trigger relearn.

**Hỏi: Có nên scale khi đang mùa thấp điểm không?**
Trả lời: Không. Scale khi sức mua thị trường giảm = double down lỗ. Đợi mùa peak hoặc launch SKU mới.

**Hỏi: Scale theo giờ vàng có ổn định không?**
Trả lời: Pattern golden hour thay đổi theo mùa và thói quen buyer. Re-audit mỗi 2-3 tháng.

**Hỏi: Khi scale, ROAS bao nhiêu là acceptable so với baseline?**
Trả lời: Drop 10-15% là healthy. Drop >25% có vấn đề. Drop >40% phải pull back ngay.

---

**Tools liên quan:**
- [ROAS Calculator](/tools/roas-calculator) - check break-even khi scale
- [Mẫu P&L Ecom](/tools/pnl-ecom) - track CM% trong quá trình scale

**Đọc tiếp:**
- [Scale x3 nhưng giảm ROAS target - tại sao đúng](/blog/scale-x3-giam-roas-target-tai-sao-dung)
- [Quy tắc 3-7-3 - ít chỉnh ads](/blog/it-chinh-ads-quy-tac-3-7-3)
- [Phân bổ ngân sách 70-20-10](/blog/phan-bo-ngan-sach-tranh-cpo-dot-bien)
- [Test ads đúng cách](/blog/test-ads-a-b-test-khong-ton-ngan-sach)
`,
});

const B20 = post({
  id: "blog-B20-doc-data-ads-khi-chua-co-don-dung-dung-som",
  title: "Đọc dữ liệu ads khi chưa có đơn - Đừng dừng quá sớm",
  slug: "doc-data-ads-khi-chua-co-don-dung-dung-som",
  excerpt: "4 leading indicator phải đạt trước khi kết luận campaign fail: CTR, CPM, View Content, ATC rate. Ngưỡng tối thiểu 1.000 reach + 7 ngày trước khi quyết định.",
  category: "performance",
  seoTitle: "Ads chưa có đơn - đừng dừng sớm, 4 chỉ số phải xem 2026",
  seoDescription: "Hướng dẫn đọc data ads khi chưa ra đơn: 4 leading indicator (CTR, CPM, VC, ATC), ngưỡng 1.000 reach và 7 ngày trước khi kết luận. Tránh dừng quá sớm lãng phí learning data.",
  content: `
![Ads data analysis](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80)

"Em chạy ads 2 ngày chưa ra đơn nào, tắt campaign luôn anh nhỉ?" - 80% trường hợp tôi sẽ trả lời "**Đừng tắt vội**". Vì 2 ngày là quá ngắn để kết luận, và lãng phí cả ngân sách lẫn learning data đã tích luỹ.

Bài này hướng dẫn cách đọc 4 leading indicator (chỉ số đi trước doanh thu) để phán đoán campaign có potential hay không, kể cả khi chưa có đơn đầu tiên.

## Sai lầm 'dừng ads ngay khi chưa có đơn'

Hậu quả khi tắt campaign quá sớm:

1. **Mất learning data** - algorithm đã thu thập 1-3 ngày data về audience. Tắt = vứt đi.
2. **Cycle lặp lại** - launch campaign mới, lại reset learning, lại 3 ngày không đơn, lại tắt. Mỗi cycle tốn 500k-2M.
3. **Tự ám thị "ads không hiệu quả"** - founder mất confidence, cắt ngân sách.

Sau 60+ project, tôi quan sát: **70% campaign ecom ra đơn đầu tiên sau 24-72h, 95% sau 5-7 ngày**. Tắt trước 5 ngày = đoán mò.

## Funnel buyer cần thời gian

Buyer ecom Việt Nam trung bình mất **5-14 ngày** từ lần đầu thấy ads đến lúc mua. Đặc biệt nhóm sản phẩm AOV >300k.

Pattern thường thấy:

| Day | Hành vi |
|-----|---------|
| Day 1-2 | Thấy ads lướt qua, lưu vô tiềm thức |
| Day 3-5 | Thấy lại ads, click xem chi tiết, lưu wishlist |
| Day 6-9 | Compare với shop khác, đọc review |
| Day 10-14 | Quyết định, đặt hàng |

Nếu tắt campaign Day 3, buyer Day 10-14 sẽ không thấy lại ads -> không mua. Toàn bộ effort Day 1-2 lãng phí.

## Ngưỡng tối thiểu trước khi kết luận

Đây là benchmark từ portfolio:

- **Reach tối thiểu: 1.000-2.000 unique** trước khi đánh giá
- **Thời gian tối thiểu: 5-7 ngày** cho campaign conversion
- **Chi tiêu tối thiểu: 1-3M** tuỳ ngành

Dưới các ngưỡng này, mọi "kết luận" đều là gambling. Dữ liệu không có ý nghĩa thống kê.

![Data thresholds](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80)

## 4 leading indicator phải xem

Khi chưa có đơn, xem 4 chỉ số này để biết campaign có "tia hy vọng" hay không:

### 1. CTR (Click-Through Rate)

- CTR <0.5% sau 1.000 reach: creative kém, hook không hấp dẫn -> fix
- CTR 0.5-1%: average, đợi thêm data
- CTR 1-2%: healthy, campaign có potential
- CTR >2%: excellent, gần như chắc chắn sẽ ra đơn

### 2. CPM

- CPM thấp + CTR thấp: traffic rác, không phải buyer thật
- CPM benchmark ngành + CTR ổn: đang target đúng audience, đợi
- CPM cao bất thường (>2x benchmark): audience saturation hoặc bid setup sai

### 3. View Content rate (VC)

VC = % buyer click vào listing sau khi thấy ads.

- VC <30% sau click: listing không match expectation từ ads -> mismatch
- VC 30-50%: average
- VC >50%: ads và listing match nhau, healthy funnel

### 4. ATC rate (Add To Cart)

ATC = % buyer add cart từ buyer view content.

- ATC <2%: listing yếu, giá / review / hình kém
- ATC 2-5%: average
- ATC >5%: buyer sẵn sàng mua, chỉ thiếu trigger cuối (voucher, freeship)

## Khung kết luận

Đây là decision tree khi chưa có đơn sau 5-7 ngày:

| Tín hiệu | Hành động |
|----------|-----------|
| CTR >1% + ATC >3% | Đợi tiếp 3-5 ngày, campaign sắp ra đơn |
| CTR >1% + ATC <2% | Fix landing/giá, giữ ads |
| CTR 0.5-1% + ATC >3% | Fix creative ads, giữ landing |
| CTR <0.5% + ATC <2% | Kill campaign, rebuild |
| CTR <0.5% + CPM cao | Audience targeting sai, kill |

## Cách tăng tốc data collection

Nếu muốn rút ngắn thời gian học, có 3 cách:

1. **Tăng ngân sách 1.5-2x trong 3 ngày đầu** (sau đó về normal) - giúp algorithm có data nhanh hơn
2. **Conversion event broader** - dùng "Add To Cart" làm event optimization thay vì "Purchase" trong 7 ngày đầu, sau đó switch
3. **Audience smaller** - target 50.000-200.000 reach, không phải 1-5tr. Algorithm converge nhanh hơn

## Pattern 'chậm bùng' vs 'không có cơ hội'

Sau 7 ngày, phân biệt 2 nhóm:

**Campaign chậm bùng (có potential):**
- CTR trend tăng dần (Day 1: 0.6% -> Day 7: 1.4%)
- CVR trend tăng (Day 1: 0% -> Day 7: 1.2%)
- VC rate >40%
- ATC rate >2%

**Campaign không có cơ hội (kill):**
- CTR flat hoặc giảm sau 7 ngày
- ATC <1% suốt
- VC <25%
- CPM cao gấp 2x benchmark, không cải thiện

## FAQ

**Hỏi: Ngân sách thấp (300k/ngày), bao giờ kết luận được?**
Trả lời: 10-14 ngày thay vì 5-7. Vì reach tích luỹ chậm hơn. Hoặc tăng ngân sách lên 700k-1M trong 5 ngày đầu để có data sớm.

**Hỏi: 7 ngày không đơn, tất cả chỉ số xanh - có nên kiên trì tiếp?**
Trả lời: Có, đợi thêm 3-5 ngày. Nhưng phải có lý do tin tưởng: hoặc benchmark CTR healthy, hoặc đã có ATC tích luỹ, hoặc đang waiting buyer journey hoàn thành.

**Hỏi: Tắt ads vài giờ rồi mở lại có reset learning không?**
Trả lời: Không, dưới 24h thì algorithm vẫn giữ learning. Trên 7 ngày tắt mới reset hoàn toàn.

**Hỏi: Đổi creative trong giai đoạn learning có nên không?**
Trả lời: Không, trừ khi CTR <0.3% (creative quá tệ). Đổi creative reset learning, lại bắt đầu từ đầu.

---

**Tools liên quan:**
- [ROAS Calculator](/tools/roas-calculator) - tính break-even để biết campaign có thể profit không
- [Tool tính phí sàn](/tools/tinh-phi-san) - check CPO ceiling

**Đọc tiếp:**
- [Ads không ra đơn - Checklist 7 bước chẩn đoán](/blog/ads-khong-ra-don-checklist-7-buoc)
- [Test ads đúng cách - A/B test không tốn ngân sách](/blog/test-ads-a-b-test-khong-ton-ngan-sach)
- [Tư duy mới về CPM](/blog/tu-duy-moi-ve-cpm-cao-la-tot)
- [Đừng chỉ nhìn CPC](/blog/khong-chi-nhin-cpc-5-chi-so-ads-quan-trong-hon)
`,
});

const B21 = post({
  id: "blog-B21-khi-nao-tang-roas-khi-nao-giam",
  title: "Khi nào tăng ROAS, khi nào giảm? Decision framework rõ ràng",
  slug: "khi-nao-tang-roas-khi-nao-giam",
  excerpt: "Decision tree khi điều chỉnh ROAS target: 3 trigger tăng (margin tốt + volume thấp, optimize phase, cạnh tranh thấp) vs 3 trigger giảm (cần scale gấp, mùa sale, ngân sách dư).",
  category: "performance",
  seoTitle: "Khi nào tăng ROAS target, khi nào giảm? Khung quyết định 2026",
  seoDescription: "Decision framework điều chỉnh ROAS target cho seller TMĐT 2026: 6 trigger tăng/giảm cụ thể theo growth stage, mùa vụ, ngân sách. Tránh panic adjust và over-optimization.",
  content: `
![ROAS decision framework](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80)

"ROAS đang 8x, em nên giảm xuống 5x để scale hay giữ 8x giữ profit?" - đây là câu hỏi phải có câu trả lời rõ ràng nhưng đa số seller trả lời theo cảm tính. Tăng/giảm ROAS target không phải intuition, phải có decision framework.

Bài này tóm tắt khung quyết định tôi dùng cho client - dựa trên 6 trigger cụ thể, không cảm tính.

## Tăng vs giảm ROAS target - hiểu lầm phổ biến

Hiểu lầm #1: **"ROAS cao luôn tốt"**. Sai. ROAS 10x với 50tr revenue = 5tr profit. ROAS 5x với 300tr revenue = 60tr profit. Số tuyệt đối quan trọng hơn.

Hiểu lầm #2: **"Giảm ROAS = chấp nhận lỗ"**. Sai. Giảm ROAS target xuống mức break-even + buffer = scale volume mà vẫn profit dương.

Hiểu lầm #3: **"Set ROAS 1 lần rồi quên"**. Sai. ROAS target phải adjust theo growth stage, mùa, cạnh tranh - ít nhất 4-6 lần/năm.

## 3 trigger TĂNG ROAS target

### Trigger 1: Margin healthy + Volume thấp

Khi shop có CM% (Contribution Margin) cao (>20%) nhưng volume bán thấp, tăng ROAS target = lock profit, không cần aggressive scale.

Ví dụ: shop Beauty premium CM 30%, 50 đơn/ngày, ROAS 7x. Tăng target lên 9x. Volume có thể giảm xuống 35 đơn nhưng profit/đơn cao hơn 25%.

### Trigger 2: Phase optimize sau khi đã scale rộng

Sau 3-6 tháng scale, audience đã saturation. Volume khó push tiếp mà không tăng cost. Lúc này shift sang optimize:
- Tăng ROAS target 15-20%
- Cắt SKU non-performer
- Focus budget vào campaign winning

Strategy này phù hợp shop GMV 1-3 tỷ/tháng đã ổn định.

### Trigger 3: Cạnh tranh thấp / Mùa thấp điểm

Mùa thấp điểm (vd: tháng 2-3 sau Tết, tháng 7-8 mid-summer) sức mua giảm, CPM thấp, nhưng buyer cũng ít sẵn sàng mua. Tăng ROAS target để chỉ target buyer intent cao thực sự, tránh "đốt tiền cho người không mua".

## 3 trigger GIẢM ROAS target

### Trigger 1: Business cần scale gấp

Launch SKU mới, vào mùa peak, hoặc cần đạt GMV target để unlock benefit (vd: lên Mall, tier rebate). Giảm ROAS target xuống 70-80% break-even để scale volume nhanh.

Ngắn hạn (1-3 tháng) chấp nhận margin/đơn thấp, đổi lại volume + market share.

### Trigger 2: Mùa sale lớn

11.11, 12.12, mùa sale: CPM tăng, voucher deep, margin/đơn giảm 30-50%. Nếu giữ ROAS target cũ = không bid được, mất volume vào tay competitor. Giảm target 20-30% trong 2-3 tuần sale.

![Seasonal ROAS](https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80)

### Trigger 3: Ngân sách dư cuối tháng

Cuối tháng còn ngân sách marketing chưa dùng hết, sàn không carry-over sang tháng sau. Giảm ROAS target để tận dụng ngân sách dư - vẫn profit, không cần đạt ROAS optimal.

## Decision tree theo growth stage

| Growth stage | GMV/tháng | ROAS target suggested | Logic |
|--------------|-----------|----------------------|-------|
| Launch | <100tr | 2-3x | Học hỏi, build data, không lock profit |
| Early growth | 100-500tr | 3-5x | Balance volume + early profit |
| Scale | 500tr-2tỷ | 4-6x | Push volume, accept margin lower |
| Optimize | 2-5 tỷ | 5-8x | Lock unit economics, optimize SKU mix |
| Mature | >5 tỷ | 6-10x | Premium positioning, brand-driven |

ROAS target không cố định trong 1 ngành. Beauty premium có thể giữ ROAS 8-10x suốt, F&B thường 4-6x kể cả mature.

## Avoid 'panic adjust'

Sai lầm thường gặp: ROAS hôm nay rớt từ 6 xuống 4 -> panic, đẩy target lên 7 -> algorithm không phân phối được -> volume rớt 80% -> panic ngược lại.

Quy tắc:
- **Chỉ adjust ROAS target sau 7-14 ngày data ổn định**
- **Mỗi lần adjust không quá ±15%**
- **Sau adjust, không touch trong 7 ngày để algorithm stable**

## Bảng adjust hàng tháng

Template tôi dùng cho client:

| Tuần | Hành động |
|------|-----------|
| Week 1 | Audit data tháng trước, identify trigger |
| Week 2 | Adjust target nếu có trigger rõ ràng |
| Week 3 | Monitor, không touch |
| Week 4 | Đánh giá impact, plan tháng sau |

Đừng adjust mỗi ngày. Đừng adjust mỗi tuần. Mỗi tháng 1 lần là đủ.

## Set rule và stick

Cách hiệu quả nhất tránh panic adjust: viết rule trước, theo rule thay vì cảm xúc.

Sample rule:
- "Nếu CM% >25% trong 14 ngày, tăng ROAS target +10%"
- "Nếu chuẩn bị vào mùa sale (T-7 ngày), giảm ROAS target -20%"
- "Nếu CPO vượt CPO max 3 ngày liên tục, tăng ROAS target +15%"

Khi có biến động, kiểm tra rule trước khi đụng campaign.

## FAQ

**Hỏi: Tăng ROAS target xong volume rớt mạnh, làm sao?**
Trả lời: Đó là trade-off bạn chấp nhận khi tăng target. Nếu volume rớt nhiều hơn dự kiến (>30%), giảm target lại 50% mức tăng và đợi stable.

**Hỏi: Có nên set ROAS target khác nhau cho từng campaign không?**
Trả lời: Có. Campaign new SKU target 3x. Campaign winning target 6x. Campaign retargeting target 8x. Tổng portfolio ROAS = weighted average.

**Hỏi: Khi nào không nên đặt ROAS target?**
Trả lời: Launch phase 30 ngày đầu, nên dùng CPA target hoặc Cost Cap thay vì ROAS. ROAS quá lệ thuộc vào AOV biến động, CPA stable hơn.

**Hỏi: Tăng ROAS target có khi nào làm CPO tăng không?**
Trả lời: Có. Khi target quá cao, algorithm chỉ bid cho intent rất cao -> CPM cao -> CPO cao. Phải balance: target ROAS thực tế, không lý tưởng.

---

**Tools liên quan:**
- [ROAS Calculator](/tools/roas-calculator) - tính ROAS target dựa trên P&L
- [Mẫu P&L Ecom](/tools/pnl-ecom) - check CM% trước khi adjust

**Đọc tiếp:**
- [Contribution Margin > ROAS](/blog/contribution-margin-quan-trong-hon-roas)
- [Đặt ngưỡng CPO theo biên lợi nhuận](/blog/dat-nguong-cpo-theo-bien-loi-nhuan)
- [Scale ngân sách x3 nhưng giảm ROAS target - tại sao đúng](/blog/scale-x3-giam-roas-target-tai-sao-dung)
- [Cách đặt ROAS đúng cho sản phẩm mới](/blog/dat-roas-dung-cho-san-pham-moi-30-ngay-dau)
`,
});

const B23 = post({
  id: "blog-B23-ty-le-bo-gio-atc-cao-khong-ra-don",
  title: "Tỷ lệ bỏ giỏ (ATC) cao mà không ra đơn - 5 lý do và cách fix",
  slug: "ty-le-bo-gio-atc-cao-khong-ra-don",
  excerpt: "5 lý do buyer ATC nhưng không checkout trên Shopee/TikTok Shop: giá khác giá hiển thị, phí ship cao, voucher hết hạn, hết size phổ biến, trust signal yếu. Fix từng lý do trong 30 phút.",
  category: "performance",
  seoTitle: "ATC cao không ra đơn - 5 lý do và checklist fix 30 phút",
  seoDescription: "Vì sao tỷ lệ Add To Cart cao nhưng buyer không checkout? 5 nguyên nhân thực tế từ 60+ shop Shopee/TikTok và checklist fix 30 phút giúp tăng CVR 15-25%.",
  content: `
![ATC drop-off](https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80)

Có một dạng "ảo giác" trong ads ecom: ATC rate cao (4-6%) nhưng đơn hàng ít (CVR 0.8-1.2%). Founder thấy ATC đẹp tự tin scale ngân sách, nhưng càng scale càng lỗ. Lý do: 60-70% buyer ATC không checkout.

Sau 60+ project, tôi rút ra 5 lý do phổ biến nhất khiến buyer drop sau ATC. Bài này phân tích từng lý do và đưa ra checklist fix nhanh.

## Benchmark ATC drop-off theo ngành

ATC drop-off rate = (ATC - Đơn) / ATC × 100%. Đây là benchmark 2026:

| Ngành | ATC drop-off healthy | Drop-off bất thường |
|-------|---------------------|---------------------|
| Beauty | 50-65% | >75% |
| Fashion | 55-70% | >80% |
| Mother & Baby | 45-60% | >70% |
| Home & Living | 50-65% | >75% |
| F&B | 40-55% | >65% |
| Electronics | 60-75% | >85% |

Nếu drop-off vượt ngưỡng "bất thường", có 1 trong 5 nguyên nhân dưới đây.

## Lý do 1: Giá ATC khác giá checkout

Buyer add cart thấy giá 199k. Vào checkout giá thành 245k (vì voucher hết hạn, phí ship, phí dịch vụ). Buyer cảm giác bị "lừa" -> đóng app.

Cách check: tự thêm sản phẩm vào cart như buyer mới, đo chênh lệch giá ATC vs checkout. Nếu >15%, đây là nguyên nhân chính.

Fix:
- Tích hợp phí ship vào giá hoặc làm freeship combo
- Voucher seller có expiry rõ ràng, không hết hạn ngay sau ATC
- Hiển thị giá "all-in" trong listing nếu sàn cho phép

## Lý do 2: Phí ship hiển thị quá muộn

Buyer chỉ thấy phí ship ở bước checkout cuối. Phí 30-50k cho đơn 200k = 20-25% giá trị đơn -> abandonment.

Fix:
- Setup "Freeship Xtra" / "Freeship Plus" của sàn
- Bundle nhỏ thêm để qua ngưỡng freeship (vd: ngưỡng 250k, bán bundle 280k)
- Tăng giá niêm yết 5-7% và tự subsidize ship - psychological tốt hơn

![Cart abandonment](https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80)

## Lý do 3: Sản phẩm hết hàng size/màu phổ biến

Pattern: Buyer ATC thấy "Size L hết hàng" hoặc "Màu nude hết hàng". 80% buyer không chuyển sang size khác mà bỏ đi.

Cách check: vào Sanity / Seller Center, xem tỷ lệ stock theo SKU variant. Nếu size phổ biến nhất (S, M, L hoặc nude, đen) hết stock, đây là vấn đề.

Fix:
- Forecast restock cho size phổ biến trước 2 tuần
- Set min stock = 1.5x weekly velocity
- Khi sắp hết, tăng giá nhẹ size đó để slow demand hoặc tạm tắt ads SKU
- Tăng AOV bằng bundle thay vì depend vào 1 SKU

## Lý do 4: Trust signal yếu

Buyer ATC, kéo xuống đọc review, thấy: 0 review, 0 sao, hoặc 50 review nhưng có 5 review 1-2 sao gần đây. Trust giảm -> đóng app.

Fix nhanh (1-2 tuần):
- Setup auto-message xin review sau giao hàng 5 ngày
- Voucher khuyến mãi review (sàn cho phép)
- Hidden listing có nhiều review xấu, launch listing mới sạch
- Add UGC video review vào listing description

Fix dài hạn:
- QC sản phẩm trước ship
- CSKH proactive xử lý complaint trước khi buyer review xấu

## Lý do 5: Buyer 'compare' với shop khác

Hành vi phổ biến của buyer Việt: ATC để "đánh dấu", sau đó qua shop khác compare giá, review, voucher. Nếu shop khác tốt hơn -> không quay lại.

Fix:
- Voucher countdown sau ATC: "Voucher 30k còn hiệu lực 2h"
- SMS/Notification remind sau 1h ATC
- Retargeting ads cho buyer ATC: hiển thị unique value (review, freeship, deal)
- Live commerce kéo buyer ATC vào live để chốt

## Checklist 30 phút fix ATC drop-off

Khi phát hiện drop-off >75%, làm checklist này:

| Bước | Thời gian | Hành động |
|------|-----------|-----------|
| 1 | 5 phút | Tự thêm SP vào cart, đo chênh lệch giá ATC vs checkout |
| 2 | 5 phút | Check stock variant phổ biến |
| 3 | 5 phút | Đọc 10 review mới nhất, identify pattern complaint |
| 4 | 5 phút | Compare với 3 shop competitor: giá, voucher, freeship |
| 5 | 5 phút | Setup voucher countdown 2-4h cho buyer ATC |
| 6 | 5 phút | Tạo retargeting campaign ATC abandon |

Sau 30 phút, fix được 60-70% issue. Phần còn lại cần plan dài hạn.

## Setup retargeting cho buyer ATC

Đây là campaign ROAS cao nhất gần như mọi shop (thường 8-15x). Setup:

1. Audience: buyer ATC trong 3-7 ngày, exclude buyer đã purchase
2. Creative: focus voucher / countdown / social proof
3. Ngân sách: 10-15% tổng ads spend
4. Frequency cap: 3-5/tuần (tránh spam)
5. Time decay: bid cao hơn cho buyer ATC trong 24h gần nhất

Mỗi 1tr ngân sách retargeting thường mang 8-12tr revenue. ROI cao nhất trong portfolio ads.

## FAQ

**Hỏi: ATC cao là dấu hiệu tốt hay xấu?**
Trả lời: ATC cao + CVR cao = tốt. ATC cao + CVR thấp = vấn đề ở checkout flow. Đọc cùng lúc.

**Hỏi: Drop-off 80% có normal không nếu là campaign awareness?**
Trả lời: Campaign awareness ATC ít. Campaign awareness mà ATC rate cao + drop-off cao = mismatch giữa ads và landing. Fix landing/giá.

**Hỏi: Có cần retargeting ATC nếu shop nhỏ <100tr GMV?**
Trả lời: Có. Ngân sách retargeting có thể chỉ 200-500k/ngày nhưng ROI gấp 3-5 lần campaign acquisition. Setup ngay từ shop nhỏ.

**Hỏi: Freeship Xtra của Shopee có nên bật không?**
Trả lời: Tuỳ ngành. AOV cao (>300k) thì bật, AOV thấp (<150k) phí Freeship Xtra ăn margin nhanh. Tính break-even trước khi quyết định.

---

**Tools liên quan:**
- [Tool tính phí sàn](/tools/tinh-phi-san) - phân tích tác động Freeship Xtra lên margin
- [ROAS Calculator](/tools/roas-calculator) - tính ROI retargeting campaign

**Đọc tiếp:**
- [Đọc data ads khi chưa có đơn](/blog/doc-data-ads-khi-chua-co-don-dung-dung-som)
- [Ads không ra đơn - Checklist 7 bước](/blog/ads-khong-ra-don-checklist-7-buoc)
- [Đừng chỉ nhìn CPC](/blog/khong-chi-nhin-cpc-5-chi-so-ads-quan-trong-hon)
- [Phân bổ ngân sách 70-20-10](/blog/phan-bo-ngan-sach-tranh-cpo-dot-bien)
`,
});

const B24 = post({
  id: "blog-B24-it-chinh-ads-quy-tac-3-7-3",
  title: "Ít chỉnh ads vẫn giữ phong độ - Quy tắc 3-7-3 chi tiết",
  slug: "it-chinh-ads-quy-tac-3-7-3",
  excerpt: "Nguyên tắc 3-7-3: 3 ngày algorithm learning, 7 ngày stable, sau đó chỉ chỉnh khi có lý do statistical. Cost của over-tweaking và routine ads management theo tuần.",
  category: "performance",
  seoTitle: "Quy tắc 3-7-3 ads ecom - ít chỉnh mà vẫn giữ ROAS 2026",
  seoDescription: "Hướng dẫn quy tắc 3-7-3 quản lý ads ecom: 3 ngày learning, 7 ngày stable, 3 lý do mới được chỉnh. Tránh over-tweaking làm reset algorithm và mất ROAS.",
  content: `
![Ads management routine](https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80)

"Em chỉnh ads 4-5 lần/ngày anh ơi, mà sao ROAS càng ngày càng kém?" - tin nhắn quen thuộc. Câu trả lời ngắn: **bạn đang chỉnh quá nhiều**.

Có một sự thật phản trực giác: ads ecom thường win khi bạn **làm ít hơn**. Mỗi lần chỉnh = algorithm reset partial learning, ROAS rớt 1-2 ngày để stable. Chỉnh 5 lần/ngày = algorithm không bao giờ "đạt nhịp".

Bài này tóm tắt quy tắc 3-7-3 - cách ads runner pro quản lý 30-50 campaign cùng lúc mà vẫn giữ ROAS ổn.

## Sai lầm 'chỉnh nhiều = tốt hơn'

Founder mới hay nghĩ: ads = công việc chân tay, phải làm liên tục. Sự thật: ads = công việc dữ liệu, phải đợi data đủ mới quyết định.

Hậu quả over-tweaking:
- Reset learning phase mỗi lần đổi audience / bid / ngân sách >30%
- ROAS rớt 20-40% trong 2-3 ngày sau mỗi chỉnh
- Algorithm không bao giờ optimize đầy đủ
- Mental load cao, founder không tập trung vào product / customer

Sau 60+ project, tôi quan sát: **shop ít chỉnh ads (1-2 lần/tuần) thường có ROAS ổn định hơn 25-35% so với shop chỉnh hàng ngày**.

## Quy tắc 3-7-3 là gì

3 con số đại diện 3 phase:

- **3 ngày đầu**: Algorithm learning phase, KHÔNG ĐỤNG
- **7 ngày tiếp**: Stable phase, chỉ adjust micro nếu cần
- **3 lý do mới được chỉnh** sau 10 ngày (xem bên dưới)

## Phase 1: 3 ngày learning

Khi launch campaign mới hoặc thay đổi major (ngân sách >30%, audience, creative chính), algorithm vào "learning phase". Trong 3 ngày này:

**Đừng**:
- Đổi ngân sách
- Đổi target audience
- Tắt-mở lại
- Đổi bidding strategy
- Đổi creative

**Được phép**:
- Quan sát data
- Plan adjust cho sau learning
- Tăng/giảm dưới 10% nếu thật sự cần (rare)

Tại sao? Algorithm cần ~50 conversion để hoàn thành learning. Nếu reset giữa chừng, mọi data accumulate đều bị xoá. Bạn quay lại Day 0.

## Phase 2: 7 ngày stable

Sau learning, campaign vào "stable phase". Data đã reliable hơn. Lúc này chỉ adjust micro:

**Được phép**:
- Tăng/giảm ngân sách ±15% mỗi 3 ngày
- Refine audience (exclude buyer cũ, add lookalike layer)
- A/B test creative mới side-by-side (không thay creative gốc)
- Adjust bid theo time-of-day

**Đừng**:
- Đổi creative chính
- Đổi audience hoàn toàn
- Pause + relaunch
- Đổi conversion event

![Stable phase ads](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80)

## Phase 3: Sau 10 ngày - 3 lý do mới được chỉnh

Sau 10 ngày, campaign đã có đủ data để quyết định lớn. Chỉ chỉnh major khi có 1 trong 3 lý do:

### Lý do 1: Data movement >20% liên tục 3 ngày

Vd: CTR giảm từ 1.5% xuống 0.9% trong 3 ngày liên tục, không phải spike 1 ngày. Đây là tín hiệu thật, được chỉnh.

### Lý do 2: CPO vượt CPO max (break-even)

Khi CPO thực tế > CPO max 3 ngày liên tục = đang lỗ ngầm. Phải intervene: giảm bid, refine audience, hoặc pause.

### Lý do 3: External event (mùa, competitor, platform change)

- Vào mùa sale -> điều chỉnh strategy
- Competitor lớn đổ tiền vào audience của bạn -> CPM tăng đột biến
- Sàn thay đổi format / policy -> bắt buộc adjust

## Cost của over-tweaking

Đây là số liệu thực tế tôi đo được:

| Hành vi | Tác động ROAS |
|---------|---------------|
| Đổi ngân sách >30% mỗi ngày | -15% ROAS sau 7 ngày |
| Đổi audience mỗi 3 ngày | -25% ROAS sau 2 tuần |
| Tắt-mở campaign hàng ngày | -30% ROAS, không recoverable |
| Đổi creative mỗi 5 ngày | -10-15% ROAS, learning data fragmented |

Mỗi hành vi tưởng "active management" thực ra phá ROAS.

## Routine ads management theo tuần

Đây là routine tôi dạy ads runner mới:

| Ngày | Hoạt động | Thời gian |
|------|-----------|-----------|
| Thứ 2 sáng | Plan: review tuần trước, plan tuần này | 60 phút |
| Thứ 4 sáng | Adjust: tăng/giảm ngân sách micro, launch creative test | 45 phút |
| Thứ 6 sáng | Review: đo KPI tuần, document insights | 30 phút |
| Khác | Quan sát, không touch | 5-10 phút/ngày |

Tổng: ~3-4 giờ/tuần quản lý 20-30 campaign. Phần còn lại đầu tư vào product, content, customer.

## Khi nào exception - chỉnh nhanh

Có 4 scenario được phép chỉnh ngoài routine:

1. **CPO vượt 200% break-even trong 1 ngày** - pause ngay, không đợi 3 ngày
2. **Platform error (charge 2x, broken landing)** - fix ngay
3. **Stock out đột ngột** - pause ads SKU đó
4. **Crisis PR (review xấu lan toả)** - pause ads, fix CS trước

Còn lại: stick với routine 3-7-3.

## Mindset shift

Quản lý ads thành công cần mindset "investor" hơn "trader". Investor:
- Mua xong giữ 6-12 tháng, không nhìn giá hàng ngày
- Chỉ trade khi có lý do fundamental thay đổi

Trader (over-tweaker):
- Nhìn giá mỗi giờ, hành động cảm tính
- Cuối năm thường lỗ vì cost transaction + emotion bias

Ads ecom giống đầu tư hơn. Plan tốt, set rule, đợi result.

## FAQ

**Hỏi: Ngân sách nhỏ (1tr/ngày) có nên adjust thường xuyên hơn không?**
Trả lời: Không. Ngân sách nhỏ thì data đến chậm hơn, càng cần đợi lâu hơn (5-7 ngày learning thay vì 3).

**Hỏi: Ads runner ngồi 8h/ngày thì làm gì nếu không chỉnh ads?**
Trả lời: Phân tích data, tạo creative mới để test sau, viết angle copy mới, làm research competitor, planning campaign mới. Quản lý ads chỉ 20-30% thời gian.

**Hỏi: Tôi đang chỉnh ads hàng ngày và ROAS vẫn ổn, có cần đổi không?**
Trả lời: Có thể bạn may mắn ngành dễ. Test 2 tuần routine 3-7-3, so sánh ROAS. Đa số case ROAS sẽ ổn hơn.

**Hỏi: TikTok Shop có cần routine khác Shopee Ads không?**
Trả lời: TikTok Shop algorithm nhạy hơn (learning shorter, ~24-48h). Có thể giảm 3-7-3 thành 2-5-2. Còn nguyên tắc vẫn giống.

---

**Tools liên quan:**
- [ROAS Calculator](/tools/roas-calculator) - tính CPO max để biết khi nào exception
- [Mẫu P&L Ecom](/tools/pnl-ecom) - track impact dài hạn của routine

**Đọc tiếp:**
- [Test ads đúng cách](/blog/test-ads-a-b-test-khong-ton-ngan-sach)
- [Scale ads x2 không mất ROAS](/blog/scale-ads-tang-ngan-sach-khong-mat-roas)
- [Khi nào tăng, khi nào giảm ROAS](/blog/khi-nao-tang-roas-khi-nao-giam)
- [Đọc data ads khi chưa có đơn](/blog/doc-data-ads-khi-chua-co-don-dung-dung-som)
`,
});

const B25 = post({
  id: "blog-B25-scale-x3-giam-roas-target-tai-sao-dung",
  title: "Scale ngân sách x3 nhưng giảm ROAS target - Tại sao đây là quyết định đúng",
  slug: "scale-x3-giam-roas-target-tai-sao-dung",
  excerpt: "Logic kinh tế ngược trực giác: doanh thu tuyệt đối quan trọng hơn ROAS %. Khi ROAS 5x × 300tr revenue tạo profit cao hơn ROAS 8x × 100tr. Công thức và case study.",
  category: "performance",
  seoTitle: "Scale ngân sách x3 giảm ROAS target - quyết định đúng 2026",
  seoDescription: "Vì sao scale ngân sách x3 mà chấp nhận giảm ROAS target lại profit cao hơn? Công thức Profit = (CM% - 1/ROAS) × Revenue, case study, khi nào dùng strategy này.",
  content: `
![Scale strategy](https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80)

Có một quyết định trông "phản trực giác" mà tôi khuyên client làm gần như mỗi tháng: **giảm ROAS target xuống, scale ngân sách lên**. Founder thường hoảng hốt: "Sao lại giảm ROAS, không phải càng cao càng tốt sao?"

Câu trả lời ngắn: **profit tuyệt đối quan trọng hơn ROAS %**. Bài này giải thích công thức, ví dụ thực tế, và khi nào nên (và không nên) dùng strategy này.

## ROAS % vs Profit tuyệt đối

Đây là 2 metric đo 2 thứ khác nhau:

- **ROAS %**: hiệu quả của 1 đồng ads. Đo "efficiency".
- **Profit tuyệt đối**: số tiền lãi thực tế. Đo "scale".

Trong giai đoạn cần tăng trưởng, scale quan trọng hơn efficiency. Vì:
- Scale → market share lớn hơn
- Scale → unlock tier benefit của sàn (Mall, rebate, premium support)
- Scale → fixed cost phân bổ trên doanh thu lớn hơn → unit cost giảm
- Scale → buyer base tích luỹ → LTV tăng theo thời gian

## Công thức cốt lõi

Profit từ ads campaign tính theo công thức:

**Profit = Revenue × (CM% - 1/ROAS)**

Trong đó:
- **CM%**: Contribution Margin sau phí sàn, COGS, ship seller, voucher
- **1/ROAS**: tỷ lệ ads cost trên revenue (vd ROAS 5x → 1/5 = 20%)

Khi CM% > 1/ROAS, campaign có profit. Càng tăng Revenue, profit càng cao - miễn là điều kiện này được giữ.

## Ví dụ cụ thể: Beauty shop CM 35%

Giả sử shop Beauty CM 35% (sau COGS, phí sàn, voucher).

**Scenario A - ROAS cao + Revenue thấp:**
- ROAS: 8x → ads cost = 12.5% revenue
- Revenue: 100tr/tháng
- Profit = 100 × (35% - 12.5%) = 100 × 22.5% = **22.5tr**

**Scenario B - ROAS trung + Revenue cao:**
- ROAS: 5x → ads cost = 20% revenue
- Revenue: 300tr/tháng (x3)
- Profit = 300 × (35% - 20%) = 300 × 15% = **45tr**

**Scenario B profit gấp đôi Scenario A** mặc dù ROAS thấp hơn 38%.

Đây là logic kinh tế khi giảm ROAS scale revenue. Quan trọng: CM% phải đủ cao.

## Khi nào strategy này work

Strategy "scale + giảm ROAS" chỉ work khi 3 điều kiện đồng thời:

1. **CM% healthy (>20%)** - đủ buffer giảm ROAS mà vẫn profit
2. **Audience có depth** - có thể scale 3x mà CVR không rớt mạnh
3. **Unit economics stable** - COGS, phí sàn, ops không bị spike khi scale

Nếu thiếu 1 trong 3: strategy có thể phản tác dụng.

![Profit scaling](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80)

## Khi nào KHÔNG dùng

3 scenario không nên giảm ROAS để scale:

### CM% mỏng (<15%)

Vd: shop Electronics CM 12%. Nếu giảm ROAS từ 8x xuống 5x:
- 1/ROAS từ 12.5% lên 20%
- CM 12% - 20% = -8% → mỗi đơn lỗ 8% revenue

Càng scale càng lỗ. Phải fix CM% trước (giảm COGS, tăng giá, optimize phí sàn).

### Cash flow tight

Sàn TMĐT giữ tiền 14-30 ngày sau đơn giao thành công. Scale x3 = 3x cash outflow (ads + COGS) nhưng cash inflow chỉ tăng theo sau 2-4 tuần. Nếu không có cash buffer 2-3 tháng OPEX, scale chết vì cash flow âm.

### Mùa thấp điểm

Scale khi sức mua thị trường giảm = đốt tiền. Đợi mùa peak hoặc launch SKU mới mới scale.

## Trade-off cần chấp nhận

Khi giảm ROAS để scale, accept 3 trade-off:

1. **CPO tăng**: từ vd 80k lên 120k/đơn. Bù lại volume tăng x3.
2. **Margin/đơn giảm**: từ 25% xuống 15%. Bù lại tổng profit tăng.
3. **CM% volatile hơn**: cần monitor weekly, không monthly.

Founder phải comfortable với 3 trade-off này trước khi switch strategy.

## Risk khi scale quá nhanh

Scale x3 trong 1 tháng có risk cao:

- Algorithm relearn → ROAS rớt thêm 20-30% trong 1-2 tuần đầu
- CSKH overload → response time tăng, review xấu
- Fulfillment delay → buyer huỷ đơn, refund tăng
- Stock out → mất momentum, mất buyer trust

Mitigation: scale theo phases (xem bài "Scale ads x2 không mất ROAS"), build infrastructure trước.

## Strategy 'Profit maximization' vs 'Efficiency maximization'

| Yếu tố | Profit max | Efficiency max |
|--------|-----------|----------------|
| Mục tiêu | Tổng VND profit | ROAS % cao |
| ROAS target | Trung bình (4-6x) | Cao (7-10x) |
| Volume | Cao | Thấp-trung bình |
| Risk | Cao hơn | Thấp |
| Phù hợp stage | Scale, Mature | Optimize, Premium niche |
| Cash flow | Tight | Comfortable |

Không có strategy nào "đúng". Tuỳ growth stage và goal của shop.

## Khi nào switch giữa 2 strategy

Pattern recommended:
- **Launch (0-6 tháng)**: Profit max (ROAS thấp), focus volume + market share
- **Scale (6-18 tháng)**: Profit max, push growth
- **Optimize (18+ tháng)**: Switch sang Efficiency max, lock unit economics
- **Mature (3 năm+)**: Mix - hybrid giữa 2 strategy theo SKU

Re-evaluate mỗi 6 tháng. Đừng stick với 1 strategy mãi mãi.

## Case study

Shop Beauty (anonymized):
- T1-T3 2026: ROAS 8x, Revenue 120tr/tháng, Profit 25tr
- T4 2026: Switch strategy. Giảm ROAS target xuống 5x, scale ngân sách x2.5
- T5 2026: Revenue 320tr, ROAS 5.2x, Profit 48tr
- T6 2026: Tiếp tục scale. Revenue 450tr, ROAS 4.8x, Profit 62tr

Trong 3 tháng: Revenue x3.7, Profit x2.5. ROAS giảm 40%. Founder lúc đầu căng thẳng vì "ROAS rớt" nhưng số tuyệt đối cho thấy đây là quyết định đúng.

## FAQ

**Hỏi: Giảm ROAS target trên ads platform thế nào?**
Trả lời: Tuỳ platform. Shopee Ads: giảm Target ROAS / tăng Max Cost. TikTok Shop: chuyển từ ROAS optimization sang Cost Cap higher. Meta: giảm Target ROAS trong campaign settings.

**Hỏi: Bao lâu nên đánh giá kết quả switch strategy?**
Trả lời: 30-45 ngày. Tháng 1 algorithm relearn, tháng 2 mới reliable data.

**Hỏi: Có cần thông báo team / stakeholder khi switch không?**
Trả lời: Có. Vì ROAS sẽ "trông" tệ trong 4-6 tuần. Stakeholder thấy ROAS rớt sẽ panic. Communicate strategy + profit projection trước.

**Hỏi: Strategy này có dùng cho service business / B2B không?**
Trả lời: Có thể với điều chỉnh. B2B AOV cao, sale cycle dài hơn. Replace "ROAS" bằng "LTV/CAC ratio". Cùng logic.

---

**Tools liên quan:**
- [ROAS Calculator](/tools/roas-calculator) - tính break-even ROAS, profit projection
- [Mẫu P&L Ecom](/tools/pnl-ecom) - simulate scenario A vs B với CM% thực

**Đọc tiếp:**
- [Khi nào tăng, khi nào giảm ROAS](/blog/khi-nao-tang-roas-khi-nao-giam)
- [Scale ads x2 không mất ROAS](/blog/scale-ads-tang-ngan-sach-khong-mat-roas)
- [Contribution Margin > ROAS](/blog/contribution-margin-quan-trong-hon-roas)
- [P&L 5 tầng cho ecom](/blog/pl-gian-hang-tmdt-5-tang-chuan)
`,
});

const B11 = post({
  id: "blog-B11-khong-chi-nhin-cpc-5-chi-so-ads-quan-trong-hon",
  title: "Đừng chỉ nhìn CPC - 5 chỉ số ads quan trọng hơn cần track 2026",
  slug: "khong-chi-nhin-cpc-5-chi-so-ads-quan-trong-hon",
  excerpt: "CPC chỉ là phí 1 click. Cần đọc CPM, CTR, CVR, CPO, ROAS để biết campaign healthy hay không. Framework 4 cấp đọc data ads từ portfolio 60+ shop.",
  category: "performance",
  seoTitle: "5 chỉ số ads quan trọng hơn CPC - hướng dẫn cho seller TMĐT",
  seoDescription: "CPC không phản ánh hiệu quả ads ecom. 5 chỉ số quan trọng hơn: CPM, CTR, CVR, CPO, ROAS. Framework 4 cấp funnel ads và cách trace nguyên nhân khi campaign lỗi.",
  content: `
![Ads metrics dashboard](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80)

"Em chạy ads CPC có 1.500đ thôi anh, rẻ lắm!" - founder hớn hở khoe. Tôi hỏi tiếp: "Vậy CPO bao nhiêu?" - im lặng. CPC rẻ không có nghĩa campaign tốt. Nó chỉ là 1 mảnh nhỏ trong funnel.

Bài này tóm tắt 5 chỉ số quan trọng hơn CPC và framework 4 cấp đọc data ads. Sau khi nắm, bạn không bị "đánh lừa" bởi CPC rẻ nữa.

## CPC là gì và tại sao chỉ nhìn CPC không đủ

CPC = Cost Per Click = phí trả cho 1 click vào ads.

CPC nói lên 1 thứ duy nhất: phí để buyer click. Nó KHÔNG nói:
- Buyer click có mua không (CVR)
- Buyer mua bao nhiêu (AOV)
- Bạn có lãi không (ROAS)
- Audience có chất lượng không (CPM, CTR)

CPC thấp có thể đến từ traffic rác. CPC cao có thể đến từ audience cực kỳ giá trị. Đọc CPC tách rời = sai số luôn.

## 5 chỉ số quan trọng hơn

### 1. CPM (Cost Per Mille)

CPM = chi phí cho 1.000 lần hiển thị. Phản ánh **chất lượng audience đang target**.

- CPM thấp + CTR thấp: audience rác
- CPM cao + CTR cao: audience premium, healthy
- CPM cao + CTR thấp: targeting đúng nhưng creative không match

Benchmark CPM theo ngành 2026: Beauty 95k, Fashion 75k, M&B 110k, F&B 55k, Electronics 85k.

### 2. CTR (Click-Through Rate)

CTR = % buyer click khi thấy ads. Đo **độ hấp dẫn của creative**.

- CTR <0.5%: creative kém, fix hook/visual
- CTR 0.5-1%: average
- CTR 1-2%: healthy
- CTR >2%: excellent, scale được

CTR là leading indicator. Khi CTR ổn, CVR và ROAS thường theo sau 5-10 ngày.

### 3. CVR (Conversion Rate)

CVR = % buyer mua sau khi click. Đo **chất lượng landing + listing**.

- CVR <1%: landing yếu hoặc giá không match
- CVR 1-2%: average
- CVR 2-4%: healthy
- CVR >4%: excellent

Khi CTR cao + CVR thấp = vấn đề ở listing (giá, review, hình). Fix listing trước khi đụng ads.

![Funnel metrics](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80)

### 4. CPO (Cost Per Order)

CPO = ngân sách / số đơn = phí ads để có 1 đơn. **Chỉ số quan trọng nhất**.

CPO max = (AOV × CM%) - Profit/đơn target

Vd: AOV 280k, CM 30%, profit target 15k/đơn → CPO max = 280×30% - 15 = 69k

Nếu CPO thực > CPO max = đang lỗ ngầm dù ROAS có vẻ ổn.

### 5. ROAS (Return On Ad Spend)

ROAS = Revenue / Ads Cost. Đo **hiệu quả ngân sách**.

ROAS phải so với break-even ROAS = 1 / CM%

Vd: CM 25% → break-even ROAS = 4x. Campaign ROAS 5x = profit, dưới 4x = lỗ.

## Framework 4 cấp đọc data ads

Đây là cách audit campaign theo thứ tự:

| Cấp | Funnel stage | Metric chính | Vấn đề |
|-----|--------------|--------------|--------|
| 1 | Awareness | Impression, CPM | Audience rác hoặc quá hẹp |
| 2 | Engagement | CTR | Creative kém |
| 3 | Consideration | CVR, ATC rate | Listing / giá kém |
| 4 | Profit | CPO, ROAS, CM% | Unit economics yếu |

Audit từ trên xuống. Nếu Cấp 1 ok mà Cấp 2 yếu = fix Creative. Nếu 1-2 ok mà 3 yếu = fix Listing. Đừng đụng ads khi vấn đề ở Listing.

## CPM cao + CTR thấp = vấn đề ở creative

Common pattern khi launch SKU mới:
- CPM 100k (premium audience)
- CTR 0.4% (thấp)

Logic: bạn đang trả tiền premium cho audience tốt nhưng creative không níu được chân họ. Fix creative trước khi đổ thêm tiền.

Cách fix creative nhanh:
- Đổi hook 3 giây đầu (video) hoặc visual chính (image)
- Test 2-3 angle hook: pain point / result / curiosity
- Đảm bảo USP rõ trong 3 giây

## CTR cao + CVR thấp = vấn đề ở landing/giá

Pattern:
- CTR 2.5% (rất tốt)
- CVR 0.8% (kém)

Logic: ads hấp dẫn nhưng landing/giá không match expectation. Fix landing trước khi optimize ads thêm.

Common issues landing:
- Giá ads expectation vs giá thực khác xa
- Review tệ
- Hình landing không khớp hình ads
- Phí ship cao
- Voucher không có hoặc khó claim

## Ví dụ thực tế

2 campaign cùng CPC 2.000đ nhưng kết quả ngược chiều:

**Campaign A (lỗ):**
- CPC: 2.000đ
- CTR: 0.4%
- CPM: ~80.000đ (CPC × 1000 / CTR%)
- CVR: 0.5%
- CPO: 400.000đ
- AOV: 300.000đ → Revenue/đơn 300k, ads/đơn 400k = lỗ 100k/đơn

**Campaign B (lãi):**
- CPC: 2.000đ
- CTR: 1.8%
- CPM: ~36.000đ
- CVR: 4.2%
- CPO: ~48.000đ
- AOV: 280.000đ → Revenue/đơn 280k, ads/đơn 48k = ROAS ~5.8x

Cùng CPC nhưng Campaign B profit, Campaign A lỗ nặng. CPC không cho biết điều này.

## Tool / dashboard nên dùng

3 cấp dashboard:

1. **Cấp campaign** (daily): CPM, CTR, CVR, CPO, ROAS
2. **Cấp SKU** (weekly): CPO theo SKU, ROAS theo SKU, repeat rate
3. **Cấp portfolio** (monthly): CM%, EBITDA, LTV/CAC

Có thể dùng Google Sheet kết nối với Shopee/TikTok API, hoặc tool như Lookerstudio. Đừng chỉ nhìn dashboard mặc định của sàn - thiếu metric profit-level.

## FAQ

**Hỏi: CPC bao nhiêu là rẻ?**
Trả lời: CPC chỉ "rẻ" khi đặt cạnh CVR và AOV. CPC 5.000đ với CVR 5% có thể rẻ hơn CPC 1.000đ với CVR 0.3%. Đo CPO không đo CPC.

**Hỏi: ROAS và CPO chỉ số nào quan trọng hơn?**
Trả lời: Cả 2 đo cùng 1 thứ ở góc khác nhau. CPO tuyệt đối, ROAS tương đối. Track cả 2.

**Hỏi: Sàn báo CTR khác với ads platform, tin số nào?**
Trả lời: Tin sàn (Shopee/TikTok Seller Center) vì đó là số được thanh toán. Ads platform có thể có deduplication khác.

**Hỏi: 5 chỉ số này có cần track daily không?**
Trả lời: Daily monitor, weekly review, monthly decision. Đừng react theo daily fluctuation (xem quy tắc 3-7-3).

---

**Tools liên quan:**
- [ROAS Calculator](/tools/roas-calculator) - tính break-even ROAS và CPO max
- [Tool tính phí sàn](/tools/tinh-phi-san) - tính phí thực để có CPO accurate

**Đọc tiếp:**
- [Tư duy mới về CPM](/blog/tu-duy-moi-ve-cpm-cao-la-tot)
- [Đặt ngưỡng CPO theo biên lợi nhuận](/blog/dat-nguong-cpo-theo-bien-loi-nhuan)
- [Ads không ra đơn - Checklist 7 bước](/blog/ads-khong-ra-don-checklist-7-buoc)
- [Đọc data ads khi chưa có đơn](/blog/doc-data-ads-khi-chua-co-don-dung-dung-som)
`,
});

const B12 = post({
  id: "blog-B12-ads-khong-ra-don-checklist-7-buoc",
  title: "Ads không ra đơn - Checklist 7 bước chẩn đoán không bỏ sót",
  slug: "ads-khong-ra-don-checklist-7-buoc",
  excerpt: "Roadmap kiểm tra theo thứ tự khi ads chạy không có đơn: break-even, creative, listing, landing, target, traffic flow, external factor. Tránh fix sai và lãng phí ngân sách.",
  category: "performance",
  seoTitle: "Ads không ra đơn? Checklist 7 bước chẩn đoán 2026",
  seoDescription: "Khi ads chạy không có đơn, làm gì? Checklist 7 bước chuẩn đoán theo thứ tự ưu tiên cho seller Shopee/TikTok Shop 2026 - fix đúng vấn đề không lãng phí thời gian.",
  content: `
![Ads diagnosis](https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80)

"Ads chạy 7 ngày rồi anh, chưa có đơn nào, em phải làm gì?" - tin nhắn này tôi nhận trung bình 5 lần/tuần. Câu trả lời không phải "fix ads" - mà là "**chẩn đoán đúng vấn đề trước khi fix**".

70% case "ads không ra đơn" không phải lỗi ads. Có thể là listing, có thể là giá, có thể là cấu trúc cost. Fix sai vấn đề = lãng phí thêm 2-3 tuần.

Bài này tóm tắt checklist 7 bước tôi dùng để chẩn đoán - theo đúng thứ tự ưu tiên.

## Bước 1: Check break-even ROAS có khả thi không

Trước khi đụng ads, hỏi: **với cost structure hiện tại, ROAS bao nhiêu là break-even?** Nếu break-even quá cao mà không khả thi, vấn đề ở unit economics không phải ads.

Công thức: Break-even ROAS = 1 / CM%

Vd: shop có CM% chỉ 12% → break-even ROAS = 8.3x. Trong ngành Beauty, ROAS 8.3x rất khó đạt. Nghĩa là dù ads tốt nhất cũng không lãi - cần fix cost structure trước (giảm COGS, tăng giá, optimize phí sàn).

Action:
- Tính CM% thực bằng [Mẫu P&L Ecom](/tools/pnl-ecom)
- So với benchmark ngành (Beauty >25%, Fashion >20%, F&B >15%)
- Nếu CM% thấp → fix structure trước

## Bước 2: Audit creative - CTR đạt benchmark không

Sau khi confirm break-even khả thi, check creative.

CTR sau 1.000 reach:
- <0.5%: creative tệ
- 0.5-1%: average
- 1-2%: healthy
- >2%: excellent

Nếu CTR <0.5%, vấn đề là creative. Đừng đụng target, landing, hay ngân sách.

Fix creative:
- Đổi hook 3 giây đầu (video)
- Đổi visual chính (image - lifestyle vs sản phẩm)
- Test 2-3 angle khác nhau
- Check competitor: angle nào đang work trong ngành

## Bước 3: Check listing - hình ảnh, title, description

Buyer click vào listing nhưng không chuyển sang ATC? Vấn đề ở listing.

Audit listing checklist:
- **Hình 1**: trong 2 giây có hiểu sản phẩm là gì không?
- **Title**: 60-80 ký tự, có keyword phổ biến, không spam
- **Description**: USP rõ trong 3 dòng đầu, format dễ scan
- **Hình bonus**: 5-8 hình, có lifestyle + close-up + use-case + size chart
- **Variant**: size/màu/dung tích đầy đủ, không gây confusion

![Listing audit](https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80)

## Bước 4: Check landing - giá, voucher, review

Buyer xem listing nhưng không ATC? Vấn đề ở "trust + offer".

Checklist:
- **Giá so với competitor**: trong khoảng ±10% nếu cùng SKU, không nên đắt hơn 20%
- **Voucher hiển thị**: voucher 5-15% là cần thiết, voucher hết hạn xoá ngay
- **Review**: ít nhất 30 review 4.5+ sao, không có 1-2 sao trong 10 review gần nhất
- **Q&A**: trả lời 100% câu hỏi trong 24h
- **Stock**: đầy đủ size/màu phổ biến

## Bước 5: Check target audience

Nếu listing tốt, creative tốt, nhưng vẫn không ra đơn = target sai.

Audit target:
- **Demographics**: tuổi, giới tính, vùng có đúng buyer ideal không
- **Interest**: interest có liên quan ngành hay quá rộng
- **Exclusion**: có exclude buyer cũ (đã mua trong 30 ngày) chưa
- **Lookalike**: có dùng lookalike 1-3% từ buyer cao giá trị chưa

Common mistake: target quá rộng (5-10tr reach) làm CPM thấp nhưng audience không relevant. Hẹp lại 200k-2tr cho campaign mới.

## Bước 6: Check traffic flow - buyer drop ở đâu

Đây là cách trace nguyên nhân chính xác nhất. Xem funnel:

| Stage | Số liệu shop | Benchmark | Drop-off? |
|-------|--------------|-----------|-----------|
| Impression | 50.000 | - | - |
| Click (CTR 1%) | 500 | CTR >1% | OK |
| View Content (VC 40%) | 200 | VC >40% | OK |
| Add To Cart (ATC 5%) | 25 | ATC >3% | OK |
| Order (CVR 1%) | 5 | CVR >2% | **Drop quá nhiều ở checkout** |

Khi identify được stage drop, biết chính xác fix ở đâu:
- Drop Impression → Click = creative
- Drop Click → VC = mismatch ads/listing
- Drop VC → ATC = listing yếu
- Drop ATC → Order = checkout / giá / trust

## Bước 7: Check external factors

Nếu 6 bước trên đều ok mà vẫn không ra đơn = yếu tố external.

Common external:
- **Mùa thấp điểm**: ngành Fashion Q3, Beauty Q2 thường yếu
- **Competitor sale lớn**: 1-2 đối thủ đang chạy promotion deep
- **Platform algorithm change**: sàn cập nhật thuật toán, traffic redistribute
- **Trend change**: SKU không còn match trend (đặc biệt Fashion, Beauty makeup)
- **Macro economic**: sức mua chung giảm (vd: sau Tết, cuối tháng lương)

Action: chấp nhận adjust expectation 2-3 tuần, monitor nếu yếu tố external có ổn định.

## Common mistakes khi chẩn đoán

3 sai lầm thường gặp:

1. **Fix ads khi vấn đề ở listing** - đổi audience 5 lần, ROAS không cải thiện vì listing không win.
2. **Fix sai stage drop** - thấy CVR thấp, đổi creative ads (creative đã tốt) thay vì fix landing.
3. **Bỏ qua external factor** - cố gắng force ra đơn trong mùa thấp điểm = lãng phí.

## Khung quyết định cuối

Sau 7 bước, có 1 trong 4 outcome:

| Outcome | Hành động |
|---------|-----------|
| Tất cả ok, chỉ thiếu thời gian | Đợi thêm 5-7 ngày |
| Vấn đề ở 1 stage cụ thể | Fix stage đó, không touch khác |
| Vấn đề ở unit economics | Pause ads, fix structure trước |
| External factor | Adjust expectation, monitor weekly |

## FAQ

**Hỏi: Bao lâu thì đi qua 7 bước này?**
Trả lời: 1-2 giờ nếu data đã có sẵn. Đầu tư thời gian này tránh lãng phí 2-3 tuần fix sai.

**Hỏi: Có nên kill campaign trong khi đi qua checklist không?**
Trả lời: Không. Pause là được, kill = mất learning data.

**Hỏi: Listing mới chưa có review, ads có ra đơn được không?**
Trả lời: Khó. Strategy: kéo 10-20 đơn đầu bằng voucher deep + ads target lookalike buyer cũ, build review trước khi scale ads.

**Hỏi: Ads ra đơn nhưng ít, có cần đi qua checklist không?**
Trả lời: Có. "Ít" có thể từ 1 stage drop nhỏ. Audit để tăng từ "ít" lên "tốt".

---

**Tools liên quan:**
- [ROAS Calculator](/tools/roas-calculator) - bước 1 check break-even
- [Mẫu P&L Ecom](/tools/pnl-ecom) - check CM% và CPO max
- [Tool tính phí sàn](/tools/tinh-phi-san) - tính phí thực ảnh hưởng break-even

**Đọc tiếp:**
- [Đọc data ads khi chưa có đơn](/blog/doc-data-ads-khi-chua-co-don-dung-dung-som)
- [Đừng chỉ nhìn CPC](/blog/khong-chi-nhin-cpc-5-chi-so-ads-quan-trong-hon)
- [ATC cao không ra đơn - 5 lý do](/blog/ty-le-bo-gio-atc-cao-khong-ra-don)
- [Tại sao cùng sản phẩm shop khác chạy ads hiệu quả hơn](/blog/cung-san-pham-tai-sao-shop-khac-chay-ads-hieu-qua-hon)
`,
});

const E41 = post({
  id: "blog-E41-build-team-ecom-0-12-nguoi-roadmap",
  title: "Build team Ecom 0->12 người - Roadmap 18 tháng từ 60+ project",
  slug: "build-team-ecom-0-12-nguoi-roadmap",
  excerpt: "Hire theo thứ tự đúng theo growth stage: CSKH -> Ads runner -> Content -> Designer -> Data -> Manager. Lương benchmark + KPI từng role 2026 tại HCM/HN.",
  category: "leadership",
  seoTitle: "Build team Ecom 0-12 người - Roadmap 18 tháng từ 60+ shop",
  seoDescription: "Hướng dẫn build team ecom từ 0 đến 12 người trong 18 tháng: hire role nào trước, lương benchmark HCM/HN 2026, KPI từng role, sai lầm thường gặp.",
  content: `
![Team building ecom](https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=80)

Founder ecom hay hỏi: "Khi nào hire designer? Khi nào hire data analyst?" - và câu trả lời tôi luôn đưa ra: "Hire theo doanh thu, không hire theo cảm xúc". Hire sớm = đốt cash flow. Hire muộn = bottleneck growth. Cân bằng giữa 2 là nghệ thuật.

Bài này tóm tắt roadmap hire 18 tháng cho shop ecom Việt Nam, dựa trên 60+ portfolio và lương benchmark 2026 thực tế tại HCM/HN.

## Lỗi phổ biến: hire sai timing

3 sai lầm tôi gặp gần như mỗi tháng:

1. **Hire designer khi GMV <100tr**: founder thấy "thiếu hình đẹp" -> hire fulltime designer. 1 năm sau design ăn 30% chi phí, ROI thấp. Đáng ra outsource freelance.
2. **Hire ads runner trước CSKH**: founder mê ads, không quan tâm support. Buyer than phiền chờ trả lời 2-3 ngày, review xấu, ROAS rớt. Hire CSKH trước.
3. **Hire manager khi team chưa đủ 5 người**: founder muốn "rảnh tay" sớm, hire manager khi chỉ có 3-4 nhân sự. Manager không có gì manage, lương ăn margin.

Hire phải đi sau revenue, không đi trước.

## Stage 1 (0-3 tháng, GMV <100tr): Founder + 1 CSKH part-time

Lúc này founder chạy tất cả: marketing, ads, content, vận hành. Hire duy nhất là **1 CSKH part-time** (4-6h/ngày).

Tại sao? Vì CSKH là role tốn thời gian nhất nhưng "easy to delegate" nhất. Founder không nên dành 3-4 giờ/ngày trả lời tin nhắn buyer.

- Lương: 4-7tr/tháng part-time (HCM/HN)
- KPI: Response rate >95% trong 1h, rating >4.5/5
- Nguồn hire: Sinh viên đại học, mom ở nhà part-time

## Stage 2 (3-6 tháng, GMV 100-300tr): + Content + Ads runner

Khi GMV vượt 100tr stable, founder cần delegate 2 role quan trọng nhất:

### Content (junior, fulltime)
- Lương: 8-12tr/tháng
- KPI: 15-20 content/tháng (post, short video, livestream script)
- Quan trọng: hire người trong target audience (vd: shop Beauty hire nữ 22-28t)

### Ads runner (mid-junior)
- Lương: 12-18tr/tháng (base) + 5-15% bonus theo KPI
- KPI: ROAS target, CPO max, ngân sách deployment
- Cảnh báo: đừng hire fresh không có portfolio. Tìm 1-2 năm kinh nghiệm thực chiến ngành ecom.

CSKH lúc này upgrade lên fulltime (8-10tr/tháng).

![Team growth](https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80)

## Stage 3 (6-12 tháng, GMV 300tr-1 tỷ): + Designer + CSKH lead

Khi GMV stable trên 300tr, có ngân sách hire 2 role mới:

### Designer (junior-mid)
- Lương: 10-15tr/tháng
- KPI: 30-40 design/tháng (thumbnail, banner, listing image, video edit)
- Lựa chọn: fulltime nếu cần volume cao, freelance retainer nếu budget tight

### CSKH Lead
- Lương: 12-16tr/tháng
- KPI: Quản lý team 2-3 CSKH, escalation handling, training
- Lúc này có 3-4 CSKH (mở ca tối, cuối tuần)

Total team: 6-7 người. GMV/người ~150-200tr/tháng - benchmark healthy.

## Stage 4 (12-18 tháng, GMV 1-3 tỷ): + Data Analyst + Operation Manager

GMV vượt 1 tỷ, founder bắt đầu mất grip vào data. Cần specialist:

### Data Analyst
- Lương: 15-25tr/tháng
- KPI: Weekly dashboard, monthly insights, ad-hoc analysis
- Có thể hire fresh tốt nếu SQL/Excel mạnh

### Operation Manager
- Lương: 18-28tr/tháng
- KPI: Manage CSKH + Fulfillment, SLA, COGS optimization
- Hire khi có 4+ nhân viên ops cần quản

Team 9-10 người. Founder chuyển focus sang strategy + growth.

## Stage 5 (18+ tháng, GMV >3 tỷ): + Marketing Manager + Specialist

Khi GMV >3 tỷ stable, founder muốn step back khỏi day-to-day marketing:

### Marketing Manager
- Lương: 25-40tr/tháng
- KPI: Lead team Marketing (Ads + Content + Design + Data), strategy, budget
- Hire người có 3-5 năm kinh nghiệm ecom

Cùng với specialist:
- 2nd Ads runner (chuyên platform khác hoặc đẩy SKU mới)
- 2nd Content (chuyên video / livestream)
- KOL/Affiliate manager

Team 12-15 người. Founder chỉ vào quyết định strategic.

## Lương benchmark 2026 HCM/HN

Tổng hợp theo role:

| Role | HCM | HN | Notes |
|------|-----|-----|-------|
| CSKH junior | 7-10tr | 6-9tr | Fulltime |
| CSKH Lead | 12-16tr | 10-14tr | - |
| Content junior | 8-12tr | 7-11tr | - |
| Content lead | 14-20tr | 12-18tr | - |
| Ads runner junior | 12-18tr | 11-16tr | + bonus |
| Ads runner senior | 20-30tr | 18-28tr | + bonus |
| Designer junior | 10-15tr | 9-13tr | - |
| Designer senior | 16-25tr | 14-22tr | - |
| Data Analyst | 15-25tr | 14-22tr | - |
| Operation Manager | 18-28tr | 16-25tr | - |
| Marketing Manager | 25-40tr | 22-35tr | - |

Bonus / KPI thường thêm 10-25% lương base tuỳ role.

## KPI rõ ràng cho từng role

KPI hiệu quả phải SMART (Specific, Measurable, Achievable, Relevant, Time-bound). Ví dụ:

| Role | KPI tốt | KPI tệ |
|------|---------|--------|
| CSKH | Response time <1h, rating 4.7/5, complaint <2% | "Trả lời buyer chu đáo" |
| Ads runner | ROAS 5x, CPO <70k, CM% 22% | "Chạy ads hiệu quả" |
| Content | 20 post/tháng, CTR ads >1.5%, save rate >5% | "Content sáng tạo" |
| Designer | 30 design/tháng, CTR ads >1.2%, brand consistency 90% | "Design đẹp" |

KPI nên link với revenue / profit, không link với "effort".

## Khi nào nên fire

3 red flag không thể bỏ qua:

1. **KPI miss 3 tháng liên tục**, không có dấu hiệu cải thiện
2. **Attitude problem**: né trách nhiệm, đổ lỗi, không proactive
3. **Cultural mismatch**: không fit với team / pace / standard

Fire không phải hành động dễ. Nhưng giữ wrong hire 6 tháng = mất 6 tháng productivity của role đó.

## FAQ

**Hỏi: Có nên hire ads runner từ agency thay vì in-house?**
Trả lời: Stage 1-2 nên agency. Stage 3+ in-house hiệu quả hơn. Agency tốn 15-25tr/tháng fee, in-house 12-18tr/tháng + dedicated 100%.

**Hỏi: Founder nên giữ role nào lâu nhất?**
Trả lời: Sản phẩm (sourcing, QC) và Brand (positioning, strategy). 2 role này delegate sai = mất linh hồn brand.

**Hỏi: Hire fulltime hay freelance/contract?**
Trả lời: Stage 1-2 freelance. Stage 3+ fulltime cho core role (Ads, Content), freelance cho project (campaign mùa, photoshoot).

**Hỏi: Sai lầm hire phổ biến nhất là gì?**
Trả lời: Hire vì "nhân sự đang available" thay vì "shop cần role đó". Cần role thì mới hire, không phải gặp người tốt thì hire.

---

**Tools liên quan:**
- [Mẫu P&L Ecom](/tools/pnl-ecom) - tính chi phí nhân sự % doanh thu
- [Tool tính thuế TNCN](/tools/tinh-thue-tncn) - tính thuế cho từng level lương

**Đọc tiếp:**
- [5 sai lầm hire Ads runner đầu tiên](/blog/5-sai-lam-hire-ads-runner-dau-tien)
- [Outsource vs in-house decision tree](/blog/outsource-agency-vs-in-house-decision)
- [Tư duy founder ecom 2026](/blog/tu-duy-founder-ecom-2026-gmv-vs-ebitda)
- [Live commerce 5 sai lầm margin âm](/blog/live-commerce-tiktok-5-sai-lam-margin-am)
`,
});

const E42 = post({
  id: "blog-E42-5-sai-lam-hire-ads-runner-dau-tien",
  title: "5 sai lầm khi hire Ads runner đầu tiên - Tránh ngay",
  slug: "5-sai-lam-hire-ads-runner-dau-tien",
  excerpt: "Hire theo CV ROAS đẹp, không hỏi unit economics, không test thực, lương cố định cao, không trial period. 5 sai lầm phá hỏng 6 tháng team marketing và cách avoid.",
  category: "leadership",
  seoTitle: "5 sai lầm hire Ads runner ecom - tránh để không mất 6 tháng",
  seoDescription: "Hướng dẫn hire Ads runner đầu tiên cho shop ecom 2026: 5 sai lầm phổ biến, interview question chuẩn, onboard 30-60-90 ngày, lương + KPI hợp lý.",
  content: `
![Hiring ads runner](https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&q=80)

"Em vừa fire ads runner sau 3 tháng, ROAS rớt 50%, lãng phí 60tr ngân sách" - founder nhắn tôi. Tôi hỏi quy trình hire, founder kể: "CV đẹp, ROAS 15x dự án trước, lương cao là chốt luôn".

Đó là 3 sai lầm trong 1 câu. Bài này tóm tắt 5 sai lầm phổ biến nhất khi hire Ads runner đầu tiên, và cách avoid - dựa trên việc tôi đã interview + train 50+ ads runner cho client.

## Sai lầm 1: Tin CV "ROAS 15x" không context

CV của ads runner thường khoe: "Đạt ROAS 15x, scale ngân sách x5". Founder thiếu kinh nghiệm sẽ wow.

Sự thật:
- ROAS phụ thuộc ngành. Beauty premium 12-15x bình thường, F&B 4-6x đã good.
- ROAS phụ thuộc CM%. Shop CM 40% break-even ROAS chỉ 2.5x.
- ROAS có thể fake bằng campaign retargeting chiếm 80% volume.

Cách hỏi đúng:
- "ROAS 15x là campaign nào, ngành gì, CM% bao nhiêu?"
- "Đó là ROAS campaign acquisition mới hay retargeting?"
- "Tỷ lệ ngân sách dành cho retargeting trong portfolio đó là bao nhiêu?"

Câu trả lời tốt: cụ thể, có số, có context. Câu trả lời tệ: vague, đổ lỗi platform / team trước.

## Sai lầm 2: Không test ngân sách thực 1-2 tuần

Hire dựa interview = 70% may rủi. Cách kiểm tra chính xác hơn: **trial 1-2 tuần với ngân sách nhỏ thực**.

Setup trial:
- Ngân sách: 5-15tr/2 tuần (depends scale shop)
- Quyền: full access ad manager, có thể edit listing description (không edit giá)
- KPI: define rõ ngày 1, eval ngày 14
- Bonus: trial fee 3-5tr nếu hit KPI, half nếu near miss

Trial cho phép quan sát:
- Cách họ structure campaign
- Cách họ đọc data và adjust
- Communication style (daily update?)
- Process documentation

Sau 2 tuần biết khá rõ có nên hire fulltime không.

## Sai lầm 3: Lương cố định cao thay vì base + KPI bonus

Sai: trả 25tr/tháng cố định cho ads runner mới.

Đúng: base 15-18tr + bonus 5-10tr theo KPI.

Lý do: ads runner có ngày tốt ngày xấu. Lương cố định cao = họ "nằm vùng", không proactive. Bonus theo KPI = họ care về ROAS như founder.

Structure bonus:
- 50% theo ROAS achievement
- 30% theo CPO achievement
- 20% theo qualitative (process, learning, communication)

Bonus eval hàng tháng, hiển thị transparent. Ads runner thấy được upside thì motivation cao.

![Interview process](https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=80)

## Sai lầm 4: Không có trial period (probation)

Probation 2-3 tháng là minimum cho role critical như ads runner. Vẫn lương đầy đủ nhưng cam kết 2 bên có thể terminate dễ hơn.

Trong probation:
- Tháng 1: onboard, học stack, take over campaign hiện tại
- Tháng 2: scale + optimize, KPI commitment
- Tháng 3: full responsibility, eval probation

Cuối probation, quyết định:
- Confirm: lương full + bonus structure
- Extend: 1 tháng probation thêm (rare)
- Terminate: cảm ơn và move on

Không có probation = lỡ hire wrong = mất 6 tháng + ngân sách thí nghiệm.

## Sai lầm 5: Không hỏi về unit economics, chỉ hỏi ROAS

Đây là sai lầm fatal nhất. Ads runner chỉ hiểu ROAS = không hiểu business.

Câu hỏi phải có trong interview:

1. **"Break-even ROAS shop trước là bao nhiêu? Tính thế nào?"** - test có hiểu CM% / phí sàn / COGS không
2. **"Khi nào nên giảm ROAS target để scale volume?"** - test thinking về profit max
3. **"CPO max của ngành Beauty thường là bao nhiêu? Tại sao?"** - test ngành-specific knowledge
4. **"Khi CPM tăng 40% trong 1 tuần, hành động gì?"** - test problem solving
5. **"Cách document A/B test result?"** - test process / kỷ luật

Câu trả lời tốt: dùng số cụ thể, kể framework, share past experience. Câu trả lời tệ: "Để em xem", "Phụ thuộc nhiều thứ".

## Interview questions chuẩn cho Ads runner

Bộ 10 câu hỏi tôi dùng:

| # | Câu hỏi | Đo lường |
|---|---------|----------|
| 1 | "Kể về 1 campaign fail, nguyên nhân và bài học" | Self-awareness |
| 2 | "Break-even ROAS tính thế nào?" | Unit economics |
| 3 | "Khi nào scale, khi nào pull back?" | Strategic thinking |
| 4 | "A/B test ads bạn structure thế nào?" | Process |
| 5 | "Stack tool đang dùng?" | Technical |
| 6 | "Audience saturation, fix thế nào?" | Problem solving |
| 7 | "Communicate với founder thế nào về data?" | Communication |
| 8 | "Sản phẩm shop em là gì, target audience ra sao?" | Preparation |
| 9 | "Lương expectation và lý do?" | Self-value |
| 10 | "Câu hỏi cho chúng tôi?" | Curiosity |

## Onboard 30-60-90 ngày

Sau hire, có process onboard rõ ràng:

**30 ngày đầu**:
- Tuần 1: shadow founder, học sản phẩm, brand, audience
- Tuần 2: take over 1-2 campaign hiện tại, không launch mới
- Tuần 3-4: launch 1 campaign mới với supervision

**60 ngày tiếp**:
- Take over toàn bộ campaign
- Launch 2-3 test mới
- Weekly 1-on-1 với founder

**90 ngày tiếp**:
- Full responsibility, đề xuất strategy
- Lead campaign mùa sale lớn (nếu có)
- Eval probation

## FAQ

**Hỏi: Nên hire ads runner từ agency cũ của mình không?**
Trả lời: Tốt nếu họ đã quen ngành/brand. Nhưng conflict potential với agency cũ - cần discuss rõ.

**Hỏi: Ads runner xin nghỉ sau 6 tháng làm sao?**
Trả lời: 50% case là retention issue (lương/career path), 30% là toxic environment, 20% là cá nhân. Exit interview rõ ràng, fix vấn đề trước khi hire mới.

**Hỏi: Có nên hire 2 ads runner cùng lúc cho cạnh tranh không?**
Trả lời: Không. Tạo tension không cần thiết. Hire 1 confirmed, sau 6 tháng hire thứ 2 với scope khác (vd: platform khác).

**Hỏi: Probation lương có giảm không?**
Trả lời: Không nên. Probation = 2 bên test fit, không phải "discount" cho công ty. Lương full là tôn trọng ads runner.

---

**Tools liên quan:**
- [ROAS Calculator](/tools/roas-calculator) - dùng để test ads runner có hiểu math không
- [Mẫu P&L Ecom](/tools/pnl-ecom) - shared với ads runner để align unit economics

**Đọc tiếp:**
- [Build team Ecom 0-12 người](/blog/build-team-ecom-0-12-nguoi-roadmap)
- [Outsource vs in-house](/blog/outsource-agency-vs-in-house-decision)
- [Tư duy founder ecom 2026](/blog/tu-duy-founder-ecom-2026-gmv-vs-ebitda)
- [Quy tắc 3-7-3 - dạy ads runner mới](/blog/it-chinh-ads-quy-tac-3-7-3)
`,
});

const E43 = post({
  id: "blog-E43-live-commerce-tiktok-5-sai-lam-margin-am",
  title: "Live commerce TikTok - 5 sai lầm khiến margin âm",
  slug: "live-commerce-tiktok-5-sai-lam-margin-am",
  excerpt: "Giảm sâu liên tục, voucher live không cap, depend 1 host, không track live data riêng, scale livestream quá nhanh. 5 sai lầm phá margin từ portfolio shop TikTok Shop.",
  category: "leadership",
  seoTitle: "Live commerce TikTok 5 sai lầm phá margin - cách fix 2026",
  seoDescription: "Vì sao nhiều shop live commerce TikTok GMV cao nhưng margin âm? 5 sai lầm phổ biến: giảm sâu, voucher không cap, depend host, không tracking, scale nhanh. Roadmap fix.",
  content: `
![Live commerce TikTok](https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&q=80)

"GMV live tháng này 800tr anh, đỉnh nhất từ trước tới nay!" - founder báo cáo hồ hởi. Tôi check P&L: EBITDA -7%. Live commerce tạo doanh thu lớn nhưng cũng đốt margin nhanh nhất nếu không kỷ luật.

Sau 60+ project có 20+ shop làm live commerce TikTok, tôi thấy pattern lặp lại: 5 sai lầm khiến shop GMV cao nhưng lỗ. Bài này phân tích từng sai lầm và roadmap fix.

## Sai lầm 1: Giảm sâu liên tục mỗi live

Pattern: Live 1 giảm 30%. Buyer đợi. Live 2 giảm 35%. Buyer đợi. Live 3 phải giảm 40% mới có người mua. Margin từ 25% xuống 8% trong 1 tháng.

Lý do: buyer "trained" để đợi giảm sâu hơn. Một khi train xong, không thể "untrain".

Fix:
- **Cap discount tối đa**: vd 25% giá niêm yết, không phá rào
- **Rotate SKU**: live 1 deep discount SKU A, live 2 SKU B. Không cùng SKU giảm sâu liên tục.
- **Voucher tier**: 10% đầu live, 15% cuối live (khan hiếm). Không "all 30%".
- **Bundle pricing**: bán bundle thay vì giảm SKU đơn lẻ. Bundle khó so sánh.

## Sai lầm 2: Voucher live không cap

Voucher TikTok Live thường stack được: voucher sàn + voucher shop + freeship. Buyer apply hết = giá final còn 50-55% giá niêm yết.

Vd: SKU giá 280k:
- Voucher sàn: -30k
- Voucher shop: -40k (10%)
- Freeship: -25k
- Giá final: 185k = giảm 34%

Nếu COGS 100k, phí sàn 18% (33k) → margin còn 52k = 28%. Live thêm voucher 15% nữa = margin còn 13%. Lỗ nếu cộng ads + ops.

Fix:
- **Voucher live exclusion**: voucher shop live không stack với voucher sàn
- **Min order cao**: voucher chỉ apply khi đơn >X giá trị
- **Cap tổng discount**: tính tổng tất cả voucher stack, cap 25%

![Live setup](https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80)

## Sai lầm 3: Phụ thuộc 1 host duy nhất

Host live giỏi = doanh thu spike. Host nghỉ = doanh thu rớt 60-80%.

Pattern thực tế: 1 host làm 80% GMV live. Sau 4 tháng host xin nghỉ / đòi tăng lương 3x / mở shop riêng. Shop crisis 2-3 tháng.

Fix:
- **Train 2-3 host parallel**: từ tháng đầu, không đợi crisis
- **Host rotation**: A live thứ 2-4, B live thứ 5-7. Buyer quen 2 face, không depend 1.
- **Host KPI structure**: lương base + commission % live revenue. Host bottom share <30% GMV
- **Documentation**: SOP live, script, FAQ buyer common - không depend "tự nhiên" của host

## Sai lầm 4: Không track live data riêng

Shop track GMV live tổng nhưng không break down:
- GMV theo host
- CPM live ads vs CPM organic
- CVR live vs CVR listing thông thường
- Margin/đơn live vs đơn listing

Không có data = không biết đang lỗ vì host nào, time slot nào, SKU nào.

Setup tracking tối thiểu:

| Metric | Tracking |
|--------|----------|
| GMV theo host | Daily |
| Time slot performance | Theo tuần (sáng/trưa/tối) |
| Voucher cost / GMV | Mỗi live |
| Margin/đơn live | Mỗi live |
| New buyer vs repeat | Hàng tháng |
| Ads boost live cost / GMV | Hàng tuần |

Sau 30 ngày data, identify rõ host nào / time slot nào / SKU nào có margin tốt nhất.

## Sai lầm 5: Scale live quá nhanh

Pattern: live 2/tuần margin tốt → tăng lên 5/tuần → margin rớt → tăng lên 7/tuần để "bù volume" → crisis.

Lý do scale nhanh fail:
- Host fatigue, performance giảm
- Audience saturation, viewer overlap nhiều
- Voucher cost compound (mỗi live đốt voucher)
- Inventory không kịp, stock out đột ngột

Fix: scale live giống scale ads - **không quá 1 live/tuần thêm vào schedule mỗi tháng**.

Vd timeline:
- Tháng 1: 2 live/tuần
- Tháng 2: 3 live/tuần (+1)
- Tháng 3: 4 live/tuần (+1)
- Tháng 4: 5 live/tuần (+1)

Mỗi tháng monitor: GMV/live, margin/live, ads boost cost. Nếu margin giảm >3 điểm % → pause scale, fix trước khi tăng tiếp.

## Cost structure live commerce

Đây là breakdown chi phí live commerce TikTok điển hình:

| Khoản | % GMV live |
|-------|------------|
| Phí sàn TikTok Shop | 17-20% |
| Voucher seller | 8-15% |
| Ads boost live | 8-15% |
| Affiliate / KOL fee | 5-15% |
| Host commission | 3-8% |
| Content team (live ops) | 2-5% |
| COGS | 30-45% |
| **Tổng cost** | **75-95%** |
| **Margin** | **5-25%** |

Margin live thường thấp hơn margin organic listing 5-10 điểm %. Trade-off: volume lớn hơn, brand awareness cao hơn.

## Benchmark margin live theo ngành

| Ngành | Margin live healthy | Margin live âm = warning |
|-------|---------------------|--------------------------|
| Beauty Skincare | 15-25% | <8% |
| Fashion | 10-20% | <5% |
| Mother & Baby | 15-22% | <8% |
| F&B Snack | 8-15% | <3% |
| Home & Living | 12-20% | <6% |

Nếu margin live dưới warning threshold = không tạo profit, đang đốt cash để mua GMV. Decide: tiếp tục cho brand awareness hay pause.

## Roadmap fix khi đang lỗ live

Plan 30 ngày fix:

| Tuần | Hành động |
|------|-----------|
| Tuần 1 | Setup tracking đầy đủ. Audit margin từng live trong tháng qua |
| Tuần 2 | Cap voucher, exclude stack. Rotate SKU deep discount |
| Tuần 3 | Train host #2. Document SOP live. Reduce dependence host #1 |
| Tuần 4 | Re-evaluate: margin có cải thiện? Nếu chưa → giảm tần suất live |

## FAQ

**Hỏi: TikTok Live có nên làm nếu shop nhỏ <100tr GMV?**
Trả lời: Có, nhưng start nhỏ. 1 live/tuần, 1-2 host (founder + 1 hire), voucher controlled. Test 8 tuần trước khi commit lớn.

**Hỏi: Affiliate / KOL livestream vs in-house, chọn cái nào?**
Trả lời: Stage early dùng affiliate (low fixed cost). Stage growth build in-house (margin tốt hơn). Hybrid là tối ưu nhất.

**Hỏi: Host xin tăng lương đột ngột làm sao?**
Trả lời: Đừng panic. Check market rate. Đề nghị commission cao hơn thay vì base. Đồng thời train host backup ngay.

**Hỏi: TikTok thuật toán có ưu tiên shop live nhiều hơn không?**
Trả lời: Có. Nhưng "live nhiều" không bằng "live chất lượng". Live tệ + nhiều = downrank.

---

**Tools liên quan:**
- [Mẫu P&L Ecom](/tools/pnl-ecom) - tách P&L live vs P&L organic listing
- [ROAS Calculator](/tools/roas-calculator) - tính break-even cho live commerce

**Đọc tiếp:**
- [Build team Ecom 0-12](/blog/build-team-ecom-0-12-nguoi-roadmap)
- [5 sai lầm hire Ads runner](/blog/5-sai-lam-hire-ads-runner-dau-tien)
- [Contribution Margin > ROAS](/blog/contribution-margin-quan-trong-hon-roas)
- [Cân đối chi phí ads + lợi nhuận mùa sale](/blog/can-doi-ads-loi-nhuan-mua-sale-lon)
`,
});

const E44 = post({
  id: "blog-E44-outsource-agency-vs-in-house-decision",
  title: "Khi nào outsource agency, khi nào build in-house? Decision tree cho shop ecom",
  slug: "outsource-agency-vs-in-house-decision",
  excerpt: "Decision tree dựa trên GMV, độ phức tạp ngành, tốc độ scale, chất lượng team market. Cost-benefit analysis chi tiết giữa agency vs in-house cho shop ecom Việt Nam 2026.",
  category: "leadership",
  seoTitle: "Outsource agency vs build in-house team ecom - chọn lúc nào",
  seoDescription: "Khi nào shop ecom nên dùng agency và khi nào build team in-house? Decision tree theo GMV, ngành, growth stage. Cost benefit và hybrid model phổ biến 2026.",
  content: `
![Agency vs in-house](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80)

"Anh ơi, em nên thuê agency hay tự build team marketing in-house?" - tôi nhận câu này gần như mỗi tuần. Câu trả lời không phải "cái nào tốt hơn" - mà là "**phụ thuộc growth stage và ngành**". Bài này tóm tắt decision tree tôi dùng cho client để quyết định.

## Outsource vs In-house - pros & cons

| Yếu tố | Agency outsource | In-house team |
|--------|------------------|---------------|
| Cost ban đầu | Thấp (fee theo tháng) | Cao (hire, train, equipment) |
| Cost dài hạn | Cao (15-25tr/tháng/role) | Thấp hơn 30-40% |
| Tốc độ start | Nhanh (1-2 tuần) | Chậm (1-2 tháng) |
| Quality variance | Cao (depends agency) | Thấp hơn (control được) |
| Learning curve ngành | Có sẵn experience | Cần train từ đầu |
| Dedication | Share với client khác | 100% dedicated |
| Knowledge retention | Risk khi đổi agency | Giữ trong shop |
| Scale flexibility | Dễ (tăng/giảm contract) | Khó hơn (HR commitment) |
| Brand voice consistency | Khó kiểm soát | Dễ control |

Không có cái nào tuyệt đối tốt hơn. Tùy stage.

## Tiêu chí 1: GMV/tháng

Đây là tiêu chí lớn nhất:

| GMV/tháng | Recommendation |
|-----------|----------------|
| <100tr | Agency hoặc freelancer (cost in-house không cover được) |
| 100-300tr | Agency + 1-2 in-house junior (CSKH, Content) |
| 300tr-1 tỷ | Hybrid: in-house core (Ads, Content), agency specialized (Design, KOL) |
| 1-3 tỷ | Chủ yếu in-house, agency cho project (mùa sale, launch) |
| >3 tỷ | In-house full team, agency hiếm |

Lý do: agency phí 15-25tr/tháng/role. GMV <100tr ngân sách marketing đã <30tr, không cover được agency + ads.

## Tiêu chí 2: Độ phức tạp ngành

Một số ngành cần specialized knowledge, khó hire in-house:

- **Beauty (skincare, makeup)**: cần hiểu chemistry, regulation, trend - dễ hire (nhiều người trong ngành)
- **Mother & Baby**: cần hiểu psychology mom, safety regulation - dễ hire
- **Electronics**: cần hiểu tech spec, comparison - hơi khó hire
- **F&B specialty (rượu, sữa)**: regulation phức tạp - khó hire
- **Niche/Premium**: ít người experience - khó hire, agency phù hợp

Ngành "khó hire" → start với agency, build in-house dần.

## Tiêu chí 3: Tốc độ scale

Nếu cần scale gấp (vd: vừa raise vốn, vào mùa launch):

- **Agency**: scale ngân sách x3 trong 2 tuần dễ (agency đã có team)
- **In-house**: scale x3 cần hire 2-3 người mới = 2-3 tháng

Tốc độ là lợi thế lớn của agency. Đổi lại trả premium fee.

![Decision tree](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80)

## Tiêu chí 4: Chất lượng team market

Tại HCM/HN talent ads ecom dồi dào. Tại các tỉnh khác (Đà Nẵng, Cần Thơ, Hải Phòng) talent hạn chế.

- Shop HCM/HN: in-house feasible từ stage early
- Shop tỉnh: agency phù hợp lâu hơn (đến GMV 500tr-1 tỷ)
- Shop founder remote (sống nước ngoài): hybrid với agency làm operation, freelance cho specialist

## Cost-benefit cụ thể

So sánh chi phí cho role Ads runner:

**Agency:**
- Fee: 18-25tr/tháng
- Setup fee: 5-10tr 1 lần
- Ads management fee có thể tính % ngân sách (5-10%)
- Total/năm: ~240-360tr

**In-house:**
- Lương base: 15tr × 12 = 180tr
- Bonus: 30-50tr/năm
- Bảo hiểm + thuế công ty: 25-30tr
- Equipment + workspace: 10tr
- Total/năm: ~245-270tr

Đầu năm thứ 2:
- Agency: nâng fee 15-20%, total ~290-430tr
- In-house: tăng lương 10-15%, total ~280-310tr

In-house tiết kiệm rõ rệt từ năm 2. Đó là lý do shop GMV >500tr nên build in-house.

## Hybrid model - phổ biến nhất 2026

Đa số shop GMV 300tr-1 tỷ dùng hybrid:

**In-house:**
- Ads runner (1 fulltime)
- Content (1 fulltime)
- CSKH (1-2 fulltime)
- Founder lead marketing strategy

**Outsource:**
- Designer (freelance retainer 6-8tr/tháng)
- Video edit (freelance project-based)
- KOL/Affiliate manager (agency specialized)
- Photography (project-based 1-2 lần/quý)

Total cost: ~50-70tr/tháng. Flex theo nhu cầu.

## Khi nào in-source lại sau khi outsource lâu

Sau 1-2 năm outsource, một số shop muốn build in-house. 3 tín hiệu cho biết nên switch:

1. **Cost agency vượt 30% ngân sách marketing** - quá tốn cho duy nhất 1 role
2. **Knowledge bị stuck ở agency** - khi đổi agency phải learn từ đầu
3. **Brand voice không consistent** - founder không có grip control

Migration plan 3 tháng:
- Tháng 1: hire in-house, agency vẫn lead, in-house shadow
- Tháng 2: in-house take 50% workload, agency take 50%
- Tháng 3: in-house take 80%, agency advisor role
- Tháng 4+: in-house 100%, agency only ad-hoc consultation

## Sai lầm khi outsource

3 sai lầm phổ biến với agency:

1. **Không có KPI rõ ràng trong contract**: agency cam kết "best effort", không cam kết số. Cần ROAS / CPO / volume cam kết rõ.
2. **Không có data access**: agency giữ data dashboard, không share. Khi đổi agency mất hết history.
3. **Không có exit clause**: contract 12 tháng cứng, không thể terminate sớm nếu performance kém.

Trước khi sign contract:
- KPI cụ thể trong contract
- Quyền access ad manager, GA, data raw
- Termination clause 30-60 ngày notice
- Không bao gồm ngân sách ads (agency không quản tiền mặt)

## FAQ

**Hỏi: Agency đề nghị 8% commission ngân sách ads, có nên không?**
Trả lời: % commission incentive scale ngân sách (agency muốn shop spend nhiều). Conflict of interest. Tốt hơn: flat fee + bonus theo ROAS.

**Hỏi: In-house team ổn nhưng vẫn cần thử agency không?**
Trả lời: Có. Agency offer perspective khác, network creative, benchmark cross-client. Có thể hire agency advisor 5-8tr/tháng cho insight, không thay thế in-house.

**Hỏi: Có nên hire freelancer nước ngoài để giảm cost?**
Trả lời: Risky cho ecom Việt Nam. Cần hiểu buyer Việt, sàn Việt, regulation Việt. Freelance VN từ tỉnh khác (lương thấp hơn HCM) là alternative tốt.

**Hỏi: Đổi agency mỗi 6-12 tháng có nên không?**
Trả lời: Không. Mỗi lần đổi mất 1-2 tháng onboard. Đổi chỉ khi performance miss KPI nghiêm trọng.

---

**Tools liên quan:**
- [Mẫu P&L Ecom](/tools/pnl-ecom) - tính % chi phí marketing trên doanh thu
- [ROAS Calculator](/tools/roas-calculator) - đánh giá agency performance

**Đọc tiếp:**
- [Build team Ecom 0-12 người](/blog/build-team-ecom-0-12-nguoi-roadmap)
- [5 sai lầm hire Ads runner](/blog/5-sai-lam-hire-ads-runner-dau-tien)
- [Tư duy founder ecom 2026](/blog/tu-duy-founder-ecom-2026-gmv-vs-ebitda)
- [Live commerce 5 sai lầm](/blog/live-commerce-tiktok-5-sai-lam-margin-am)
`,
});

const E45 = post({
  id: "blog-E45-tu-duy-founder-ecom-2026-gmv-vs-ebitda",
  title: "Tư duy mới của founder ecom 2026 - Từ GMV sang EBITDA",
  slug: "tu-duy-founder-ecom-2026-gmv-vs-ebitda",
  excerpt: "Vì sao GMV trở thành 'vanity metric' năm 2026 và founder ecom cần shift sang EBITDA + LTV. Case study 2 shop: GMV cao EBITDA âm vs GMV vừa EBITDA cao.",
  category: "mindset",
  seoTitle: "Tư duy founder ecom 2026 - GMV không còn quan trọng, EBITDA mới là",
  seoDescription: "Vì sao GMV trở thành vanity metric 2026? Founder ecom cần shift mindset sang EBITDA + LTV. Case study, KPI mới phải track, cách convince stakeholder về metric mới.",
  content: `
![Founder mindset ecom](https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=80)

"Em vừa hit 5 tỷ GMV/tháng anh!" - founder hớn hở. Tôi hỏi: "EBITDA?". Founder lúng túng: "Em chưa tính, để em hỏi kế toán...". Đây là câu chuyện điển hình của founder ecom Việt năm 2024-2025: chasing GMV mà không biết có lãi thật không.

Năm 2026 không thể tiếp tục như vậy. Chi phí cạnh tranh tăng, buyer deal-driven, capital tightening. Founder nào còn chasing GMV sẽ "thành công ảo" và burn out cash.

Bài này tóm tắt shift mindset cần thiết cho founder ecom 2026: từ GMV sang EBITDA + LTV.

## Tại sao GMV trở thành 'vanity metric' 2026

GMV (Gross Merchandise Value) = tổng doanh thu trước trả hàng. Là metric dễ đo, dễ khoe, dễ pitch investor.

Nhưng GMV không tính:
- Phí sàn (18-22%)
- COGS (30-45%)
- Voucher seller (5-15%)
- Ads cost (15-25%)
- Ops cost (8-12%)
- Hoàn hàng (5-12%)

Tổng cost có thể đến 80-95% GMV. Lãi thực 5-20%.

Năm 2020-2022, khi vốn rẻ và sàn còn growth-driven, GMV là KPI hợp lý. Năm 2026:
- Vốn đắt (lãi suất cao, VC thận trọng)
- Phí sàn tăng (Shopee +2%, TikTok +1.5%)
- Buyer deal-driven (chỉ mua khi có voucher deep)
- Cạnh tranh khắc nghiệt (1 ngành 200-500 shop)

GMV cao mà EBITDA âm = đang bù cho buyer, không build value.

## 3 yếu tố cost tăng năm 2026

### Phí sàn

| Sàn | 2022 | 2024 | 2026 |
|-----|------|------|------|
| Shopee | 5-8% | 10-15% | 18-22% |
| TikTok Shop | 5% | 8-12% | 15-20% |
| Lazada | 6-10% | 12-16% | 18-22% |

Phí sàn 2026 ăn gần 20% revenue. Năm 2022 chỉ ăn 6-8%. Margin compress mạnh.

### Ads cost

CPM trung bình 2026 tăng 60-100% so với 2022. Lý do: competitor lớn vào ecom, audience saturation, sàn tăng số seller.

### Ops cost

Lương nhân sự tăng 20-30% từ 2022. Lương CSKH HCM từ 6tr lên 9tr, lương ads runner từ 12tr lên 18tr.

Tổng impact: margin shop ecom 2026 thấp hơn 2022 trung bình 12-18 điểm %.

## Buyer ngày càng deal-driven, repeat rate khó

Hành vi buyer Việt Nam 2026:
- 78% buyer dùng voucher mỗi lần mua
- 65% so sánh ít nhất 3 shop trước khi mua
- 52% mua từ shop khác lần tiếp theo (không repeat)
- AOV trung bình giảm 8% so với 2024 (deal hunting)

Implication: getting buyer dễ (ads + voucher), giữ buyer khó. LTV = AOV × Repeat Rate × Lifespan giảm năm sau năm.

![Buyer behavior](https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80)

## Shift sang EBITDA + LTV

### EBITDA là gì

EBITDA = Earnings Before Interest, Tax, Depreciation, Amortization = lợi nhuận hoạt động.

Cho ecom shop, công thức đơn giản:

EBITDA = Revenue - COGS - Phí sàn - Voucher - Ads - Ops - Lương

EBITDA % healthy theo growth stage:
- Launch (0-6 tháng): -5% đến 5%
- Scale (6-18 tháng): 8-15%
- Mature (18+ tháng): 15-25%
- Premium niche: 25-35%

### LTV là gì

LTV = Lifetime Value = tổng revenue 1 buyer mang lại trong vòng đời quan hệ.

LTV = AOV × Repeat Rate × Avg Lifespan (tháng)

Vd: AOV 280k, repeat 1.4 lần/buyer, lifespan 8 tháng → LTV = 280k × 1.4 × 8 = 3.1tr/buyer.

LTV gấp CAC (Cost to Acquire Customer) ≥3x mới healthy.

## Case study 1: Shop GMV cao EBITDA âm

Anonymized shop Fashion HCM:
- GMV: 5.2 tỷ/tháng
- Revenue (sau hoàn): 4.6 tỷ
- COGS: 2.1 tỷ (45%)
- Phí sàn: 920tr (20%)
- Voucher: 580tr (12.6%)
- Ads: 850tr (18.5%)
- Ops + Lương: 380tr (8.3%)
- **EBITDA: -230tr (-5%)**

Founder pitch investor "5 tỷ GMV/tháng, scale x10 trong 12 tháng". Investor pass vì EBITDA âm.

Vấn đề: voucher 12.6% và ads 18.5% quá cao - phụ thuộc discount để generate GMV.

## Case study 2: Shop GMV vừa EBITDA cao

Anonymized shop Beauty Skincare niche:
- GMV: 850tr/tháng
- Revenue (sau hoàn): 780tr
- COGS: 230tr (30%)
- Phí sàn: 156tr (20%)
- Voucher: 47tr (6%)
- Ads: 117tr (15%)
- Ops + Lương: 56tr (7%)
- **EBITDA: 174tr (22%)**

Founder pitch investor "850tr GMV nhưng 22% EBITDA, niche moat" - investor invest.

Vấn đề ngược: shop nhỏ về GMV nhưng healthy về unit economics. Scale từ baseline này tạo profit, không tạo lỗ.

## KPI mới founder phải track hàng tuần

3 KPI mới thay thế GMV:

1. **EBITDA % weekly** - track trend, không chỉ monthly
2. **CM% (Contribution Margin)** - sức khoẻ unit economics
3. **LTV / CAC ratio** - sức khoẻ acquisition

Bonus 2 KPI bổ sung:
- **Repeat purchase rate** monthly cohort
- **Cash conversion cycle** - thời gian từ chi đến thu

Dashboard founder 2026 phải có 5 KPI này, KHÔNG có GMV.

## Convince stakeholder về metric mới

Đổi metric không dễ vì:
- Investor cũ quen GMV
- Team marketing được train theo GMV
- Bonus structure có thể link GMV
- Industry benchmark khoe GMV

Cách convince:
- Show case study (như 2 case study trên)
- Pitch EBITDA growth song song với GMV
- Báo cáo monthly có cả 2: GMV và EBITDA, nhưng EBITDA là chính
- Bonus team marketing link EBITDA không link GMV

Sau 6 tháng team sẽ quen, không quay lại được.

## Mindset shift cụ thể

| Mindset cũ | Mindset mới |
|------------|-------------|
| Scale GMV mọi giá | Scale EBITDA, GMV là output |
| Voucher deep để win sale | Voucher cap để giữ margin |
| Hit ranking sàn để brand | Hit profit để sustainable |
| Hire để có team đông | Hire để có productivity cao |
| Chase ROAS cao | Chase profit/đơn cao |
| Out-spend competitor | Out-execute competitor |

## FAQ

**Hỏi: Có nên track GMV không khi đã shift sang EBITDA?**
Trả lời: Có, nhưng là secondary. GMV cho biết market position, EBITDA cho biết financial health. Track cả 2.

**Hỏi: Investor mới có chấp nhận pitch không GMV không?**
Trả lời: Investor sophisticated chấp nhận. Investor amateur vẫn ưa GMV. Pitch tùy audience.

**Hỏi: Team cũ resist mindset mới làm sao?**
Trả lời: Education trước, change incentive sau. Workshop 4-6 tuần về unit economics. Sau đó change bonus structure.

**Hỏi: EBITDA âm trong launch phase có acceptable không?**
Trả lời: Có, 6-12 tháng đầu EBITDA -5% đến 5% là OK. Sau 12 tháng vẫn âm = vấn đề structural.

---

**Tools liên quan:**
- [Mẫu P&L Ecom](/tools/pnl-ecom) - tính EBITDA chính xác
- [ROAS Calculator](/tools/roas-calculator) - check break-even và LTV/CAC

**Đọc tiếp:**
- [P&L 5 tầng cho ecom](/blog/pl-gian-hang-tmdt-5-tang-chuan)
- [Contribution Margin > ROAS](/blog/contribution-margin-quan-trong-hon-roas)
- [EBITDA bao nhiêu là khoẻ cho shop ecom 2026](/blog/ebitda-bao-nhieu-la-khoe-cho-shop-ecom)
- [Build team Ecom 0-12 người](/blog/build-team-ecom-0-12-nguoi-roadmap)
`,
});

const D34 = post({
  id: "blog-D34-tam-ly-mua-sam-theo-mua-strategy-ads",
  title: "Tâm lý mua sắm theo mùa - Mỗi quý một strategy ads riêng",
  slug: "tam-ly-mua-sam-theo-mua-strategy-ads",
  excerpt: "Q1 post-Tết sức mua thấp, Q2 mid-year sale, Q3 back-to-school, Q4 mega sale. Ngân sách, creative angle, ROAS target và inventory plan cho từng quý.",
  category: "performance",
  seoTitle: "Strategy ads ecom theo quý 2026 - calendar marketing 12 tháng",
  seoDescription: "Tâm lý mua sắm theo mùa 4 quý ecom Việt Nam: Q1 thấp điểm, Q2 mid-year, Q3 back-to-school, Q4 mega sale. Strategy ads + ngân sách + inventory cho từng quý.",
  content: `
![Seasonal marketing](https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80)

"Doanh thu tháng 2 rớt 60% so với tháng 12 anh ơi, em phải làm gì?" - founder hoảng. Đáp án: "Đó là quy luật mùa vụ, ngân sách tháng 2 nên cắt 50%, không phải scale". Không hiểu mùa = lãng phí ngân sách hoặc bỏ lỡ cơ hội.

Bài này tóm tắt 4 quý của thị trường ecom Việt Nam 2026 với strategy cụ thể cho từng quý - dựa trên data 60+ shop trong 3 năm gần nhất.

## Q1 (Tháng 1-3): Post-Tết, sức mua thấp

Pattern Q1 ecom Việt Nam:
- Tháng 1: nửa đầu peak (chuẩn bị Tết), nửa cuối off (Tết)
- Tháng 2: sức mua rớt 50-70% (1 tuần Tết + hậu Tết yếu)
- Tháng 3: warm-up dần, đến cuối tháng gần normal

Strategy Q1:
- **Ngân sách**: giảm 40-60% so với Q4
- **Mục tiêu**: maintain learning data, không scale
- **Creative**: theme "khởi đầu năm mới", "thanh lọc sau Tết"
- **Voucher**: deeper hơn bình thường để kích cầu
- **ROAS target**: chấp nhận giảm 15-20%

Ngành ngoại lệ: ngành hậu Tết bùng nổ là Beauty (làm đẹp đầu năm), Sports (resolution fitness), Fashion (đổi tủ đồ).

## Q2 (Tháng 4-6): Mid-year sale, sức mua tăng dần

Pattern Q2:
- Tháng 4: ổn định, average performance
- Tháng 5: tăng nhẹ, prep cho 5.5 và 6.6
- Tháng 6: peak với 6.6, sau đó stable

Strategy Q2:
- **Ngân sách**: 100-110% baseline
- **Mục tiêu**: test SKU mới, build creative inventory cho Q3-Q4
- **Creative**: theme "mùa hè", "back-to-summer"
- **Mega sale 6.6**: 3 phase strategy (pre-during-post)
- **ROAS target**: baseline

![Quarterly trends](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80)

## Q3 (Tháng 7-9): Back-to-school, niche peak

Pattern Q3:
- Tháng 7: hè peak cho 1 số ngành (Sports, du lịch, đồ chơi), low cho ngành khác
- Tháng 8: prep cho 8.8 và back-to-school
- Tháng 9: peak Mother & Baby, Stationery, Fashion học sinh

Strategy Q3:
- **Ngân sách**: 110-130% cho ngành seasonal (M&B, học sinh)
- **Mục tiêu**: capture back-to-school momentum
- **Creative**: theme "nuôi dạy", "trở lại trường"
- **Mega sale 9.9**: tiền đề cho 11.11
- **ROAS target**: baseline cho hầu hết ngành

Ngành non-seasonal trong Q3 thường yếu hơn 5-10%, là thời điểm tốt để optimize/test.

## Q4 (Tháng 10-12): Mega sale, peak season

Pattern Q4:
- Tháng 10: prep cho 10.10 và 11.11
- Tháng 11: peak với 11.11, sau đó stable cao
- Tháng 12: peak với 12.12 và chuẩn bị Tết (sau 15/12 nhu cầu quà Tết)

Strategy Q4:
- **Ngân sách**: 150-200% baseline (cao nhất năm)
- **Mục tiêu**: tối đa volume, accept margin thấp hơn
- **Creative**: theme "sale", "year-end", "Tết premium" cho tháng 12
- **Mega sale**: 11.11, 12.12 strategy 3 phase
- **ROAS target**: giảm 20-30% chấp nhận để win volume

Q4 thường chiếm 35-45% doanh thu cả năm. Prep 2-3 tháng trước.

## Calendar marketing 2026 chi tiết

| Tháng | Sự kiện chính | Sức mua | Ngân sách (% baseline) |
|-------|---------------|---------|----------------------|
| 1 | Pre-Tết, Tết | High đầu, off cuối | 80% |
| 2 | Hậu Tết | Very low | 40-50% |
| 3 | Mar warm-up | Recovery | 70-80% |
| 4 | Mid-spring | Average | 100% |
| 5 | 5.5 sale | Above avg | 110% |
| 6 | 6.6 mega sale | High | 130% |
| 7 | Mid-summer | Mixed | 90% |
| 8 | 8.8, prep back-to-school | Rising | 110% |
| 9 | 9.9, back-to-school | High | 120% |
| 10 | 10.10, prep 11.11 | Rising | 130% |
| 11 | 11.11 mega sale | Peak | 180% |
| 12 | 12.12, Tết prep | Peak | 170% |

Đây là baseline. Adjust theo ngành cụ thể.

## Cash flow planning theo quý

Một sai lầm thường gặp: spend Q4 lớn không tính cash flow.

Q4 ngân sách 180% × 3 tháng = 5.4 tháng ngân sách spend trong 3 tháng. Nhưng sàn giữ tiền 14-30 ngày → cash in của Q4 chỉ về Q1 năm sau (lúc sức mua thấp).

Cash flow nguy hiểm: Q4 spend cao, Q1 thu Q4 nhưng phải spend thêm Q1, tổng cash outflow Q4 + Q1 = 1.5x bình thường.

Plan:
- Build cash buffer Q3 (mùa thấp điểm, cash conversion ổn)
- Working capital loan có thể cần cho Q4 (lending bank rate ưu đãi)
- Cắt ngân sách Q1 đầu năm sau (sức mua thấp, không lãng phí)

## Inventory planning đón đầu mỗi mùa

Mỗi quý cần inventory plan 2 tháng trước:

- **Q1**: ít stock, đủ baseline (sàn lễ Tết delivery chậm)
- **Q2**: build stock cho 6.6 từ tháng 4-5
- **Q3**: build stock M&B/School từ tháng 7-8
- **Q4**: build stock peak từ tháng 9-10, hold đến 12

Stock out trong peak = mất 30-50% revenue mùa đó + buyer trust loss.

## ROAS target adjust theo quý

| Quý | ROAS target adjustment | Lý do |
|-----|------------------------|-------|
| Q1 (Feb) | -20% | Sức mua thấp, audience expensive |
| Q1 (Mar) | -10% | Recovery |
| Q2 | Baseline | Normal |
| Q2 (6.6) | -15% trong 2 tuần sale | Volume push |
| Q3 (Aug-Sep) | +5% cho non-seasonal | Audience thấp competition |
| Q4 (Oct) | -10% prep 11.11 | Warm audience |
| Q4 (11.11, 12.12) | -25-30% trong sale | Win volume |
| Q4 (post-sale) | +10% | Lock margin |

## FAQ

**Hỏi: Ngành niche không seasonal có cần follow quy luật trên không?**
Trả lời: Một phần. Vẫn bị ảnh hưởng macro (Tết, sale 11.11). Nhưng amplitude nhỏ hơn 30-50%.

**Hỏi: Year 1 chưa có data của shop, dùng calendar trên có ổn không?**
Trả lời: Baseline. Sau 12 tháng có data riêng để tinh chỉnh. Đừng máy móc, theo dõi và adjust.

**Hỏi: Mùa Tết âm lịch khác Tết dương lịch, ảnh hưởng ra sao?**
Trả lời: Calendar trên theo Tết âm. Tết dương chỉ peak nhẹ ở ngành quà tặng cuối tháng 12.

**Hỏi: Có nên skip Q1 hoàn toàn không?**
Trả lời: Không. Maintain campaign always-on giúp algorithm giữ data, không reset. Cắt ngân sách 40-50% chứ không 100%.

---

**Tools liên quan:**
- [ROAS Calculator](/tools/roas-calculator) - adjust ROAS target theo quý
- [Mẫu P&L Ecom](/tools/pnl-ecom) - simulate scenario mỗi quý

**Đọc tiếp:**
- [Chạy ads xuyên Tết không lãng phí](/blog/chay-ads-xuyen-tet-khong-lang-phi)
- [Sau Tết - Khởi động ads nhanh](/blog/sau-tet-khoi-dong-ads-nhanh)
- [Mùa sale lớn 11.11, 12.12 - 3 phase strategy](/blog/mua-sale-lon-chien-luoc-ads-3-phase)
- [Cân đối chi phí ads + lợi nhuận sale lớn](/blog/can-doi-ads-loi-nhuan-mua-sale-lon)
`,
});

const D35 = post({
  id: "blog-D35-chay-ads-xuyen-tet-khong-lang-phi",
  title: "Chạy ads xuyên Tết thế nào để không lãng phí ngân sách?",
  slug: "chay-ads-xuyen-tet-khong-lang-phi",
  excerpt: "Lịch ads Tết chi tiết: 7 ngày trước peak push, 23-29 âm giảm 70%, mùng 1-3 off, mùng 4-7 warm-up. Ngành ngoại lệ và sai lầm phổ biến tránh.",
  category: "performance",
  seoTitle: "Chạy ads xuyên Tết 2026 - lịch cụ thể không lãng phí ngân sách",
  seoDescription: "Lịch ads ecom xuyên Tết Nguyên Đán 2026: 7 ngày peak push, 23-29 âm giảm 70%, mùng 1-3 off, mùng 4-7 warm-up. Ngành ngoại lệ, retargeting strategy, common mistake.",
  content: `
![Tet ads strategy](https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80)

Tết là thời điểm gây mất tiền nhiều nhất cho seller ecom nếu không có strategy rõ ràng. Có shop spend 50tr/ngày trong 3 ngày Tết, có shop tắt hoàn toàn 10 ngày - cả 2 đều không tối ưu.

Bài này tóm tắt lịch ads Tết tôi dùng cho client - đã test qua 3 mùa Tết, tối ưu balance giữa cost saving và momentum preservation.

## Tâm lý buyer mỗi giai đoạn Tết

5 giai đoạn của Tết ecom:

| Giai đoạn | Lịch âm | Tâm lý buyer |
|-----------|---------|--------------|
| Tiền Tết peak | 15-22 âm | Mua quà, dọn nhà, đồ trang trí |
| Cận Tết | 23-29 âm | Mua đồ cần gấp, sợ ship muộn |
| Tết chính | Mùng 1-3 | Off mode, không mua sắm |
| Hậu Tết sớm | Mùng 4-7 | Lì xì xong, bắt đầu mua nhẹ |
| Recovery | Sau mùng 7 | Trở lại bình thường |

Strategy ads phải match từng giai đoạn.

## Giai đoạn 1: 7 ngày trước Tết (15-22 âm)

Đây là **peak duy nhất** của Q1. Sức mua tăng 80-150% so với baseline.

Strategy:
- **Ngân sách**: tăng 150-200% baseline
- **Mục tiêu**: maximize volume, accept margin thấp hơn
- **Creative**: theme "quà Tết", "chuẩn bị Tết", "freeship cuối Tết"
- **ROAS target**: giảm 15-20%
- **Time window**: focus 18-22h tối, 12-14h trưa (peak time)

Ngành performance cao: Beauty, Fashion, Đồ Tết, Snack/Bánh kẹo, Mỹ phẩm gift set.

## Giai đoạn 2: 23-29 âm (cận Tết)

Sức mua giảm dần 50% so với 15-22 âm. Lý do: buyer lo ship không kịp Tết.

Strategy:
- **Ngân sách**: giảm dần từ 100% xuống 30% baseline
- **Mục tiêu**: chỉ catch buyer "mua đồ cần ngay" + retargeting
- **Creative**: theme "shop còn ship đến...", "đơn cuối nhận trước Tết"
- **ROAS target**: baseline
- **Hành động đặc biệt**: hiển thị rõ "ship đến ngày X" trên listing

Sau 27-28 âm, sàn TMĐT phần lớn ngừng ship. Tắt 90% ads, giữ 10% cho retargeting.

![Tet schedule](https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80)

## Giai đoạn 3: Mùng 1-3 Tết (off mode)

Đây là **off ads hoàn toàn** đối với ~90% ngành. Lý do:
- Buyer không mua sắm online
- Sàn không ship (logistic nghỉ)
- Algorithm wastes budget (impression nhiều, đơn không có)

Strategy:
- **Ngân sách**: off hoàn toàn hoặc 5-10% baseline cho retargeting buyer cũ
- **Mục tiêu**: rest, plan tháng 2
- **Creative**: theme "Chúc Tết", brand awareness (nếu chạy)
- **Note**: algorithm bị reset 3 ngày off không phải vấn đề lớn

Ngành ngoại lệ (vẫn chạy mùng 1-3):
- Đặc sản, quà Tết miền (ship sau Tết)
- Beauty premium (chuẩn bị Tết muộn)
- Du lịch booking

## Giai đoạn 4: Mùng 4-7 (warm-up nhẹ)

Sức mua bắt đầu trở lại nhưng chỉ 30-40% baseline. Buyer có lì xì → spend nhẹ nhưng deal-sensitive.

Strategy:
- **Ngân sách**: 30-50% baseline
- **Mục tiêu**: warm-up audience, build data cho recovery
- **Creative**: theme "khởi đầu năm mới", "lì xì voucher"
- **ROAS target**: chấp nhận giảm 20-25%
- **Voucher**: deeper hơn bình thường để kích cầu

## Giai đoạn 5: Sau mùng 7 (recovery)

Sức mua tăng dần đến mid-February ổn định (vẫn thấp hơn baseline 20-30%).

Strategy:
- **Ngân sách**: tăng dần từ 50% lên 80% baseline trong 2 tuần
- **Mục tiêu**: re-train algorithm, test SKU mới
- **Creative**: theme "khởi đầu năm mới", "thanh lọc sau Tết"
- **ROAS target**: giảm 10-15% so với baseline

Đến tháng 3, return về baseline.

## Ngành ngoại lệ

3 nhóm ngành có pattern khác:

### 1. Ngành quà Tết / đặc sản

Peak từ 8 âm đến 27 âm, sau đó off đến mùng 7. Strategy:
- Ngân sách peak 200-250% baseline
- Voucher deep cuối peak để clear stock
- Sau mùng 7 ngừng hẳn đến Tết năm sau (hoặc clearance sale)

### 2. Ngành thiết yếu (gia dụng cơ bản, vệ sinh)

Sức mua giảm nhẹ hơn, chỉ -30-40% trong Tết. Strategy:
- Giảm ngân sách 50% trong mùng 1-3
- Không off hoàn toàn
- Retargeting buyer cũ mạnh

### 3. Ngành Beauty premium / Skincare cao cấp

Peak kéo dài đến mùng 10 (mom đẹp đón Tết). Strategy:
- Giữ ngân sách 60-70% trong mùng 1-7
- Push retargeting buyer ATC từ pre-Tết
- Theme "tự thưởng đầu năm"

## Sai lầm phổ biến

### Tắt hoàn toàn 10 ngày

Tắt 100% trong 10 ngày = algorithm reset, mất 2 tuần để stable lại sau Tết. Tốt hơn: giảm 80-90% nhưng giữ campaign live.

### Chạy full ngân sách mùng 1-3

Tốn 5-10tr/ngày trong khi đơn 0. Hoàn toàn lãng phí, đốt cash flow đầu năm.

### Không adjust creative cho Tết

Chạy creative thường ngày trong giai đoạn Tết = thông điệp không relevant, CTR rớt 40-50%.

### Không inform buyer về schedule ship

Buyer đặt mùng 1 và đợi mãi không nhận → review xấu → loss trust dài hạn. Pin notice "Ship lại từ mùng X" trên listing.

## Retargeting strategy Tết

Tết là cơ hội retargeting tốt nhất cả năm:
- Buyer 3-6 tháng trước → remind với voucher Tết
- Buyer ATC chưa mua → push với deadline Tết
- Buyer cao giá trị → premium gift set offer

Setup:
- 3 audience riêng: 0-30 ngày, 30-90 ngày, 90-180 ngày
- Bid cao hơn 30-50% cho audience 0-30 ngày
- Creative khác biệt cho mỗi audience

## FAQ

**Hỏi: Algorithm reset sau 10 ngày tắt có recoverable không?**
Trả lời: Có nhưng mất 2 tuần để stable. Đó là lý do nên giảm chứ không tắt hoàn toàn.

**Hỏi: Ngân sách cho Tết tổng nên là bao nhiêu?**
Trả lời: Pre-Tết peak có thể chiếm 30-40% ngân sách tháng. Trong Tết chỉ 5-10%. Hậu Tết tăng dần.

**Hỏi: Có nên launch SKU mới trong giai đoạn Tết không?**
Trả lời: Không. Launch SKU cần learning data ổn định. Đợi sau mùng 15 âm khi market stable.

**Hỏi: Tết dương lịch (1/1) có cần strategy riêng không?**
Trả lời: Có nhưng nhẹ. Sức mua giảm 15-20% trong 1-2 ngày, không phải 10 ngày như Tết âm. Giảm ngân sách 30% trong 31/12 - 2/1.

---

**Tools liên quan:**
- [ROAS Calculator](/tools/roas-calculator) - tính ROAS target adjust trong Tết
- [Mẫu P&L Ecom](/tools/pnl-ecom) - plan cash flow Tết

**Đọc tiếp:**
- [Sau Tết - Khởi động ads nhanh](/blog/sau-tet-khoi-dong-ads-nhanh)
- [Tâm lý mua sắm theo mùa](/blog/tam-ly-mua-sam-theo-mua-strategy-ads)
- [Mùa sale lớn 11.11, 12.12](/blog/mua-sale-lon-chien-luoc-ads-3-phase)
- [Quy tắc 3-7-3 - ít chỉnh ads](/blog/it-chinh-ads-quy-tac-3-7-3)
`,
});

const D36 = post({
  id: "blog-D36-sau-tet-khoi-dong-ads-nhanh",
  title: "Sau Tết - Khởi động ads nhanh và hiệu quả",
  slug: "sau-tet-khoi-dong-ads-nhanh",
  excerpt: "Tránh sai lầm spend full budget tuần đầu sau Tết. Warm-up audience 7-10 ngày trước khi scale, voucher mix deeper, theme creative phù hợp. Checkpoint metric mỗi tuần.",
  category: "performance",
  seoTitle: "Khởi động ads sau Tết 2026 - cách warm-up không lãng phí ngân sách",
  seoDescription: "Hướng dẫn khởi động ads sau Tết Nguyên Đán: warm-up 7-10 ngày, voucher mix deeper, creative theme khởi đầu năm, checkpoint metric mỗi tuần. Tránh sai lầm spend full sớm.",
  content: `
![Post-Tet ads](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80)

"Tết xong em đẩy ngân sách x2 ngay tuần đầu để bù lại doanh thu Tết - sao ROAS rớt thê thảm anh?" - đây là pattern lặp lại mỗi năm sau Tết. Sức mua sau Tết yếu, đẩy full budget = đốt tiền.

Bài này tóm tắt strategy 4 tuần sau Tết để khởi động ads nhanh nhưng hiệu quả, không lãng phí cash flow đầu năm.

## Tại sao sức mua sau Tết yếu kéo dài

Pattern thường thấy:
- Mùng 4-7 âm: sức mua 30-40% baseline
- Mùng 8-15 âm: tăng lên 50-65%
- Mùng 16-30 âm: 70-85%
- Sau ngày 30 âm: ổn định ~85-95% baseline
- Mid-March: trở về 100% baseline

Lý do tâm lý:
- Buyer vừa chi tiêu nhiều Tết, ngân sách cá nhân tight
- Lì xì xong, có cash nhưng "tiết kiệm cho năm mới"
- Tâm lý "không vội mua" sau peak season
- Sàn cũng giảm push campaign (sale lớn rất ít trong Q1)

Sức mua yếu kéo dài 4-6 tuần - đó là realistic expectation.

## Sai lầm 'spend như mùa peak' và hậu quả

Founder mới hay nghĩ: "Spend nhiều để bù lại Tết off". Hành động:
- Đẩy ngân sách +50% so với pre-Tết
- Mở loạt campaign mới
- Voucher deep để "kích cầu"

Hậu quả sau 2-3 tuần:
- CPM cao (audience yếu nhưng bid cao)
- CVR thấp (buyer chưa sẵn sàng)
- ROAS rớt 40-60%
- Margin/đơn âm hoặc rất mỏng
- Ngân sách hết sớm, không còn cho phần còn lại của tháng

Đây là cách đốt 60-100tr trong 2 tuần đầu năm.

## Tuần 1 sau Tết: Warm-up với 30% ngân sách

Tuần đầu sau khi sàn ship lại (thường mùng 4-7 âm), strategy:
- **Ngân sách**: 30% baseline pre-Tết
- **Mục tiêu**: re-train algorithm, không scale
- **Creative**: theme "lì xì khởi đầu năm", "thanh lọc sau Tết" (Beauty)
- **Voucher**: deeper hơn baseline 20-30%
- **ROAS target**: chấp nhận thấp hơn baseline 25%

Tuần này là "wake up" cho algorithm sau 10 ngày off. Cần data refresh trước khi scale.

![Post-tet recovery](https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80)

## Tuần 2: Tăng lên 60% nếu CTR và CVR ổn

Checkpoint cuối tuần 1:
- CTR đạt benchmark ngành (>1%): pass
- CVR ≥ 70% baseline pre-Tết: pass
- CPM trong range bình thường: pass
- CPO ≤ baseline +15%: pass

Nếu pass 3/4 → tăng ngân sách lên 60% baseline.

Nếu fail >2/4 → giữ 30%, audit campaign:
- Creative có match seasonality không
- Audience đã refresh chưa
- Voucher mix có đủ deeper không

Tuần 2 strategy:
- **Ngân sách**: 60% baseline
- **Mục tiêu**: stable performance
- **Creative**: same theme tuần 1
- **ROAS target**: -15-20% baseline

## Tuần 3-4: Full budget khi data stable

Checkpoint cuối tuần 2:
- Đơn hàng đạt 60-70% baseline: pass
- ROAS đạt 80% baseline: pass
- CPM ổn định không spike: pass

Tuần 3-4:
- **Ngân sách**: 80% (tuần 3), 100% (tuần 4)
- **Mục tiêu**: trở về baseline
- **Creative**: bắt đầu test new angle cho Q2
- **ROAS target**: baseline -10% (tuần 3), baseline (tuần 4)

## Bảng schedule chi tiết

| Tuần sau Tết | Ngân sách (% baseline) | ROAS target adjust | Hành động |
|--------------|------------------------|--------------------|-----------|
| Tuần 1 (mùng 4-10 âm) | 30% | -25% | Warm-up, re-train |
| Tuần 2 | 60% | -20% | Stable, audit |
| Tuần 3 | 80% | -15% | Scale dần |
| Tuần 4 | 100% | -10% | Full baseline |
| Tuần 5-6 (giữa tháng 2 âm) | 100% | -5% | Test SKU mới |
| Tuần 7-8 (cuối tháng 2 - tháng 3) | 100-110% | baseline | Recovery hoàn toàn |

## Creative angle sau Tết

3 angle work tốt trong Q1 hậu Tết:

### "Khởi đầu năm mới"

- Theme: cải thiện bản thân, đạt mục tiêu năm
- Phù hợp: Sports, Fitness, Beauty, Skincare, Self-improvement
- Hook: "Năm mới, X mới", "Bắt đầu lại từ"

### "Thanh lọc sau Tết"

- Theme: detox, làm sạch sau ăn uống nhiều Tết
- Phù hợp: Beauty Skincare, F&B healthy, Fitness
- Hook: "Da xỉn sau Tết?", "Bụng to sau Tết?"

### "Tự thưởng"

- Theme: thưởng bản thân sau 1 năm vất vả
- Phù hợp: Beauty premium, Fashion, Home & Living
- Hook: "Tự thưởng đầu năm", "Bạn xứng đáng"

## Voucher mix sau Tết

Voucher Q1 nên deeper hơn baseline 20-30% để kích cầu:

| Loại voucher | Baseline | Sau Tết (Q1) |
|--------------|----------|--------------|
| Voucher đơn đầu | 8% | 12% |
| Voucher từ X | 50k off đơn 500k | 70k off đơn 500k |
| Freeship | Đơn >250k | Đơn >180k |
| Bundle | Mua 2 -10% | Mua 2 -15% |

Sau khi sức mua return baseline (mid-March), pull voucher về normal.

## Track sức mua qua CTR và CVR

Đây là 2 chỉ số leading cho biết sức mua đã trở lại chưa:

- **CTR < 80% baseline**: sức mua còn yếu, giữ ngân sách thấp
- **CTR > 90% baseline**: signal recovery, có thể scale
- **CVR < 70% baseline**: buyer browsing không mua, giữ
- **CVR > 85% baseline**: scale OK

Audit weekly, không daily (data ngày bị noise).

## FAQ

**Hỏi: Tuần 1 sau Tết có nên launch SKU mới không?**
Trả lời: Không. Launch SKU cần learning data. Sức mua yếu Q1 = data không đại diện. Đợi tuần 5-6 sau Tết.

**Hỏi: Ngân sách bị cắt 70% trong tuần 1, có làm team marketing bị stress không?**
Trả lời: Có nếu không communicate. Briefing team trước Tết về plan 4 tuần để align expectation.

**Hỏi: Có nên tận dụng audience tích luỹ pre-Tết không?**
Trả lời: Có. Retargeting buyer pre-Tết là campaign ROAS cao nhất tuần 1-2 sau Tết (8-12x). Tăng share ngân sách retargeting lên 30-40%.

**Hỏi: Nếu cuối tuần 2 CTR/CVR chưa đạt 80% baseline?**
Trả lời: Giữ ngân sách 60%, audit deeper. Có thể vấn đề ở creative outdated hoặc voucher không đủ deep.

---

**Tools liên quan:**
- [ROAS Calculator](/tools/roas-calculator) - adjust target từng tuần
- [Mẫu P&L Ecom](/tools/pnl-ecom) - check cash flow Q1

**Đọc tiếp:**
- [Chạy ads xuyên Tết không lãng phí](/blog/chay-ads-xuyen-tet-khong-lang-phi)
- [Tâm lý mua sắm theo mùa](/blog/tam-ly-mua-sam-theo-mua-strategy-ads)
- [Quy tắc 3-7-3 - ít chỉnh ads](/blog/it-chinh-ads-quy-tac-3-7-3)
- [Đọc data ads khi chưa có đơn](/blog/doc-data-ads-khi-chua-co-don-dung-dung-som)
`,
});

const D37 = post({
  id: "blog-D37-mua-sale-lon-chien-luoc-ads-3-phase",
  title: "Mùa sale lớn (11.11, 12.12) - Chiến lược ads 3 phase chi tiết",
  slug: "mua-sale-lon-chien-luoc-ads-3-phase",
  excerpt: "Pre-sale (warm audience, build wishlist), Sale day (push aggressive, auto-bid scale), Post-sale (retargeting cart abandon). Timeline + ngân sách + creative cho từng phase.",
  category: "performance",
  seoTitle: "Mùa sale 11.11, 12.12 - chiến lược ads 3 phase chi tiết 2026",
  seoDescription: "Strategy ads ecom cho 11.11, 12.12 2026: pre-sale warm audience, sale day push aggressive, post-sale retargeting. Timeline 14 ngày, ngân sách phân bổ, inventory prep.",
  content: `
![Mega sale ads](https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80)

11.11 và 12.12 là 2 ngày chiếm 15-25% doanh thu năm của shop ecom. Nhưng cũng là 2 ngày dễ "fail" nhất nếu strategy sai. Có shop spend 200tr trong 11.11 chỉ thu 600tr (ROAS 3x, dưới break-even nhiều ngành).

Bài này tóm tắt strategy 3 phase tôi dùng cho client - đã test qua 4 mùa sale, average ROAS 5-7x trong sale day.

## 3 phase tổng quát

| Phase | Timing | Ngân sách share | Mục tiêu |
|-------|--------|-----------------|----------|
| Pre-sale | 10-14 ngày trước | 30% | Warm audience, wishlist |
| Sale day | D-day + 1 (24-48h) | 50% | Push aggressive, volume |
| Post-sale | 2-3 ngày sau | 20% | Retargeting abandon |

Phân bổ này tối ưu cho mega sale như 11.11, 12.12. Mid-sale (5.5, 6.6, 9.9) có thể giảm pre-sale xuống 25%, post-sale tăng 25%.

## Phase 1: Pre-sale (10-14 ngày trước)

Mục tiêu pre-sale **KHÔNG** phải bán hàng. Mục tiêu là:
- Warm audience để algorithm hiểu buyer mới
- Build wishlist (buyer "lưu" sản phẩm chờ sale)
- Test creative cho D-day
- Increase shop traffic (sàn ưu tiên shop active pre-sale)

Strategy pre-sale:
- **Ngân sách**: 100-130% baseline
- **Creative**: theme "Chuẩn bị 11.11", "Săn deal sớm", "Wishlist now"
- **Voucher**: small voucher 5-8% (không deep, save cho D-day)
- **Audience**: broad, build lookalike, retargeting buyer cũ
- **ROAS target**: -10% baseline (chấp nhận thấp vì warm phase)

Format ads work tốt pre-sale:
- Video "Sneak peek" deal D-day
- Image "Add to wishlist - sale 11.11"
- Carousel SKU sẽ giảm

![Pre-sale phase](https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80)

## Phase 2: Sale day (D-day + 1)

Đây là phase "all-in". Strategy:

### Trước D-day 24h
- Switch bid sang "Maximize Conversions" / "Auto Bid"
- Tăng ngân sách x3-5 baseline
- Push retargeting wishlist buyer

### D-day 0-12h
- Ngân sách peak: x5-7 baseline
- Voucher deep nhất trong ngày
- Live commerce song song (tăng 2x lịch bình thường)
- Push notification, email reminder

### D-day 12-24h
- Maintain ngân sách peak
- Voucher countdown "còn 6h - 3h - 1h"
- Urgency messaging strong

### D-day +1 (ngày kế tiếp)
- Ngân sách 80% D-day (extension day)
- "Bạn lỡ 11.11? Còn 24h" messaging
- Voucher = 70-80% deal D-day

Strategy D-day:
- **Ngân sách**: 400-700% baseline trong 48h
- **Creative**: countdown, urgency, social proof (số đơn đã bán hôm nay)
- **Voucher**: max stack được phép, all-in
- **Audience**: chủ yếu retargeting pre-sale + buyer cũ
- **ROAS target**: -25-30% baseline (chấp nhận margin thấp)

## Phase 3: Post-sale (2-3 ngày sau)

Phase này thường bị bỏ qua nhưng ROI cực cao. Buyer "miss" sale rất nhiều, retargeting họ với "second chance":

Strategy:
- **Ngân sách**: 150-200% baseline trong 3 ngày
- **Creative**: "Lỡ 11.11? Còn 1 voucher cuối"
- **Voucher**: 70-80% deal D-day (gần bằng nhưng không bằng)
- **Audience**: ATC abandon, wishlist, view product 11.11
- **ROAS target**: baseline (post-sale audience high intent)

Average ROAS post-sale 6-10x cho client - cao hơn cả D-day vì target tốt hơn.

## Timeline chi tiết 14 ngày

| Day | Phase | Action |
|-----|-------|--------|
| D-14 đến D-10 | Pre-sale early | Audience build, lookalike |
| D-9 đến D-5 | Pre-sale mid | Wishlist push, creative test |
| D-4 đến D-1 | Pre-sale late | Retargeting wishlist, voucher teaser |
| D-1 đêm | Pre-day | Notification "Sale bắt đầu lúc 0h" |
| D-day 0-24h | Sale day | All-in, peak ngân sách |
| D-day +1 | Extension | 80% ngân sách D-day |
| D+2 đến D+4 | Post-sale | Retargeting abandon |
| D+5 onwards | Recovery | Trở về baseline |

## Ngân sách phân bổ chi tiết

Với shop ngân sách marketing mùa 11.11 = 500tr:

| Phase | Days | Ngân sách | % total |
|-------|------|-----------|---------|
| Pre-sale early (D-14 đến D-10) | 5 | 50tr | 10% |
| Pre-sale mid (D-9 đến D-5) | 5 | 75tr | 15% |
| Pre-sale late (D-4 đến D-1) | 4 | 25tr | 5% |
| Sale day (D + D+1) | 2 | 250tr | 50% |
| Post-sale (D+2 đến D+4) | 3 | 100tr | 20% |
| **Total** | **19 days** | **500tr** | **100%** |

## Voucher strategy theo phase

| Phase | Voucher mix | Notes |
|-------|-------------|-------|
| Pre-sale early | Voucher 5-8% | Teaser nhẹ |
| Pre-sale late | Voucher 10%, freeship | Build expectation |
| Sale D-day | Voucher deep 15-30%, stack max | All-in |
| Sale D+1 | Voucher 12-25% | Extension nhưng nhẹ hơn |
| Post-sale | Voucher 15-20%, countdown | Last chance |

Quan trọng: Pre-sale tuyệt đối KHÔNG dùng voucher deeper hơn D-day. Buyer sẽ "train" để mua pre-sale thay vì D-day.

## Inventory prep

Stock target cho mega sale = 1.5-2x daily volume bình thường × 19 ngày phase.

Vd: shop bán 30 đơn/ngày bình thường, mega sale prep:
- Daily peak D-day: 200-300 đơn
- Total mega sale stock: ~2.000-3.000 unit

Stock out trong D-day = mất 30-50% revenue mùa.

Best practice: stock thừa 20% còn hơn thiếu 5%. Stock thừa clear sau sale với discount nhẹ.

## Team prep

Mega sale require team scale tạm thời:
- **CSKH**: x2-3 lực lượng bình thường, mở ca tối + đêm D-day
- **Fulfillment**: x2 capacity, có thể outsource warehouse temp
- **Live commerce host**: backup ít nhất 1 host phụ
- **Ads runner**: stay alert 24h D-day để adjust

## Post-mortem mỗi mùa sale

Sau mỗi mega sale, review kỹ trong 7 ngày:

| Metric | Target | Actual | Variance | Action |
|--------|--------|--------|----------|--------|
| GMV mega sale | X | Y | % | - |
| ROAS sale day | X | Y | % | - |
| CPO sale day | X | Y | % | - |
| Margin/đơn | X | Y | % | - |
| Stock out rate | <5% | Y | - | - |
| CS response time | <30 phút | Y | - | - |

Document insight (gì work, gì fail) - làm reference cho mùa sale tiếp.

## FAQ

**Hỏi: Mid-sale (5.5, 6.6, 9.9) có cần 3 phase như mega sale không?**
Trả lời: Có nhưng nhỏ hơn. Pre-sale 5-7 ngày (thay vì 14), ngân sách share giống nhau.

**Hỏi: Ngân sách mega sale lấy từ đâu nếu cash flow tight?**
Trả lời: 3 cách: (1) tiết kiệm Q3 build cash buffer, (2) working capital loan ngắn hạn 30-60 ngày, (3) reduce ngân sách non-sale months.

**Hỏi: Nếu post-sale phase 1 mùa lỗ thì sao?**
Trả lời: Cắt ngân sách post-sale -50% mùa sau. Test lại sau 2 mùa. Có thể audience đặc thù không retargeting tốt.

**Hỏi: ROAS sale day nên target bao nhiêu?**
Trả lời: Baseline -25-30%. Vd baseline 6x → target 4.2-4.5x trong D-day. Đó là trade-off chấp nhận để win volume + market share.

---

**Tools liên quan:**
- [ROAS Calculator](/tools/roas-calculator) - tính break-even cho mega sale với voucher deep
- [Mẫu P&L Ecom](/tools/pnl-ecom) - simulate P&L mega sale

**Đọc tiếp:**
- [Cân đối ads + lợi nhuận sale lớn](/blog/can-doi-ads-loi-nhuan-mua-sale-lon)
- [Tâm lý mua sắm theo mùa](/blog/tam-ly-mua-sam-theo-mua-strategy-ads)
- [Sau sale 5 việc 7 ngày](/blog/sau-sale-top-5-viec-7-ngay)
- [Scale ngân sách x3 giảm ROAS target](/blog/scale-x3-giam-roas-target-tai-sao-dung)
`,
});

const D38 = post({
  id: "blog-D38-can-doi-ads-loi-nhuan-mua-sale-lon",
  title: "Cân đối chi phí ads và lợi nhuận khi sale lớn - Không bị lỗ",
  slug: "can-doi-ads-loi-nhuan-mua-sale-lon",
  excerpt: "Sale lớn = volume tăng nhưng margin/đơn giảm 30-50%. Cách giữ EBITDA dương khi vẫn aggressive ads. P&L scenario mega sale chi tiết và CPO ceiling 11.11/12.12.",
  category: "ecom",
  seoTitle: "Cân đối ads + lợi nhuận mùa sale lớn - giữ EBITDA dương 2026",
  seoDescription: "Hướng dẫn balance giữa ads spend và profit trong mega sale 11.11/12.12: CPO ceiling, voucher cap, ngân sách x2-3 nhưng vẫn EBITDA dương. P&L scenario chi tiết.",
  content: `
![Profit balance sale](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80)

"Sale 11.11 GMV em x4 so với tháng bình thường nhưng end-month tính lại EBITDA âm" - founder thất vọng. Đây là pattern phổ biến: mega sale tạo GMV ấn tượng nhưng đốt margin nếu không control.

Bài này tóm tắt cách balance giữa aggressive ads và profit preservation trong mega sale - dựa trên 20+ mega sale tôi đã coach client qua.

## Tại sao margin/đơn giảm trong mùa sale

3 yếu tố nén margin trong mega sale:

### 1. Voucher deep

Sale day voucher deep 20-30%. Cộng voucher sàn + freeship = total discount 25-40%.

Vd SKU 280k baseline:
- Voucher shop 15%: -42k
- Voucher sàn 10%: -28k
- Freeship: -25k
- Giá final buyer trả: 185k
- COGS 100k, phí sàn 33k (18% giá final), ads 35k → còn 17k margin (6%)

So với bình thường margin 25%, mega sale margin chỉ 6%. Drop 19 điểm %.

### 2. CPM ads tăng

CPM mega sale tăng 50-100% vì:
- Tất cả seller đẩy ngân sách
- Audience prime bị cạnh tranh
- Sàn release inventory ads nhưng demand vượt

CPM cao → CPO cao → ads share/revenue tăng từ 18% lên 28-35%.

### 3. Operational cost spike

- CSKH overtime (1.5-2x lương)
- Fulfillment thuê temp worker
- Logistics phí cao mùa peak
- Warehouse capacity tăng

Ops từ 8% revenue lên 12-15%.

Tổng impact: margin/đơn giảm 30-50% so với non-sale.

## Tính EBITDA target cho mùa sale

Mega sale EBITDA target nên là: **EBITDA% bình thường - 8-12 điểm %**

Vd: EBITDA bình thường 18% → target mega sale 6-10%.

Nếu EBITDA mega sale < 5% = đang đốt margin để mua GMV vanity. Cần review strategy.

Công thức quick check break-even mega sale:

**Break-even revenue mega sale = Total cost mega sale / (1 - CM% mega sale)**

Vd:
- Total cost mega sale: 800tr (ads + voucher + COGS + ops mega)
- CM% mega sale: 15%
- Break-even revenue: 800 / (1 - 0.85) = ~940tr

Nếu projected revenue mega sale < 940tr → đang plan để lỗ.

![EBITDA balance](https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80)

## CPO ceiling cao hơn nhưng vẫn có cap

Sale day CPO ceiling nên cao hơn baseline 20-30% (không phải unlimited):

| Ngành | CPO ceiling baseline | CPO ceiling sale day | Cap đỏ |
|-------|----------------------|----------------------|--------|
| Beauty | 65k | 85k | >100k |
| Fashion | 75k | 95k | >115k |
| M&B | 90k | 115k | >135k |
| Home & Living | 80k | 100k | >120k |
| F&B | 45k | 60k | >75k |
| Electronics | 110k | 140k | >170k |

Khi CPO vượt "cap đỏ" trong sale day = pull back ngân sách. Đốt thêm = lỗ chắc.

## Voucher cap

Voucher mega sale phải có cap tổng (kể cả stack):

| Layer voucher | Cap khuyên |
|---------------|------------|
| Voucher shop seller | 15% giá niêm yết |
| Voucher sàn | 10% giá (tùy sàn) |
| Freeship | 5-8% giá |
| Cashback (nếu có) | 3-5% |
| **Cap tổng stack** | **30% giá niêm yết** |

Cap 30% giữ margin ở khoảng healthy. Stack vượt 35-40% → margin gần như chắc chắn âm.

Setup cap trên sàn:
- Min order áp dụng voucher (đẩy AOV up)
- Exclude voucher seller với voucher sàn (chọn 1 trong 2)
- Cap tổng VND discount/đơn

## P&L scenario mega sale

So sánh 2 scenario:

### Scenario A - Aggressive không cap

- Revenue: 1.5 tỷ
- COGS (35%): 525tr
- Phí sàn (18%): 270tr
- Voucher (18%): 270tr
- Ads (25%): 375tr
- Ops (12%): 180tr
- Lương: 80tr
- **EBITDA: -200tr (-13%)**

GMV 1.5 tỷ nhưng lỗ 200tr. "Thành công ảo".

### Scenario B - Balanced với cap

- Revenue: 1.2 tỷ (volume thấp hơn 20%)
- COGS (35%): 420tr
- Phí sàn (18%): 216tr
- Voucher (cap 12%): 144tr
- Ads (cap 20%): 240tr
- Ops (10%): 120tr
- Lương: 80tr
- **EBITDA: -20tr (-1.7%)**

GMV thấp hơn 20% nhưng EBITDA gần break-even thay vì -200tr.

Trade-off: 300tr revenue đổi lấy 180tr profit improvement. Đáng giá.

## Ads spend cap

Tổng ads spend mega sale cap = revenue × (CM% - target EBITDA%)

Vd: revenue projection 1.2 tỷ, CM 25%, target EBITDA 5% → ads cap = 1.2 × (25% - 5%) = 240tr

Nếu spend hơn 240tr → EBITDA dưới target, có thể âm.

Trong sale day, monitor real-time:
- Hourly ads spend
- Hourly revenue
- Hourly ratio = revenue/spend = ROAS

Nếu hourly ROAS < break-even × 1.2 trong 3 giờ liên tục → pause expansion, giữ baseline.

## Inventory prep balance

Stock prep cho mega sale = 1.5-2x daily volume sale (xem bài trước).

Risk:
- Stock thiếu → mất revenue, mất buyer trust
- Stock thừa → cash flow stuck, clearance discount

Best practice:
- Stock = 1.5x projected sale volume
- Buffer 20% với SKU best-seller
- Post-sale (D+5 trở đi) clearance nhẹ với SKU thừa

Đừng stock 3x "phòng hờ". Cash flow risk cao hơn revenue lỡ.

## Cash flow: dự phòng 2 tuần delay payment

Mega sale spike ads + voucher costs ngay D-day, nhưng sàn payment delay 14-30 ngày. Cash gap:

| Day | Cash outflow | Cash inflow | Net |
|-----|--------------|-------------|-----|
| D-day | 250tr (ads + voucher) | 0 | -250tr |
| D+7 | 50tr | 100tr (partial) | +50tr |
| D+14 | 30tr | 400tr | +370tr |
| D+30 | 20tr | 600tr | +580tr |

Cần cash buffer ít nhất 250-300tr trước mega sale. Nếu không, mega sale phá cash flow.

## Post-sale review profit

Sau mỗi mega sale, audit thật:

1. **Revenue thực** (sau hoàn, sau adjust)
2. **Total cost** (ads + voucher + COGS + ops)
3. **EBITDA absolute** + EBITDA %
4. **CPO trung bình** sale day
5. **Voucher cost / revenue**
6. **CM% mega sale** vs baseline

Nếu EBITDA âm hoặc CM giảm >12 điểm % → strategy sai. Tighten cap mùa sau.

## FAQ

**Hỏi: Có nên skip mega sale nếu cash flow tight?**
Trả lời: Có thể participate nhỏ. Ngân sách x1.5-2 baseline (không x5-7), voucher cap 20% (không 30%). Vẫn growth, không phá cash.

**Hỏi: Mega sale lỗ nhưng GMV tăng có giá trị brand không?**
Trả lời: Một phần. Lỗ <5% có thể acceptable cho brand momentum. Lỗ >15% chỉ là "đốt tiền mua vanity".

**Hỏi: Sàn ép participate voucher deep, không tham gia thì algorithm down-rank, làm sao?**
Trả lời: Tham gia minimum required. Tăng voucher seller (kiểm soát) thay vì voucher sàn (không kiểm soát). Có shop opt-out hoàn toàn vẫn sustainable nếu organic strong.

**Hỏi: Sau 1 mega sale lỗ, có nên skip mega sale tiếp theo không?**
Trả lời: Không skip mà tighten cap. Pre-sale 1 mùa tiếp với cap voucher 25%, ads ceiling baseline +50%. Audit kỹ.

---

**Tools liên quan:**
- [Mẫu P&L Ecom](/tools/pnl-ecom) - simulate P&L scenario mega sale
- [ROAS Calculator](/tools/roas-calculator) - tính break-even với voucher deep
- [Tool tính phí sàn](/tools/tinh-phi-san) - check phí sàn impact margin sale day

**Đọc tiếp:**
- [Mùa sale lớn 11.11, 12.12 - 3 phase](/blog/mua-sale-lon-chien-luoc-ads-3-phase)
- [Sau sale 5 việc 7 ngày](/blog/sau-sale-top-5-viec-7-ngay)
- [Contribution Margin > ROAS](/blog/contribution-margin-quan-trong-hon-roas)
- [P&L 5 tầng cho ecom](/blog/pl-gian-hang-tmdt-5-tang-chuan)
`,
});

export const BATCH_2_3_POSTS: DraftPost[] = [
  B15, B16, B17, B20, B21, B23, B24, B25, B11, B12,
  E41, E42, E43, E44, E45,
  D34, D35, D36, D37, D38,
];

export const BATCH_2_3_IDS = new Set(BATCH_2_3_POSTS.map((p) => p.id));
