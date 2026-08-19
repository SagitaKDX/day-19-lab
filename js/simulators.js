/**
 * simulators.js - Interactive Simulators for Day 19 Lab
 * 1. RRF Fusion Score & Rank Calculator (NB2)
 * 2. Filtered Search Selectivity Cliff & Overfetch Visualizer (NB5)
 * 3. Feast Point-in-Time (PIT) vs Latest Join Simulator (NB4 & NB8)
 */

// ================= 1. RRF CALCULATOR =================
window.updateRRFSimulator = function() {
  const bm25RankEl = document.getElementById('rrf-bm25-rank');
  const vectorRankEl = document.getElementById('rrf-vector-rank');
  const kConstEl = document.getElementById('rrf-k-const');
  const rankBaseEl = document.getElementById('rrf-rank-base');

  if (!bm25RankEl || !vectorRankEl || !kConstEl) return;

  const bm25Rank = parseInt(bm25RankEl.value, 10);
  const vectorRank = parseInt(vectorRankEl.value, 10);
  const kConst = parseInt(kConstEl.value, 10);
  const isZeroBased = rankBaseEl && rankBaseEl.checked;

  document.getElementById('rrf-bm25-val').innerText = bm25Rank > 20 ? "Không lọt Top" : `#${bm25Rank}`;
  document.getElementById('rrf-vector-val').innerText = vectorRank > 20 ? "Không lọt Top" : `#${vectorRank}`;
  document.getElementById('rrf-k-val').innerText = `k = ${kConst}`;

  const actualBm25Rank = isZeroBased ? (bm25Rank - 1) : bm25Rank;
  const actualVectorRank = isZeroBased ? (vectorRank - 1) : vectorRank;

  const bm25Score = bm25Rank <= 20 ? (1 / (kConst + actualBm25Rank)) : 0;
  const vectorScore = vectorRank <= 20 ? (1 / (kConst + actualVectorRank)) : 0;
  const totalRRF = bm25Score + vectorScore;

  const scoreDisplay = document.getElementById('rrf-score-result');
  const formulaDisplay = document.getElementById('rrf-formula-breakdown');
  const warningDisplay = document.getElementById('rrf-rank-warning');

  if (scoreDisplay) {
    scoreDisplay.innerText = totalRRF.toFixed(5);
  }

  if (formulaDisplay) {
    const part1 = bm25Rank <= 20 ? `1/(${kConst} + ${actualBm25Rank}) = ${bm25Score.toFixed(5)}` : `0.00000`;
    const part2 = vectorRank <= 20 ? `1/(${kConst} + ${actualVectorRank}) = ${vectorScore.toFixed(5)}` : `0.00000`;
    formulaDisplay.innerHTML = `
      <div class="flex flex-col md:flex-row items-center justify-between gap-2 text-xs font-mono">
        <span class="text-blue-400">BM25 Contribution: <strong>${part1}</strong></span>
        <span class="text-slate-400">+</span>
        <span class="text-purple-400">Vector Contribution: <strong>${part2}</strong></span>
        <span class="text-slate-400">=</span>
        <span class="text-emerald-400 font-bold">Total Score: <strong>${totalRRF.toFixed(5)}</strong></span>
      </div>
    `;
  }

  if (warningDisplay) {
    if (isZeroBased) {
      warningDisplay.innerHTML = `
        <div class="p-3 bg-red-950/80 border border-red-500 rounded-xl text-red-300 text-xs font-sans flex items-center gap-2">
          <span>⚠️ <strong>Cảnh báo Anti-pattern:</strong> Bạn đang dùng 0-based rank! Phần tử #1 bị chia cho ${kConst} thay vì ${kConst + 1}, làm sai lệch trọng số RRF chuẩn và trượt bài test!</span>
        </div>
      `;
    } else {
      warningDisplay.innerHTML = `
        <div class="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-sans flex items-center gap-2">
          <span>✅ <strong>Chuẩn 1-based rank:</strong> Document hạng 1 có rank=1, mẫu số là ${kConst + 1}. Thuật toán đạt chuẩn yêu cầu rubric!</span>
        </div>
      `;
    }
  }
};

