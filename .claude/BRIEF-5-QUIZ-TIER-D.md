# BRIEF: 5 Test Tính Cách Tier D + 15 Bài Blog Hỗ Trợ

> Tài liệu này lên kế hoạch chi tiết để triển khai 5 quiz tính cách "khoa học hơn MBTI" cùng 15 bài blog hỗ trợ. Bạn duyệt brief này trước khi tôi bắt đầu build code.

---

## A. TỔNG QUAN

### Mục tiêu
- Mở rộng audience từ Marketing/Ecom sang **tự phát triển bản thân + HR + GenZ**
- Tận dụng infrastructure quiz đã có (/quiz/[slug]/result/[archetypeId])
- Tăng organic traffic + lead capture (email subscribe)
- Defensive moat brand: "NDQ là nơi quiz chất lượng cao tiếng Việt"

### KPI thành công (sau 3 tháng launch)
- 30k+ unique user làm 5 quiz (avg 6k/quiz/tháng)
- Email signup rate >8% (từ result page)
- Share rate >15% (social card)
- 5 bài blog rank top 5 Google "test [tên quiz] tiếng việt"

### Audience target

| Quiz | Audience chính | Tuổi | Use case |
|---|---|---|---|
| Enneagram | Self-dev seeker | 25-35 | Tìm hiểu sâu bản thân |
| Big Five | HR + Manager | 28-45 | Tuyển dụng, đánh giá |
| DISC | Công sở, Sales | 24-40 | Training, team work |
| EQ | Phụ huynh + Manager | 28-45 | Phát triển kỹ năng |
| Dark Triad | GenZ + Millennial | 18-32 | Tò mò viral |

### Timeline tổng (4 tuần)

- **Tuần 1**: Build Quiz 1 (DISC) + 3 blog support
- **Tuần 2**: Build Quiz 2 (EQ) + 3 blog support
- **Tuần 3**: Build Quiz 3 (Big Five) + 3 blog support
- **Tuần 4**: Build Quiz 4 (Enneagram) + Quiz 5 (Dark Triad) + 6 blog support

Lý do thứ tự: DISC + EQ ngắn nhất, validate framework trước. Enneagram + Dark Triad làm cuối.

---

## B. ARCHITECTURE

### Tận dụng codebase hiện có

Quiz infra hiện tại trong `src/lib/quiz/`:
- `compute.ts` - QUIZZES config array
- `types.ts` - QuizConfig, QuizQuestion, QuizArchetype
- `data/[quiz].ts` - questions + archetypes per quiz

Route hiện tại:
- `/quiz` - list page
- `/quiz/[slug]` - quiz page (làm bài)
- `/quiz/[slug]/result/[archetypeId]` - kết quả

→ **Không cần build route mới**. Chỉ cần:
1. Add 5 entries vào `QUIZZES` config
2. Tạo 5 data files mới trong `src/lib/quiz/data/`
3. Mở rộng `scoringType` để hỗ trợ 5 type mới
4. Tạo helper scoring cho Big Five (vì là %, không phải archetype)

### Scoring type mở rộng

Hiện có: `leadership | mbti | career | knowledge`

Thêm: `disc | eq | big-five | enneagram | dark-triad`

Mỗi type có scoring logic riêng:
- **DISC**: 4 chữ D/I/S/C, output dominant + secondary letter
- **EQ**: tổng điểm 0-160 + breakdown 5 khía cạnh (% mỗi)
- **Big Five**: 5 dimension % (0-100 mỗi)
- **Enneagram**: 9 type score, output dominant type + wing
- **Dark Triad**: 3 trait % (0-100 mỗi)

### Result page biến thể

- **Archetype format** (DISC, Enneagram): redirect sang `/result/[archetypeId]` như hiện tại
- **Multi-score format** (EQ, Big Five, Dark Triad): result page có chart % cho mỗi dimension - cần component mới `MultiScoreResultPage`

---

## C. QUIZ #1 - DISC (Build TUẦN 1)

### Định vị
- Tagline: "Bạn lãnh đạo & làm việc theo phong cách nào?"
- USP: VN-native, free, có PDF report (optional paid)
- Source khoa học: William Moulton Marston (1928), DISC model

### Format
- **24 câu** (mỗi chữ 6 câu)
- Format: chọn 1 trong 4 lựa chọn cho mỗi câu (forced choice)
- Thời gian: ~5-7 phút
- gateResult: true (email gate trước khi xem result)

