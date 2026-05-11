/**
 * Cluster Thuế TNCN 2026 - 5 bài SEO long-form bao quát:
 * 1. Pillar: Cách tính TNCN 2026 (master guide)
 * 2. So sánh 5 bậc 2026 vs 7 bậc 2025
 * 3. Giảm trừ gia cảnh 15.5M / 6.2M
 * 4. Long-tail: lương nào không đóng thuế
 * 5. BHXH 10.5% breakdown
 *
 * Mỗi bài link sang Tool /tools/tinh-thue-tncn + cross-link nhau theo Pillar-Cluster model.
 * Targeting volume cao đầu năm 2026 khi luật mới có hiệu lực 1/1/2026.
 */

import type { FullPost } from "./group-a-content";

export const TNCN_POSTS: FullPost[] = [
  /* ───────────── Bài 1 - PILLAR ───────────── */
  {
    id: "blog-T1-tncn-2026-huong-dan",
    title: "Cách tính thuế TNCN 2026 - Hướng dẫn chi tiết theo Nghị quyết 110/2025",
    slug: "cach-tinh-thue-tncn-2026",
    excerpt:
      "Hướng dẫn full A->Z cách tính thuế thu nhập cá nhân 2026 theo Nghị quyết 110/2025/UBTVQH15: 5 bậc thuế mới, giảm trừ 15.5tr cho bản thân + 6.2tr/người phụ thuộc, công thức step-by-step, ví dụ thực tế với lương 15tr, 25tr, 50tr.",
    category: "career",
    readTime: 12,
    publishedAt: "2026-05-11T09:00:00.000Z",
    featured: true,
    seoTitle: "Cách tính thuế TNCN 2026 chi tiết - Nghị quyết 110/2025",
    seoDescription:
      "Hướng dẫn tính thuế thu nhập cá nhân 2026 đầy đủ: 5 bậc mới, giảm trừ gia cảnh 15.5 triệu, BHXH 10.5%. Có công thức + ví dụ lương 15tr/25tr/50tr + tool tính tự động.",
    content: `
Luật thuế thu nhập cá nhân Việt Nam thay đổi lớn từ 01/01/2026 theo **Nghị quyết 110/2025/UBTVQH15**. Đây là đợt điều chỉnh lớn nhất kể từ năm 2020 - gộp số bậc thuế từ 7 xuống 5 và nâng mức giảm trừ gia cảnh thêm 41%. Bài viết này hướng dẫn đầy đủ cách tính thuế TNCN 2026 từ tiền lương, kèm công thức step-by-step và ví dụ tính trực tiếp cho 3 mức lương phổ biến.

## 2 thay đổi lớn nhất từ 1/1/2026

Trước khi đi vào công thức, bạn cần biết 2 điểm khác biệt cốt lõi giữa luật cũ và luật mới:

**Thay đổi 1 - Số bậc thuế giảm từ 7 xuống 5:** Luật cũ 2025 có 7 bậc với mức thuế suất 5%, 10%, 15%, 20%, 25%, 30%, 35%. Luật mới 2026 gộp lại còn 5 bậc: 5%, 10%, 20%, 30%, 35% - bỏ hẳn 2 bậc trung gian 15% và 25%.

**Thay đổi 2 - Mức giảm trừ gia cảnh tăng 41%:**

- Giảm trừ bản thân: **11.000.000 -> 15.500.000 đồng/tháng**
- Giảm trừ người phụ thuộc: **4.400.000 -> 6.200.000 đồng/người/tháng**

Hai thay đổi này khiến người làm công ăn lương đóng thuế ít hơn đáng kể, đặc biệt mức thu nhập trung bình 15–60 triệu/tháng - phân khúc đông nhất trong lực lượng lao động.

## Công thức tính thuế TNCN 2026 - 8 bước

Công thức tổng quát:

> **Thuế TNCN = Thu nhập tính thuế × Thuế suất** (áp theo biểu lũy tiến từng phần)

Trong đó, **Thu nhập tính thuế = Tổng thu nhập − Bảo hiểm bắt buộc − Giảm trừ gia cảnh**. Cụ thể 8 bước:

1. **Lấy lương Gross/tháng** - lương trên hợp đồng, trước khi trừ bảo hiểm và thuế.

2. **Trừ bảo hiểm bắt buộc 10.5%** - BHXH 8% + BHYT 1.5% + BHTN 1%. Lưu ý: BHXH + BHYT cap tại mức lương đóng bảo hiểm tối đa 46.800.000 (20× lương cơ sở 2.340.000); BHTN cap tại 99.200.000.

3. **Trừ giảm trừ bản thân 15.500.000** - bắt buộc, áp cho mọi cá nhân cư trú.

4. **Trừ giảm trừ người phụ thuộc**: 6.200.000 × số người phụ thuộc đã đăng ký với cơ quan thuế.

5. **= Thu nhập tính thuế.** Nếu kết quả ≤ 0 -> không phải đóng thuế tháng đó.

6. **Áp biểu thuế lũy tiến từng phần** (5 bậc) cho phần thu nhập tính thuế. Quan trọng: áp **từng phần**, không phải toàn phần. Ví dụ nếu thu nhập tính thuế = 20.000.000, bạn đóng 5% cho 10.000.000 đầu và 10% cho 10.000.000 sau.

7. **Cộng dồn** thuế từng bậc -> tổng thuế TNCN tháng.

8. **Lương Net = Lương Gross − Bảo hiểm bắt buộc − Thuế TNCN**.

## Biểu thuế TNCN 2026 - 5 bậc

| Bậc | Thu nhập tính thuế/tháng | Thuế suất |
|---|---|---|
| 1 | Đến 10.000.000 | 5% |
| 2 | 10.000.000 – 30.000.000 | 10% |
| 3 | 30.000.000 – 60.000.000 | 20% |
| 4 | 60.000.000 – 100.000.000 | 30% |
| 5 | Trên 100.000.000 | 35% |

So với biểu 2025 (7 bậc), bậc 5% được nới rộng gấp đôi (từ 5tr lên 10tr), bậc 10% mở rộng 3 lần (từ 10tr lên 30tr) - đây là 2 bậc đông người đóng nhất nên hiệu quả "đỡ thuế" cảm nhận rõ.

## Ví dụ tính TNCN - Lương Gross 25.000.000, 0 người phụ thuộc

Tình huống: Marketing Executive 3 năm kinh nghiệm, lương Gross 25 triệu/tháng, có đóng BHXH, độc thân.

**Bước 1**: Lương Gross = 25.000.000
**Bước 2**: Bảo hiểm = 25.000.000 × 10.5% = 2.625.000
**Bước 3**: Sau bảo hiểm = 22.375.000
**Bước 4**: − Giảm trừ bản thân 15.500.000
**Bước 5**: Thu nhập tính thuế = 22.375.000 − 15.500.000 = 6.875.000
**Bước 6**: Áp bậc 1 (đến 10tr, 5%) = 6.875.000 × 5% = **343.750**

-> Thuế TNCN tháng = **343.750 đồng**
-> Lương Net = 25.000.000 − 2.625.000 − 343.750 = **22.031.250 đồng/tháng**

So sánh với luật 2025: cùng lương 25tr, độc thân, thuế TNCN 2025 = 757.500, Net 2025 = 21.617.500. Sang 2026 bạn **tiết kiệm 413.750 đồng/tháng = 4.965.000/năm**.

## Ví dụ tính TNCN - Lương Gross 50.000.000, 1 người phụ thuộc

Tình huống: Marketing Manager, lương 50tr/tháng, có 1 con dưới 18 tuổi đã đăng ký người phụ thuộc.

**Bảo hiểm**: 50.000.000 × 10.5% = 5.250.000 (chưa chạm cap 46.8tr)
**Sau BH**: 44.750.000
**Giảm trừ tổng**: 15.500.000 + 6.200.000 = 21.700.000
**Thu nhập tính thuế**: 44.750.000 − 21.700.000 = 23.050.000

Áp biểu lũy tiến:
- Bậc 1 (đến 10tr, 5%): 10.000.000 × 5% = 500.000
- Bậc 2 (10–30tr, 10%): 13.050.000 × 10% = 1.305.000

Tổng thuế: **1.805.000 đồng/tháng**
Lương Net: 50.000.000 − 5.250.000 − 1.805.000 = **42.945.000/tháng**

Luật 2025 cùng case: thuế 3.385.000, Net 41.365.000 -> **2026 tiết kiệm 1.580.000/tháng = 18.960.000/năm**.

## Ví dụ tính TNCN - Lương Gross 100.000.000, 2 người phụ thuộc

Tình huống: Senior Manager / Head of Department, lương 100tr, có 2 con.

**Bảo hiểm**: BHXH+BHYT cap tại 46.8tr × 9.5% = 4.446.000. BHTN: 100tr × 1% = 1.000.000 (chưa chạm cap 99.2tr). Tổng BH = 5.446.000.
**Sau BH**: 94.554.000
**Giảm trừ tổng**: 15.500.000 + 2 × 6.200.000 = 27.900.000
**Thu nhập tính thuế**: 94.554.000 − 27.900.000 = 66.654.000

Áp biểu lũy tiến:
- Bậc 1: 10tr × 5% = 500.000
- Bậc 2: 20tr × 10% = 2.000.000
- Bậc 3: 30tr × 20% = 6.000.000
- Bậc 4: 6.654.000 × 30% = 1.996.200

Tổng thuế: **10.496.200 đồng/tháng**
Net: 100.000.000 − 5.446.000 − 10.496.200 = **84.057.800/tháng**

Luật 2025: thuế 14.736.250, Net 79.817.750 -> **2026 tiết kiệm 4.240.050/tháng = 50.880.600/năm**.

## Lương bao nhiêu thì không phải đóng thuế?

Theo công thức luật 2026: ngưỡng không phải đóng thuế (thu nhập tính thuế = 0) là:

> **Ngưỡng = Giảm trừ gia cảnh / (1 − tỷ lệ bảo hiểm)**

Với BHXH 10.5%:

- **0 người phụ thuộc**: Lương Gross ≤ 17.318.000 -> không thuế (15.500.000 ÷ 0.895)
- **1 người phụ thuộc**: Lương Gross ≤ 24.246.000 -> không thuế
- **2 người phụ thuộc**: Lương Gross ≤ 31.174.000 -> không thuế
- **3 người phụ thuộc**: Lương Gross ≤ 38.101.000 -> không thuế

Nếu không đóng BHXH (freelance, hợp đồng dưới 3 tháng): ngưỡng = giảm trừ × (1 + dependents). 0 người phụ thuộc thì ≤ 15.500.000 không thuế.

## Quyết toán thuế TNCN cuối năm

Trong năm, công ty trả lương sẽ tạm khấu trừ thuế hằng tháng theo biểu lũy tiến. Cuối năm, cá nhân hoặc đơn vị trả lương phải **quyết toán** để tính lại tổng thuế cả năm, bù trừ chênh lệch.

- **Hạn nộp tờ khai quyết toán**: 31/03/2026 (cá nhân tự quyết toán) hoặc 30/04/2026 (uỷ quyền công ty).
- **Portal online**: etax.gdt.gov.vn - đăng nhập bằng số CCCD.
- **Khi nào cần tự quyết toán**: thu nhập từ 2 nơi trở lên, đổi nơi làm trong năm, tổng thuế phải đóng > thuế đã tạm khấu trừ.

## Tool tự tính TNCN 2026 - miễn phí, so sánh trực tiếp với 2025

Thay vì nhẩm tay, bạn có thể dùng [Tool Tính Thuế TNCN 2026](/tools/tinh-thue-tncn) trên trang. Tool đã apply đúng Nghị quyết 110/2025/UBTVQH15, hiển thị 2 cột song song:

- Cột trái: thuế bạn phải đóng theo luật cũ 2025
- Cột phải: thuế theo luật mới 2026
- Delta savings tự tính ra số tiền tiết kiệm/năm

Nhập **chỉ lương Gross/tháng** là đủ - người phụ thuộc và bảo hiểm có giá trị mặc định nếu bạn lười điền. Phù hợp cho: sinh viên năm cuối tính lương offer, marketer đàm phán contract mới, founder phòng nhân sự update lại tổng quỹ lương.

## Đọc thêm về thuế TNCN 2026

- [Giảm trừ gia cảnh 2026 - Bản thân 15.5 triệu, phụ thuộc 6.2 triệu](/blog/giam-tru-gia-canh-2026)
- [BHXH 10.5% - Cách tính bảo hiểm bắt buộc 2026](/blog/bhxh-10-5-percent-2026)
- [5 bậc thuế TNCN 2026 vs 7 bậc 2025 - Ai được lợi nhất](/blog/5-bac-thue-tncn-2026-vs-2025)
- [Lương Gross bao nhiêu thì không phải đóng thuế TNCN 2026](/blog/luong-khong-phai-dong-thue-2026)
`,
  },

  /* ───────────── Bài 2 - So sánh ───────────── */
  {
    id: "blog-T2-5-bac-vs-7-bac",
    title: "5 bậc thuế TNCN 2026 vs 7 bậc 2025 - Ai được lợi nhất từ luật mới",
    slug: "5-bac-thue-tncn-2026-vs-2025",
    excerpt:
      "Luật thuế TNCN 2026 gộp 7 bậc thành 5 bậc. Bài viết phân tích từng phân khúc thu nhập - ai tiết kiệm nhiều nhất, ai bị ảnh hưởng ít. Bảng so sánh chi tiết + biểu đồ delta thuế cho 6 mức lương phổ biến.",
    category: "career",
    readTime: 9,
    publishedAt: "2026-05-11T10:00:00.000Z",
    featured: true,
    seoTitle: "5 bậc thuế TNCN 2026 vs 7 bậc 2025 - Phân khúc nào lợi nhất",
    seoDescription:
      "So sánh chi tiết biểu thuế TNCN 5 bậc 2026 và 7 bậc 2025. Phân tích ai được lợi nhất, delta thuế theo mức lương 15tr, 25tr, 50tr, 80tr, 100tr, 150tr.",
    content: `
Từ 1/1/2026, biểu thuế thu nhập cá nhân Việt Nam **giảm từ 7 bậc xuống 5 bậc** theo Nghị quyết 110/2025/UBTVQH15. Đây không phải đợt giảm thuế suất - mà là gộp bậc + nới rộng range để giảm gánh nặng cho người thu nhập trung bình. Bài viết phân tích chính xác ai được lợi nhất.

## Biểu thuế 2025 (cũ) vs 2026 (mới) - đặt cạnh nhau

**Luật 2025 - 7 bậc**:

| Bậc | Thu nhập tính thuế/tháng | Thuế suất |
|---|---|---|
| 1 | Đến 5.000.000 | 5% |
| 2 | 5.000.000 – 10.000.000 | 10% |
| 3 | 10.000.000 – 18.000.000 | 15% |
| 4 | 18.000.000 – 32.000.000 | 20% |
| 5 | 32.000.000 – 52.000.000 | 25% |
| 6 | 52.000.000 – 80.000.000 | 30% |
| 7 | Trên 80.000.000 | 35% |

**Luật 2026 - 5 bậc**:

| Bậc | Thu nhập tính thuế/tháng | Thuế suất |
|---|---|---|
| 1 | Đến 10.000.000 | 5% |
| 2 | 10.000.000 – 30.000.000 | 10% |
| 3 | 30.000.000 – 60.000.000 | 20% |
| 4 | 60.000.000 – 100.000.000 | 30% |
| 5 | Trên 100.000.000 | 35% |

## Phân tích sự thay đổi từng bậc

**Bậc 1 (5%)**: Range nới rộng 2x - từ 5tr lên 10tr. Người có thu nhập tính thuế dưới 10tr toàn phần đóng 5% (thay vì phải lấn lên bậc 2 10%).

**Bậc 2 (10%)**: Range mở rộng 3x - từ 5tr (5tr-10tr) lên 20tr (10tr-30tr). Phân khúc thu nhập 10-30tr tính thuế được giảm tỷ trọng đáng kể vì không còn phải vọt lên bậc 15% hoặc 20%.

**Bậc 3 (15%) - BỎ HẲN**: Luật cũ có bậc 15% cho 10-18tr thu nhập tính thuế. Luật mới dồn phân khúc này vào bậc 10% mới (10-30tr).

**Bậc 4 (20%)**: Range giảm còn 30tr (30-60tr) vs luật cũ 14tr (18-32tr). Mức 20% giờ kéo dài đến 60tr thu nhập tính thuế.

**Bậc 5 (25%) - BỎ HẲN**: Luật cũ có bậc 25% cho 32-52tr. Luật mới dồn vào bậc 20% (mới mở rộng đến 60tr).

**Bậc 6 (30%)**: Range nới từ 28tr (52-80tr) lên 40tr (60-100tr) - phân khúc thu nhập cao được nới tương đối.

**Bậc 7 (35%)**: Range bắt đầu từ trên 100tr thay vì trên 80tr - kéo dài 20tr range trước khi áp 35%.

## Delta thuế theo mức lương - Ai tiết kiệm bao nhiêu?

Bảng dưới đây tính ra **số tiền thuế tiết kiệm/năm** cho 6 mức lương phổ biến (giả định độc thân, đóng BHXH đầy đủ, 0 người phụ thuộc):

| Lương Gross | Thuế 2025/tháng | Thuế 2026/tháng | Tiết kiệm/tháng | Tiết kiệm/năm |
|---|---|---|---|---|
| 15.000.000 | 47.250 | 0 | 47.250 | 567.000 |
| 20.000.000 | 287.250 | 33.750 | 253.500 | 3.042.000 |
| 25.000.000 | 757.500 | 343.750 | 413.750 | 4.965.000 |
| 35.000.000 | 1.953.750 | 1.043.750 | 910.000 | 10.920.000 |
| 50.000.000 | 4.155.000 | 2.225.000 | 1.930.000 | 23.160.000 |
| 80.000.000 | 11.530.000 | 6.815.000 | 4.715.000 | 56.580.000 |
| 100.000.000 | 16.555.000 | 11.965.500 | 4.589.500 | 55.074.000 |
| 150.000.000 | 33.555.000 | 25.965.500 | 7.589.500 | 91.074.000 |

## Phân khúc nào lợi nhất?

Phân tích delta tương đối (% tiết kiệm so với thuế 2025):

- **Lương 15-20tr**: tiết kiệm 80-100% thuế (nhiều người không phải đóng thuế nữa nhờ giảm trừ tăng).
- **Lương 25-35tr**: tiết kiệm 45-55% thuế. Đây là phân khúc Marketing Executive / Senior junior - đông nhất trong lực lượng văn phòng VN.
- **Lương 50-80tr**: tiết kiệm 40-46% thuế. Manager / Senior Manager.
- **Lương 100tr+**: tiết kiệm 23-27% thuế. Director / C-level. Phân khúc cao vẫn được lợi nhưng tỷ trọng giảm.

**Kết luận**: Luật 2026 thiết kế ưu đãi mạnh nhất cho phân khúc 20-50tr/tháng - chính xác là phân khúc đông người, văn phòng, gia đình trẻ. Đây là nhóm chịu áp lực chi tiêu cao nhất (con cái, mua nhà, ô tô) nên nâng giảm trừ giúp giảm gánh nặng trực tiếp.

## Hai nguyên nhân chính giúp 2026 đỡ thuế hơn

**Nguyên nhân 1 - Giảm trừ gia cảnh tăng 41%**: Cá nhân thu nhập trung bình 20-30tr/tháng có thu nhập tính thuế giảm 4.5tr (do giảm trừ bản thân từ 11tr lên 15.5tr). 4.5tr này nếu rơi vào bậc 15% trong luật cũ -> tiết kiệm 675.000/tháng. Đã đóng góp ~50% tổng delta.

**Nguyên nhân 2 - Gộp bậc thuế**: Bỏ bậc 15% và 25% giúp phần thu nhập tính thuế trước đây phải đóng 15% giờ chỉ đóng 10%, phần đóng 25% giờ chỉ đóng 20%. Cá nhân thu nhập 50tr tiết kiệm thêm 700-900k/tháng từ riêng yếu tố này.

Cộng hưởng 2 yếu tố -> mid-income tiết kiệm 1.5-2tr/tháng = 18-24tr/năm. Bằng 1 tháng lương Net cho nhiều người.

## Tính cụ thể lương của bạn ngay

Đừng đoán - [Tool Tính Thuế TNCN 2026](/tools/tinh-thue-tncn) hiển thị side-by-side 2 năm trong 3 giây. Chỉ cần điền lương Gross/tháng, tool tự tính bảo hiểm + giảm trừ + thuế. Có 4 preset 15tr/25tr/50tr/100tr để bạn test nhanh các kịch bản.

## Đọc thêm

- [Cách tính thuế TNCN 2026 - Hướng dẫn chi tiết](/blog/cach-tinh-thue-tncn-2026)
- [Giảm trừ gia cảnh 2026 - Bản thân 15.5 triệu, phụ thuộc 6.2 triệu](/blog/giam-tru-gia-canh-2026)
- [Lương Gross bao nhiêu thì không phải đóng thuế](/blog/luong-khong-phai-dong-thue-2026)
`,
  },

  /* ───────────── Bài 3 - Giảm trừ gia cảnh ───────────── */
  {
    id: "blog-T3-giam-tru-gia-canh",
    title: "Giảm trừ gia cảnh 2026 - Bản thân 15.5 triệu, người phụ thuộc 6.2 triệu",
    slug: "giam-tru-gia-canh-2026",
    excerpt:
      "Giảm trừ gia cảnh 2026 tăng 41%: bản thân 15.500.000/tháng, người phụ thuộc 6.200.000/người/tháng theo Nghị quyết 110/2025. Ai được đăng ký phụ thuộc, hồ sơ cần gì, cập nhật trong năm thế nào.",
    category: "career",
    readTime: 8,
    publishedAt: "2026-05-11T11:00:00.000Z",
    featured: false,
    seoTitle: "Giảm trừ gia cảnh 2026 - Bản thân 15.5 triệu, phụ thuộc 6.2 triệu",
    seoDescription:
      "Cập nhật giảm trừ gia cảnh 2026: bản thân 15.500.000 đồng/tháng, người phụ thuộc 6.200.000/người. Hướng dẫn ai được đăng ký phụ thuộc + hồ sơ + cách cập nhật.",
    content: `
Giảm trừ gia cảnh là khoản tiền cố định được trừ khỏi thu nhập trước khi tính thuế TNCN. Từ 1/1/2026, mức giảm trừ tăng **41%** theo Nghị quyết 110/2025/UBTVQH15 - đây là đợt nâng lớn nhất kể từ năm 2020.

## Mức giảm trừ gia cảnh 2026

**Giảm trừ bản thân**: 15.500.000 đồng/tháng (186.000.000 đồng/năm) - áp cho mọi cá nhân cư trú có thu nhập từ tiền lương / tiền công / kinh doanh, bắt buộc và tự động.

**Giảm trừ người phụ thuộc**: 6.200.000 đồng/người/tháng - chỉ áp khi cá nhân đăng ký người phụ thuộc với cơ quan thuế và có hồ sơ đầy đủ.

So với 2025 (11 triệu và 4.4 triệu), mức mới tăng **+4.5 triệu cho bản thân** và **+1.8 triệu cho mỗi người phụ thuộc** - tổng cộng đỡ thuế đáng kể cho gia đình có 1-2 con.

## Ai được tính là người phụ thuộc?

Theo quy định hiện hành (Thông tư 111/2013 và sửa đổi), 4 nhóm sau được đăng ký người phụ thuộc:

**Nhóm 1 - Con**:
- Con dưới 18 tuổi (kể cả con đẻ, con nuôi hợp pháp, con riêng của vợ/chồng).
- Con từ 18 tuổi trở lên bị khuyết tật, không có khả năng lao động.
- Con đang theo học bậc đại học, cao đẳng, trung cấp, học nghề (kể cả ngoài nước) không có thu nhập hoặc thu nhập bình quân tháng không vượt 1.000.000 đồng.

**Nhóm 2 - Vợ/chồng**:
- Không có khả năng lao động (mất sức 81%+, nuôi con dưới 36 tháng tuổi…) hoặc trong độ tuổi lao động nhưng không có thu nhập / thu nhập ≤ 1.000.000/tháng.

**Nhóm 3 - Cha mẹ ruột + bố mẹ vợ/chồng + cha mẹ nuôi hợp pháp**:
- Ngoài độ tuổi lao động (nam ≥ 60, nữ ≥ 55) hoặc trong độ tuổi nhưng mất khả năng lao động.
- Không có thu nhập hoặc thu nhập ≤ 1.000.000/tháng.

**Nhóm 4 - Người khác phải trực tiếp nuôi dưỡng**:
- Anh chị em ruột, ông bà nội/ngoại, cô dì chú bác, cháu ruột - không nơi nương tựa, không có thu nhập.
- Phải có giấy xác nhận của địa phương về việc đang trực tiếp nuôi dưỡng.

## Hồ sơ đăng ký người phụ thuộc

Khác với giảm trừ bản thân (tự động), giảm trừ người phụ thuộc cần đăng ký + nộp hồ sơ. Gồm:

1. **Mẫu 02/ĐK-NPT-TNCN** - đăng ký người phụ thuộc, nộp cho đơn vị trả lương HOẶC cơ quan thuế trực tiếp.
2. **Chứng minh quan hệ** - bản sao công chứng:
   - Con: giấy khai sinh
   - Vợ/chồng: giấy đăng ký kết hôn
   - Cha mẹ: sổ hộ khẩu / căn cước
   - Nhóm 4: giấy xác nhận chính quyền địa phương
3. **Chứng minh thu nhập ≤ 1.000.000/tháng** (nếu áp dụng): sổ hộ khẩu kết hợp xác nhận không có việc làm, hoặc bản kê khai thu nhập của người phụ thuộc.
4. **Chứng minh học vấn** (con 18+): bản sao thẻ sinh viên hoặc xác nhận của trường.

**Thời gian nộp**: trong 3 tháng kể từ khi đăng ký mã số thuế người phụ thuộc. Nếu nộp muộn, giảm trừ chỉ được áp từ tháng nộp hồ sơ trở đi (không hồi tố).

## Quy tắc 1 người phụ thuộc - 1 người nộp thuế

**Mỗi người phụ thuộc CHỈ được đăng ký giảm trừ tại 1 người nộp thuế duy nhất.** Vợ chồng phải thoả thuận xem ai giảm trừ con. Anh chị em không được cùng giảm trừ cha mẹ - chỉ 1 người được áp dụng.

Quy tắc này tránh trùng lặp + thất thoát thuế. Vi phạm bị truy thu thuế + phạt 10-20% số thuế đã giảm trừ sai.

## Cách cập nhật người phụ thuộc trong năm

Có thay đổi trong năm - thêm con, người phụ thuộc qua đời, vợ/chồng có việc làm - phải thông báo cho đơn vị trả lương trong **30 ngày**. Nếu không:

- Thêm người phụ thuộc -> giảm trừ chỉ áp từ tháng thông báo trở đi.
- Bỏ người phụ thuộc -> bị truy thu thuế từ tháng người đó hết đủ điều kiện.

Cuối năm khi quyết toán, mọi điều chỉnh sẽ được rà soát lại trên portal etax.gdt.gov.vn.

## Ngưỡng lương không phải đóng thuế theo số người phụ thuộc

Áp dụng luật 2026 + đóng BHXH 10.5%:

| Số người phụ thuộc | Ngưỡng lương Gross/tháng | Ngưỡng lương Gross/năm |
|---|---|---|
| 0 | 17.318.000 | 207.816.000 |
| 1 | 24.246.000 | 290.952.000 |
| 2 | 31.174.000 | 374.088.000 |
| 3 | 38.101.000 | 457.212.000 |
| 4 | 45.029.000 | 540.348.000 |

Có nghĩa: Marketing Manager lương 30tr/tháng có 2 con đăng ký phụ thuộc -> **không phải đóng thuế TNCN** trong 2026. Sang 2025 cùng case phải đóng ~1.06tr/tháng.

## Tool tính nhanh

[Tool Tính Thuế TNCN 2026](/tools/tinh-thue-tncn) có sẵn ô "Số người phụ thuộc" - default 0, bạn điền 1-2-3 để xem delta thuế thay đổi ngay. So sánh với 2025 cũ side-by-side để thấy nâng giảm trừ giúp đỡ bao nhiêu.

## Đọc thêm

- [Cách tính thuế TNCN 2026 - Hướng dẫn chi tiết](/blog/cach-tinh-thue-tncn-2026)
- [5 bậc thuế TNCN 2026 vs 7 bậc 2025](/blog/5-bac-thue-tncn-2026-vs-2025)
- [Lương Gross bao nhiêu thì không phải đóng thuế](/blog/luong-khong-phai-dong-thue-2026)
`,
  },

  /* ───────────── Bài 4 - Long-tail ───────────── */
  {
    id: "blog-T4-luong-khong-dong-thue",
    title: "Lương Gross bao nhiêu thì không phải đóng thuế TNCN 2026",
    slug: "luong-khong-phai-dong-thue-2026",
    excerpt:
      "Ngưỡng lương Gross không phải đóng thuế TNCN 2026: 17.318.000 đồng/tháng nếu độc thân + đóng BHXH. Tăng theo số người phụ thuộc. Bảng đầy đủ + công thức tính nhanh + so sánh với 2025.",
    category: "career",
    readTime: 6,
    publishedAt: "2026-05-11T12:00:00.000Z",
    featured: false,
    seoTitle: "Lương bao nhiêu không phải đóng thuế TNCN 2026 - Ngưỡng đầy đủ",
    seoDescription:
      "Lương Gross 17.3 triệu/tháng + 0 phụ thuộc -> không đóng thuế TNCN 2026. Bảng ngưỡng theo số người phụ thuộc, công thức tính nhanh, so sánh 2025.",
    content: `
"Lương Gross của tôi bao nhiêu thì khỏi đóng thuế?" - câu hỏi nhiều sinh viên năm cuối + new joiner nghĩ tới khi đàm phán offer đầu tiên. Bài viết tổng hợp ngưỡng chính xác theo luật 2026 mới + công thức nhẩm nhanh.

## Đáp án nhanh

**Luật 2026 (hiệu lực 1/1/2026):**

| Số người phụ thuộc | Lương Gross/tháng không phải đóng thuế | So sánh 2025 |
|---|---|---|
| 0 | 17.318.000 | +5.027.000 (2025: 12.291.000) |
| 1 | 24.246.000 | +7.044.000 |
| 2 | 31.174.000 | +9.061.000 |
| 3 | 38.101.000 | +11.078.000 |

Bảng trên giả định **có đóng BHXH 10.5%**. Nếu KHÔNG đóng BHXH (freelance, hợp đồng dưới 3 tháng), ngưỡng = giảm trừ thuần:
- 0 phụ thuộc: 15.500.000
- 1: 21.700.000
- 2: 27.900.000

## Công thức tính ngưỡng

Ngưỡng lương Gross không phải đóng thuế thoả mãn điều kiện:

> **Lương Gross − Bảo hiểm − Giảm trừ = 0**

Triển khai:

> **Lương Gross × (1 − 10.5%) = Giảm trừ bản thân + n × Giảm trừ phụ thuộc**

-> **Lương Gross = (15.500.000 + n × 6.200.000) / 0.895**

Với n = số người phụ thuộc, 0.895 = phần còn lại sau khi trừ BHXH 10.5%.

**Áp dụng**:
- n = 0: 15.500.000 / 0.895 ≈ 17.318.000
- n = 1: 21.700.000 / 0.895 ≈ 24.246.000
- n = 2: 27.900.000 / 0.895 ≈ 31.174.000

## Tại sao 2026 đỡ nhiều hơn 2025?

So với 2025 (giảm trừ 11tr + 4.4tr/phụ thuộc), 2026 nâng lên 15.5tr + 6.2tr - tăng 41% trên cả 2 mục.

**Ngưỡng 2025**:
- 0 phụ thuộc: 11.000.000 / 0.895 ≈ 12.291.000
- 1: 15.400.000 / 0.895 ≈ 17.207.000
- 2: 19.800.000 / 0.895 ≈ 22.123.000

Có nghĩa: sinh viên năm cuối lương offer 15tr/tháng + 0 phụ thuộc - **2025 phải đóng thuế ~50k/tháng**, **2026 không phải đóng** đồng nào. New grad Marketing executive lương 17tr - 2025 đóng ~250k/tháng, 2026 vẫn không đóng.

## Phân khúc nhân sự ảnh hưởng nhiều nhất

Theo Báo cáo Salary Benchmark Việt Nam 2025 (TopCV / Navigos / VietnamWorks):

- **Sinh viên năm cuối / new grad**: 70% có offer 10-18tr -> **toàn bộ thoát ngưỡng thuế 2026**.
- **Junior Marketing 0-2 năm KN**: lương trung bình 12-20tr -> **80% không phải đóng thuế** nếu chưa có con.
- **Mid-senior 2-5 năm KN**: lương 18-30tr -> vẫn đóng nhưng số thuế giảm 50-90% so với 2025.
- **Manager 5-8 năm**: 30-50tr -> tiết kiệm 1.5-2tr/tháng.

**Hệ quả**: Marketing fresher 2026 đàm phán lương cứng 15-17tr thoải mái - không phải lo "lương cao bị thuế ăn mất". Đây là điểm khác biệt lớn với 5 năm trước (lương 11tr là đã đóng thuế).

## Đàm phán offer 2026 - Gợi ý cho fresher

**Tip 1**: Lương Gross 17.3tr là ngưỡng vàng cho fresher độc thân - vừa thoát thuế, vừa cạnh tranh với mặt bằng thị trường. Đừng nhận thấp hơn 15tr nếu vị trí thuộc tier 1 (FMCG/Beauty/Tech brand lớn).

**Tip 2**: Nếu công ty offer Net không Gross - luôn quy đổi ra Gross trước khi đàm phán. Net 16tr/tháng -> Gross tương đương ~17.8tr (do BHXH 10.5%). Đừng để công ty "đỡ" mất phần BHXH.

**Tip 3**: Phụ thuộc người yêu KHÔNG được tính giảm trừ. Chỉ vợ/chồng hợp pháp (có đăng ký kết hôn) mới đủ điều kiện. Đăng ký người phụ thuộc cha mẹ trên 60 tuổi nếu họ không có thu nhập - tiết kiệm thuế đáng kể.

## Tool tính chính xác

Không chắc lương của bạn có vượt ngưỡng không? [Tool Tính Thuế TNCN 2026](/tools/tinh-thue-tncn) trả lời trong 3 giây - nhập lương Gross + số người phụ thuộc, tool show thuế phải đóng + lương Net cả 2 năm 2025 và 2026.

## Đọc thêm

- [Cách tính thuế TNCN 2026 đầy đủ](/blog/cach-tinh-thue-tncn-2026)
- [Giảm trừ gia cảnh 2026](/blog/giam-tru-gia-canh-2026)
- [5 bậc 2026 vs 7 bậc 2025](/blog/5-bac-thue-tncn-2026-vs-2025)
`,
  },

  /* ───────────── Bài 5 - BHXH ───────────── */
  {
    id: "blog-T5-bhxh-10-5",
    title: "BHXH 10.5% - Cách tính bảo hiểm bắt buộc 2026 cho người lao động",
    slug: "bhxh-10-5-percent-2026",
    excerpt:
      "Bảo hiểm bắt buộc người lao động đóng 10.5% lương: BHXH 8% + BHYT 1.5% + BHTN 1%. Có cap tại 46.800.000 cho BHXH+BHYT, 99.200.000 cho BHTN. Hướng dẫn cách công ty thường đóng BH trên mức thấp hơn lương Gross.",
    category: "career",
    readTime: 7,
    publishedAt: "2026-05-11T13:00:00.000Z",
    featured: false,
    seoTitle: "BHXH 10.5% người lao động 2026 - Cách tính + cap + ví dụ",
    seoDescription:
      "Hướng dẫn tính bảo hiểm bắt buộc người lao động 2026: BHXH 8% + BHYT 1.5% + BHTN 1% = 10.5%. Cap 46.8 triệu cho BHXH+BHYT, 99.2 triệu cho BHTN. Lương đóng BH thường khác lương Gross.",
    content: `
Trước khi tính thuế TNCN, người lao động phải trừ **bảo hiểm bắt buộc 10.5%** khỏi lương Gross. Bài viết phân tích chi tiết 3 loại bảo hiểm, mức trần, và lý do hợp đồng VN thường đóng BH trên mức thấp hơn lương thực nhận.

## 3 loại bảo hiểm bắt buộc người lao động đóng

Theo Luật BHXH + Luật BHYT + Luật Việc làm hiện hành:

**1. Bảo hiểm xã hội (BHXH) - 8%**: trả lương hưu, ốm đau, thai sản, tai nạn lao động. Người lao động đóng 8%, người sử dụng lao động đóng thêm 17.5% (tổng 25.5% lương đóng BHXH).

**2. Bảo hiểm y tế (BHYT) - 1.5%**: chi trả khám chữa bệnh tại cơ sở y tế. Người lao động đóng 1.5%, công ty đóng 3% (tổng 4.5%).

**3. Bảo hiểm thất nghiệp (BHTN) - 1%**: trợ cấp khi mất việc. Người lao động 1%, công ty 1% (tổng 2%).

-> **Tổng người lao động đóng = 10.5%**, công ty đóng thêm khoảng 21.5% (chưa kể KPCĐ 2%) -> quỹ lương thực tế công ty trả gần **132% lương Gross**.

## Lương Gross ≠ Lương đóng bảo hiểm

Đây là điểm hầu hết sinh viên + new grad không biết khi đàm phán offer đầu tiên: **lương đóng BHXH thường KHÁC lương thực nhận**.

Hợp đồng lao động VN thường tách lương ra:
- **Lương cơ bản** (đóng BHXH): mức cố định, thường = lương tối thiểu vùng × hệ số 1.07–1.5 (tuỳ vị trí).
- **Lương productive / phụ cấp / thưởng KPI**: phần biến động, **KHÔNG đóng BHXH**.

**Ví dụ**: Offer 25.000.000 đồng/tháng - hợp đồng có thể chia:
- Lương cơ bản (đóng BHXH): 10.000.000
- Phụ cấp ăn trưa / xăng xe / điện thoại: 3.000.000
- KPI tháng / thưởng năng suất: 12.000.000

-> BHXH thực đóng = 10.000.000 × 10.5% = **1.050.000** (không phải 25tr × 10.5% = 2.625.000)

## Lý do công ty tách lương như vậy

**Giảm chi phí**: Công ty đóng BHXH 21.5% lương cơ bản - nếu lương cơ bản = 25tr thì công ty trả thêm ~5.4tr/tháng tiền BH. Tách ra -> công ty chỉ trả 2.15tr -> tiết kiệm 3.25tr/người/tháng.

**Giảm gánh nặng người lao động**: BHXH 10.5% × 25tr = 2.625k vs 10.5% × 10tr = 1.050k -> người lao động nhận về lương Net cao hơn 1.575k/tháng.

**Nhược điểm cho người lao động**:
- Lương hưu tương lai THẤP hơn (do BHXH tính trên lương đóng, không phải lương thực).
- Trợ cấp thai sản / ốm đau / thất nghiệp cũng thấp tương ứng.
- Nếu kiện công ty (cắt việc trái phép), bồi thường tính trên lương ĐÓNG BHXH chứ không phải lương thực.

## Cap (trần) tối đa BHXH

**BHXH + BHYT cap tại 46.800.000 đồng/tháng** (20× lương cơ sở 2.340.000). Có nghĩa: lương đóng BHXH cao bao nhiêu vượt 46.8tr cũng không đóng thêm. Mức người lao động đóng tối đa BHXH+BHYT/tháng = 46.800.000 × 9.5% = **4.446.000**.

**BHTN cap tại 99.200.000 đồng/tháng** (20× lương tối thiểu vùng I 4.960.000). Người lao động đóng tối đa BHTN/tháng = 99.200.000 × 1% = **992.000**.

-> Tổng tối đa BHXH bắt buộc người lao động đóng/tháng = **5.438.000 đồng**. Mức này áp khi lương đóng BHXH ≥ 99.2tr.

## Tính trong Tool Tính Thuế TNCN 2026

[Tool Tính Thuế TNCN 2026](/tools/tinh-thue-tncn) có ô riêng **"Lương đóng bảo hiểm"** (optional). Mặc định bằng lương Gross - nhưng bạn nên nhập đúng số trên hợp đồng để ra kết quả chính xác:

- Hợp đồng tách rõ -> nhập lương cơ bản (mức đóng BHXH).
- Hợp đồng "lương trọn gói" -> BH thường đóng full lương.
- Freelance / hợp đồng dưới 3 tháng -> tắt toggle "Đóng BHXH" (không thuộc diện bắt buộc).

## 3 trường hợp không phải đóng BHXH bắt buộc

1. **Hợp đồng lao động dưới 1 tháng**: không bắt buộc đóng BHXH, BHYT, BHTN.
2. **Hợp đồng từ 1 tháng đến dưới 3 tháng**: chỉ đóng BHTN (1%), không đóng BHXH + BHYT.
3. **Lao động tự do / freelance / cộng tác viên hợp đồng dịch vụ**: không thuộc diện BHXH bắt buộc. Có thể tự đóng BHXH tự nguyện (mức 22% theo lương khai báo, không có BHYT + BHTN).

Cá nhân thuộc 3 nhóm trên nếu thu nhập > 11tr (luật 2025) hoặc 15.5tr (luật 2026) vẫn phải đóng thuế TNCN - chỉ là không bị trừ thêm BHXH.

## Ví dụ thực tế

**Marketing Executive, hợp đồng tách lương:**
- Lương Gross: 25.000.000
- Lương đóng BHXH: 10.000.000
- BH thực đóng: 1.050.000
- Lương sau BH: 23.950.000
- Giảm trừ bản thân (2026): 15.500.000
- Thu nhập tính thuế: 8.450.000 -> bậc 1 (5%) -> thuế 422.500
- **Lương Net: 25.000.000 − 1.050.000 − 422.500 = 23.527.500/tháng**

So với "đóng BH full Gross":
- BH = 2.625.000
- Sau BH = 22.375.000
- Thu nhập tính thuế = 6.875.000 -> thuế 343.750
- Net = 22.031.250

-> Tách lương giúp Net cao hơn **1.5tr/tháng** ngắn hạn. Tuy nhiên dài hạn (10-30 năm) lương hưu thấp hơn ~60%.

## Đọc thêm

- [Cách tính thuế TNCN 2026 đầy đủ](/blog/cach-tinh-thue-tncn-2026)
- [5 bậc 2026 vs 7 bậc 2025](/blog/5-bac-thue-tncn-2026-vs-2025)
- [Giảm trừ gia cảnh 2026](/blog/giam-tru-gia-canh-2026)
`,
  },
];