// ================= 2. FILTERED SEARCH SELECTIVITY CLIFF =================
window.updateSelectivitySimulator = function() {
  const slider = document.getElementById('selectivity-slider');
  if (!slider) return;

  const selectivity = parseInt(slider.value, 10);
  document.getElementById('selectivity-val').innerText = `${selectivity}%`;

  // Theoretical model: Post-filtering fetches Top 100.
  // Probability of finding relevant filtered docs in top 100 drops sharply when selectivity < 10%
  let postFilterRecall = 0;
  if (selectivity >= 50) {
    postFilterRecall = 0.98;
  } else if (selectivity >= 20) {
    postFilterRecall = 0.85;
  } else if (selectivity >= 10) {
    postFilterRecall = 0.65;
  } else if (selectivity >= 4) {
    postFilterRecall = 0.35;
  } else if (selectivity >= 2) {
    postFilterRecall = 0.12;
  } else {
    postFilterRecall = 0.02;
  }

  const filteredAnnRecall = 1.00; // Always scans within valid candidates
  const overfetchNeeded = selectivity <= 2 ? 500 : (selectivity <= 5 ? 300 : (selectivity <= 10 ? 150 : 100));

  const postFilterBar = document.getElementById('post-filter-recall-bar');
  const postFilterText = document.getElementById('post-filter-recall-val');
  const annBar = document.getElementById('ann-recall-bar');
  const annText = document.getElementById('ann-recall-val');
  const overfetchText = document.getElementById('overfetch-advice');

  if (postFilterBar && postFilterText) {
    const pct = Math.round(postFilterRecall * 100);
    postFilterBar.style.width = `${pct}%`;
    postFilterText.innerText = `${pct}% Recall`;

    if (pct < 40) {
      postFilterBar.className = "h-full rounded-full transition-all duration-300 bg-red-500";
    } else if (pct < 80) {
      postFilterBar.className = "h-full rounded-full transition-all duration-300 bg-amber-500";
    } else {
      postFilterBar.className = "h-full rounded-full transition-all duration-300 bg-blue-500";
    }
  }

  if (annBar && annText) {
    annBar.style.width = `100%`;
    annText.innerText = `100% Recall`;
  }

  if (overfetchText) {
    if (selectivity <= 4) {
      overfetchText.innerHTML = `
        <span class="text-red-400 font-bold">⚠️ VỰC THẲM CHỌN LỌC (Selectivity Cliff):</span> Với độ lọc ${selectivity}%, Post-filter chỉ đạt <strong>${Math.round(postFilterRecall * 100)}%</strong> recall. Để cứu vãn, bạn phải over-fetch lên <code>fetch_k=${overfetchNeeded}</code> (50% corpus) làm tăng vọt độ trễ! <strong>Giải pháp:</strong> Dùng Filtered HNSW / Pre-filtering.
      `;
    } else {
      overfetchText.innerHTML = `
        <span class="text-emerald-400 font-bold">Ổn định:</span> Độ chọn lọc ${selectivity}% cho phép Post-filter duy trì recall <strong>${Math.round(postFilterRecall * 100)}%</strong> với <code>fetch_k=${overfetchNeeded}</code>.
      `;
    }
  }
};

// ================= 3. FEAST PIT JOIN VS LATEST JOIN SIMULATOR =================
window.simulateFeastJoin = function(mode) {
  const display = document.getElementById('feast-sim-output');
  const btnPit = document.getElementById('btn-feast-pit');
  const btnLatest = document.getElementById('btn-feast-latest');

  if (!display) return;

  if (mode === 'pit') {
    if (btnPit) btnPit.className = "px-4 py-2 rounded-xl font-bold bg-purple-600 text-white shadow-lg transition";
    if (btnLatest) btnLatest.className = "px-4 py-2 rounded-xl font-bold bg-slate-800 text-slate-400 hover:text-slate-200 transition";

    display.innerHTML = `
      <div class="p-5 bg-purple-950/40 border border-purple-500/40 rounded-2xl space-y-3">
        <div class="flex items-center justify-between text-xs font-mono">
          <span class="text-purple-300 font-bold uppercase">✅ Point-in-Time (PIT) Historical Join</span>
          <span class="text-emerald-400 font-bold">NO DATA LEAKAGE</span>
        </div>
        <p class="text-sm text-slate-300">
          Khi sự kiện thanh toán xảy ra lúc <strong>T = 10:30</strong>, Feast chỉ lấy snapshot feature có hiệu lực lúc <strong>T = 10:00</strong> (avg_spend = <strong>70,000 VND</strong>).
        </p>
        <div class="p-3 bg-slate-900/90 rounded-xl font-mono text-xs text-slate-300 space-y-1">
          <div class="text-slate-500">// Kết quả get_historical_features():</div>
          <div>timestamp: 2026-08-19 10:30:00 | user_id: u_001 | <strong>user_avg_spend: 70,000</strong></div>
          <div class="text-emerald-400">-> Giá trị hợp lệ tại thời điểm giao dịch, mô hình không biết trước tương lai!</div>
        </div>
      </div>
    `;
  } else {
    if (btnPit) btnPit.className = "px-4 py-2 rounded-xl font-bold bg-slate-800 text-slate-400 hover:text-slate-200 transition";
    if (btnLatest) btnLatest.className = "px-4 py-2 rounded-xl font-bold bg-red-600 text-white shadow-lg transition";

    display.innerHTML = `
      <div class="p-5 bg-red-950/50 border border-red-500/50 rounded-2xl space-y-3">
        <div class="flex items-center justify-between text-xs font-mono">
          <span class="text-red-300 font-bold uppercase">🚨 Latest Join (Anti-pattern)</span>
          <span class="text-red-400 font-bold">TARGET DATA LEAKAGE</span>
        </div>
        <p class="text-sm text-slate-300">
          Sự kiện xảy ra lúc <strong>T = 10:30</strong>, nhưng Latest Join lại lấy giá trị feature hiện tại lúc <strong>T = 12:00</strong> (avg_spend = <strong>250,000 VND</strong> sau khi user đã mua thêm nhiều món).
        </p>
        <div class="p-3 bg-slate-900/90 rounded-xl font-mono text-xs text-slate-300 space-y-1">
          <div class="text-slate-500">// Kết quả Latest Join (LỖI NGUY HIỂM):</div>
          <div>timestamp: 2026-08-19 10:30:00 | user_id: u_001 | <strong class="text-red-400">user_avg_spend: 250,000</strong></div>
          <div class="text-red-400">-> Data Leakage! Mô hình nhìn thấy trước hành vi mua sắm tương lai, dẫn tới ảo tưởng AUC cao khi train nhưng sập khi deploy!</div>
        </div>
      </div>
    `;
  }
};