### 4 Outcome (archetype)

#### D - Dominant (Quyết đoán)
- **Màu**: #ff6b6b (đỏ - quyền lực)
- **Tagline**: "Người chỉ huy - kết quả là trên hết"
- **Description**: 3-4 đoạn về tính cách, cách suy nghĩ, cách làm việc
- **Strengths**: 5-7 điểm mạnh (Ra quyết định nhanh, Định hướng kết quả, Tự tin, Dám chấp nhận rủi ro...)
- **Weaknesses**: 4-5 điểm yếu (Thiếu kiên nhẫn, Bỏ qua chi tiết, Có thể độc đoán...)
- **Context**: Khi nào phù hợp (startup, crisis, sales)
- **Advice**: 4 lời khuyên cân bằng
- **Career fit**: 6-8 nghề phù hợp (CEO, Sales Manager, Startup Founder...)
- **Best paired with**: S (Steady) cho team balance
- **Famous people**: 3-5 nhân vật VN/quốc tế nổi tiếng

#### I - Influence (Ảnh hưởng)
- **Màu**: #ffd479 (vàng - năng lượng)
- **Tagline**: "Người kết nối - truyền cảm hứng"
- ... (cấu trúc tương tự D)

#### S - Steadiness (Ổn định)
- **Màu**: #5fffaa (xanh lá - tin cậy)
- **Tagline**: "Người trung thành - kiên nhẫn xây dựng"
- ...

#### C - Conscientiousness (Tuân thủ)
- **Màu**: #7da9ff (xanh dương - chính xác)
- **Tagline**: "Người phân tích - chính xác từng chi tiết"
- ...

### Sample questions (5 câu)

```
1. Trong cuộc họp team, bạn thường là người:
   A. Đưa ra quyết định nhanh và đẩy team hành động (D)
   B. Nêu ý tưởng và làm không khí sôi nổi (I)
   C. Lắng nghe và đảm bảo mọi người được nghe (S)
   D. Phân tích dữ liệu và đưa ra câu hỏi chi tiết (C)

2. Khi gặp deadline gấp, bạn:
   A. Tăng tốc, làm trước rồi sửa sau (D)
   B. Rủ đồng nghiệp làm cùng cho vui (I)
   C. Bình tĩnh làm từng việc một (S)
   D. Lên plan chi tiết rồi mới làm (C)

3. Điều bạn ghét nhất trong công việc là:
   A. Bị làm chậm, có quá nhiều thủ tục (D)
   B. Phải làm việc một mình, không tương tác (I)
   C. Xung đột, drama trong team (S)
   D. Thông tin không rõ ràng, mâu thuẫn (C)

4. Khi học cái mới, bạn thích:
   A. Vào việc luôn, học qua trial-and-error (D)
   B. Học cùng nhóm, qua thảo luận (I)
   C. Học từng bước, có người hướng dẫn (S)
   D. Đọc tài liệu kỹ trước khi thực hành (C)

5. Sếp tốt nhất với bạn là người:
   A. Cho bạn quyền tự quyết, đo bằng kết quả (D)
   B. Vui vẻ, hay khen, tạo môi trường tích cực (I)
   C. Ổn định, công bằng, có trách nhiệm với team (S)
   D. Rõ ràng về expectation, công bằng đánh giá (C)
```

(Total 24 câu cùng style)

### Result page
- Bar chart 4 chữ D-I-S-C với %
- Dominant style highlight
- Secondary style mention
- 3 bài blog liên quan tự suggest
- Email signup CTA: "Nhận PDF report 12 trang chi tiết"
- Share card preview (Facebook/Instagram story)

### 3 Bài blog hỗ trợ

1. **"DISC là gì? Test tính cách DISC 4 phong cách hành vi 2026"**
   - Pillar article giải thích DISC: history, science, 4 type overview
   - Target keyword: "test disc tiếng việt"
   - 1500-2000 từ + tables + image

2. **"DISC trong tuyển dụng - 4 kiểu nhân viên và cách quản lý"**
   - Audience HR: dùng DISC để hire + manage
   - Bridge với leadership quiz hiện có
   - 1500 từ + case study

