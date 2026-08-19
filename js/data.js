/**
 * data.js - Metadata, Gates, Rubrics, Checklist, and Anti-Patterns for Day 19 Lab Guide
 * VinUni Codelab - AICB Track 2: Vector Store + Feature Store
 */

const LAB_19_DATA = {
  title: "Track 2 · Day 19 — Vector Store + Feature Store Lab",
  cohort: "AICB-P2T2",
  author: "VinUni Codelab",
  durationMinutes: 180,
  repoNamingPattern: "Track2_Day19_MSV_HoVaTen",
  repoNamingExample: "Track2_Day19_20260012_NguyenVanA",
  deliverables: [
    {
      id: "del1",
      title: "1. Vector Index 1000 Docs (NB1)",
      desc: "Index 1.000 documents tiếng Việt vào Qdrant in-memory với fastembed (384d). Top 5 cho câu hỏi paraphrase phải thuộc đúng topic cluster.",
      gate: "Gate 1",
      pts: "20 pts"
    },
    {
      id: "del2",
      title: "2. Hybrid Search & RRF Precision (NB2)",
      desc: "Triển khai RRF fusion (k=60, 1-based rank). Precision@10 trung bình: Hybrid > Keyword và Hybrid > Semantic trên 50 golden queries.",
      gate: "Gate 2",
      pts: "25 pts"
    },
    {
      id: "del3",
      title: "3. FastAPI Search & P99 Latency (NB3)",
      desc: "FastAPI endpoint GET /search trả về schema chuẩn có latency_ms. Đo lường server-side Hybrid P99 < 50ms sau khi warm-up.",
      gate: "Gate 3",
      pts: "25 pts"
    },
    {
      id: "del4",
      title: "4. Feast Feature Store & PIT Join (NB4)",
      desc: "3 Feature Views registered, materialize-incremental thành công. Online lookup P99 < 10ms & PIT join 3 rows x N features không bị data leak.",
      gate: "Gate 4",
      pts: "30 pts"
    }
  ],
  phases: [
    { title: "NB1: Vector Indexing", duration: 20, key: "nb1", desc: "Embed 1000 docs tiếng Việt bằng fastembed (384d), index vào Qdrant collection lab19." },
    { title: "NB2: Hybrid Search & RRF", duration: 30, key: "nb2", desc: "Kết hợp BM25 + Qdrant theo công thức RRF 1/(60+rank). Đo Precision@10 trên 50 golden queries." },
    { title: "NB3: FastAPI & P99", duration: 25, key: "nb3", desc: "Triển khai REST API GET /search?q=...&mode=hybrid. Đo P50/P95/P99 latency < 50ms." },
    { title: "NB4: Feast Feature Store", duration: 35, key: "nb4", desc: "Đăng ký 3 feature views, feast apply, materialize online store, PIT historical join." },
    { title: "NB5: Filtered Search (Adv)", duration: 20, key: "nb5", desc: "Post-filter vs Pre-filter vs Filtered-ANN. Chứng minh hiện tượng sập recall khi selectivity <= 4%." },
    { title: "NB6: Agentic Retrieval (Adv)", duration: 25, key: "nb6", desc: "Retrieval-as-a-tool, query planner tách sub-queries, reflection, build_context kết hợp Feast." },
    { title: "NB7: Semantic Cache (Adv)", duration: 15, key: "nb7", desc: "Sweep ngưỡng tương đồng vs tỷ lệ trả lời sai. Demo và fix rò chéo tenant namespace." },
    { title: "NB8: Feature Engineering (Adv)", duration: 20, key: "nb8", desc: "Target-encoding leakage gap > 0.30 trên session_id, so sánh PIT vs Latest join, On-demand view." }
  ],
  gates: [
    {
      id: 1,
      title: "GATE 1 — Vector Index Integrity (NB1)",
      notebook: "01_embeddings_index",
      pts: 20,
      items: [
        { id: "g1_1", text: "client.count('lab19').count == 1000 (Index đủ 1.000 documents)" },
        { id: "g1_2", text: "Top-5 kết quả cho keyword query hiển thị chính xác" },
        { id: "g1_3", text: "Top-5 paraphrase query (không chứa từ 'cloud') vẫn trả về đúng cụm điện toán đám mây" }
      ]
    },
    {
      id: 2,
      title: "GATE 2 — Hybrid RRF Superiority (NB2)",
      notebook: "02_hybrid_search_rrf",
      pts: 25,
      items: [
        { id: "g2_1", text: "Thuật toán RRF chuẩn: 1 / (60 + rank), với rank là 1-based (bắt đầu từ 1)" },
        { id: "g2_2", text: "Bảng Precision@10 trung bình: Hybrid > BM25 Keyword VÀ Hybrid > Semantic Vector" },
        { id: "g2_3", text: "Slice query phân tích rõ: Hybrid thắng mixed, Vector thắng paraphrase, BM25 thắng exact" }
      ]
    },
    {
      id: 3,
      title: "GATE 3 — Low Latency REST API (NB3)",
      notebook: "03_search_api_benchmark",
      pts: 25,
      items: [
        { id: "g3_1", text: "FastAPI GET /search trả về đúng schema SearchResponse chứa latency_ms" },
        { id: "g3_2", text: "Bảng latency P50 / P95 / P99 được đo lường chính xác phía server" },
        { id: "g3_3", text: "Đã warm-up server và đo Hybrid P99 < 50ms" }
      ]
    },
    {
      id: 4,
      title: "GATE 4 — Feast Materialization & PIT Consistency (NB4)",
      notebook: "04_feast_feature_store",
      pts: 30,
      items: [
        { id: "g4_1", text: "feast apply thành công đăng ký cả 3 feature views" },
        { id: "g4_2", text: "materialize-incremental đẩy dữ liệu vào Online Store" },
        { id: "g4_3", text: "get_online_features(user_id='u_001') hoạt động với P99 < 10ms" },
        { id: "g4_4", text: "Point-in-Time historical join trả về đúng 3 dòng x N features (Không dính data leak)" }
      ]
    },
    {
      id: 5,
      title: "GATE 5 — Clean Reproducibility & LMS Submission",
      notebook: "All Notebooks + Submission",
      pts: "Overall",
      items: [
        { id: "g5_1", text: "Chạy thành công từ máy sạch: bash setup-lite.sh && make benchmark" },
        { id: "g5_2", text: "4 Notebooks Core (.ipynb) giữ nguyên toàn bộ output cells đã thực thi" },
        { id: "g5_3", text: "Thư mục submission/screenshots/ chứa đầy đủ ảnh chụp từng notebook" },
        { id: "g5_4", text: "submission/REFLECTION.md điền đầy đủ (<= 200 chữ so sánh 3 modes)" },
        { id: "g5_5", text: "Tên repo chuẩn Track2_Day19_MSV_HoVaTen, bật chế độ PUBLIC và dán link vào LMS" }
      ]
    }
  ],
  antiPatterns: [
    {
      title: "1. Rank 0-based trong công thức RRF",
      desc: "Công thức RRF yêu cầu rank 1-based (rank=1, 2, 3...). Nếu dùng 0-based, rank đầu tiên là 0 khiến mẫu số thành 60 thay vì 61, làm méo mó phân phối điểm số và rớt test chấm tự động."
    },
    {
      title: "2. Đổi Embedding Model nhưng không Re-Index",
      desc: "Khi đổi EMBEDDING_BACKEND trong .env (ví dụ từ fastembed 384d sang bge-m3 1024d), số chiều vector thay đổi hoàn toàn. Bắt buộc phải xóa collection cũ và chạy lại script index."
    },
    {
      title: "3. Target Data Leakage trong Feature Engineering",
      desc: "Tính toán target encoding trên toàn bộ tập dữ liệu thay vì tính toán độc lập in-fold trong Cross-Validation, tạo ra khoảng cách ảo tưởng AUC > 0.30 giữa tập train và test."
    },
    {
      title: "4. Dùng Latest Join thay vì Point-in-Time (PIT) Join",
      desc: "Lấy giá trị feature mới nhất tại thời điểm hiện tại thay vì giá trị feature tại đúng thời điểm timestamp của sự kiện trong quá khứ, làm mô hình 'nhìn thấy trước tương lai'."
    },
    {
      title: "5. Quên Warm-up API trước khi Benchmark P99",
      desc: "Lần gọi API đầu tiên luôn phải nạp mô hình vào RAM/cache (cold start). Đo P99 mà không bắn 5-10 request khởi động sẽ ghi nhận độ trễ ảo > 200ms."
    },
    {
      title: "6. Semantic Cache thiếu Tenant Isolation Namespace",
      desc: "Cache câu trả lời dựa trên vector similarity mà không gắn tenant_id vào cache key khiến người dùng công ty A nhận được câu trả lời bí mật thuộc về công ty B."
    },
    {
      title: "7. Post-filtering mù quáng trên tập dữ liệu lọc chặt",
      desc: "Tìm ANN top-100 rồi mới lọc điều kiện phụ. Khi điều kiện lọc chỉ chiếm 4% dữ liệu (selectivity cliff), 100 kết quả ban đầu có thể không còn phần tử nào đạt chuẩn."
    },
    {
      title: "8. Chạy Docker nặng nề trên máy yếu thay vì Lite Mode",
      desc: "Cố chạy full stack Docker (Qdrant + Redis + Postgres + bge-m3 cần >= 6GB RAM) trên laptop 8GB RAM khiến máy bị tràn swap và crash, trong khi Lite mode chỉ cần 700MB RAM."
    },
    {
      title: "9. Vibe-coding cẩu thả không review code Diff",
      desc: "Prompt AI sinh code nhưng không kiểm tra lại từng dòng logic tính toán (RRF rank, timestamp format, schema validation), dẫn đến bug ngầm khó gỡ."
    },
    {
      title: "10. Nộp Repository ở chế độ Private",
      desc: "Hệ thống LMS của VinUni chấm tự động. Nếu link repo GitHub để Private, grader không thể tải code về chấm và bài sẽ nhận điểm 0."
    }
  ],
  quizzes: [
    {
      id: "q1",
      question: "Trong công thức Reciprocal Rank Fusion (RRF): Score(d) = sum(1 / (k + rank)), nếu document d đứng thứ nhất trong danh sách BM25 và thứ 2 trong danh sách Vector (k=60), rank_bm25 và rank_vector chuẩn là gì?",
      options: [
        "rank_bm25 = 0, rank_vector = 1",
        "rank_bm25 = 1, rank_vector = 2",
        "rank_bm25 = 0.95, rank_vector = 0.82",
        "rank_bm25 = 60, rank_vector = 120"
      ],
      correctIndex: 1,
      explanation: "Chính xác! Trong thuật toán RRF chuẩn, thứ tự xếp hạng (rank) bắt đầu từ 1 (1-based index). Phần tử thứ nhất có rank=1, phần tử thứ hai có rank=2."
    },
    {
      id: "q2",
      question: "Tại sao Point-in-Time (PIT) Join trong Feast lại bắt buộc đối với việc huấn luyện mô hình Machine Learning?",
      options: [
        "Vì PIT join chạy nhanh hơn Latest join gấp 10 lần.",
        "Vì PIT join giảm dung lượng lưu trữ trên đĩa cứng.",
        "Vì PIT join đảm bảo chỉ lấy giá trị feature có hiệu lực trước hoặc đúng thời điểm timestamp của nhãn, chống Data Leakage.",
        "Vì SQLite không hỗ trợ Latest join."
      ],
      correctIndex: 2,
      explanation: "Chính xác! PIT Join đảm bảo tính nhất quán lịch sử: tại thời điểm t của sự kiện, mô hình chỉ được phép tiếp cận dữ liệu feature đã được quan sát tại thời điểm <= t, ngăn ngừa rò rỉ dữ liệu tương lai."
    },
    {
      id: "q3",
      question: "Khi điều kiện lọc siêu chặt (ví dụ chỉ 2% tài liệu thoả mãn), kỹ thuật tìm kiếm nào giữ vững được Recall cao nhất?",
      options: [
        "Post-filtering (Tìm top-K ANN rồi mới lọc)",
        "Pre-filtering kết hợp quét tuần tự thô (Brute-force trên tập lọc) hoặc Filtered HNSW index",
        "Tăng top-K lên gấp 2 lần trong Post-filtering",
        "Chỉ dùng BM25 và tắt Vector Search"
      ],
      correctIndex: 1,
      explanation: "Chính xác! Khi selectivity cực thấp (Selectivity Cliff), Post-filtering sập recall vì top-K ANN ban đầu hầu như không chứa phần tử nào thỏa mãn bộ lọc. Filtered-ANN / Pre-filtered search duyệt trực tiếp trong không gian thỏa mãn."
    },
    {
      id: "q4",
      question: "Nếu bạn đổi EMBEDDING_BACKEND trong file .env từ fastembed sang bge-m3, thao tác nào dưới đây là BẮT BUỘC?",
      options: [
        "Chỉ cần khởi động lại FastAPI server.",
        "Chỉ cần sửa tham số top_k trong hàm search.",
        "Phải xoá collection cũ và chạy lại script Indexing lại toàn bộ corpus.",
        "Không cần làm gì vì Qdrant tự động chuyển đổi vector dim."
      ],
      correctIndex: 2,
      explanation: "Chính xác! fastembed dùng 384 chiều trong khi bge-m3 dùng 1024 chiều. Số chiều vector không tương thích sẽ khiến Qdrant báo lỗi lập tức, do đó bắt buộc phải re-index."
    }
  ]
};
