/**
 * data.js - Metadata, Gates, Rubrics, Notebook Roadmaps, and Anti-Patterns for Day 19 Lab Guide
 * VinUni Codelab - AICB Track 2: Vector Store + Feature Store
 */

const LAB_19_DATA = {
  title: "Track 2 · Day 19 — Vector Store + Feature Store Lab",
  cohort: "AICB-P2T2",
  author: "VinUni Codelab",
  durationMinutes: 180,
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
    { title: "NB1: Vector Indexing", time: "0:00 - 0:20", duration: 20, key: "nb1", desc: "Embed 1000 docs tiếng Việt bằng fastembed (384d), index vào Qdrant collection lab19." },
    { title: "NB2: Hybrid Search & RRF", time: "0:20 - 0:50", duration: 30, key: "nb2", desc: "Kết hợp BM25 + Qdrant theo công thức RRF 1/(60+rank). Đo Precision@10 trên 50 golden queries." },
    { title: "NB3: FastAPI & P99", time: "0:50 - 1:15", duration: 25, key: "nb3", desc: "Triển khai REST API GET /search?q=...&mode=hybrid. Đo P50/P95/P99 latency < 50ms." },
    { title: "NB4: Feast Feature Store", time: "1:15 - 1:50", duration: 35, key: "nb4", desc: "Đăng ký 3 feature views, feast apply, materialize online store, PIT historical join." },
    { title: "NB5: Filtered Search (Adv)", time: "1:50 - 2:10", duration: 20, key: "nb5", desc: "Post-filter vs Pre-filter vs Filtered-ANN. Chứng minh hiện tượng sập recall khi selectivity <= 4%." },
    { title: "NB6: Agentic Retrieval (Adv)", time: "2:10 - 2:35", duration: 25, key: "nb6", desc: "Retrieval-as-a-tool, query planner tách sub-queries, reflection, build_context kết hợp Feast." },
    { title: "NB7: Semantic Cache (Adv)", time: "2:35 - 2:50", duration: 15, key: "nb7", desc: "Sweep ngưỡng tương đồng vs tỷ lệ trả lời sai. Demo và fix rò chéo tenant namespace." },
    { title: "NB8: Feature Engineering (Adv)", time: "2:50 - 3:10", duration: 20, key: "nb8", desc: "Target-encoding leakage gap > 0.30 trên session_id, so sánh PIT vs Latest join, On-demand view." }
  ],
  gates: [
    {
      id: 1,
      title: "GATE 1 — Vector Index Integrity",
      notebook: "01_embeddings_index",
      pts: 20,
      passCriteria: [
        "client.count('lab19').count == 1000",
        "Top-5 kết quả cho keyword query hiển thị rõ",
        "Paraphrase query không chứa từ khoá trực tiếp vẫn trả về đúng cụm chủ đề liên quan"
      ],
      failTrap: "Dùng sai model dẫn tới số chiều vector không khớp 384d, hoặc index thiếu tài liệu."
    },
    {
      id: 2,
      title: "GATE 2 — Hybrid RRF Superiority",
      notebook: "02_hybrid_search_rrf",
      pts: 25,
      passCriteria: [
        "Thuật toán RRF chuẩn: 1 / (60 + rank), với rank là 1-based (bắt đầu từ 1, không phải 0)",
        "Bảng Precision@10 trung bình: Hybrid > BM25 Keyword VÀ Hybrid > Semantic Vector",
        "Slice query phân tích rõ: Hybrid thắng ở mixed queries, Vector thắng ở paraphrase, BM25 thắng ở exact"
      ],
      failTrap: "Để rank 0-based khiến phần tử đầu tiên bị chia cho 60 thay vì 61, gây sai lệch trọng số."
    },
    {
      id: 3,
      title: "GATE 3 — Low Latency REST API",
      notebook: "03_search_api_benchmark",
      pts: 25,
      passCriteria: [
        "FastAPI GET /search trả về đúng schema SearchResponse chứa metadata và latency_ms",
        "In bảng latency P50 / P95 / P99 được đo lường chính xác phía server",
        "Hybrid P99 server-side < 50ms sau khi thực hiện warm-up"
      ],
      failTrap: "Quên warm-up trước khi benchmark làm phát sinh cold-start spike vượt quá 50ms."
    },
    {
      id: 4,
      title: "GATE 4 — Feast Materialization & PIT Consistency",
      notebook: "04_feast_feature_store",
      pts: 30,
      passCriteria: [
        "feast apply thành công đăng ký cả 3 feature views",
        "materialize-incremental đẩy dữ liệu vào Online Store",
        "get_online_features(user_id='u_001') hoạt động với P99 < 10ms",
        "Point-in-Time historical join trả về đúng 3 dòng x N features không dính data leakage"
      ],
      failTrap: "Sử dụng Latest Join thay vì PIT Join dẫn đến rò rỉ dữ liệu tương lai vào tập huấn luyện."
    },
    {
      id: 5,
      title: "GATE 5 — Clean Reproducibility & LMS Submission",
      notebook: "All Notebooks + Submission",
      pts: "Overall",
      passCriteria: [
        "Chạy thành công trên môi trường sạch qua lệnh: bash setup-lite.sh && make benchmark",
        "4 Notebooks Core được nộp dưới dạng .ipynb kèm toàn bộ output cells đã thực thi",
        "Ảnh chụp màn hình kết quả tại submission/screenshots/ đầy đủ",
        "Điền hoàn chỉnh submission/REFLECTION.md (<= 200 chữ phân tích so sánh 3 modes)",
        "Repo GitHub công khai (Public) và dán link vào VinUni LMS"
      ],
      failTrap: "Để repo GitHub ở chế độ Private (0 điểm tự động) hoặc nộp notebook rỗng không có output."
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