3. **"DISC trong tình yêu - 4 phong cách yêu và cặp đôi tương thích"**
   - Audience GenZ + dating: viral angle
   - 6 cặp tương thích (DI, DS, DC, IS, IC, SC) + 4 cặp same-type
   - 1500-1800 từ + chart compatibility

---

## D. QUIZ #2 - EQ (Build TUẦN 2)

### Định vị
- Tagline: "Chỉ số trí tuệ cảm xúc của bạn là bao nhiêu?"
- USP: Test EQ chuẩn Goleman 5 chiều, có gợi ý cải thiện cụ thể
- Source: Daniel Goleman EQ model (1995)

### Format
- **35 câu tình huống** ("Khi bạn gặp tình huống X, bạn sẽ...")
- 4-5 lựa chọn mỗi câu, mỗi lựa chọn có điểm khác nhau
- Thời gian: ~8-10 phút
- gateResult: true

### Multi-score (không phải archetype)

5 dimension đo (0-100% mỗi):

1. **Tự nhận thức** (Self-awareness) - 7 câu
2. **Tự kiểm soát** (Self-regulation) - 7 câu
3. **Động lực** (Motivation) - 7 câu
4. **Đồng cảm** (Empathy) - 7 câu
5. **Kỹ năng xã hội** (Social skills) - 7 câu

**Tổng EQ**: 0-160 (chuẩn Goleman scale)
- 0-60: EQ thấp
- 61-100: EQ trung bình
- 101-130: EQ cao
- 131-160: EQ rất cao

### Sample questions (5 câu)

```
1. (Tự nhận thức) Khi đồng nghiệp chỉ trích bạn, phản ứng tự nhiên đầu tiên là:
   A. Lập tức bào chữa, giải thích (1 điểm)
   B. Cảm thấy tức giận nhưng cố nén lại (2 điểm)
   C. Nhận ra mình đang phản ứng, dừng lại 1 giây (4 điểm)
   D. Cảm ơn họ vì đã chia sẻ, hỏi để hiểu hơn (5 điểm)

2. (Tự kiểm soát) Bạn nhận email "rage-bait" từ khách hàng. Bạn:
   A. Reply ngay với tone tương tự (1 điểm)
   B. Bực mình nhưng vẫn reply professional (3 điểm)
   C. Đợi 30 phút bình tĩnh rồi mới reply (4 điểm)
   D. Note lại cảm xúc, reply hôm sau với strategy rõ ràng (5 điểm)

3. (Động lực) Khi gặp thất bại lớn trong dự án, bạn:
   A. Mất động lực 1-2 tuần (1 điểm)
   B. Cố gắng nhưng không thoải mái (2 điểm)
   C. Phân tích bài học, tiếp tục với hướng mới (4 điểm)
   D. Xem thất bại là dữ liệu, không phải định nghĩa bản thân (5 điểm)

4. (Đồng cảm) Đồng nghiệp đang stress nhưng nói "Em ổn":
   A. Tin lời họ, không hỏi thêm (1 điểm)
   B. Hỏi 1-2 câu xã giao (2 điểm)
   C. Cảm nhận có vấn đề, tạo không gian để họ chia sẻ (4 điểm)
   D. Đọc được tình huống cụ thể, đề xuất hỗ trợ phù hợp (5 điểm)

5. (Kỹ năng xã hội) Trong cuộc họp có 2 phe đối lập, bạn:
   A. Né tránh, không lên tiếng (1 điểm)
   B. Chọn 1 phe và bảo vệ (2 điểm)
   C. Tìm common ground giữa 2 bên (4 điểm)
   D. Facilitate cuộc thảo luận, để team tự đến giải pháp (5 điểm)
```

(Total 35 câu cùng style)

### Result page (Multi-score)

- **Điểm tổng EQ** (số lớn 0-160) + label (thấp/trung bình/cao/rất cao)
- **5 radar chart** cho 5 dimension với %
- **Strengths**: 2 dimension cao nhất
- **Weaknesses**: 2 dimension thấp nhất + roadmap cải thiện
- **Comparison**: "Bạn cao hơn X% người làm test"
- 3 bài blog liên quan
- Email signup CTA: "Nhận lộ trình tăng EQ 30 ngày"

### 3 Bài blog hỗ trợ

1. **"EQ là gì? Trí tuệ cảm xúc 5 khía cạnh - Test EQ tiếng Việt 2026"**
   - Pillar article về EQ - định nghĩa, lịch sử, 5 chiều, EQ vs IQ
   - Target keyword: "test eq tiếng việt"
   - 1500-2000 từ

