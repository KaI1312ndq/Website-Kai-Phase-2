import type { KnowledgeQuestion } from "../types";

/**
 * IQ Test - 30 câu chia 5 nhóm:
 *   - 12 Matrix (Raven-style pattern recognition trên grid 3x3)
 *   - 8 Spatial (rotation, mirror, transform)
 *   - 5 Verbal (analogy, classification)
 *   - 3 Quantitative (number sequence, word math)
 *   - 2 Logic (deduction)
 *
 * Scoring: count correct (0-30) → map sang IQ score chuẩn quốc tế (mean=100, SD=15).
 * 6 archetypes theo IQ range:
 *   0-5  correct  → IQ 70-85   "Khám phá"
 *   6-12 correct  → IQ 85-95   "Học hỏi"
 *   13-18 correct → IQ 95-105  "Cân bằng"
 *   19-23 correct → IQ 105-115 "Sắc bén"
 *   24-27 correct → IQ 115-130 "Nhạy bén"
 *   28-30 correct → IQ 130+    "Tài năng"
 */

export const IQ_QUESTIONS: KnowledgeQuestion[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // NHÓM 1: MATRIX (12 câu) - Raven-style pattern recognition
  // ═══════════════════════════════════════════════════════════════════════

  // M1 - Easy: count increasing across row
  {
    id: 1,
    category: "matrix",
    q: "Tìm hình phù hợp với ô '?' trong ma trận:",
    visual: {
      type: "matrix",
      grid: [
        { shape: "circle", count: 1 }, { shape: "circle", count: 2 }, { shape: "circle", count: 3 },
        { shape: "triangle", count: 1 }, { shape: "triangle", count: 2 }, { shape: "triangle", count: 3 },
        { shape: "square", count: 1 }, { shape: "square", count: 2 }, null,
      ],
      options: [
        { shape: "square", count: 1 },
        { shape: "square", count: 2 },
        { shape: "square", count: 3 },
        { shape: "circle", count: 3 },
      ],
    },
    opts: ["1 hình vuông", "2 hình vuông", "3 hình vuông", "3 hình tròn"],
    ans: 2,
    explain: "Mỗi hàng count tăng 1→2→3, shape giữ nguyên theo hàng. Ô '?' = 3 hình vuông.",
  },

  // M2 - Easy: rotation across columns
  {
    id: 2,
    category: "matrix",
    q: "Tìm hình phù hợp:",
    visual: {
      type: "matrix",
      grid: [
        { shape: "arrow", rotation: 0 }, { shape: "arrow", rotation: 90 }, { shape: "arrow", rotation: 180 },
        { shape: "T", rotation: 0 }, { shape: "T", rotation: 90 }, { shape: "T", rotation: 180 },
        { shape: "L", rotation: 0 }, { shape: "L", rotation: 90 }, null,
      ],
      options: [
        { shape: "L", rotation: 90 },
        { shape: "L", rotation: 180 },
        { shape: "L", rotation: 270 },
        { shape: "T", rotation: 180 },
      ],
    },
    opts: ["L xoay 90°", "L xoay 180°", "L xoay 270°", "T xoay 180°"],
    ans: 1,
    explain: "Mỗi hàng xoay 0° → 90° → 180°. Ô '?' = chữ L xoay 180°.",
  },

  // M3 - Easy: size progression
  {
    id: 3,
    category: "matrix",
    q: "Tìm hình phù hợp:",
    visual: {
      type: "matrix",
      grid: [
        { shape: "circle", size: "sm" }, { shape: "circle", size: "md" }, { shape: "circle", size: "lg" },
        { shape: "diamond", size: "sm" }, { shape: "diamond", size: "md" }, { shape: "diamond", size: "lg" },
        { shape: "star", size: "sm" }, { shape: "star", size: "md" }, null,
      ],
      options: [
        { shape: "star", size: "lg" },
        { shape: "star", size: "sm" },
        { shape: "diamond", size: "lg" },
        { shape: "star", size: "md" },
      ],
    },
    opts: ["Ngôi sao to", "Ngôi sao nhỏ", "Kim cương to", "Ngôi sao vừa"],
    ans: 0,
    explain: "Mỗi hàng size tăng nhỏ → vừa → to. Ô '?' = ngôi sao to.",
  },

  // M4 - Easy: fill style progression
  {
    id: 4,
    category: "matrix",
    q: "Tìm hình phù hợp:",
    visual: {
      type: "matrix",
      grid: [
        { shape: "circle", fill: "outline" }, { shape: "circle", fill: "dotted" }, { shape: "circle", fill: "solid" },
        { shape: "square", fill: "outline" }, { shape: "square", fill: "dotted" }, { shape: "square", fill: "solid" },
        { shape: "triangle", fill: "outline" }, { shape: "triangle", fill: "dotted" }, null,
      ],
      options: [
        { shape: "triangle", fill: "solid" },
        { shape: "triangle", fill: "outline" },
        { shape: "square", fill: "solid" },
        { shape: "circle", fill: "solid" },
      ],
    },
    opts: ["Tam giác đặc", "Tam giác viền", "Vuông đặc", "Tròn đặc"],
    ans: 0,
    explain: "Mỗi hàng fill: viền → chấm → đặc. Ô '?' = tam giác đặc.",
  },

  // M5 - Medium: shape AND count both progress
  {
    id: 5,
    category: "matrix",
    q: "Tìm hình phù hợp:",
    visual: {
      type: "matrix",
      grid: [
        { shape: "circle", count: 1 }, { shape: "triangle", count: 1 }, { shape: "square", count: 1 },
        { shape: "circle", count: 2 }, { shape: "triangle", count: 2 }, { shape: "square", count: 2 },
        { shape: "circle", count: 3 }, { shape: "triangle", count: 3 }, null,
      ],
      options: [
        { shape: "square", count: 3 },
        { shape: "square", count: 2 },
        { shape: "triangle", count: 3 },
        { shape: "circle", count: 3 },
      ],
    },
    opts: ["3 hình vuông", "2 hình vuông", "3 tam giác", "3 hình tròn"],
    ans: 0,
    explain: "Cột: shape giữ nguyên. Hàng: count tăng 1→2→3. Ô '?' = 3 hình vuông.",
  },

  // M6 - Medium: rotation independent of shape
  {
    id: 6,
    category: "matrix",
    q: "Tìm hình phù hợp:",
    visual: {
      type: "matrix",
      grid: [
        { shape: "T", rotation: 0 }, { shape: "L", rotation: 0 }, { shape: "arrow", rotation: 0 },
        { shape: "T", rotation: 90 }, { shape: "L", rotation: 90 }, { shape: "arrow", rotation: 90 },
        { shape: "T", rotation: 180 }, { shape: "L", rotation: 180 }, null,
      ],
      options: [
        { shape: "arrow", rotation: 180 },
        { shape: "arrow", rotation: 90 },
        { shape: "L", rotation: 270 },
        { shape: "T", rotation: 270 },
      ],
    },
    opts: ["Mũi tên xoay 180°", "Mũi tên xoay 90°", "L xoay 270°", "T xoay 270°"],
    ans: 0,
    explain: "Cột: shape giữ nguyên. Hàng: rotation tăng 0°→90°→180°. Ô '?' = mũi tên xoay 180°.",
  },

  // M7 - Medium: alternating shape + size combo
  {
    id: 7,
    category: "matrix",
    q: "Tìm hình phù hợp:",
    visual: {
      type: "matrix",
      grid: [
        { shape: "star", size: "sm" }, { shape: "hex", size: "md" }, { shape: "diamond", size: "lg" },
        { shape: "hex", size: "md" }, { shape: "diamond", size: "lg" }, { shape: "star", size: "sm" },
        { shape: "diamond", size: "lg" }, { shape: "star", size: "sm" }, null,
      ],
      options: [
        { shape: "hex", size: "md" },
        { shape: "diamond", size: "sm" },
        { shape: "star", size: "lg" },
        { shape: "hex", size: "sm" },
      ],
    },
    opts: ["Lục giác vừa", "Kim cương nhỏ", "Ngôi sao to", "Lục giác nhỏ"],
    ans: 0,
    explain: "Mỗi hàng và cột đều chứa đúng 3 loại (star sm / hex md / diamond lg). Ô '?' phải là loại còn thiếu = lục giác vừa.",
  },

  // M8 - Medium: 2 attributes change together
  {
    id: 8,
    category: "matrix",
    q: "Tìm hình phù hợp:",
    visual: {
      type: "matrix",
      grid: [
        { shape: "circle", count: 1, fill: "outline" }, { shape: "circle", count: 2, fill: "outline" }, { shape: "circle", count: 3, fill: "outline" },
        { shape: "square", count: 1, fill: "dotted" }, { shape: "square", count: 2, fill: "dotted" }, { shape: "square", count: 3, fill: "dotted" },
        { shape: "triangle", count: 1, fill: "solid" }, { shape: "triangle", count: 2, fill: "solid" }, null,
      ],
      options: [
        { shape: "triangle", count: 3, fill: "solid" },
        { shape: "triangle", count: 2, fill: "solid" },
        { shape: "triangle", count: 3, fill: "dotted" },
        { shape: "square", count: 3, fill: "solid" },
      ],
    },
    opts: ["3 tam giác đặc", "2 tam giác đặc", "3 tam giác chấm", "3 vuông đặc"],
    ans: 0,
    explain: "Hàng: count tăng 1→2→3, fill + shape giữ nguyên. Ô '?' = 3 tam giác đặc.",
  },

  // M9 - Hard: distribution puzzle
  {
    id: 9,
    category: "matrix",
    q: "Tìm hình phù hợp (mỗi hàng và cột đều chứa đủ 3 loại):",
    visual: {
      type: "matrix",
      grid: [
        { shape: "circle" }, { shape: "square" }, { shape: "triangle" },
        { shape: "triangle" }, { shape: "circle" }, { shape: "square" },
        { shape: "square" }, { shape: "triangle" }, null,
      ],
      options: [
        { shape: "circle" },
        { shape: "square" },
        { shape: "triangle" },
        { shape: "diamond" },
      ],
    },
    opts: ["Hình tròn", "Hình vuông", "Tam giác", "Kim cương"],
    ans: 0,
    explain: "Latin square: mỗi hàng và cột phải có đủ 3 loại. Hàng 3 đã có vuông + tam giác → cần hình tròn.",
  },

  // M10 - Hard: rotation + count combined
  {
    id: 10,
    category: "matrix",
    q: "Tìm hình phù hợp:",
    visual: {
      type: "matrix",
      grid: [
        { shape: "arrow", rotation: 0, count: 1 }, { shape: "arrow", rotation: 90, count: 2 }, { shape: "arrow", rotation: 180, count: 3 },
        { shape: "T", rotation: 0, count: 2 }, { shape: "T", rotation: 90, count: 3 }, { shape: "T", rotation: 180, count: 1 },
        { shape: "L", rotation: 0, count: 3 }, { shape: "L", rotation: 90, count: 1 }, null,
      ],
      options: [
        { shape: "L", rotation: 180, count: 2 },
        { shape: "L", rotation: 180, count: 3 },
        { shape: "L", rotation: 90, count: 2 },
        { shape: "T", rotation: 180, count: 2 },
      ],
    },
    opts: ["2 chữ L xoay 180°", "3 chữ L xoay 180°", "2 chữ L xoay 90°", "2 chữ T xoay 180°"],
    ans: 0,
    explain: "Hàng: rotation 0→90→180. Hàng 1 count 1-2-3, hàng 2 count 2-3-1, hàng 3 count 3-1-?. Mỗi hàng phải có đủ {1,2,3} → ô '?' count = 2. Shape L, rotation 180°.",
  },

  // M11 - Hard: XOR-like distribution
  {
    id: 11,
    category: "matrix",
    q: "Tìm hình phù hợp:",
    visual: {
      type: "matrix",
      grid: [
        { shape: "circle", fill: "solid" }, { shape: "circle", fill: "outline" }, { shape: "circle", fill: "dotted" },
        { shape: "square", fill: "outline" }, { shape: "square", fill: "dotted" }, { shape: "square", fill: "solid" },
        { shape: "star", fill: "dotted" }, { shape: "star", fill: "solid" }, null,
      ],
      options: [
        { shape: "star", fill: "outline" },
        { shape: "star", fill: "solid" },
        { shape: "circle", fill: "outline" },
        { shape: "square", fill: "outline" },
      ],
    },
    opts: ["Sao viền", "Sao đặc", "Tròn viền", "Vuông viền"],
    ans: 0,
    explain: "Cột: shape giữ nguyên. Mỗi hàng + cột phải có đủ 3 fill (solid/outline/dotted). Hàng 3 đã có dotted + solid → cần outline.",
  },

  // M12 - Hard: complex 2-attribute Latin square
  {
    id: 12,
    category: "matrix",
    q: "Tìm hình phù hợp:",
    visual: {
      type: "matrix",
      grid: [
        { shape: "diamond", size: "sm", count: 2 }, { shape: "hex", size: "md", count: 1 }, { shape: "star", size: "lg", count: 3 },
        { shape: "hex", size: "lg", count: 3 }, { shape: "star", size: "sm", count: 2 }, { shape: "diamond", size: "md", count: 1 },
        { shape: "star", size: "md", count: 1 }, { shape: "diamond", size: "lg", count: 3 }, null,
      ],
      options: [
        { shape: "hex", size: "sm", count: 2 },
        { shape: "hex", size: "md", count: 2 },
        { shape: "diamond", size: "sm", count: 2 },
        { shape: "star", size: "sm", count: 1 },
      ],
    },
    opts: ["Lục giác nhỏ × 2", "Lục giác vừa × 2", "Kim cương nhỏ × 2", "Sao nhỏ × 1"],
    ans: 0,
    explain: "Mỗi hàng phải đủ 3 shape (hex/star/diamond), 3 size (sm/md/lg), 3 count (1/2/3). Hàng 3 thiếu: hex + size sm + count 2.",
  },

  // ═══════════════════════════════════════════════════════════════════════
  // NHÓM 2: SPATIAL (8 câu) - rotation, mirror, transform
  // ═══════════════════════════════════════════════════════════════════════

  // S1 - Easy: simple 90° rotation
  {
    id: 13,
    category: "spatial",
    q: "Hình bên dưới sau khi xoay 90° theo chiều kim đồng hồ sẽ trông như thế nào?",
    visual: {
      type: "spatial",
      source: { shape: "L", rotation: 0 },
      transform: "Xoay 90° kim đồng hồ",
      options: [
        { shape: "L", rotation: 90 },
        { shape: "L", rotation: 180 },
        { shape: "L", rotation: 270 },
        { shape: "L", rotation: 0 },
      ],
    },
    opts: ["L xoay 90°", "L xoay 180°", "L xoay 270°", "L gốc"],
    ans: 0,
    explain: "Xoay 90° kim đồng hồ → cộng 90° vào rotation.",
  },

  // S2 - Easy: 180° rotation
  {
    id: 14,
    category: "spatial",
    q: "Hình bên dưới sau khi xoay 180° sẽ trông như thế nào?",
    visual: {
      type: "spatial",
      source: { shape: "T", rotation: 0 },
      transform: "Xoay 180°",
      options: [
        { shape: "T", rotation: 90 },
        { shape: "T", rotation: 180 },
        { shape: "T", rotation: 270 },
        { shape: "T", rotation: 0 },
      ],
    },
    opts: ["T xoay 90°", "T xoay 180°", "T xoay 270°", "T gốc"],
    ans: 1,
    explain: "Xoay 180° → T sẽ úp ngược (nhánh ngang xuống dưới).",
  },

  // S3 - Easy: arrow rotation 270°
  {
    id: 15,
    category: "spatial",
    q: "Mũi tên (gốc chỉ phải) sau khi xoay 270° kim đồng hồ chỉ hướng nào?",
    visual: {
      type: "spatial",
      source: { shape: "arrow", rotation: 0 },
      transform: "Xoay 270° kim đồng hồ",
      options: [
        { shape: "arrow", rotation: 270 },
        { shape: "arrow", rotation: 180 },
        { shape: "arrow", rotation: 90 },
        { shape: "arrow", rotation: 0 },
      ],
    },
    opts: ["Hướng lên", "Hướng trái", "Hướng xuống", "Hướng phải"],
    ans: 0,
    explain: "270° kim đồng hồ = 90° ngược kim đồng hồ → mũi tên hướng phải xoay thành hướng lên.",
  },

  // S4 - Medium: T rotation chain
  {
    id: 16,
    category: "spatial",
    q: "Chữ T sau 2 lần xoay 90° kim đồng hồ liên tiếp sẽ trông như thế nào?",
    visual: {
      type: "spatial",
      source: { shape: "T", rotation: 0 },
      transform: "Xoay 90° × 2 lần",
      options: [
        { shape: "T", rotation: 90 },
        { shape: "T", rotation: 180 },
        { shape: "T", rotation: 270 },
        { shape: "T", rotation: 0 },
      ],
    },
    opts: ["T xoay 90°", "T xoay 180°", "T xoay 270°", "T gốc"],
    ans: 1,
    explain: "2 lần × 90° = 180°. Tương đương lật ngược.",
  },

  // S5 - Medium: L 270° rotation
  {
    id: 17,
    category: "spatial",
    q: "Chữ L sau khi xoay 270° kim đồng hồ trông như thế nào?",
    visual: {
      type: "spatial",
      source: { shape: "L", rotation: 0 },
      transform: "Xoay 270° kim đồng hồ",
      options: [
        { shape: "L", rotation: 270 },
        { shape: "L", rotation: 90 },
        { shape: "L", rotation: 180 },
        { shape: "L", rotation: 0 },
      ],
    },
    opts: ["L xoay 270°", "L xoay 90°", "L xoay 180°", "L gốc"],
    ans: 0,
    explain: "Trực tiếp 270° kim đồng hồ.",
  },

  // S6 - Hard: text-only block puzzle
  {
    id: 18,
    category: "spatial",
    q: "Một khối lập phương sơn đỏ toàn bộ mặt ngoài, cắt thành 27 khối nhỏ (3×3×3). Có bao nhiêu khối nhỏ chỉ có ĐÚNG 1 mặt đỏ?",
    opts: ["6 khối", "8 khối", "12 khối", "24 khối"],
    ans: 0,
    explain: "Khối nhỏ chỉ 1 mặt đỏ = ô trung tâm của mỗi mặt × 6 mặt = 6 khối.",
  },

  // S7 - Hard: cube corner pieces
  {
    id: 19,
    category: "spatial",
    q: "Tiếp tục câu trên: có bao nhiêu khối nhỏ có ĐÚNG 3 mặt đỏ?",
    opts: ["4 khối", "6 khối", "8 khối", "12 khối"],
    ans: 2,
    explain: "Khối có 3 mặt đỏ = khối ở góc của lập phương = 8 góc → 8 khối.",
  },

  // S8 - Hard: paper folding
  {
    id: 20,
    category: "spatial",
    q: "Gấp 1 tờ giấy hình vuông làm đôi theo đường chéo, được hình tam giác. Sau đó gấp đôi tiếp theo đường thẳng góc với đường gấp đầu tiên. Mở ra, tờ giấy có mấy đường gấp?",
    opts: ["1 đường", "2 đường", "3 đường", "4 đường"],
    ans: 2,
    explain: "Đường chéo + 2 nửa của đường còn lại (gấp tam giác làm đôi tạo 2 nếp gấp đối xứng qua tâm) = 3 đường.",
  },

  // ═══════════════════════════════════════════════════════════════════════
  // NHÓM 3: VERBAL (5 câu) - analogy, classification
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 21,
    category: "verbal",
    q: "Hoàn thành tương quan: BÁC SĨ : BỆNH VIỆN = GIÁO VIÊN : ?",
    opts: ["Học sinh", "Sách giáo khoa", "Lớp học", "Trường học"],
    ans: 3,
    explain: "Bác sĩ làm việc tại bệnh viện (cơ sở chính). Tương ứng: Giáo viên làm việc tại trường học (cơ sở chính, không phải chỉ 1 lớp).",
  },
  {
    id: 22,
    category: "verbal",
    q: "Từ nào KHÔNG cùng nhóm với những từ còn lại?",
    opts: ["Phở", "Bún chả", "Cơm tấm", "Pizza"],
    ans: 3,
    explain: "Phở, Bún chả, Cơm tấm đều là món Việt Nam truyền thống. Pizza là món Ý.",
  },
  {
    id: 23,
    category: "verbal",
    q: "MIỆNG : NÓI = MẮT : ?",
    opts: ["Đẹp", "Nhìn", "Xanh", "Khóc"],
    ans: 1,
    explain: "Miệng dùng để nói (chức năng chính). Mắt dùng để nhìn (chức năng chính).",
  },
  {
    id: 24,
    category: "verbal",
    q: "Từ 'HÀO PHÓNG' gần nghĩa nhất với từ nào?",
    opts: ["Keo kiệt", "Rộng rãi", "Vui vẻ", "Tài giỏi"],
    ans: 1,
    explain: "Hào phóng = rộng rãi, sẵn sàng cho người khác. 'Keo kiệt' là trái nghĩa.",
  },
  {
    id: 25,
    category: "verbal",
    q: "CON : BỐ = CHÁU : ?",
    opts: ["Mẹ", "Em", "Ông", "Bà"],
    ans: 2,
    explain: "Quan hệ thế hệ: con - bố cách 1 thế hệ. Cháu - ông cũng cách 2 thế hệ tương xứng (cháu nội/ngoại - ông).",
  },

  // ═══════════════════════════════════════════════════════════════════════
  // NHÓM 4: QUANTITATIVE (3 câu) - number sequence + math word problem
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 26,
    category: "quantitative",
    q: "Số tiếp theo trong dãy: 3, 7, 15, 31, 63, ?",
    opts: ["95", "127", "100", "81"],
    ans: 1,
    explain: "Mỗi số = số trước × 2 + 1. 63 × 2 + 1 = 127.",
  },
  {
    id: 27,
    category: "quantitative",
    q: "Một xe đi từ A đến B với vận tốc 60 km/h, lúc về 40 km/h. Vận tốc trung bình cả đi và về là?",
    opts: ["48 km/h", "50 km/h", "52 km/h", "55 km/h"],
    ans: 0,
    explain: "Vận tốc TB = 2 × 60 × 40 / (60 + 40) = 4800 / 100 = 48 km/h. (Harmonic mean, KHÔNG phải arithmetic mean 50).",
  },
  {
    id: 28,
    category: "quantitative",
    q: "Tìm số tiếp theo: 1, 4, 9, 16, 25, ?",
    opts: ["30", "36", "32", "40"],
    ans: 1,
    explain: "Dãy số chính phương: 1², 2², 3², 4², 5², 6² = 36.",
  },

  // ═══════════════════════════════════════════════════════════════════════
  // NHÓM 5: LOGIC (2 câu) - deductive reasoning
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 29,
    category: "logic",
    q: "Trong một cuộc thi, Nam đứng thứ 6 từ trên xuống và thứ 18 từ dưới lên. Có bao nhiêu người tham gia?",
    opts: ["22", "23", "24", "25"],
    ans: 1,
    explain: "6 + 18 - 1 = 23. Trừ 1 vì Nam được đếm cả 2 phía.",
  },
  {
    id: 30,
    category: "logic",
    q: "Tất cả con mèo đều có lông. Một số động vật có lông là động vật biển. Kết luận nào ĐÚNG?",
    opts: [
      "Một số con mèo là động vật biển",
      "Không thể kết luận từ 2 mệnh đề trên",
      "Mọi con mèo đều là động vật biển",
      "Không có con mèo nào là động vật biển",
    ],
    ans: 1,
    explain: "'Một số B là C' không cho biết B đó có thuộc A hay không. Cần thông tin thêm để kết luận. Đây là logical fallacy thường gặp.",
  },
];

/**
 * Map số câu đúng (0-30) → IQ score chuẩn quốc tế (mean=100, SD=15).
 * Linear interpolation theo 6 bins.
 */
export function correctToIQ(correct: number): number {
  if (correct <= 5) return Math.round(70 + (correct / 5) * 15);
  if (correct <= 12) return Math.round(85 + ((correct - 5) / 7) * 10);
  if (correct <= 18) return Math.round(95 + ((correct - 12) / 6) * 10);
  if (correct <= 23) return Math.round(105 + ((correct - 18) / 5) * 10);
  if (correct <= 27) return Math.round(115 + ((correct - 23) / 4) * 15);
  return Math.round(130 + ((correct - 27) / 3) * 15);
}

/** IQ score → archetype ID */
export function iqToArchetype(iqScore: number): string {
  if (iqScore < 85) return "explorer";
  if (iqScore < 95) return "learner";
  if (iqScore < 105) return "balanced";
  if (iqScore < 115) return "sharp";
  if (iqScore < 130) return "quick";
  return "gifted";
}
