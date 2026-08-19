# 🚀 LAB 19 — Vector Store + Feature Store Slide Deck & Guide

Bộ slide trình chiếu hướng dẫn thực hành chi tiết **LAB 19: Vector Store + Feature Store (Track 2: AI Engineering - VinUni Codelab)** với giao diện **Crisp White & Vibrant Royal Blue / Crimson Red** sang trọng, phông chữ lớn hiển thị rõ nét trên máy chiếu lớp học (2K/4K) và laptop cá nhân, bộ đếm ngược thời gian (Countdown Timer) tích hợp cho từng notebook, 2 trình mô phỏng tương tác (RRF Calculator & Selectivity Cliff Visualizer), mini quiz trắc nghiệm, và trang kiểm định checklist nộp bài độc lập.

---

## 📁 Cấu Trúc Thư Mục

```text
/Users/minhlethanh/Documents/Day 19 lab/
├── 📄 index.html        ← Ứng dụng slide trình chiếu chính 17 slide (Mở trực tiếp trên mọi trình duyệt)
├── 🎨 css/
│   └── styles.css    ← Giao diện Light Theme, hiệu ứng hover glow phát sáng, KaTeX math formatting
├── ⚡ js/
│   ├── data.js       ← Dữ liệu 8 chặng, 5 Gate đánh giá chi tiết, 10 Anti-patterns, câu hỏi trắc nghiệm
│   ├── timer.js      ← Bộ đếm ngược thời gian tương tác (120m sprint, 180m full, NB1 - NB8)
│   ├── simulators.js ← Bộ giả lập tương tác RRF Fusion & Filtered Search Selectivity Cliff
│   └── slides.js     ← Bộ điều khiển 17 slide, phím tắt, fullscreen, logic chấm quiz, bộ tạo tên repo
└── 📖 README.md         ← Tài liệu hướng dẫn sử dụng
```

---

## 🗺️ Nội Dung 17 Slide Hướng Dẫn Chi Tiết