2. **"EQ thấp - 7 dấu hiệu và cách cải thiện trong 30 ngày"**
   - Practical guide
   - Audience: người tự nhận EQ thấp, muốn fix
   - 1500 từ + checklist

3. **"EQ trong công việc - Vì sao manager EQ cao thăng tiến nhanh hơn IQ cao"**
   - Business angle - dành cho manager + founder
   - Case study + data
   - 1500 từ

---

## E. QUIZ #3 - BIG FIVE / OCEAN (Build TUẦN 3)

### Định vị
- Tagline: "Test tính cách khoa học chính xác nhất - 5 chiều OCEAN"
- USP: Bản tiếng Việt chuẩn khoa học, không phải MBTI fluff
- Source: Costa & McCrae (1992), academic gold standard

### Format
- **50 câu** Likert scale (1-5: rất không đồng ý → rất đồng ý)
- Thời gian: ~10-12 phút
- gateResult: true

### Multi-score - 5 dimension OCEAN

1. **O - Openness** (Cởi mở với cái mới) - 10 câu
2. **C - Conscientiousness** (Có trách nhiệm) - 10 câu
3. **E - Extraversion** (Hướng ngoại) - 10 câu
4. **A - Agreeableness** (Dễ chịu) - 10 câu
5. **N - Neuroticism** (Bất ổn cảm xúc) - 10 câu

Output: 5 thang điểm % (0-100) cho mỗi dimension

### Sample questions (5 câu)

```
1. (O) Tôi thích thử món ăn mới và trải nghiệm khác thường.
   1 - Rất không đồng ý ... 5 - Rất đồng ý

2. (C) Tôi luôn hoàn thành deadline đúng hạn, ngay cả khi không có ai nhắc.
   1 ... 5

3. (E) Tôi cảm thấy nạp năng lượng khi ở giữa đám đông.
   1 ... 5

4. (A) Tôi tin rằng mọi người về bản chất là tốt.
   1 ... 5

5. (N) Tôi thường lo lắng về những việc nhỏ.
   1 ... 5
```

(Total 50 câu, mỗi câu Likert 1-5. Có **reverse-scored items** để chống response bias - vd "Tôi không quan tâm đến cảm xúc người khác" → reverse score cho dimension A)

### Result page (Multi-score)

- **5 horizontal bar chart** với %
- Mỗi chiều có 3 label: Thấp (<33%), Trung bình (33-67%), Cao (>67%)
- **Profile interpretation**: 1 đoạn 200 từ về kết hợp cụ thể của 5 chiều
- **Career fit**: 5 nghề top match dựa trên 5 chiều
- **Cảnh báo health**: nếu N (Neuroticism) >80%, gợi ý support resources
- 3 bài blog liên quan
- Email signup CTA: "Nhận PDF profile chi tiết 8 trang"

### 3 Bài blog hỗ trợ

1. **"Big Five (OCEAN) - Test tính cách khoa học nhất thế giới - Tiếng Việt 2026"**
   - Pillar article về Big Five
   - So sánh với MBTI (tại sao Big Five chính xác hơn)
   - Target keyword: "test big five tiếng việt", "ocean test"
   - 2000 từ

2. **"5 chiều OCEAN trong công việc - Phù hợp nghề nào theo từng kiểu"**
   - Career matching theo Big Five
   - Data: research từ Journal of Vocational Behavior
   - 1800 từ + table mapping

3. **"Neuroticism (chiều N) cao - Bạn có đang quá lo lắng không?"**
   - Deep dive vào chiều N - audience: người có anxiety
   - Cách giảm N trong dài hạn
   - 1500 từ + practical exercises

---

## F. QUIZ #4 - ENNEAGRAM 9 TYPE (Build TUẦN 4)

### Định vị
- Tagline: "Test 9 kiểu tính cách - hiểu động lực sâu bên trong"
- USP: Enneagram tiếng Việt chuẩn nhất, có wing + arrow
- Source: Don Riso & Russ Hudson, RHETI inventory

### Format
- **45 câu** (mỗi type 5 câu trigger)
- 2 lựa chọn mỗi câu (A or B - forced choice)
- Thời gian: ~10 phút
- gateResult: true

### 9 Outcome (archetype)

