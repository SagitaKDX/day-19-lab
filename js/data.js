/**
 * data.js - Metadata, Exact 1-to-1 Official Rubric (Core 100 pts, Advanced 50 pts, Bonus 20 pts), and Anti-Patterns
 * VinUni Codelab - AICB Track 2: Vector Store + Feature Store
 * Exact match with rubric.md
 */

const LAB_19_DATA = {
  title: "Track 2 · Day 19 — Vector Store + Feature Store Lab",
  cohort: "AICB-P2T2",
  author: "VinUni Codelab",
  durationMinutes: 180,
  repoNamingPattern: "Track2_Day19_MSV_HoVaTen",
  repoNamingExample: "Track2_Day19_20260012_NguyenVanA",
  
  // Exact 1-to-1 match with rubric.md (Core total = 100 pts, Target Pass = 70 pts)
  rubricCore: [
    { id: "c1", nb: "01_embeddings_index", criterion: "client.count('lab19').count == 1000", pts: 5 },
    { id: "c2", nb: "01_embeddings_index", criterion: "Top-5 kết quả hiển thị cho keyword query (cell §5 output)", pts: 5 },
    { id: "c3", nb: "01_embeddings_index", criterion: "Paraphrase query (không có từ 'cloud') trả về top-5 đúng chủ đề cloud", pts: 10 },
    { id: "c4", nb: "02_hybrid_search_rrf", criterion: "search_hybrid triển khai theo công thức RRF 1/(k + rank), rank 1-based", pts: 10 },
    { id: "c5", nb: "02_hybrid_search_rrf", criterion: "Bảng Precision@10 trung bình: Hybrid > BM25 Keyword VÀ Hybrid > Semantic Vector", pts: 10 },
    { id: "c6", nb: "02_hybrid_search_rrf", criterion: "Phân tích slice query: Hybrid thắng mixed, Vector thắng paraphrase, BM25 thắng exact", pts: 5 },
    { id: "c7", nb: "03_search_api_benchmark", criterion: "FastAPI /search trả về SearchResponse hợp lệ có trường latency_ms", pts: 5 },
    { id: "c8", nb: "03_search_api_benchmark", criterion: "Bảng độ trễ P50/P95/P99 cho 3 chế độ (đo lường phía server)", pts: 10 },
    { id: "c9", nb: "03_search_api_benchmark", criterion: "Hybrid P99 server-side < 50ms sau khi warm-up", pts: 10 },
    { id: "c10", nb: "04_feast_feature_store", criterion: "feast apply thành công — 3 feature views được đăng ký đầy đủ", pts: 5 },
    { id: "c11", nb: "04_feast_feature_store", criterion: "materialize-incremental thành công đẩy dữ liệu vào Online Store", pts: 5 },
    { id: "c12", nb: "04_feast_feature_store", criterion: "get_online_features() trả về dict hợp lệ cho user_id=u_001", pts: 5 },
    { id: "c13", nb: "04_feast_feature_store", criterion: "Đo lường 100-call online lookup P99 (P99 < 10ms = full credit)", pts: 5 },
    { id: "c14", nb: "04_feast_feature_store", criterion: "Point-in-Time join qua get_historical_features() trả về đúng 3 dòng x N features", pts: 5 },
    { id: "c15", nb: "Tất cả Notebooks", criterion: "Chạy sạch tái lập: bash setup-lite.sh && make benchmark", pts: 5 }
  ],
  
  // Exact 1-to-1 match with rubric.md (Advanced total = 50 pts)
  rubricAdvanced: [
    { id: "a1", nb: "05_filtered_search", criterion: "Bảng recall theo độ chọn lọc: Post-filter giảm rõ rệt khi filter chặt, Filtered-ANN giữ 1.00", pts: 5 },
    { id: "a2", nb: "05_filtered_search", criterion: "Over-fetch ladder cho thấy fetch_k phải ≈ 50% corpus mới cứu được recall", pts: 5 },
    { id: "a3", nb: "06_agent_retrieval", criterion: "Bảng 3 chiến lược ở cùng ngân sách 16 docs: Agentic > Single-shot cả recall lẫn balance", pts: 5 },
    { id: "a4", nb: "06_agent_retrieval", criterion: "Giải thích được vì sao agentic (+filter) thấp hơn agentic (no filter)", pts: 4 },
    { id: "a5", nb: "06_agent_retrieval", criterion: "build_context() chạy được, in ra cả feature (Feast) lẫn doc_ids (Qdrant)", pts: 3 },
    { id: "a6", nb: "07_semantic_cache", criterion: "Bảng sweep có cả hai cột: tỷ lệ tiết kiệm và tỷ lệ trả lời sai", pts: 5 },
    { id: "a7", nb: "07_semantic_cache", criterion: "Chọn được ngưỡng có lý cho corpus + giải thích vì sao 0.75 chưa đủ", pts: 4 },
    { id: "a8", nb: "07_semantic_cache", criterion: "Demo rò chéo tenant: rò rỉ khi namespaced=False, MISS an toàn khi True", pts: 3 },
    { id: "a9", nb: "08_feature_engineering", criterion: "Bảng leakage: target-naive gap > 0.30 trên session_id, in-fold ≈ 0", pts: 4 },
    { id: "a10", nb: "08_feature_engineering", criterion: "PIT vs latest join: báo cáo % dòng rò + chênh lệch AUC", pts: 4 },
    { id: "a11", nb: "08_feature_engineering", criterion: "On-demand feature view: cùng user, hai amount → hai amount_vs_avg khác nhau", pts: 4 },
    { id: "a12", nb: "Toàn bộ Tests", criterion: "make test và make verify-lite đều xanh (pass 100%) trên máy sạch", pts: 4 }
  ],
  
  // Exact 1-to-1 match with rubric.md (Bonus total = 20 pts)
  rubricBonus: [
    { id: "b1", criterion: "bonus/ARCHITECTURE.md tồn tại, ≥ 600 từ, có sơ đồ kiến trúc", pts: 3 },
    { id: "b2", criterion: "3 quyết định kiến trúc nêu rõ tradeoff rõ ràng (X vs Y, tại sao chọn X)", pts: 6 },
    { id: "b3", criterion: "Ít nhất 1 quyết định thể hiện hiểu biết sâu về ngữ cảnh tiếng Việt", pts: 2 },
    { id: "b4", criterion: "Nêu đích danh phương án thay thế bị bác bỏ (Rejected Alternative) kèm lý do", pts: 2 },
    { id: "b5", criterion: "bonus/agent.py chạy được (HybridMemoryAgent.remember() + .recall())", pts: 4 },
    { id: "b6", criterion: "bonus/demo.py kết thúc exit code 0 với 5 câu query in ra kết quả", pts: 3 }
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