1. **Slide 1: Bìa & 4 Đầu Ra Cốt Lõi Day 19** — Vector Index 1000 docs, Hybrid Search RRF Precision table, FastAPI $P_{99} < 50\text{ms}$, Feast 3 Views PIT join.
2. **Slide 2: Bản Đồ Kiến Trúc Toàn Cảnh (End-to-End System Architecture)** — Luồng kết hợp Sparse BM25 + Dense Qdrant Vector $\to$ RRF Fusion $\to$ FastAPI $\to$ Feast Feature Store.
3. **Slide 3: Hai Đường Chạy Lab (Lite vs Docker)** — So sánh Lite mode (`fastembed` + Qdrant in-memory + SQLite Feast, 60s setup) vs Docker Full Stack (`bge-m3` + Qdrant Server + Redis + Postgres). Hỗ trợ Apple Container (`container-up.sh`) và Podman.
4. **Slide 4: Chặng 1 (Core) — NB1: Embeddings & Qdrant Vector Indexing (20p — GATE 1)** — Load 1000 docs tiếng Việt, `fastembed` 384d, Index vào Qdrant in-memory, Semantic similarity search.
5. **Slide 5: Chặng 2 (Core) — NB2: Hybrid Search & RRF Formula (30p — GATE 2)** — Công thức RRF $\text{Score} = \sum \frac{1}{60 + \text{rank}}$ (1-based rank), bảng so sánh Precision@10 trên 50 golden queries.
6. **Slide 6: Chặng 3 (Core) — NB3: REST Search API & Latency Benchmark (25p — GATE 3)** — FastAPI endpoint `GET /search`, Pydantic validation, đo lường server-side $P_{50}, P_{95}, P_{99} < 50\text{ms}$ sau khi warm-up.
7. **Slide 7: Chặng 4 (Core) — NB4: Feast Feature Store & Point-in-Time Join (35p — GATE 4)** — Đăng ký 3 feature views, `feast apply`, `materialize-incremental`, Online lookup $P_{99} < 10\text{ms}$, và Point-in-Time (PIT) historical join chống data leakage.
8. **Slide 8: Chặng 5 (Advanced) — NB5: Filtered Search & Vực Thẳm Chọn Lọc** — Hiện tượng sập recall của Post-filtering khi selectivity $\le 4\%$, Over-fetch ladder, và giải pháp Filtered-ANN.
9. **Slide 9: Chặng 6 (Advanced) — NB6: Agentic Retrieval & Query Planning** — Retrieval-as-a-tool, Query Planner tách câu hỏi phức hợp, Reflection loop, và `build_context()` kết hợp Qdrant + Feast.
10. **Slide 10: Chặng 7 (Advanced) — NB7: Semantic Cache & Bảo Mật Tenant** — Sweep ngưỡng similarity vs tỷ lệ trả lời sai, demo và vá lỗ hổng rò rỉ chéo tenant (Cross-Tenant Leakage).
11. **Slide 11: Chặng 8 (Advanced) — NB8: Feature Engineering & Target Leakage** — Target-encoding leakage gap $> 0.30$, In-fold Out-of-fold encoding, PIT vs Latest join, On-Demand Feature Views.
12. **Slide 12: ⚡ Trình Giả Lập Tương Tác: Live RRF Calculator & Filtered Search Visualizer** — Thao tác trực tiếp thanh trượt để tính điểm RRF và quan sát biểu đồ recall của Post-filtering vs Filtered-ANN.
13. **Slide 13: 🤖 Vibe Coding Playbook & SDD/TDD Workflow** — Phân định việc delegate cho AI vs việc kỹ sư phải review diff và kiểm soát logic.
14. **Slide 14: ⚠️ 10 Bẫy Sai Lầm Lớn Nhất (Top 10 Anti-Patterns)** — Rank 0-based, quên re-index khi đổi model, latest join gây rò rỉ tương lai, quên warm-up trước khi đo $P_{99}$, nộp repo private.
15. **Slide 15: 📊 Checklist Đánh Giá 5 Gate (GATE 5)** — Checklist tương tác 17 tiêu chí với thanh tiến độ thời gian thực ($0\% \to 100\%$).
16. **Slide 16: 🧪 Mini Checkpoint Quiz** — 4 câu hỏi trắc nghiệm tương tác với phản hồi giải thích chi tiết tức thì.
17. **Slide 17: 📋 Cấu Trúc Repository & Checklist Nộp Bài LMS** — Công cụ sinh tên repo chuẩn `Track2_Day19_MSV_HoVaTen` kèm nút 1-click Copy, cây thư mục chuẩn, và 4 checklist bắt buộc trước khi dán link vào LMS.

---

## 🎮 Thao Tác & Phím Tắt

- **Bộ đếm ngược thời gian (Timer):** Chọn bài cần làm trong danh sách dropdown và nhấn nút **Bắt Đầu** để theo dõi thời gian làm bài.
- **Nút chuyển slide nổi:** Bấm mũi tên trái/phải ở góc dưới bên phải màn hình.
- **Phím tắt bàn phím:**
  - Nhấn <kbd>→</kbd>, <kbd>PageDown</kbd> hoặc <kbd>Space</kbd>: Chuyển slide tiếp theo.
  - Nhấn <kbd>←</kbd> hoặc <kbd>PageUp</kbd>: Quay lại slide trước.
  - Nhấn <kbd>F</kbd>: Bật/Tắt chế độ Toàn màn hình (Fullscreen).
  - Nhấn <kbd>Home</kbd> / <kbd>End</kbd>: Nhảy về Slide đầu / Slide cuối.

---

## 🖥️ Hướng Dẫn Mở Bài Trình Chiếu

1. **Xem trực tuyến (Live on GitHub Pages):** [https://sagitakdx.github.io/day-19-lab/](https://sagitakdx.github.io/day-19-lab/)
2. **Mở cục bộ:** Nhấp đúp mở file [index.html](file:///Users/minhlethanh/Documents/Day%2019%20lab/index.html) bằng bất kỳ trình duyệt nào.