| Type | Tên | Tagline |
|---|---|---|
| 1 | The Perfectionist | Người cầu toàn - "Tôi muốn đúng" |
| 2 | The Helper | Người quan tâm - "Tôi muốn được cần đến" |
| 3 | The Achiever | Người thành đạt - "Tôi muốn thành công" |
| 4 | The Individualist | Người lãng mạn - "Tôi muốn đặc biệt" |
| 5 | The Investigator | Người quan sát - "Tôi muốn hiểu" |
| 6 | The Loyalist | Người trung thành - "Tôi muốn an toàn" |
| 7 | The Enthusiast | Người khám phá - "Tôi muốn vui vẻ" |
| 8 | The Challenger | Người mạnh mẽ - "Tôi muốn kiểm soát" |
| 9 | The Peacemaker | Người hoà bình - "Tôi muốn yên bình" |

Mỗi outcome có:
- Description 4 đoạn
- Core fear + core desire (Enneagram-specific)
- Wing (vd 5w4 vs 5w6) - 2 variant per type = 18 sub-types
- Arrow: integration direction (khi healthy) + disintegration (khi stress)
- Strengths, Weaknesses, Career fit, Famous people, Relationships
- Best paired with: type tương thích

### Sample questions (5 câu)

```
1. Khi gặp một bài toán khó, bạn:
   A. Phải làm cho ra kết quả "đúng" mới chịu dừng (Type 1)
   B. Tìm cách tối ưu nhất, hiệu quả nhất (Type 3)

2. Trong nhóm bạn, bạn thường là người:
   A. Lắng nghe và giúp đỡ người khác (Type 2)
   B. Tạo không khí vui vẻ, đưa idea mới (Type 7)

3. Khi căng thẳng, bạn có xu hướng:
   A. Rút lui vào bản thân, ít chia sẻ (Type 5)
   B. Hỏi ý kiến nhiều người để chắc chắn (Type 6)

4. Cảm xúc bạn ghét nhất là:
   A. Bị "average" - giống mọi người (Type 4)
   B. Bị "yếu" - không kiểm soát được (Type 8)

5. Mục tiêu lớn nhất của bạn là:
   A. Hoà bình, không xung đột (Type 9)
   B. Đạt được điều khiến bạn được công nhận (Type 3)
```

(Total 45 câu, format A vs B forced choice)

### Result page

- **9 bar chart** với điểm số mỗi type
- Top type highlight + wing (vd "5w4")
- Arrow: integration (5→8) và disintegration (5→7) với mô tả
- Famous people grid (9 ảnh hoặc tên)
- 3 bài blog liên quan
- Email signup CTA: "Nhận PDF deep dive 15 trang"

### 3 Bài blog hỗ trợ

1. **"Enneagram 9 kiểu tính cách - Test tiếng Việt 2026"**
   - Pillar article về Enneagram
   - History, science, 9 type overview, wing + arrow
   - So sánh MBTI vs Enneagram
   - Target keyword: "enneagram tiếng việt", "test 9 kiểu tính cách"
   - 2000-2500 từ

2. **"Enneagram trong sự nghiệp - Mỗi type phù hợp nghề gì"**
   - Career matching 9 type
   - 1800 từ + bảng nghề

3. **"Enneagram trong tình yêu - Cặp đôi tương thích và xung đột tiềm ẩn"**
   - Relationship compatibility - 9x9 = 45 cặp
   - Top 10 best pairs + Top 5 conflict pairs
   - 1800 từ + chart compatibility

---

## G. QUIZ #5 - DARK TRIAD (Build TUẦN 4)

### Định vị
- Tagline: "Bạn có 3 đặc điểm tính cách 'bóng tối' nào?"
- USP: VN-native, framing nhẹ giải trí - KHÔNG chẩn đoán bệnh
- Source: SD3 (Short Dark Triad) by Jones & Paulhus (2014)

### ⚠️ Disclaimer bắt buộc

Phải có ngay landing page + result:
> "Đây là test giải trí dựa trên nghiên cứu tâm lý. KHÔNG phải chẩn đoán sức khoẻ tâm thần. Nếu bạn lo lắng về tính cách của mình, hãy tìm tư vấn chuyên môn."

### Format
- **27 câu** chuẩn SD3
- Likert 1-5 (Rất không đồng ý → Rất đồng ý)
- Thời gian: ~5 phút
- gateResult: true

### Multi-score - 3 trait

