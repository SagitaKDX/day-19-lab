/**
 * simulators.js - Interactive Simulators for Day 19 Lab (Light Theme: White, Royal Blue, Crimson Red)
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

  const bm25ValEl = document.getElementById('rrf-bm25-val');
  const vectorValEl = document.getElementById('rrf-vector-val');
  const kValEl = document.getElementById('rrf-k-val');

  if (bm25ValEl) bm25ValEl.innerText = bm25Rank > 20 ? "Không lọt Top" : `#${bm25Rank}`;
  if (vectorValEl) vectorValEl.innerText = vectorRank > 20 ? "Không lọt Top" : `#${vectorRank}`;
  if (kValEl) kValEl.innerText = `k = ${kConst}`;

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
      <div class="flex flex-col md:flex-row items-center justify-between gap-2 text-xs font-mono bg-slate-50 p-2.5 rounded-xl border border-slate-200">
        <span class="text-blue-700">BM25: <strong>${part1}</strong></span>
        <span class="text-slate-400">+</span>
        <span class="text-indigo-700">Vector: <strong>${part2}</strong></span>
        <span class="text-slate-400">=</span>
        <span class="text-emerald-700 font-bold">Total: <strong>${totalRRF.toFixed(5)}</strong></span>
      </div>
    `;
  }

  if (warningDisplay) {
    if (isZeroBased) {
      warningDisplay.innerHTML = `
        <div class="p-3 bg-red-50 border border-red-300 rounded-xl text-red-700 text-xs font-sans flex items-center gap-2">
          <span>⚠️ <strong>Cảnh báo Anti-pattern:</strong> Bạn đang dùng 0-based rank! Phần tử #1 bị chia cho ${kConst} thay vì ${kConst + 1}, làm sai lệch trọng số RRF chuẩn và trượt bài test!</span>
        </div>
      `;
    } else {
      warningDisplay.innerHTML = `
        <div class="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-sans flex items-center gap-2">
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
  const selValEl = document.getElementById('selectivity-val');
  if (selValEl) selValEl.innerText = `${selectivity}%`;

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
      postFilterBar.className = "h-full rounded-full transition-all duration-300 bg-red-600";
      postFilterText.className = "font-mono font-bold text-red-600";
    } else if (pct < 80) {
      postFilterBar.className = "h-full rounded-full transition-all duration-300 bg-amber-500";
      postFilterText.className = "font-mono font-bold text-amber-600";
    } else {
      postFilterBar.className = "h-full rounded-full transition-all duration-300 bg-blue-600";
      postFilterText.className = "font-mono font-bold text-blue-700";
    }
  }

  if (annBar && annText) {
    annBar.style.width = `100%`;
    annText.innerText = `100% Recall`;
  }

  if (overfetchText) {
    if (selectivity <= 4) {
      overfetchText.innerHTML = `
        <div class="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800">
          <strong class="text-red-700">⚠️ VỰC THẲM CHỌN LỌC (Selectivity Cliff):</strong> Với độ lọc ${selectivity}%, Post-filter chỉ đạt <strong>${Math.round(postFilterRecall * 100)}%</strong> recall. Để cứu vãn, bạn phải over-fetch lên <code>fetch_k=${overfetchNeeded}</code> (50% corpus) làm tăng vọt độ trễ! <strong>Giải pháp:</strong> Dùng Filtered HNSW / Pre-filtering.
        </div>
      `;
    } else {
      overfetchText.innerHTML = `
        <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
          <strong class="text-emerald-700">Ổn định:</strong> Độ chọn lọc ${selectivity}% cho phép Post-filter duy trì recall <strong>${Math.round(postFilterRecall * 100)}%</strong> với <code>fetch_k=${overfetchNeeded}</code>.
        </div>
      `;
    }
  }
};
