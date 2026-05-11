/**
 * Group A - 10 bài Phí sàn TikTok Shop & Shopee 2026.
 * Nội dung viết hoàn thiện, sẵn sàng publish (đã qua mắt SEO + structure).
 * Nguồn data: bảng phí mới TikTok 09/05/2026, Shopee 08/05/2026, kinh nghiệm 60+ project.
 */

export type FullPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: number;
  publishedAt: string;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  /** Markdown content - convert to portable text in seed route */
  content: string;
};

export const GROUP_A_POSTS: FullPost[] = [
  /* ───────────── Bài 1 ───────────── */
  {
    id: "blog-A1-phi-shopee-2026",
    title: "Phí Shopee 2026 - Bảng đầy đủ + So sánh chi tiết với TikTok Shop",
    slug: "phi-shopee-2026-vs-tiktok",
    excerpt:
      "Shopee áp bảng phí mới từ 08/05/2026. Hoa hồng 11–18%, phí giao dịch 6%, phí cơ sở hạ tầng 3.000đ/đơn. So sánh chi tiết từng ngành với TikTok Shop và ví dụ tính thực tế.",
    category: "shopee",
    readTime: 8,
    publishedAt: "2026-05-10T11:00:00.000Z",
    featured: true,
    seoTitle: "Phí Shopee 2026 - Bảng phí đầy đủ + So sánh TikTok Shop",
    seoDescription:
      "Cập nhật bảng phí Shopee 2026 hiệu lực 08/05/2026: hoa hồng 11–18% theo ngành, phí giao dịch 6%, CSHT 3.000đ/đơn. So sánh trực tiếp với TikTok Shop và ví dụ tính từng ngành.",
    content: `
Từ 08/05/2026, Shopee Việt Nam áp dụng bảng phí mới - gần như cùng thời điểm với đợt điều chỉnh phí của TikTok Shop ngày 09/05/2026. Bài viết này tổng hợp đầy đủ bảng phí Shopee 2026, so sánh chi tiết với TikTok Shop ở từng ngành hàng, và ví dụ tính phí thực tế giúp seller ra quyết định ưu tiên platform nào.

## Tóm tắt thay đổi phí Shopee từ 08/05/2026

Đợt điều chỉnh 05/2026 của Shopee có 4 thay đổi chính seller cần biết:

• **Hoa hồng Non-Mall** tăng trung bình 0.5–1% so với bảng cũ, hiện dao động **11%–15%** tuỳ ngành.

• **Hoa hồng Mall** tăng mạnh hơn, lên **13%–18%** - ngành Sức khoẻ Làm đẹp Mall chạm 18%.

• **Phí giao dịch giữ nguyên 6%** trên (Giá bán + Phí ship buyer trả − Voucher seller).

• **Phí cơ sở hạ tầng (CSHT)** thêm 3.000đ/đơn cho cả Mall và Non-Mall.

> Lưu ý quan trọng: Phí được tính theo **ngành cấp 3** (leaf category), không phải ngành cấp 1. Sản phẩm đặt sai ngành có thể bị áp nhầm mức phí cao hơn 1–3%.

## Bảng phí Shopee 2026 - theo ngành hàng

Dưới đây là bảng phí hoa hồng Shopee 2026 cho các ngành phổ biến nhất:

**Beauty & Sức khoẻ Làm đẹp:** Non-Mall 14% - Mall 18% (cao nhất toàn sàn)

**Fashion / Thời trang:** Non-Mall 12% - Mall 15%

**F&B / Thực phẩm khô:** Non-Mall 11% - Mall 13%

**Electronics / Điện tử & Phụ kiện:** Non-Mall 11% - Mall 13%

**Home & Living:** Non-Mall 12% - Mall 15%

**Mother & Baby:** Non-Mall 13% - Mall 16%

Cộng thêm phí giao dịch 6% và phí CSHT 3.000đ/đơn -> **tổng phí Shopee** dao động 17.5%–24% tuỳ ngành và phân khúc.

## So sánh trực tiếp Shopee vs TikTok Shop 2026

Đây là so sánh tổng phí (hoa hồng + giao dịch + CSHT) cho sản phẩm 300.000đ, ship buyer trả 25.000đ, không voucher seller:

**Beauty Non-Mall:** Shopee ~21.4% - TikTok ~21.8%. Chênh lệch không đáng kể, ưu thế thuộc về platform có ROAS cao hơn.

**Fashion Non-Mall:** Shopee ~19.5% - TikTok ~20%. Chênh 0.5%.

**F&B Non-Mall:** Shopee ~18.3% - TikTok ~18.8%. Shopee hơn 0.5%.

**Mall (mọi ngành):** Shopee thấp hơn TikTok khoảng 0.3–0.5% nhờ phí CSHT đôi khi không tính cho Mall lớn.

**Kết luận**: Phí Shopee và TikTok 2026 chênh lệch rất nhỏ (<1%). Quyết định chọn platform không nên dựa vào phí mà nên dựa vào: ROAS tự nhiên, đặc tính ngành hàng, năng lực vận hành của shop.

## Phí giao dịch 6% - Tại sao cao hơn bạn nghĩ?

Nhiều seller hiểu lầm phí giao dịch tính trên Giá bán đơn thuần. Thực tế công thức cả Shopee và TikTok đều là:

> **Phí giao dịch = (Giá bán + Phí ship buyer trả − Voucher seller) × 6%**

Ví dụ: Sản phẩm 300.000đ, buyer trả phí ship 25.000đ, seller giảm voucher 30.000đ:
Phí giao dịch = (300.000 + 25.000 − 30.000) × 6% = **17.700đ**

Nếu chỉ tính trên giá bán: 300.000 × 6% = 18.000đ - gần bằng nhưng không chính xác.

Lưu ý: Voucher Shopee Mall (do Shopee tài trợ) **không được trừ** khỏi base tính phí giao dịch - chỉ voucher seller tự chi mới được trừ.

## Phí cơ sở hạ tầng (CSHT) - 3.000đ/đơn

Phí CSHT (còn gọi là phí xử lý đơn hoặc service fee) là khoản 3.000đ/đơn hoàn thành mà cả Shopee và TikTok đều thu để duy trì hệ thống. Đặc điểm:

• **Cố định 3.000đ** - không tỷ lệ % với giá bán
• Áp dụng cho mọi đơn hoàn thành thành công
• Không áp dụng nếu đơn bị huỷ trước khi giao

Đây là lý do shop có AOV thấp (sản phẩm <50.000đ) bị ảnh hưởng phí % cao hơn - 3.000đ trên đơn 50.000đ tương đương 6% phí cố định.

## Ví dụ tính phí thực tế - Sản phẩm Beauty Non-Mall 280.000đ

Giả sử bán sản phẩm Beauty 280.000đ trên Shopee Non-Mall, buyer trả ship 25.000đ, seller chi voucher 3% = 8.400đ:

**Trên Shopee 2026:**
• Phí hoa hồng: 280.000 × 14% = 39.200đ
• Phí giao dịch: (280.000 + 25.000 − 8.400) × 6% = 17.796đ
• Phí CSHT: 3.000đ
• **Tổng phí Shopee thu: 59.996đ (21.4% giá bán)**
• Seller nhận về: 280.000 − 8.400 (voucher) − 59.996 = 211.604đ

**Trên TikTok Shop 2026:**
• Phí hoa hồng: 280.000 × 14.5% = 40.600đ
• Phí giao dịch: (280.000 + 25.000 − 8.400) × 6% = 17.796đ
• Phí CSHT: 3.000đ
• **Tổng phí TikTok thu: 61.396đ (21.9% giá bán)**

Chênh lệch giữa 2 sàn chỉ ~1.400đ/đơn cho sản phẩm 280.000đ.

## Lời khuyên thực chiến từ 60+ project

**1. Đừng chọn platform vì phí - chọn vì ROAS tự nhiên.** Chênh lệch 0.5–1% phí không đáng kể so với ROAS chênh lệch 2–5x giữa 2 nền tảng tuỳ ngành.

**2. Beauty và Mother&Baby - TikTok có ưu thế live commerce.** ROAS organic từ live thường gấp 1.5–2x Shopee.

**3. Electronics, Home & Living - Shopee thường ổn định hơn.** Buyer Shopee có thói quen mua đồ "thực dụng" tốt hơn buyer TikTok.

**4. Mall hay Non-Mall - quyết định theo gross margin.** Gross margin > 45% mới nên cân nhắc Mall (chênh phí 3–5% phải bù bằng badge thương hiệu và ưu tiên hiển thị).

**5. Build P&L với buffer 1–2% margin** cho đợt tăng phí tiếp theo. Shopee và TikTok thường tăng phí 1–2 lần/năm.

Lấy số phí chính xác cho ngành cụ thể của bạn tại [Tool tính phí sàn](/tools/tinh-phi-san), và tính break-even ROAS dựa trên cấu trúc chi phí thực tế tại [ROAS Calculator](/tools/roas-calculator).
`,
  },

  /* ───────────── Bài 2 ───────────── */
  {
    id: "blog-A2-mall-vs-non-mall",
    title: "Mall vs Non-Mall - Khi nào nên upgrade lên Shopee/TikTok Mall?",
    slug: "mall-vs-non-mall-khi-nao-upgrade",
    excerpt:
      "Shopee Mall và TikTok Shop Mall có phí cao hơn Non-Mall 3–5% - đổi lại được badge thương hiệu và ưu tiên hiển thị. Phân tích 6 tiêu chí quyết định khi nào nên upgrade.",
    category: "ecom",
    readTime: 7,
    publishedAt: "2026-05-10T11:30:00.000Z",
    featured: true,
    seoTitle: "Mall vs Non-Mall - Khi nào nên upgrade Shopee/TikTok Mall?",
    seoDescription:
      "Phân tích chi tiết Mall vs Non-Mall: chênh phí 3–5%, lợi ích badge và hiển thị, 6 tiêu chí quyết định upgrade. Số liệu thực từ 60+ project ecom.",
    content: `
"Có nên đăng ký Mall hay không?" là câu hỏi tôi nhận từ ít nhất 5 client mỗi tháng. Quyết định Mall vs Non-Mall không chỉ là vấn đề phí - nó liên quan trực tiếp tới chiến lược thương hiệu, gross margin, và năng lực vận hành. Bài viết này phân tích 6 tiêu chí quan trọng nhất giúp bạn ra quyết định đúng.

## Mall vs Non-Mall - Khác biệt cốt lõi

**Phí sàn cao hơn 3–5%:**
• Shopee Mall vs Non-Mall: chênh 2–4% hoa hồng (tuỳ ngành)
• TikTok Mall vs Non-Mall: chênh 2.5–3.5% hoa hồng

**Lợi ích Mall:**
• Badge "Shopee Mall" / "TikTok Shop Mall" - buyer tin tưởng hơn
• Ưu tiên hiển thị trong search và recommendation
• Cam kết đổi trả 7 ngày, freeship voucher do sàn tài trợ
• Tham gia campaign Mall riêng (megasale Mall)

**Yêu cầu để được Mall:**
• Sở hữu nhãn hiệu hoặc giấy uỷ quyền nhãn hiệu hợp lệ
• Đủ doanh thu tối thiểu (Shopee Mall thường yêu cầu GMV ≥ 200tr/tháng trong 3 tháng liên tục)
• Cam kết SLA giao hàng và CSKH cao hơn

## Tiêu chí 1 - Gross Margin của sản phẩm

Đây là yếu tố quan trọng nhất. Mall thêm 3–5% phí - bạn cần gross margin đủ cao để hấp thụ.

**Gross margin > 50%:** Upgrade Mall ngay khi đủ điều kiện. Phí thêm 3–5% chỉ ăn 6–10% gross margin, vẫn còn rất nhiều buffer cho ads và profit.

**Gross margin 40–50%:** Cân nhắc. Mall thêm phí làm CM giảm 10–13%. Cần thêm ROAS từ visibility boost để bù.

**Gross margin < 40%:** Đừng vội. Phí thêm sẽ ăn gần hết operating profit. Nên fix gross margin trước (giảm COGS, tăng AOV bằng bundle) rồi mới Mall.

## Tiêu chí 2 - Brand awareness hiện tại

Mall mang lại lợi ích lớn nhất khi shop **chưa có brand awareness**. Buyer mới biết shop sẽ tin badge Mall hơn shop "lạ".

Ngược lại, shop đã có lượng follower lớn (>100k) và repeat buyer cao có thể không cần Mall - buyer đã quen brand rồi. Một số shop large brand lại cố tình ở Non-Mall để giữ giá cạnh tranh.

## Tiêu chí 3 - Ngành hàng và buyer behavior

**Beauty, Health, Mother & Baby:** Mall rất quan trọng. Buyer các ngành này quan tâm chính hãng/giả, badge Mall là trust signal lớn. Conversion rate Mall thường cao hơn Non-Mall 15–30%.

**Fashion:** Mall ưu thế ở phân khúc trung-cao cấp (>200k/sản phẩm). Phân khúc giá thấp (<150k), buyer ít quan tâm Mall mà chú trọng giá.

**F&B:** Mall không bắt buộc nếu là sản phẩm thông dụng. Quan trọng hơn là review và rating.

**Electronics:** Mall gần như bắt buộc. Buyer rất sợ hàng giả/fake - không có Mall thì khó scale.

**Home & Living:** Mall có lợi nhưng không critical. Sản phẩm to (>500k) cần Mall, sản phẩm nhỏ thì không.

## Tiêu chí 4 - GMV hiện tại và growth stage

**< 100tr GMV/tháng:** Quá sớm cho Mall. Tập trung scale Non-Mall, build review base, học vận hành.

**100–500tr GMV/tháng:** Đây là vùng sweet spot để cân nhắc Mall. ROI từ Mall (visibility + trust) bắt đầu thực sự matter ở quy mô này.

**> 500tr GMV/tháng:** Nên đã ở Mall. Nếu chưa, đang miss revenue đáng kể.

## Tiêu chí 5 - Năng lực vận hành (SLA + CSKH)

Mall yêu cầu SLA cao hơn:
• Tỷ lệ giao đúng hạn ≥ 95%
• Tỷ lệ phản hồi chat trong 1h ≥ 80%
• Tỷ lệ đánh giá 5 sao ≥ 4.7

Không đáp ứng nổi -> Mall cấm hoặc downgrade. Tốn công upgrade rồi bị cấm là tệ hơn không Mall ngay từ đầu.

## Tiêu chí 6 - Cạnh tranh trong ngành

Check trực tiếp: tìm 5 keyword chính của ngành bạn trên Shopee/TikTok, đếm tỷ lệ Mall ở top 10 search results.

**> 70% top 10 là Mall:** Bắt buộc Mall để cạnh tranh visibility. Non-Mall sẽ không bao giờ rank top.

**40–70% Mall:** Mall có lợi nhưng không bắt buộc. Có thể compete bằng review + voucher + ads.

**< 40% Mall:** Có thể skip Mall, tập trung sức mạnh khác.

## Decision Tree - Có nên Mall không?

**Step 1**: Gross margin có > 45%? Nếu KHÔNG -> Fix gross margin trước, đừng Mall.

**Step 2**: GMV có > 200tr/tháng (Shopee) hoặc > 150tr/tháng (TikTok)? Nếu KHÔNG -> Scale Non-Mall trước.

**Step 3**: Ngành có thuộc Beauty/Health/Mother&Baby/Electronics? Nếu CÓ -> Ưu tiên Mall, weight cao.

**Step 4**: Năng lực vận hành đủ SLA Mall? Nếu KHÔNG -> Build team trước.

**Step 5**: Top 10 search ngành có > 50% là Mall? Nếu CÓ -> Mall = bắt buộc để cạnh tranh.

3+ điều kiện CÓ -> Đăng ký Mall. < 3 điều kiện -> Hold lại.

## Sai lầm phổ biến khi upgrade Mall

**1. Upgrade quá sớm** - chưa đủ GMV, chưa đủ team SLA. Kết quả: phí cao hơn nhưng không có revenue boost tương xứng.

**2. Đợi quá lâu** - đã mất 6+ tháng revenue tiềm năng. Mall mở khoá visibility và trust mà Non-Mall không bao giờ có.

**3. Upgrade Mall xong không invest creative đẹp hơn.** Mall là badge thương hiệu - phải có creative xứng tầm. Hình sản phẩm xấu = Mall mất ý nghĩa.

**4. Không track ROI Mall riêng.** Sau 3 tháng Mall, phải đo: revenue tăng bao nhiêu %, conversion rate có lift không, SKU nào hưởng lợi nhiều nhất.

## Lời khuyên thực chiến

Mall không phải "upgrade là tốt". Nó là một quyết định chiến lược cần align với gross margin, brand position, và năng lực team. Tôi đã thấy nhiều shop upgrade Mall sai timing và bị âm cash trong 2-3 tháng đầu vì phí tăng nhưng revenue chưa kịp lift.

Cách an toàn: thử Mall ở **1 platform** trước (Shopee hoặc TikTok), đo ROI 90 ngày, nếu ổn mới expand sang platform thứ 2.

Tính chi phí Mall vs Non-Mall cho sản phẩm cụ thể tại [Tool tính phí sàn](/tools/tinh-phi-san), và lập P&L Mall scenario tại [Mẫu P&L Ecom](/tools/pnl-ecom).
`,
  },

  /* ───────────── Bài 3 ───────────── */
  {
    id: "blog-A3-voucher-extra-vs-plus",
    title: "Voucher Extra vs Voucher Extra Plus - Chọn cái nào để có ROI cao nhất?",
    slug: "voucher-extra-vs-extra-plus",
    excerpt:
      "Voucher Extra (4%, cap 50k) hay Voucher Extra Plus (5.5%, cap 80k)? Phân tích chi tiết khi nào Plus break-even, scenario shop nhỏ vs lớn, và bảng quyết định cụ thể.",
    category: "tiktok",
    readTime: 6,
    publishedAt: "2026-05-10T12:00:00.000Z",
    featured: false,
    seoTitle: "Voucher Extra vs Plus - Chọn cái nào trên TikTok Shop & Shopee?",
    seoDescription:
      "So sánh chi tiết Voucher Extra (4%, cap 50k) và Plus (5.5%, cap 80k). Break-even volume, AOV optimal, scenario shop nhỏ vs lớn - quyết định đúng cho từng giai đoạn.",
    content: `
Voucher Extra và Voucher Extra Plus là 2 chương trình ưu đãi seller có thể chọn 1 trong 2 trên TikTok Shop và Shopee. Quyết định sai có thể tốn 5–10tr chi phí voucher mỗi tháng mà không tạo ra incremental revenue tương xứng.

## Tóm tắt 2 chương trình

**Voucher Extra:**
• Phí: 4% giá trị đơn hàng
• Cap: 50.000đ/đơn
• Đặc điểm: chương trình cơ bản, mọi shop được tham gia
• Loại voucher: chủ yếu freeship + giảm giá đơn hàng

**Voucher Extra Plus:**
• Phí: 5.5% giá trị đơn hàng
• Cap: 80.000đ/đơn
• Đặc điểm: chương trình nâng cao, cần đăng ký + cam kết SLA
• Loại voucher: thêm voucher độc quyền, ưu tiên hiển thị tìm kiếm, được tham gia campaign mega

Chỉ được chọn 1 trong 2. Đổi qua lại được nhưng có cooldown ~30 ngày.

## Khi nào Voucher Extra Plus break-even?

Plus đắt hơn Extra 1.5%. Nó chỉ có lý nếu:

**(a) AOV đủ cao để chạm cap:** Cap Extra 50k nghĩa là đơn > 1.250.000đ thì Extra cap hết. Plus cap 80k nghĩa là đơn > 1.454.000đ mới cap. Sự khác biệt quan trọng cho shop có AOV cao.

**(b) Volume tăng từ Plus đủ bù 1.5% phí thêm:** Nếu Plus mang về incremental volume +5% nhờ visibility, đã đủ break-even cho most shops.

**Công thức break-even:**
> Plus có lãi khi: (Volume Plus × Margin Plus) − (Volume Extra × Margin Extra) > 1.5% × Volume Plus × AOV

Đơn giản hoá: nếu Plus đem về **incremental volume > 25%** so với Extra, gần như luôn worth nó.

## Scenario 1 - Shop nhỏ, GMV < 100tr/tháng

Shop nhỏ thường có AOV thấp (<200k) và chưa có brand awareness. Vì vậy:

• AOV thấp = không chạm cap voucher -> không khai thác hết advantage cap 80k của Plus
• Visibility boost của Plus chưa nhiều ý nghĩa khi traffic shop chính từ ads

**Khuyến nghị: Voucher Extra.** Tiết kiệm 1.5% phí, dùng số tiền đó cho ads hoặc creative. Nâng lên Plus khi GMV > 200tr/tháng và bắt đầu thấy traffic organic.

## Scenario 2 - Shop trung, GMV 100–500tr/tháng

Vùng quyết định khó nhất. Phụ thuộc vào AOV và growth rate.

**AOV > 250k và đang growth > 30%/tháng:** Plus là lựa chọn đúng. Chi phí thêm 1.5% nhỏ so với incremental revenue từ visibility.

**AOV < 200k hoặc plateauing:** Extra vẫn ổn. Tập trung optimize ROAS trước.

## Scenario 3 - Shop lớn, GMV > 500tr/tháng

Plus gần như luôn đúng. Lý do:
• AOV thường > 300k -> cap 80k bắt đầu matter
• Ưu tiên hiển thị Plus đem về organic traffic đáng kể
• Tham gia mega campaign Plus = lift 2-3x trong ngày sale

Exception: shop bán sản phẩm cực giá thấp (<100k) - Plus vẫn không tận dụng được cap.

## Sai lầm phổ biến khi chọn voucher

**1. Mặc định chọn Plus vì "đắt hơn = tốt hơn".** Sai lầm cổ điển. Plus chỉ tốt nếu shop tận dụng được advantages của nó.

**2. Đổi qua lại liên tục mỗi mùa sale.** Shopee và TikTok đều có cooldown 30 ngày. Đổi liên tục = tốn fee + không build được pattern data để analyze.

**3. Tăng voucher seller riêng để bù không hiệu quả Plus.** Nếu Plus không lift visibility cho shop, vấn đề ở creative/SKU chứ không phải voucher. Tăng voucher seller chỉ tốn margin.

**4. Không đo ROI voucher riêng.** Mỗi tháng phải tính: doanh thu từ đơn dùng voucher / chi phí voucher = "voucher ROI". Healthy shop có voucher ROI > 8x.

## Bảng quyết định nhanh

Pick **Plus** nếu:
• AOV > 300k VÀ GMV > 200tr/tháng
• Đang trong growth phase (< 12 tháng tuổi shop)
• Ngành Beauty, Fashion, Mother & Baby (visibility Plus có ROI cao)
• Có team CSKH đủ SLA Plus

Pick **Extra** nếu:
• AOV < 200k
• GMV < 100tr/tháng
• Đã plateau, đang focus optimize chứ không expand

Không chọn voucher (skip cả Extra và Plus):
• Gross margin < 35% - không có buffer để cho voucher
• Shop chuyên B2B hoặc bán sản phẩm chuyên biệt không cần voucher để convert

## Kết hợp Voucher Extra/Plus với Voucher Seller

Nguyên tắc tối ưu:
• Tổng voucher (Extra/Plus + Seller) **không quá 10% giá bán**
• Voucher Seller dùng để target buyer cụ thể (new customer, repeat buyer, cart abandon)
• Voucher Extra/Plus dùng để cover broad visibility

Tránh chồng voucher quá dày - buyer cảm thấy "shop này lúc nào cũng giảm" và đợi giảm sâu hơn để mua.

## Đo lường hiệu quả voucher hàng tháng

Mỗi cuối tháng, check 3 KPI:

**1. Voucher Cost % Revenue:** Healthy: 3–6%. > 8% là dấu hiệu over-discounting.

**2. Voucher ROI:** Doanh thu đơn dùng voucher / Chi phí voucher. Healthy > 8x.

**3. Repeat Rate buyer dùng voucher vs không voucher:** Voucher tốt khi buyer dùng voucher có repeat rate ≥ buyer thường. Nếu thấp hơn -> voucher đang attract chỉ "deal hunter" chứ không phải buyer chất lượng.

Tính chi phí voucher chính xác cho shop tại [Tool tính phí sàn](/tools/tinh-phi-san), và xem ảnh hưởng voucher tới P&L tại [Mẫu P&L Ecom](/tools/pnl-ecom).
`,
  },

  /* ───────────── Bài 4 ───────────── */
  {
    id: "blog-A4-sfr-boi-hoan-van-chuyen",
    title: "SFR (Bồi hoàn vận chuyển) - Có nên đăng ký? Phân tích break-even chi tiết",
    slug: "sfr-boi-hoan-van-chuyen-co-nen-dang-ky",
    excerpt:
      "SFR thu 1.620đ/đơn để TikTok Shop xử lý bồi hoàn vận chuyển khi có sự cố. Phân tích shop nào nên bật, ngưỡng tỷ lệ hoàn hàng break-even, và scenario thực tế.",
    category: "tiktok",
    readTime: 5,
    publishedAt: "2026-05-10T12:30:00.000Z",
    featured: false,
    seoTitle: "SFR TikTok Shop - Có nên đăng ký? Break-even và scenario thực tế",
    seoDescription:
      "SFR (Seller Freight Reimbursement) thu 1.620đ/đơn. Phân tích khi nào nên bật, ngưỡng hoàn hàng break-even, và 3 scenario shop nhỏ/trung/lớn.",
    content: `
SFR (Seller Freight Reimbursement - Bồi hoàn Vận chuyển) là dịch vụ TikTok Shop ra mắt giúp seller xử lý bồi hoàn vận chuyển tự động khi có sự cố giao hàng (hoàn hàng do lỗi vận chuyển, giao sai địa chỉ, hư hỏng). Phí: 1.620đ/đơn hoàn thành.

## SFR làm gì cho seller?

Khi có sự cố giao hàng:

**Không có SFR:**
• Seller tự liên hệ vận chuyển + buyer để xử lý hoàn
• Seller tự bù chi phí ship 2 chiều (đi và về kho)
• Tốn 30 phút – 2h xử lý mỗi case
• Buyer experience kém, dễ rate 1 sao

**Có SFR:**
• TikTok tự động xử lý hoàn + bồi thường ship
• Seller chỉ cần confirm
• Tốn ~3 phút mỗi case
• Buyer experience mượt hơn

Đổi lại: 1.620đ × 100% đơn hoàn thành (kể cả đơn không có vấn đề).

## Ngưỡng break-even - Khi nào SFR có lãi?

Phép tính đơn giản:

**Cost không SFR per case sự cố:**
• Phí ship 2 chiều: ~30.000đ
• Thời gian xử lý: 1h × 50.000đ/h CSKH = 50.000đ
• Tổng: ~80.000đ/case sự cố

**Cost với SFR:**
• Phí SFR: 1.620đ × tổng đơn (không chỉ đơn có sự cố)
• Thời gian xử lý: 3 phút × 50k/h = 2.500đ
• Tổng: 1.620đ + 2.500đ = ~4.100đ/đơn

**Break-even:**
> SFR có lãi khi: tỷ lệ hoàn hàng × 80.000 > 1.620 × tỷ lệ đơn hoàn thành

Đơn giản: **tỷ lệ hoàn > 2%** thì SFR có ROI dương.

## Ai NÊN đăng ký SFR?

**1. Shop có tỷ lệ hoàn hàng > 3%.** SFR break-even rõ ở mức này. Đặc biệt Fashion (return rate 10–25%) và Electronics dễ vỡ.

**2. Shop volume cao + team CSKH nhỏ.** Khi 2.000+ đơn/tháng mà chỉ có 1 CSKH, dùng SFR để giảm tải xử lý hoàn.

**3. Shop bán hàng vùng xa.** Đơn giao tỉnh xa có tỷ lệ sự cố cao hơn 2-3x - SFR giúp giảm rủi ro tài chính.

**4. Shop mới chưa quen process hoàn.** SFR mua thời gian để team build process, sau đó đánh giá lại.

## Ai KHÔNG nên đăng ký SFR?

**1. Shop có tỷ lệ hoàn < 1.5%.** Toán không ra có lãi.

**2. Shop có team CSKH chuyên nghiệp.** Tự xử lý nhanh và rẻ hơn nếu volume sự cố thấp.

**3. Shop AOV thấp (<100k).** Phí 1.620đ chiếm 1.6% giá bán - quá cao so với benefit.

**4. Shop bán sản phẩm khó hoàn (perishable, custom).** Buyer không dễ hoàn nên SFR ít activate.

## Scenario 1 - Shop nhỏ, 500 đơn/tháng, return rate 2%

• Đơn sự cố: 500 × 2% = 10 đơn/tháng
• Cost không SFR: 10 × 80.000 = 800.000đ
• Cost với SFR: 500 × 1.620 = 810.000đ + 10 × 2.500 = 835.000đ

-> SFR đắt hơn 35.000đ/tháng. Không nên bật.

## Scenario 2 - Shop trung, 2.000 đơn/tháng, return rate 5%

• Đơn sự cố: 2.000 × 5% = 100 đơn/tháng
• Cost không SFR: 100 × 80.000 = 8.000.000đ
• Cost với SFR: 2.000 × 1.620 = 3.240.000đ + 100 × 2.500 = 3.490.000đ

-> SFR tiết kiệm 4.510.000đ/tháng. **Nên bật ngay.**

## Scenario 3 - Shop Fashion lớn, 5.000 đơn/tháng, return rate 15%

• Đơn sự cố: 5.000 × 15% = 750 đơn/tháng
• Cost không SFR: 750 × 80.000 = 60.000.000đ
• Cost với SFR: 5.000 × 1.620 = 8.100.000đ + 750 × 2.500 = 9.975.000đ

-> SFR tiết kiệm 50.025.000đ/tháng. **Bắt buộc bật.**

## Cách xử lý nếu return rate biến động

Tỷ lệ hoàn không cố định. Mùa sale lớn (11.11, 12.12) thường có return rate +30–50% so với bình thường vì buyer mua impulse rồi đổi ý.

**Strategy:**
• **Tháng thường:** đo return rate, nếu < 2% thì có thể tắt SFR
• **Tháng sale:** bật SFR ngay cả khi return rate trung bình thấp - buffer cho spike

Chú ý: TikTok Shop có cooldown 30 ngày giữa lần bật/tắt SFR.

## Sai lầm phổ biến với SFR

**1. Bật SFR rồi không track ROI hàng tháng.** SFR worth ban đầu nhưng không phải mãi. Phải đo và adjust.

**2. Dùng SFR như "bảo hiểm tâm lý" thay vì fix root cause.** Nếu return rate > 10% liên tục, vấn đề ở packaging, shipping partner, hoặc product description - không phải bật SFR là xong.

**3. Tính SFR vào giá bán mà không thông báo.** Một số shop tăng giá 1.620đ để bù SFR - buyer comparison thấy đắt hơn shop khác. Tốt hơn là absorb vào COGS hoặc giảm gross margin.

## Lời khuyên thực chiến

SFR là "scale tool" - nó giúp shop volume cao tiết kiệm cost xử lý mà không làm gì pha lê hơn. Nhưng nếu return rate cao do chính sản phẩm hoặc vận hành, SFR không fix root cause.

**Quy trình tôi khuyên client:**
1. Track return rate 30 ngày liên tục
2. Tính cost xử lý sự cố hiện tại
3. Tính SFR cost hypothetically
4. Quyết định bật hay không
5. Sau 60 ngày SFR, đo ROI và quyết định giữ hay bỏ

Tính tác động SFR tới P&L tại [Mẫu P&L Ecom](/tools/pnl-ecom) - input phí 1.620đ vào field "Phí cơ sở hạ tầng" để mô phỏng.
`,
  },

  /* ───────────── Bài 5 ───────────── */
  {
    id: "blog-A5-phi-giao-dich-6-percent",
    title: "Phí giao dịch 6% - Tại sao cao hơn bạn tưởng và cách tính chuẩn",
    slug: "phi-giao-dich-6-cong-thuc-chuan",
    excerpt:
      "Phí giao dịch 6% không tính trên Giá bán đơn thuần - base = (Giá bán + Ship buyer trả − Voucher seller). Phân tích chi tiết và 3 sai lầm thường gặp khi build P&L.",
    category: "tiktok",
    readTime: 5,
    publishedAt: "2026-05-10T13:00:00.000Z",
    featured: false,
    seoTitle: "Phí giao dịch 6% TikTok & Shopee - Công thức chuẩn 2026",
    seoDescription:
      "Phí giao dịch 6% tính trên (Giá bán + Ship buyer trả − Voucher seller). Phân tích base, 3 sai lầm khi tính, và cách build P&L chính xác cho seller TMĐT.",
    content: `
Phí giao dịch 6% là khoản phí cố định mà cả TikTok Shop và Shopee đều thu. Nhiều seller hiểu sai cách tính, dẫn đến sai lệch P&L và đặt KPI ROAS không chính xác. Bài viết này giải thích đúng base tính, 3 sai lầm phổ biến, và ví dụ cụ thể.

## Công thức chính xác

> **Phí giao dịch = (Giá bán + Phí ship buyer trả − Voucher seller) × 6%**

Trong đó:
• **Giá bán**: giá hiển thị trên sàn (đã có VAT)
• **Phí ship buyer trả**: số tiền buyer thanh toán cho ship (không tính ship miễn phí do sàn tài trợ)
• **Voucher seller**: voucher do seller tự chi (không tính voucher Mall do sàn tài trợ)

## Tại sao base tính bao gồm phí ship?

Logic của TikTok và Shopee: 6% là phí xử lý giao dịch - bao gồm cả thanh toán ship. Buyer trả tổng (giá + ship) cho sàn, sàn xử lý cả 2 luồng tiền. Vì vậy base = tổng buyer thanh toán.

Điều này khác biệt quan trọng:
• Sản phẩm 100k, ship buyer trả 25k -> phí GD = 125k × 6% = 7.500đ (không phải 6.000đ)
• Sản phẩm 500k, ship buyer trả 30k -> phí GD = 530k × 6% = 31.800đ (không phải 30.000đ)

Mỗi đơn chênh ~1.500–2.000đ. Shop 1.000 đơn/tháng = chênh 1.5–2tr/tháng nếu tính sai.

## Tại sao chỉ trừ Voucher Seller mà không trừ Voucher Mall?

Voucher Mall do **sàn tài trợ** - sàn chi tiền, sàn vẫn thu 6% trên full giá để cover cost của họ.

Voucher Seller do **shop tài trợ** - shop đã giảm giá thực, sàn chỉ thu 6% trên số buyer thực thanh toán.

Ví dụ sản phẩm 300k, ship 25k:
• Voucher Mall 50k (sàn tài trợ): Phí GD = (300k + 25k) × 6% = 19.500đ
• Voucher Seller 50k (shop chi): Phí GD = (300k + 25k − 50k) × 6% = 16.500đ

Chênh 3.000đ/đơn. Nhiều seller không phân biệt -> tính sai phí GD.

## Sai lầm 1 - Tính phí GD trên giá bán đơn thuần

Đây là sai lầm phổ biến nhất, đặc biệt khi seller copy template P&L cũ.

**Sai:** Phí GD = Giá bán × 6%
**Đúng:** Phí GD = (Giá bán + Ship buyer trả − Voucher seller) × 6%

Sai lệch điển hình: 1–2% của doanh thu. Shop GMV 500tr/tháng = sai lệch 5–10tr/tháng trong P&L.

## Sai lầm 2 - Trừ cả Voucher Mall

Một số seller assume "voucher là voucher" và trừ cả 2 loại khỏi base.

Hậu quả: P&L tính phí GD thấp hơn thực tế -> khi check sale order với báo cáo Seller Center, thấy "thiếu hụt" 0.5–1% mỗi tháng -> confused tại sao reconcile không khớp.

Cách check: Trong báo cáo Seller Center, mục "Total fees" sẽ hiện chính xác phí GD thực tế. So sánh với P&L của bạn để phát hiện sai lệch.

## Sai lầm 3 - Quên tính phí GD vào P&L của campaign ads

Khi tính ROAS và margin của campaign cụ thể, nhiều seller chỉ trừ hoa hồng và quên phí GD.

**Ví dụ campaign:**
• Doanh thu 10.000.000đ, ads spend 2.000.000đ -> ROAS 5x
• Hoa hồng 14% = 1.400.000đ
• Margin còn lại trên gross margin?

Nếu quên phí GD: profit estimate cao hơn ~600.000đ. Lặp lại 50 campaigns/tháng = sai lệch tổng 30tr+.

## Ví dụ cụ thể - Tính phí GD chuẩn

**Đơn 1: Sản phẩm 280k, ship buyer trả 25k, không voucher**
Phí GD = (280k + 25k) × 6% = **18.300đ**

**Đơn 2: Sản phẩm 500k, ship buyer trả 30k, voucher seller 50k**
Phí GD = (500k + 30k − 50k) × 6% = **28.800đ**

**Đơn 3: Sản phẩm 200k, freeship Mall (sàn tài trợ ship), voucher Mall 30k**
Phí GD = (200k + 0 − 0) × 6% = **12.000đ**
(Ship Mall = sàn tài trợ, không cộng. Voucher Mall = sàn tài trợ, không trừ.)

**Đơn 4: Sản phẩm 400k, buyer dùng cả voucher Mall 50k + voucher Seller 30k, ship 25k**
Phí GD = (400k + 25k − 30k) × 6% = **23.700đ**
(Trừ voucher Seller 30k, không trừ voucher Mall 50k.)

## Cách tự động hoá tính phí GD

Trong file P&L Excel/Google Sheets, công thức:

\`\`\`
PhiGD = (GiaBan + PhiShipBuyer - VoucherSeller) * 0.06
\`\`\`

Phân biệt rõ 2 cột voucher:
• \`VoucherSeller\` - voucher mình tự chi
• \`VoucherMall\` - voucher sàn tài trợ (chỉ track cho marketing analysis, không vào công thức GD)

Hoặc dùng [Tool tính phí sàn](/tools/tinh-phi-san) đã build sẵn công thức chuẩn.

## Tác động phí GD tới ROAS break-even

Phí GD 6% trên ship buyer trả nghe như nhỏ, nhưng có thể đẩy break-even ROAS lên 0.3–0.5x:

**Sản phẩm 300k, GM 50%, ship buyer trả 25k:**
• Tính sai (không cộng ship): break-even ROAS = 1 ÷ (50% − 14% − 6% − 8%) = 1 ÷ 22% = 4.5x
• Tính đúng (cộng ship vào base GD): phí GD thực 1.500đ thêm = 0.5% revenue -> break-even ROAS = 1 ÷ 21.5% = 4.7x

Chênh lệch 0.2x ROAS - đủ để 1 campaign từ "có lãi" thành "đang lỗ" mà không biết.

## Lời khuyên thực chiến

**1. Update template P&L với công thức GD chuẩn.** 5 phút setup, tiết kiệm 5–10tr/tháng do không tính sai.

**2. Reconcile P&L với Seller Center hàng tuần.** Sai lệch > 1% là dấu hiệu công thức chưa đúng hoặc miss một loại phí nào đó.

**3. Đào tạo team về phân biệt Voucher Mall vs Voucher Seller.** Đây là kiến thức cơ bản nhưng nhiều CSKH/Operations không biết.

**4. Khi tính ROAS break-even, luôn dùng công thức GD chuẩn.** Đặt KPI ads dựa trên break-even sai = scale lỗ tự nguyện.

Lấy số phí GD chính xác cho từng đơn tại [Tool tính phí sàn](/tools/tinh-phi-san), và xây P&L tính tự động phí GD chuẩn tại [Mẫu P&L Ecom](/tools/pnl-ecom).
`,
  },

  /* ───────────── Bài 6 ───────────── */
  {
    id: "blog-A6-dat-sai-nganh-cap-3",
    title: "Đặt sai ngành cấp 3 - Mất 1–3% hoa hồng mỗi đơn mà không biết",
    slug: "dat-sai-nganh-cap-3-mat-hoa-hong",
    excerpt:
      "Phí hoa hồng tính theo ngành cấp 3 (leaf category), không phải cấp 1. Đặt sai = bị áp nhầm mức phí cao hơn 1–3%. Hướng dẫn check và đổi ngành đúng.",
    category: "ecom",
    readTime: 5,
    publishedAt: "2026-05-10T13:30:00.000Z",
    featured: false,
    seoTitle: "Đặt sai ngành cấp 3 trên Shopee/TikTok - Mất 1-3% hoa hồng",
    seoDescription:
      "Hướng dẫn check ngành cấp 3 đúng trên Seller Center Shopee và TikTok Shop. Top 5 ngành dễ đặt sai, cách yêu cầu sàn đổi lại, và case study mất tiền thật.",
    content: `
Đây là một trong những "leak" lớn nhất mà tôi thường thấy ở các shop khi audit P&L - sản phẩm bị đặt sai ngành cấp 3, dẫn đến áp phí hoa hồng cao hơn 1–3% mỗi đơn. Nhân với volume hàng nghìn đơn/tháng = tốn hàng chục triệu vô lý.

## Tại sao ngành cấp 3 quan trọng?

Cả Shopee và TikTok Shop đều có cấu trúc danh mục 3 cấp:

**Cấp 1**: Beauty, Fashion, F&B, Electronics, Home & Living, ...
**Cấp 2**: Trong Beauty có Skincare, Makeup, Haircare, Fragrance, ...
**Cấp 3 (leaf)**: Trong Skincare có Sữa rửa mặt, Toner, Serum, Kem chống nắng, ...

Phí hoa hồng được tính theo **ngành cấp 3** - không phải cấp 1. Mỗi cấp 3 có mức phí riêng. Trong cùng 1 cấp 1 (Beauty), phí cấp 3 có thể chênh 2–4%.

## Ví dụ phí cấp 3 chênh lệch

Trong ngành Beauty Non-Mall:
• **Sữa rửa mặt:** 12.5%
• **Serum:** 14.5%
• **Kem chống nắng:** 13.5%
• **Mặt nạ:** 12%

Trong ngành Fashion Non-Mall:
• **Áo phông:** 11.5%
• **Đồ thể thao:** 13%
• **Đồ ngủ/đồ mặc nhà:** 12%
• **Phụ kiện thời trang:** 14%

Đặt một sản phẩm Serum vào "Sữa rửa mặt" = mất 2% phí mỗi đơn.

## Top 5 ngành dễ đặt sai

**1. Beauty - Skincare:** Serum / Essence / Toner / Sữa rửa mặt rất dễ confuse. Một số sản phẩm "ambiguous" (multi-function) cho phép đặt vào nhiều cấp 3 - chọn cấp có phí thấp nhất.

**2. Fashion - Áo:** "Áo phông" vs "Áo croptop" vs "Áo polo" có phí khác. Thiết kế áo overlap nhiều style.

**3. Mother & Baby:** "Đồ chơi giáo dục" vs "Đồ chơi vận động" vs "Đồ học tập" có phí 12–15%.

**4. Home & Living - Đồ trang trí:** "Đèn trang trí" vs "Đồ phong thuỷ" vs "Khung tranh" chênh 1–2%.

**5. Electronics - Phụ kiện:** "Cáp sạc" vs "Sạc dự phòng" vs "Phụ kiện máy tính" overlap nhiều, phí khác.

## Cách check ngành cấp 3 hiện tại

**Shopee Seller Center:**
1. Vào "Quản lý sản phẩm"
2. Click vào sản phẩm cần check
3. Xem "Danh mục" - phải hiện đầy đủ 3 cấp (cấp 1 > cấp 2 > cấp 3)
4. Nếu chỉ thấy 2 cấp -> sản phẩm chưa được phân loại đúng cấp 3

**TikTok Shop Seller Center:**
1. Vào "Products"
2. Mở từng sản phẩm
3. Xem "Category" - phải có path đầy đủ 3 cấp
4. Nếu category hiện "Other" hoặc cấp 1 generic -> phí thường bị áp ở mức cao mặc định

## Cách phát hiện đang bị áp nhầm phí

**Method 1: Check sale order detail**
Mở 1 đơn random trong Seller Center, xem "Phí hoa hồng" thực tế. Đối chiếu với bảng phí công khai theo ngành cấp 3 sản phẩm đó. Chênh > 0.5% = đang bị áp nhầm.

**Method 2: Check báo cáo tài chính tháng**
• Tổng phí hoa hồng / Tổng GMV = % phí trung bình
• So với mức expected dựa trên ngành cấp 3 chính của shop
• Chênh 0.5–1% = vấn đề

**Method 3: So sánh với competitor**
Tìm 3 shop bán cùng sản phẩm. Hỏi họ phí hoa hồng đang được áp (qua Cộng đồng Shopee Ads / Facebook group seller). Nếu shop bạn cao hơn -> check ngành.

## Cách yêu cầu sàn đổi ngành

**Shopee:**
1. Vào sản phẩm > Edit
2. Đổi danh mục đến cấp 3 đúng
3. Save & gửi review (Shopee duyệt 1–3 ngày)
4. Sau khi duyệt, phí áp ngay từ đơn tiếp theo (không retroactive)

**TikTok Shop:**
1. Vào product detail > Edit
2. Đổi category đến leaf category đúng
3. Submit for review
4. Approval thường 24–48h

**Lưu ý quan trọng:** Phí áp dụng từ thời điểm đổi ngành **được duyệt**. Phí trước đó bạn đã trả không được hoàn - nhưng nếu chứng minh được sàn đã misclassify (lỗi từ sàn, không phải bạn), có thể request hoàn về email support. Tỷ lệ thành công ~30%.

## Case study - Mất tiền thật

Khách hàng tôi audit vào 06/2025 (Shopee Beauty shop):
• 800 đơn/tháng × AOV 250k = GMV 200tr/tháng
• Phí hoa hồng đang chịu: 14.5% (mức Serum)
• Đúng phải là: 12.5% (Sữa rửa mặt + Cleanser - 60% sản phẩm shop là loại này)
• Chênh: 2% × 200tr = 4 triệu/tháng
• Trong 8 tháng trước khi phát hiện: mất ~32 triệu

Sau khi đổi ngành: phí giảm về 12.8% (mix), tiết kiệm 3.4 triệu/tháng. ROI fix: 5 phút check + 1 ngày đợi duyệt = 32 triệu nếu phát hiện sớm.

## Quy trình audit ngành mỗi quý

Tôi khuyên client audit ngành mỗi 3 tháng:

**Bước 1**: Export danh sách top 20 SKU theo doanh thu

**Bước 2**: Với mỗi SKU, ghi:
• Ngành cấp 3 hiện tại
• Ngành cấp 3 đúng (tự research lại)
• Phí hoa hồng thực tế
• Phí hoa hồng theo bảng

**Bước 3**: Đánh dấu SKU có chênh lệch > 0.5% -> priority đổi

**Bước 4**: Đổi ngành theo thứ tự ưu tiên (SKU GMV cao trước)

**Bước 5**: Sau 30 ngày, audit lại P&L để xác nhận phí đã giảm

## Sai lầm khi đặt ngành

**1. Đặt vào cấp 1 hoặc cấp 2 generic.** Bị áp phí mặc định cao nhất của ngành cấp 1 đó.

**2. Cố ý đặt sai để có phí thấp.** Sàn detect được -> phạt nặng (giảm visibility, suspend shop). Không đáng risk.

**3. Đặt theo "khả năng tìm thấy" thay vì leaf chính xác.** Buyer tìm theo keyword chứ không theo category - đặt đúng category không ảnh hưởng search visibility.

**4. Không cập nhật khi sàn ra ngành cấp 3 mới.** Sàn thường xuyên cấu trúc lại categories. Sản phẩm cũ có thể đã có cấp 3 mới phù hợp hơn (phí thấp hơn).

## Lời khuyên thực chiến

Audit ngành cấp 3 là việc rẻ nhất bạn có thể làm để tăng EBITDA. Không tốn thời gian build creative mới, không tốn ngân sách ads, không tốn nhân sự - chỉ cần 1-2 giờ research + đợi duyệt.

ROI thường thấy: shop GMV 500tr/tháng tiết kiệm được 3–8tr/tháng sau audit ngành. Với shop 2 tỷ/tháng = 15–30tr/tháng. Tích luỹ năm = 200–400tr.

Lấy bảng phí ngành cấp 3 chuẩn cho TikTok và Shopee tại [Tool tính phí sàn](/tools/tinh-phi-san) - có search và filter theo ngành cụ thể.
`,
  },

  /* ───────────── Bài 7 ───────────── */
  {
    id: "blog-A7-shop-moi-tiktok-vs-shopee",
    title: "Shop mới 2026 - TikTok Shop hay Shopee bắt đầu trước? Quyết định theo ngành",
    slug: "shop-moi-tiktok-vs-shopee-bat-dau-truoc",
    excerpt:
      "Seller mới 2026 thường confused: TikTok Shop hay Shopee trước? Phân tích 5 yếu tố: cost build, ROAS tự nhiên, ramp-up time, learning curve, ngành cụ thể.",
    category: "ecom",
    readTime: 7,
    publishedAt: "2026-05-10T14:00:00.000Z",
    featured: false,
    seoTitle: "Shop mới 2026 - TikTok Shop hay Shopee nên bắt đầu trước?",
    seoDescription:
      "So sánh chi tiết TikTok Shop vs Shopee cho seller mới 2026: cost build, ROAS tự nhiên, ramp-up time, learning curve, decision tree theo ngành.",
    content: `
"Em mới mở shop, nên tập trung TikTok Shop hay Shopee trước?" - câu hỏi tôi nhận từ seller mới gần như mỗi tuần. Câu trả lời ngắn: tuỳ ngành và năng lực team. Bài viết này phân tích 5 yếu tố quyết định và đưa ra decision tree cụ thể.

## Khác biệt cốt lõi 2 platform

**TikTok Shop:**
• Bán bằng **content + live commerce**, ads boost content
• ROAS tự nhiên cao nếu content viral (2–10x organic)
• Buyer quyết định mua nhanh, theo cảm xúc
• Cần content team hoặc partner
• Phù hợp ngành cảm xúc: Beauty, Fashion, Mother&Baby, Snack

**Shopee:**
• Bán bằng **search + recommendation**, ads chính là search/discovery
• ROAS tự nhiên thấp hơn nhưng ổn định
• Buyer compare giá kỹ, search keyword cụ thể
• Cần SEO product, voucher mix tốt
• Phù hợp ngành "thực dụng": Electronics, Home & Living, Gia dụng, Sách

## Yếu tố 1 - Cost build ban đầu

**TikTok Shop:**
• Content production: 5–15tr/tháng (KOL micro, KOC, hoặc team in-house)
• Live setup: 3–5tr/tháng (host + streamer + thiết bị)
• Ads để boost content: 10–20tr/tháng minimum
• **Tổng minimum:** 20–40tr/tháng

**Shopee:**
• Listing optimization (hình ảnh + description SEO): 1–2tr/tháng
• Voucher Extra/Plus: 3–5% revenue (variable)
• Ads search + discovery: 5–15tr/tháng minimum
• **Tổng minimum:** 8–20tr/tháng

-> **Shopee cost lower** để bắt đầu. Nếu vốn dưới 50tr, ưu tiên Shopee.

## Yếu tố 2 - Ramp-up time

**TikTok Shop:**
• Tháng 1–2: build content + test, doanh thu thấp (5–20tr)
• Tháng 3–4: bắt đầu có content "trúng" -> spike
• Tháng 5–6: stable nếu duy trì content + ads
• **Time to break-even:** 3–6 tháng

**Shopee:**
• Tháng 1–2: build review base + listing optimization
• Tháng 3: bắt đầu có organic search traffic
• Tháng 4–6: scale dần với voucher + ads
• **Time to break-even:** 4–8 tháng

-> **TikTok ramp-up nhanh hơn nếu có content tốt.** Shopee chậm hơn nhưng predictable hơn.

## Yếu tố 3 - Learning curve

**TikTok Shop:**
• Học content (hook, story, CTA) - khó nếu chưa có background marketing
• Học data ads phức tạp hơn (interest, behavior targeting)
• Live commerce - cần host charisma + script
• **Difficulty:** 7/10

**Shopee:**
• Học listing SEO (title, description, hashtag) - ai cũng có thể học
• Ads dashboard đơn giản hơn (search, discovery, GMV Max)
• Voucher logic + campaign mùa
• **Difficulty:** 5/10

-> **Shopee dễ học hơn cho người mới.** Người background bán hàng truyền thống học Shopee nhanh hơn.

## Yếu tố 4 - ROAS tự nhiên

**TikTok Shop:**
• Beauty: ROAS 6–12x (nếu content tốt)
• Fashion: 5–10x
• F&B/Snack: 4–8x
• Electronics: 3–6x

**Shopee:**
• Beauty: 4–7x
• Fashion: 3–6x
• Electronics: 5–8x (Shopee có ưu thế)
• Home & Living: 4–7x

-> **TikTok ROAS cao hơn Beauty/Fashion. Shopee ROAS cao hơn Electronics/Home.**

## Yếu tố 5 - Risk và sustainability

**TikTok Shop risk:**
• Content viral phụ thuộc thuật toán -> có thể "tắt" đột ngột
• Algorithm thay đổi 1–2 lần/năm -> strategy có thể obsolete
• Cạnh tranh content tăng nhanh

**Shopee risk:**
• Phí tăng đều 1–2 lần/năm
• Phải compete giá với shop khác nhiều hơn
• Search visibility phụ thuộc review base - chậm build

-> **Shopee predictable hơn, TikTok upside lớn hơn nhưng volatile.**

## Decision Tree theo ngành

**Beauty / Skincare / Makeup:** TikTok trước, Shopee sau 3–6 tháng. Lý do: ngành sản phẩm cảm xúc, content viral cực mạnh.

**Fashion (giá < 300k):** TikTok trước. ROAS organic cao, content trending dễ bùng.

**Fashion (giá > 500k):** Shopee Mall trước. Buyer phân khúc cao quan tâm trust badge.

**Mother & Baby:** TikTok cho sản phẩm cảm xúc (đồ chơi, quần áo bé), Shopee cho sản phẩm chức năng (sữa, tã, vitamin).

**F&B / Snack:** TikTok trước nếu sản phẩm có "wow factor" (snack mới lạ). Shopee trước nếu sản phẩm thông dụng (đồ khô, gia vị).

**Electronics & Phụ kiện:** Shopee trước. TikTok sau khi có review base + brand awareness.

**Home & Living:** Shopee trước. Buyer thường search cụ thể.

**Sách / Văn phòng phẩm:** Shopee duy nhất. TikTok không phù hợp.

## Strategy "Single platform first" hay "Both at once"?

**Single platform first** (recommended for vốn < 100tr):
• Tập trung 100% nguồn lực vào 1 platform
• Đạt break-even rồi mới expand
• Ưu thế: học sâu, tránh dàn trải

**Both at once** (chỉ khi vốn > 200tr + có team đủ mạnh):
• Build trên cả 2 từ đầu
• Test xem platform nào fit ngành
• Risk: overhead lớn, dễ fail cả 2

-> **Single platform first an toàn hơn 80% case.**

## Sai lầm phổ biến của shop mới

**1. Bắt đầu cả 2 platform cùng lúc với budget hạn chế.** Kết quả: cả 2 đều underfund, fail cả 2.

**2. Chọn platform theo "trend" thay vì theo ngành.** Beauty seller bắt đầu Shopee vì "ai cũng nói Shopee dễ" -> chậm 6 tháng so với TikTok.

**3. Expect ROAS cao ngay tháng 1.** Cả 2 platform đều cần 2–3 tháng learning. Tháng 1 lỗ là bình thường.

**4. Copy strategy của shop lớn.** Shop 2 tỷ/tháng có resources khác hoàn toàn shop mới. Strategy của họ không scale xuống được.

## Roadmap 6 tháng đầu cho seller mới

**Tháng 1**: Setup shop (listing, store decoration). Test paid ads nhỏ (1–3tr) để hiểu mechanism.

**Tháng 2**: Build content/SEO base. Focus 1 SKU "anchor" để build review.

**Tháng 3**: Bắt đầu scale paid ads. Đo ROAS từng campaign. Tối ưu listing dựa trên data tháng 1–2.

**Tháng 4**: Push doanh thu lên 50–100tr. Hire CSKH part-time nếu vol > 500 đơn/tháng.

**Tháng 5**: Build product line 2–3 SKU bổ trợ. Test cross-sell và bundle.

**Tháng 6**: Đánh giá lại - nên expand sang platform thứ 2 chưa? Hire fulltime team chưa?

## Lời khuyên thực chiến

**1. Đừng FOMO platform mới.** Chọn 1 platform fit ngành, làm cho master, mới expand.

**2. Vốn ban đầu phải đủ 3–6 tháng burn.** Đa số shop fail vì hết vốn ở tháng 4–5 khi chưa break-even.

**3. Track unit economics từ ngày 1.** Profit/đơn, CPA, CM% - không track = mù dữ liệu, scale lỗ.

**4. Hire mentor hoặc tham gia khoá học thực chiến.** Học từ sai lầm người khác rẻ hơn nhiều so với tự học.

Tính chi phí build shop trên từng platform tại [Mẫu P&L Ecom](/tools/pnl-ecom), và set ROAS target chuẩn cho ngành tại [ROAS Calculator](/tools/roas-calculator).
`,
  },

  /* ───────────── Bài 8 ───────────── */
  {
    id: "blog-A8-shopee-sls-vs-spx",
    title: "Shopee SPX Express vs đối tác giao hàng - Chi phí ship thực tế cho seller 2026",
    slug: "shopee-spx-vs-doi-tac-giao-hang",
    excerpt:
      "Bảng phí ship Shopee SPX 2026 theo trọng lượng và khoảng cách. So sánh chi phí với GHTK, GHN, J&T - khi nào chọn SPX vs đối tác khác?",
    category: "shopee",
    readTime: 6,
    publishedAt: "2026-05-10T14:30:00.000Z",
    featured: false,
    seoTitle: "Shopee SPX vs GHTK GHN J&T 2026 - Phí ship thực tế cho seller",
    seoDescription:
      "Bảng phí ship Shopee SPX Express 2026 theo trọng lượng + khoảng cách. So sánh GHTK, GHN, J&T - khi nào nên dùng SPX vs đối tác bên ngoài.",
    content: `
SPX Express là đối tác giao hàng chính của Shopee, ngày càng được Shopee push mạnh với ưu đãi và priority. Nhưng SPX có thực sự rẻ nhất cho seller? Bài viết này so sánh phí thực tế với GHTK, GHN, J&T và phân tích khi nào chọn SPX.

## Bảng phí Shopee SPX 2026 (tham khảo, có thể thay đổi)

**Nội tỉnh (cùng tỉnh/thành):**
• 0–500g: 13.000đ
• 500g–1kg: 16.000đ
• 1–2kg: 19.000đ
• 2–5kg: 22.000đ
• Trên 5kg: 22.000đ + 4.000đ/kg vượt

**Liên tỉnh trong miền:**
• 0–500g: 18.000đ
• 500g–1kg: 22.000đ
• 1–2kg: 26.000đ
• 2–5kg: 32.000đ

**Liên miền:**
• 0–500g: 25.000đ
• 500g–1kg: 30.000đ
• 1–2kg: 36.000đ
• 2–5kg: 45.000đ

**Lưu ý:** Phí trên là phí buyer trả. Seller dùng SPX không trả phí cho Shopee (Shopee thu trực tiếp từ buyer).

## So sánh với đối tác bên ngoài

**Giao Hàng Tiết Kiệm (GHTK):**
• Nội tỉnh < 1kg: 22.000đ
• Liên tỉnh < 1kg: 30.000đ
• Liên miền < 1kg: 38.000đ
• **Đặc điểm:** Phù hợp shop volume thấp, không cần API integration

**Giao Hàng Nhanh (GHN):**
• Nội tỉnh < 1kg: 18.000đ
• Liên tỉnh < 1kg: 25.000đ
• Liên miền < 1kg: 35.000đ
• **Đặc điểm:** Tốc độ tốt nhất, phù hợp Hà Nội/HCM

**J&T Express:**
• Nội tỉnh < 1kg: 20.000đ
• Liên tỉnh < 1kg: 28.000đ
• Liên miền < 1kg: 38.000đ
• **Đặc điểm:** COD tốt, mạng lưới rộng

-> **SPX cạnh tranh nhất cho buyer trong app Shopee.** Nhưng nếu seller bán đa kênh (Shopee + TikTok + Tiki), GHN/GHTK linh hoạt hơn.

## Khi nào nên chọn SPX?

**1. Shop chuyên Shopee (>80% revenue từ Shopee).** SPX integration sâu nhất, ưu tiên hiển thị badge "Giao bởi SPX".

**2. Shop bán hàng nhẹ (< 1kg).** SPX rẻ nhất ở phân khúc này.

**3. Shop muốn tận dụng freeship Shopee Mall.** Mall có voucher freeship áp dụng SPX trước.

**4. Shop bán nhiều khu vực HCM/HN.** SPX mạng lưới ở 2 thành phố lớn rất tốt.

## Khi nào KHÔNG nên dùng SPX?

**1. Shop bán đa kênh.** GHN/GHTK quản lý 1 dashboard, scale dễ hơn. Nếu Shopee chỉ chiếm 30–50% revenue, dùng đối tác chung.

**2. Shop bán hàng nặng/cồng kềnh (>5kg).** SPX phí leo nhanh, GHN có rate đàm phán cho hàng nặng.

**3. Shop yêu cầu giao trong ngày (same-day).** GHN Same-day rẻ hơn SPX cho HCM/HN.

**4. Shop có SLA đặc biệt với 1 đối tác.** Nếu đã có rate đàm phán riêng với GHTK/J&T (volume > 5.000 đơn/tháng), thường rẻ hơn SPX 10–20%.

## Ảnh hưởng phí ship tới P&L của seller

Mặc dù phí ship là **buyer trả** (không phải seller chi), nó vẫn ảnh hưởng P&L gián tiếp:

**Phí giao dịch 6%:** Tính trên (Giá bán + Ship buyer trả). Phí ship cao = phí GD cao. Mỗi 5.000đ ship thêm = 300đ phí GD thêm/đơn.

**Conversion rate:** Phí ship cao làm CVR giảm. Buyer thấy ship 35.000đ cho đơn 80.000đ = bỏ giỏ ngay.

**Voucher freeship effect:** Sàn tài trợ ship chỉ áp dụng SPX. Shop dùng đối tác khác = mất voucher này.

## Strategy ship cho từng AOV

**AOV < 100k (sản phẩm rẻ):**
• Bắt buộc SPX để tận dụng freeship Mall
• Hoặc seller absorb toàn bộ ship vào giá bán (markup 15–20k)

**AOV 100–300k:**
• SPX tốt cho 90% case
• Test thử buyer trả ship vs seller absorb ship -> so CVR

**AOV 300k–1tr:**
• SPX hoặc GHN đều OK
• Buyer trả ship full, không ảnh hưởng CVR nhiều

**AOV > 1tr:**
• GHN priority cao (delivery quality matter)
• Có thể negotiate rate riêng nếu volume cao

## Sai lầm phổ biến với phí ship

**1. Free ship cho mọi đơn để tăng CVR.** Margin biến mất. Tốt hơn là dùng voucher freeship targeted (đơn đầu, ngày sale).

**2. Đặt phí ship cao để buyer "thấy đỡ đắt".** Phản tác dụng - buyer cộng tổng (giá + ship) trước khi quyết.

**3. Không track shipping ROI.** Shop dùng GHTK 5 năm không bao giờ check rate mới. GHN/SPX có thể đã rẻ hơn 15%.

**4. Tính ship cố định cho mọi vùng.** Buyer xa miền chịu ship cao hơn -> margin từ vùng xa thấp hơn. Cần track theo vùng.

## Tip thực chiến tối ưu chi phí ship

**1. Đàm phán rate khi volume > 3.000 đơn/tháng.** GHN, J&T sẵn sàng giảm 10–15% rate cho seller volume cao.

**2. Pack hàng nhẹ nhất có thể.** 100g khác biệt = 2–3k phí. Chuyển từ thùng giấy sang túi bubble = tiết kiệm 20% phí ship.

**3. Bundle để qua khoảng trọng lượng.** Đơn 950g pay rate < 1kg. Đơn 1.050g pay rate 1–2kg = đắt 4–6k. Tracking và bundle để stay dưới ngưỡng.

**4. Multi-warehouse cho shop lớn.** Đơn HCM ship từ kho HCM. Đơn HN ship từ kho HN. Tiết kiệm 30–50% phí ship liên miền.

## Lời khuyên thực chiến

Phí ship không phải "phải làm sao thấp nhất" - quan trọng là **"buyer thấy hợp lý + shop không lỗ"**. SPX không nhất thiết là tối ưu cho mọi shop. Audit lại mỗi quý dựa trên volume, AOV, ngành.

Trong P&L, phí ship buyer trả tăng phí GD 6% -> tăng tổng phí sàn 0.3–0.5%. Đừng quên factor này khi tính break-even ROAS - input "phí ship buyer trả TB/đơn" tại [Mẫu P&L Ecom](/tools/pnl-ecom) để tính chuẩn.
`,
  },

  /* ───────────── Bài 9 ───────────── */
  {
    id: "blog-A9-tiktok-live-commerce-fee",
    title: "TikTok Shop Live Commerce - Phí hoa hồng có khác feed/search? Phân tích 2026",
    slug: "tiktok-shop-live-commerce-phi-hoa-hong",
    excerpt:
      "Live commerce trên TikTok Shop có phí hoa hồng giống feed/search - không có discount riêng. Nhưng ROAS organic và conversion rate khác biệt rất lớn. Phân tích đầy đủ.",
    category: "tiktok",
    readTime: 7,
    publishedAt: "2026-05-10T15:00:00.000Z",
    featured: false,
    seoTitle: "TikTok Live Commerce 2026 - Phí hoa hồng + ROAS organic",
    seoDescription:
      "Phí hoa hồng live commerce TikTok Shop giống feed/search nhưng ROAS organic 2-3x cao hơn. Phân tích cấu trúc phí, lợi thế live, và benchmark ngành.",
    content: `
Live commerce là kênh bán hàng đang growth mạnh nhất trên TikTok Shop tại Việt Nam, với một số brand đạt 60–80% doanh thu từ live. Nhiều seller thắc mắc: phí hoa hồng live có khác feed/search không? Bài viết này phân tích đầy đủ cấu trúc phí và unit economics của live commerce.

## Cấu trúc phí Live Commerce TikTok Shop 2026

**Câu trả lời ngắn: Giống hệt feed/search.**
TikTok Shop không có bảng phí riêng cho live. Phí hoa hồng tính theo ngành cấp 3 sản phẩm:
• Beauty Non-Mall: 14.5%
• Fashion Non-Mall: 12.5%
• F&B Non-Mall: 11.5%
• ...

Cộng phí giao dịch 6% và phí cơ sở hạ tầng 3.000đ/đơn - y hệt feed.

**Nhưng có 3 chi phí thêm khi live:**

**1. Affiliate commission (nếu dùng KOC/KOL):**
• 5–25% giá bán cho creator livestream
• Đây là phí seller chi cho creator, không phải sàn thu

**2. Live boost (ads in-stream):**
• 50.000–500.000đ/giờ live
• Tăng visibility trong app

**3. Voucher live exclusive:**
• 5–20% giá bán giảm cho buyer xem live
• Tốc độ chốt cao hơn nhờ urgency

## Tại sao live commerce vẫn lãi dù chi phí thêm?

3 lý do:

**1. ROAS organic cao gấp 2–3x feed/search.**
Live có "social proof" thực thời gian: nghìn người xem cùng lúc, comment, react. Buyer mua nhanh hơn, ít compare. ROAS organic Beauty live 8–15x vs feed 3–6x.

**2. AOV cao hơn 30–50%.**
Live host có thể upsell, bundle, recommend complementary products tại chỗ. Buyer ở trạng thái mua hàng cảm xúc.

**3. Volume burst lớn.**
1 live 2h có thể đẩy 500–2.000 đơn -> khai thác thế mạnh "moment marketing". Ngày thường feed/search chỉ đẩy 50–200 đơn.

## Cấu trúc P&L Live Commerce - Ví dụ thực tế

Live 2h Beauty, 1.000 đơn, AOV 280k = GMV 280tr:

**Chi phí:**
• COGS (gross margin 65%): 98tr
• Phí hoa hồng TikTok 14.5%: 40.6tr
• Phí giao dịch 6%: 16.8tr (gộp ship)
• Phí CSHT 3.000đ × 1.000: 3tr
• Affiliate commission cho host KOC 15%: 42tr
• Voucher live 10%: 28tr
• Live boost ads: 1.5tr
• Tổng chi phí: 230tr

**Profit live: 280tr − 230tr = 50tr (margin 17.8%)**

So với feed/search cùng GMV (giả sử 1.000 đơn):
• Không có affiliate commission, không có voucher live exclusive
• Có ads spend cao hơn (50–80tr cho 1.000 đơn)
• Profit thường: 280tr − 200tr (chi phí + ads) = 80tr

-> **Feed/search profit cao hơn per đơn** nếu có thể đạt cùng volume. Nhưng live có lợi thế **đạt volume nhanh hơn nhiều**.

## Khi nào nên ưu tiên Live Commerce?

**1. Sản phẩm có "wow factor" hoặc demo được.** Beauty (test trên da), Fashion (try-on), F&B (taste test) phù hợp live nhất.

**2. Sản phẩm có "decision urgency".** Limited edition, new launch, mùa sale - buyer mua nhanh khi có scarcity.

**3. Brand muốn build cộng đồng + repeat buyer.** Live tạo connection cá nhân với buyer mạnh hơn ads.

**4. Có team content/host chuyên nghiệp.** Live thất bại 80% vì host kém.

## Khi nào KHÔNG nên live?

**1. Sản phẩm B2B hoặc chuyên biệt cao.** Buyer không cảm xúc, mua theo spec.

**2. Shop chưa có brand awareness.** Không ai vào watch live của shop lạ.

**3. Không có team host.** Hire host external mỗi live không sustainable, host nội bộ tốt hơn.

**4. Vốn dưới 100tr/tháng.** Live cần invest content + ads boost + voucher = chi phí cao tối thiểu 30–50tr.

## Tối ưu Live Commerce - 7 nguyên tắc

**1. Live cùng giờ mỗi tuần (consistency).** Buyer build thói quen quay lại.

**2. Setup voucher exclusive chỉ live.** Code chỉ active trong giờ live -> chốt nhanh.

**3. Bundle 2–3 sản phẩm với discount nhẹ.** AOV tăng 40–60%.

**4. Replay sau live tận dụng tiếp.** TikTok cho replay clip có engagement -> continue chốt đơn 24–48h sau.

**5. Track real-time CPM, CTR, CVR.** Không chỉ doanh thu - adjust trong khi live.

**6. Train host về objection handling.** "Sản phẩm này thực ra rẻ hơn trên Shopee" -> host xử lý thế nào?

**7. Diversify host, không depend 1 người.** Risk cao nếu host nghỉ/đột xuất.

## Tính ROAS Live Commerce - Cách đúng

Nhiều shop tính ROAS live sai vì chỉ track ads spend, quên affiliate commission và voucher live.

**Sai:** ROAS = Doanh thu / Ads boost spend
**Đúng:** ROAS thực = Doanh thu / (Ads + Affiliate commission + Voucher live)

Ví dụ live 280tr:
• Ads boost: 1.5tr
• Affiliate: 42tr
• Voucher: 28tr
• Tổng "marketing cost" thực: 71.5tr
• ROAS thực: 280 / 71.5 = **3.9x**

Khác hoàn toàn ROAS "trên giấy" 280/1.5 = 187x (vô nghĩa).

## Sai lầm phổ biến với Live Commerce

**1. Tính profit chỉ trên ads spend.** Quên affiliate commission cho creator.

**2. Voucher live quá deep (>20%).** Buyer biết shop sẽ giảm lần sau -> đợi chứ không mua.

**3. Live mỗi ngày không nghỉ.** Burnout host, content lặp, audience chán.

**4. Hire mega KOL 1 lần thay vì build relationship 5 KOC nhỏ.** Mega KOL chỉ tốt 1-2 live, KOC nhỏ build long-term affiliate program.

**5. Không track repeat buyer từ live.** Live attract buyer xem live, không phải buyer chất lượng. Repeat rate live thường thấp hơn search 30–50%.

## Benchmark ngành - Live Commerce 2026

**Beauty:**
• ROAS organic: 8–15x
• Conversion rate: 8–15%
• AOV uplift vs feed: +35–50%

**Fashion:**
• ROAS organic: 6–10x
• Conversion rate: 5–10%
• AOV uplift: +25–40%

**F&B/Snack:**
• ROAS organic: 5–9x
• Conversion rate: 6–12%
• AOV uplift: +20–35%

**Home & Living:**
• ROAS organic: 4–7x
• Conversion rate: 3–7%
• AOV uplift: +15–25%

## Lời khuyên thực chiến

Live commerce là "high-risk high-reward". Đầu tư đúng cách (host tốt, content chuẩn, voucher hợp lý) -> upside cực lớn. Đầu tư ẩu -> đốt tiền nhanh.

**Thứ tự ưu tiên cho shop mới làm live:**
1. Build content TikTok organic 2–3 tháng trước
2. Test live nhỏ 1 lần/tuần với host nội bộ
3. Đo hiệu quả 2 tháng, refine format
4. Scale lên 2–3 lần/tuần
5. Hire KOC affiliate khi đã có format ổn định

Tính cost cho live commerce với cấu trúc đầy đủ tại [Mẫu P&L Ecom](/tools/pnl-ecom) - input affiliate vào "Marketing khác" và voucher vào "Voucher seller %".
`,
  },

  /* ───────────── Bài 10 ───────────── */
  {
    id: "blog-A10-cap-nhat-chinh-sach-shopee-tiktok-h1-2026",
    title: "Cập nhật chính sách Shopee/TikTok 6 tháng đầu 2026 - Checklist seller phải biết",
    slug: "cap-nhat-chinh-sach-shopee-tiktok-h1-2026",
    excerpt:
      "Tổng hợp tất cả thay đổi quan trọng của Shopee và TikTok Shop nửa đầu 2026: phí, voucher, chính sách hoàn hàng, bảo vệ seller, freeship - checklist 12 mục.",
    category: "ecom",
    readTime: 8,
    publishedAt: "2026-05-10T15:30:00.000Z",
    featured: true,
    seoTitle: "Cập nhật Shopee TikTok H1 2026 - Checklist 12 thay đổi seller phải biết",
    seoDescription:
      "Toàn bộ chính sách Shopee và TikTok Shop thay đổi nửa đầu 2026: phí, voucher, hoàn hàng, freeship, bảo vệ seller. Checklist 12 mục + impact P&L cho seller.",
    content: `
Nửa đầu 2026 chứng kiến nhiều đợt cập nhật chính sách lớn từ cả Shopee và TikTok Shop. Một số thay đổi tăng chi phí seller, một số tạo cơ hội mới. Bài viết này tổng hợp 12 thay đổi quan trọng nhất kèm impact lên P&L và action items cho seller.

## 1. Phí hoa hồng tăng đồng loạt (08–09/05/2026)

**Thay đổi:** Cả Shopee (08/05) và TikTok (09/05) đều tăng phí hoa hồng 0.5–2% tuỳ ngành.

**Impact:** Margin shop trung bình giảm 1–1.5%. Beauty Mall ảnh hưởng nặng nhất.

**Action:** Audit lại P&L với phí mới. Nếu Contribution Margin < 15% sau update -> xem xét tăng giá hoặc cắt SKU lỗ.

## 2. Phí cơ sở hạ tầng (CSHT) áp dụng 100% đơn (Q1/2026)

**Thay đổi:** Phí 3.000đ/đơn áp dụng cho mọi đơn hoàn thành, kể cả Mall.

**Impact:** Đơn AOV thấp ảnh hưởng nặng. Đơn 50k = 6% phí cố định.

**Action:** Push AOV lên > 100k để CSHT < 3% tỷ trọng. Bundle, upsell, miễn phí ship cho đơn > X giá.

## 3. Voucher Extra Plus nâng cap lên 80.000đ (TikTok 03/2026)

**Thay đổi:** Cap Voucher Extra Plus tăng từ 70.000đ -> 80.000đ. Phí giữ 5.5%.

**Impact:** Tích cực cho shop có AOV cao (>1.5tr). Tiêu cực không.

**Action:** Shop AOV > 1tr nên cân nhắc Plus thay vì Extra để khai thác cap mới.

## 4. SFR (Bồi hoàn vận chuyển) ra mắt rộng rãi (TikTok 02/2026)

**Thay đổi:** SFR áp dụng toàn shop với phí 1.620đ/đơn - opt-in.

**Impact:** Shop return rate > 3% có thể tiết kiệm 50–70% chi phí xử lý hoàn.

**Action:** Đo return rate 30 ngày, nếu > 3% -> bật SFR.

## 5. Voucher Mall freeship áp dụng SPX độc quyền (Shopee 04/2026)

**Thay đổi:** Voucher freeship Mall chỉ active cho đơn dùng SPX Express. GHN, GHTK không nữa.

**Impact:** Shop dùng đối tác khác mất 1 lợi thế lớn.

**Action:** Mall shop nên switch về SPX cho đơn Shopee. Đối tác khác giữ cho ships ngoài Shopee.

## 6. Chính sách hoàn hàng kéo dài 15 ngày (cả 2 sàn)

**Thay đổi:** Buyer được hoàn hàng trong 15 ngày (trước là 7 ngày Shopee, 7 ngày TikTok).

**Impact:** Return rate có thể tăng 20–40% trong 6 tháng tới.

**Action:** Xây dựng quy trình hoàn hàng nghiêm hơn, prep buffer cash flow.

## 7. Phí ship liên miền tăng 5–10% (SPX, GHN - Q2/2026)

**Thay đổi:** Phí ship liên miền tăng 5–10% do giá xăng và logistics.

**Impact:** Buyer xa miền chịu phí cao hơn -> CVR giảm 5–10% ở vùng xa.

**Action:** Xem xét open kho thứ 2 ở vùng xa. Hoặc absorb phí ship cho buyer đầu lần.

## 8. Bảo vệ seller - Mediation system mới (Shopee 03/2026)

**Thay đổi:** Khi dispute hoàn hàng, có mediator độc lập review (không tự động favor buyer).

**Impact:** Shop "công bằng" hơn trong dispute. Trước seller win 30% case, giờ ~50%.

**Action:** Document đầy đủ packaging, tracking, conversation chat khi có dispute.

## 9. Verified Seller Badge mở rộng (TikTok 04/2026)

**Thay đổi:** Badge "Verified Seller" mở rộng cho shop có rating 4.8+, 6 tháng vận hành, > 200 đơn/tháng.

**Impact:** CVR shop verified cao hơn 8–15%. Giúp shop trung tăng cạnh tranh không cần Mall.

**Action:** Đáp ứng tiêu chí + apply badge. Free.

## 10. TikTok Shop Live Boost auto-bid (Q2/2026)

**Thay đổi:** Live Boost ads có chế độ auto-bid theo target ROAS (tương tự GMV Max).

**Impact:** Live boost dễ dùng hơn cho shop chưa quen ads.

**Action:** Test với target ROAS theo break-even ROAS ngành (tính tại [ROAS Calculator](/tools/roas-calculator)).

## 11. Shopee Coins thay đổi conversion (Q1/2026)

**Thay đổi:** 1 Shopee Coin = 100đ (trước 200đ). Buyer cần 2x coins để claim cùng giá trị voucher.

**Impact:** Voucher Shopee Coins ít hấp dẫn hơn -> seller nên dùng voucher seller riêng.

**Action:** Tăng voucher Seller direct (1–3% giá bán) thay vì depend voucher Coins.

## 12. Quy định nội dung TikTok khắt khe hơn (Q1/2026)

**Thay đổi:** Content live commerce + ads bị review chặt hơn về claim sản phẩm (không được nói "tốt nhất", "rẻ nhất", "giảm 90%").

**Impact:** Content team cần adjust script. Ads dễ bị reject hơn.

**Action:** Train host và content writer về compliance keywords. Test ads trước khi live launch.

## Impact tổng cho P&L H2/2026

Tổng tác động 12 thay đổi vào P&L shop trung bình:

**Tiêu cực:**
• Phí hoa hồng +1% revenue
• Phí ship liên miền nhẹ +0.3%
• Return rate có thể tăng -> cost xử lý hoàn +0.5%
• Tổng tiêu cực: ~1.8% revenue

**Tích cực (nếu khai thác đúng):**
• SFR tiết kiệm cost xử lý: +0.5% revenue
• Verified Badge boost CVR: +1% revenue
• Mediation system bảo vệ seller: +0.3%
• Tổng tích cực: ~1.8% revenue

-> **Net impact gần như zero nếu adopt nhanh các tính năng mới.** Shop chậm adopt chịu net negative 1.5–2%.

## Action plan 30 ngày cho seller

**Tuần 1: Audit hiện trạng**
• Update P&L với phí mới
• Đo return rate 30 ngày qua
• Check shop có đủ tiêu chí Verified Badge

**Tuần 2: Setup tính năng mới**
• Bật SFR nếu return rate > 3%
• Apply Verified Badge
• Switch SPX cho Shopee Mall đơn

**Tuần 3: Adjust strategy**
• Tăng AOV qua bundle / upsell
• Test Live Boost auto-bid
• Train team về compliance content

**Tuần 4: Đo lường + adjust**
• Reconcile P&L tháng đầu sau update
• So với P&L tháng trước -> identify line items thay đổi
• Điều chỉnh ads target dựa trên break-even mới

## Lời khuyên thực chiến

Chính sách sàn thay đổi 1–2 lần/quý là điều bình thường. Shop sống sót lâu là shop có **hệ thống monitoring** và **agility adapt** chứ không phải shop đoán đúng từng lần.

Mỗi quý, dành 4 giờ để:
1. Review email update từ Shopee/TikTok Seller Center
2. Audit P&L với phí mới
3. Check tính năng mới có thể leverage
4. Adjust strategy cho quý tiếp

4 giờ này tiết kiệm hàng chục triệu impact.

Tính lại P&L với phí 2026 mới tại [Mẫu P&L Ecom](/tools/pnl-ecom), break-even ROAS sau update tại [ROAS Calculator](/tools/roas-calculator), và lấy số phí chính xác từng ngành tại [Tool tính phí sàn](/tools/tinh-phi-san).
`,
  },
];