1. **Mưu mẹo (Machiavellianism)** - 9 câu - Lạnh lùng tính toán
2. **Ái kỷ (Narcissism)** - 9 câu - Tự cao, thiếu đồng cảm
3. **Vô cảm (Psychopathy nhẹ)** - 9 câu - Liều lĩnh, ít hối hận

Output: 3 thang % (0-100) + tổng "Dark score"

### Sample questions (5 câu, light tone)

```
1. (Mưu mẹo) Đôi khi tôi nói dối nhỏ để đạt được điều mình muốn.
   1 - Rất không đồng ý ... 5 - Rất đồng ý

2. (Mưu mẹo) Tôi tin rằng "muốn thành công phải biết chơi game".
   1 ... 5

3. (Ái kỷ) Tôi xứng đáng được mọi người chú ý hơn người khác.
   1 ... 5

4. (Ái kỷ) Tôi cảm thấy mình đặc biệt và khác biệt với đám đông.
   1 ... 5

5. (Vô cảm) Tôi ít khi hối hận về những hành động của mình.
   1 ... 5
```

(Total 27 câu cùng style)

### Result page (Multi-score, nhẹ giải trí)

- **3 thang đo %** với mô tả nhẹ ("bạn có 35% mưu mẹo - bình thường")
- Tone: hài hước, không nghiêm trọng
- "Ai cũng có 1 chút dark side" message
- Cảnh báo nếu 1 trait >85%: "Cao bất thường, hãy reflect"
- Famous people có trait cao tương ứng (giải trí)
- Disclaimer nhắc lại
- Share card vibe nhẹ: "Tôi 42% mưu mẹo - bạn thì sao?"
- 3 bài blog liên quan

### 3 Bài blog hỗ trợ

1. **"Dark Triad - 3 đặc điểm tính cách 'tối' trong tâm lý học - Test 2026"**
   - Pillar article: history, science, 3 trait explained
   - Disclaimer prominently
   - Target keyword: "dark triad tiếng việt"
   - 1500-1800 từ

2. **"Bạn có đang làm việc với người có trait Dark Triad cao không?"**
   - Workplace red flag guide - viral angle
   - 5 dấu hiệu manipulator, narcissist, psycho nhẹ trong công sở
   - Cách bảo vệ bản thân
   - 1500 từ

3. **"Dark Triad trong tình yêu - 7 red flag không thể bỏ qua"**
   - Dating safety angle
   - 7 red flags + 3 case study (anonymized)
   - 1500 từ

---

## H. TỔNG HỢP BLOG ARTICLES (15 bài)

| # | Quiz | Tên bài | Loại | Từ |
|---|---|---|---|---|
| 1 | DISC | DISC là gì + test 4 phong cách | Pillar | 1800 |
| 2 | DISC | DISC trong tuyển dụng | Practical | 1500 |
| 3 | DISC | DISC trong tình yêu | Viral | 1700 |
| 4 | EQ | EQ là gì + 5 khía cạnh | Pillar | 1800 |
| 5 | EQ | EQ thấp - 7 dấu hiệu + cách fix | Practical | 1500 |
| 6 | EQ | EQ trong công việc - manager | Business | 1500 |
| 7 | Big Five | OCEAN - test khoa học nhất | Pillar | 2000 |
| 8 | Big Five | 5 chiều OCEAN - career fit | Practical | 1800 |
| 9 | Big Five | Neuroticism cao - lo lắng | Wellness | 1500 |
| 10 | Enneagram | Enneagram 9 kiểu + test | Pillar | 2200 |
| 11 | Enneagram | Enneagram career fit | Practical | 1800 |
| 12 | Enneagram | Enneagram tình yêu | Viral | 1800 |
| 13 | Dark Triad | Dark Triad + test giải trí | Pillar | 1700 |
| 14 | Dark Triad | Red flag công sở | Workplace | 1500 |
| 15 | Dark Triad | Dark Triad trong tình yêu | Dating | 1500 |

**Tổng**: ~25.000 từ blog content

### Category mới cho 15 bài

Tạo category mới: `quiz-tinh-cach` trong CATEGORY_LABELS - tách khỏi `tam-ly-mindset` hiện có (vì là content kèm tool, không phải pure mindset).

### Cluster linking

Mỗi quiz có 3 bài, link nhau + link sang quiz tool:
- Bài Pillar → 2 bài practical + tool quiz
- Bài Practical → bài Pillar + tool quiz + 1 quiz khác
- Bài Viral → bài Pillar + tool quiz + 1 bài blog khác

---

## I. TECH IMPLEMENTATION

### Files cần tạo

**Per quiz (5 quiz × ~4 file = 20 files):**

```
src/lib/quiz/data/
  disc.ts            # 24 câu + 4 archetype
  eq.ts              # 35 câu + multi-score
  big-five.ts        # 50 câu + 5 dimension
  enneagram.ts       # 45 câu + 9 archetype
  dark-triad.ts      # 27 câu + 3 trait

src/lib/quiz/multi-score-types.ts   # type definitions cho EQ + BigFive + DarkTriad
src/lib/quiz/multi-score-compute.ts # scoring helper cho multi-score quizzes

src/components/quiz/
  MultiScoreResult.tsx              # component result page kiểu radar/bar chart
  ScoreBar.tsx                      # horizontal bar progress
  RadarChart.tsx                    # 5-dimension radar cho EQ

src/lib/quiz/compute.ts             # add 5 entries vào QUIZZES array
```

**Per quiz route extension:**

- `/quiz/[slug]/result` route mới cho multi-score quiz (vì không có archetypeId duy nhất)

### Database / Sanity

KHÔNG cần Sanity schema mới - kết quả chỉ tồn tại tại session, lưu kết quả qua URL params hoặc localStorage.

Newsletter capture qua existing `/api/newsletter` endpoint (đã có).

PDF report (nếu làm paid): generate qua `@react-pdf/renderer` server-side.

### Type system mở rộng

```ts
// types.ts add:
export type MultiScoreResult = {
  dimensions: Record<string, number>; // % per dimension
  total?: number;
  level?: string; // "Low" / "Medium" / "High"
};

export type QuizConfig = {
  // ... existing fields
  scoringType: "leadership" | "mbti" | "career" | "knowledge"
              | "disc" | "eq" | "big-five" | "enneagram" | "dark-triad";
  resultFormat?: "archetype" | "multi-score";
};
```

---

## J. SEO + VIRAL PLAN

### SEO target keyword (per quiz)

| Quiz | Primary keyword | Search vol (est VN) | Difficulty |
|---|---|---|---|
| DISC | test disc tiếng việt | 8-12k/tháng | Trung bình |
| EQ | kiểm tra eq, test trí tuệ cảm xúc | 20-30k/tháng | Trung bình |
| Big Five | test big five, ocean test | 5-8k/tháng | Thấp |
| Enneagram | enneagram tiếng việt, test 9 kiểu | 10-15k/tháng | Thấp |
| Dark Triad | dark triad test | 6-10k/tháng | Rất thấp |

### Viral mechanics

1. **Share card đẹp** - Open Graph image dynamic với result của user (vd "I'm Type 4 - The Individualist, you?")
2. **Compatibility check** - input result của partner để xem compatibility (bonus tool)
3. **Series invite** - sau khi làm 1 quiz, suggest 2 quiz khác phù hợp
4. **Newsletter CTA** - mỗi result page có email signup với PDF report bait

### Content marketing

- Mỗi quiz launch kèm 1 post Facebook + 1 TikTok + 1 reel Instagram
- Quiz roundup post: "5 quiz tính cách phải làm 1 lần trong đời 2026"
- Lead magnet: PDF "Hiểu bản thân qua 5 lens" (combine 5 quiz framework)

---

## K. RISK + MITIGATION

| Risk | Mitigation |
|---|---|
| Content sensitive (Dark Triad bị backlash) | Disclaimer + tone giải trí + framing "ai cũng có" |
| Plagiarism (test có copyright?) | Big Five + Dark Triad là public domain. DISC + Enneagram là model phổ biến không bản quyền. EQ Goleman model OK với cite source. |
| Audience dilute brand | Tạo cluster page riêng `/quiz/tinh-cach` để separate khỏi ecom content. Bridge qua Founder Archetype quiz. |
| Build effort cao | Build 1 quiz/tuần, test viral trước khi scale. Nếu quiz 1-2 không viral → pause + reassess. |
| Question quality (cần native VN) | Bạn duyệt 100% câu hỏi trước khi launch. Tôi draft, bạn polish. |

---

## L. BUILD ORDER + TIMELINE

### Tuần 1 - DISC
- **Day 1-2**: Build data file DISC (24 câu + 4 archetype mô tả chi tiết) + scoring
- **Day 3**: UI result page (4-bar chart + content per type)
- **Day 4**: 3 blog bài DISC
- **Day 5**: Polish + launch + share marketing

### Tuần 2 - EQ
- **Day 1**: Type system mở rộng cho multi-score (reusable cho Big Five + Dark Triad)
- **Day 2-3**: Build data file EQ (35 câu tình huống) + scoring
- **Day 4**: UI result page (radar chart 5 dimension + breakdown)
- **Day 5**: 3 blog bài EQ + launch

### Tuần 3 - Big Five
- **Day 1-2**: Build data file Big Five (50 câu Likert + reverse scoring) + scoring
- **Day 3**: UI result page (5 bar chart + profile interpretation)
- **Day 4**: 3 blog bài Big Five
- **Day 5**: Launch + share

### Tuần 4 - Enneagram + Dark Triad
- **Day 1-2**: Enneagram data (45 câu + 9 archetype + wing + arrow) + scoring + UI
- **Day 3**: 3 blog bài Enneagram
- **Day 4**: Dark Triad data (27 câu) + UI + disclaimer
- **Day 5**: 3 blog bài Dark Triad + launch mega event

### Tổng commit timeline
- ~20 commits trong 4 tuần
- Mỗi quiz 1 commit launch + 1 commit blog
- Hotfix nếu có sau launch

---

## M. NHỮNG CÂU HỎI CẦN BẠN DUYỆT

Trước khi tôi bắt đầu build, cần bạn confirm:

### 1. Thứ tự build có ổn không?
DISC → EQ → Big Five → Enneagram → Dark Triad

Logic: ngắn → dài, simple → complex. Validate framework với DISC trước.

### 2. Có cần PDF report paid không?
- **Option A**: Free 100%, chỉ email gate cho result
- **Option B**: Free basic result + Paid PDF deep dive (199k-299k)
- **Option C**: Tạm thời free + collect email, monetize sau khi audience đủ lớn

Tôi recommend **Option C** - chưa lock paid trong launch.

### 3. Tone cho Dark Triad có an toàn không?
Tone "giải trí + tò mò" với disclaimer rõ. Nếu bạn lo backlash, có thể skip Dark Triad và build 4 quiz thôi.

### 4. Category mới `quiz-tinh-cach` hay gộp vào `tam-ly-mindset`?
- Riêng: cleaner, dễ filter
- Gộp: ít cluster, blog tham khảo cùng nhau

Tôi recommend **gộp vào `tam-ly-mindset`** vì mới có 4 bài Psychology, gộp thành 19 bài cùng category.

### 5. Lead capture: email mandatory hay optional?
- Mandatory (gateResult: true) - cao conversion email, có thể giảm completion rate
- Optional - cao completion, ít email

Tôi recommend **mandatory cho 5 quiz này** (consistent với MBTI + Career quiz hiện có).

### 6. Câu hỏi: tôi draft 100% hay bạn duyệt từng câu?
- **Tôi draft + bạn duyệt batch** (recommended): tôi viết toàn bộ, bạn review trước khi seed
- **Pair-writing**: tôi viết 5-10 câu, bạn approve, viết tiếp - chậm hơn nhưng safer

---

## N. ESTIMATE FINAL

**Code**: ~3000-4000 lines TypeScript across 25-30 files
**Blog content**: ~25,000 words across 15 articles
**Total quiz questions**: 24 + 35 + 50 + 45 + 27 = **181 câu**
**Total outcomes/types**: 4 + 5d + 5d + 9 + 3d = **9 archetype + 13 dimensions**
**Build time**: 4 tuần
**Commits**: ~20 commits

---

## CHECKPOINT - BẠN DUYỆT

Bạn xem qua brief này và:

1. Confirm thứ tự build (DISC → EQ → Big Five → Enneagram → Dark Triad)
2. Trả lời 6 câu hỏi mục M
3. Có cần điều chỉnh gì không (skip 1 quiz, đổi tone, gộp blog...)

Sau khi duyệt, tôi sẽ bắt đầu **Tuần 1 - DISC**: data file 24 câu + 4 archetype content + result UI + 3 bài blog. Hết tuần ship 1 commit launch.

Bạn ready cho tôi bắt đầu chưa?
