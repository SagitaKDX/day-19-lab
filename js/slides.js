/**
 * slides.js - Presentation Controller, Simulator Hooks, KaTeX Auto-Renderer, Interactive Checklists & Quiz Logic
 * Controls 17 Slides, Fullscreen, Keyboard Shortcuts, Simulators, Checklists, Repo Name Generator and Quizzes.
 */

document.addEventListener('DOMContentLoaded', () => {
  let currentSlideIndex = 0;
  const totalSlides = 17;

  const slideViews = document.querySelectorAll('.slide-view');
  const currentSlideDisplay = document.getElementById('current-slide-num');
  const totalSlideDisplay = document.getElementById('total-slide-num');
  const btnPrev = document.getElementById('nav-btn-prev');
  const btnNext = document.getElementById('nav-btn-next');
  const btnFullscreen = document.getElementById('btn-fullscreen');

  if (totalSlideDisplay) totalSlideDisplay.innerText = totalSlides;

  function renderLatexMath() {
    if (window.renderMathInElement) {
      renderMathInElement(document.body, {
        delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '$', right: '$', display: false}
        ],
        throwOnError: false
      });
    }
  }

  function showSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentSlideIndex = index;

    slideViews.forEach((view, idx) => {
      if (idx === index) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    if (currentSlideDisplay) currentSlideDisplay.innerText = index + 1;

    // Update floating buttons state
    if (btnPrev) {
      btnPrev.style.opacity = currentSlideIndex === 0 ? '0.3' : '1';
      btnPrev.style.pointerEvents = currentSlideIndex === 0 ? 'none' : 'auto';
    }
    if (btnNext) {
      btnNext.style.opacity = currentSlideIndex === totalSlides - 1 ? '0.3' : '1';
      btnNext.style.pointerEvents = currentSlideIndex === totalSlides - 1 ? 'none' : 'auto';
    }

    // Refresh Lucide icons
    if (window.lucide) window.lucide.createIcons();

    // Trigger simulator initializations if entering simulator slide
    if (index === 11) {
      if (window.updateRRFSimulator) window.updateRRFSimulator();
      if (window.updateSelectivitySimulator) window.updateSelectivitySimulator();
    }

    // Render LaTeX Math if KaTeX is loaded
    renderLatexMath();
  }

  window.jumpToSlide = (index) => {
    showSlide(index);
  };

  // Floating button listeners
  if (btnPrev) btnPrev.onclick = () => showSlide(currentSlideIndex - 1);
  if (btnNext) btnNext.onclick = () => showSlide(currentSlideIndex + 1);

  // Fullscreen toggle
  if (btnFullscreen) {
    btnFullscreen.onclick = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    };
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
      return;
    }

    if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && e.target === document.body)) {
      e.preventDefault();
      showSlide(currentSlideIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      showSlide(currentSlideIndex - 1);
    } else if (e.key === 'f' || e.key === 'F') {
      if (btnFullscreen) btnFullscreen.click();
    } else if (e.key === 'Home') {
      showSlide(0);
    } else if (e.key === 'End') {
      showSlide(totalSlides - 1);
    }
  });

  // ================= REPO NAME GENERATOR & VALIDATOR =================
  window.updateRepoNamePreview = function() {
    const msvInput = document.getElementById('repo-msv-input');
    const nameInput = document.getElementById('repo-name-input');
    const previewEl = document.getElementById('repo-name-preview');
    const copyBtn = document.getElementById('btn-copy-repo-name');

    if (!previewEl) return;

    let msv = msvInput ? msvInput.value.trim() : "";
    let name = nameInput ? nameInput.value.trim() : "";

    // Convert Vietnamese Diacritics to clean alphanumeric PascalCase
    const cleanName = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D')
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(/\s+/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join('');

    const cleanMsv = msv.replace(/[^a-zA-Z0-9]/g, '');

    const displayMsv = cleanMsv || "MSV";
    const displayFullName = cleanName || "HoVaTen";

    const generatedName = `Track2_Day19_${displayMsv}_${displayFullName}`;
    previewEl.innerText = generatedName;

    if (copyBtn) {
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(generatedName).then(() => {
          const origText = copyBtn.innerHTML;
          copyBtn.innerHTML = `✔ Đã Copy!`;
          copyBtn.className = "px-4 py-2 rounded-xl bg-emerald-600 text-white font-mono text-xs font-bold transition shadow-md";
          setTimeout(() => {
            copyBtn.innerHTML = origText;
            copyBtn.className = "px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold transition shadow-md";
          }, 2000);
        });
      };
    }
  };

  // ================= INTERACTIVE 5 GATES CHECKLIST =================
  window.initGatesChecklist = function() {
    const container = document.getElementById('gates-interactive-container');
    if (!container || !LAB_19_DATA || !LAB_19_DATA.gates) return;

    container.innerHTML = '';
    LAB_19_DATA.gates.forEach((gate, gIdx) => {
      const gateCard = document.createElement('div');
      gateCard.className = "p-3.5 bg-white rounded-xl border-2 border-slate-200 shadow-sm hover-glow-box space-y-2";
      gateCard.innerHTML = `
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded font-mono text-xs font-bold ${gIdx === 1 ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}">
              GATE ${gate.id} · ${gate.pts === 'Overall' ? 'LMS' : gate.pts + ' pts'}
            </span>
            <h4 class="text-xs md:text-sm font-extrabold text-slate-900">${gate.title}</h4>
          </div>
          <span class="font-mono text-xs font-bold text-slate-500">${gate.notebook}</span>
        </div>
        <div class="space-y-1.5 pt-1">
          ${gate.items ? gate.items.map(item => `
            <label class="flex items-start gap-2 text-xs text-slate-700 cursor-pointer select-none p-1 rounded hover:bg-slate-50">
              <input type="checkbox" id="${item.id}" onchange="updateGatesProgress()" class="gate-checkbox mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer">
              <span class="font-medium">${item.text}</span>
            </label>
          `).join('') : ''}
        </div>
      `;
      container.appendChild(gateCard);
    });
    updateGatesProgress();
  };

  window.updateGatesProgress = function() {
    const allCheckboxes = document.querySelectorAll('.gate-checkbox');
    const checkedCheckboxes = document.querySelectorAll('.gate-checkbox:checked');
    const progressBar = document.getElementById('gates-progress-bar');
    const progressText = document.getElementById('gates-progress-text');

    if (!allCheckboxes.length) return;

    const total = allCheckboxes.length;
    const count = checkedCheckboxes.length;
    const pct = Math.round((count / total) * 100);

    if (progressBar) progressBar.style.width = `${pct}%`;
    if (progressText) {
      if (pct === 100) {
        progressText.innerHTML = `🎉 <strong class="text-emerald-700">100% ĐẠT CHUẨN (${count}/${total} tiêu chí) — Đã sẵn sàng nộp bài!</strong>`;
      } else {
        progressText.innerHTML = `Tiến độ kiểm định: <strong>${count}/${total}</strong> tiêu chí (${pct}%)`;
      }
    }
  };

  // ================= SUBMISSION PRE-FLIGHT CHECKLIST =================
  window.updateSubmissionProgress = function() {
    const checks = document.querySelectorAll('.submission-check');
    const checked = document.querySelectorAll('.submission-check:checked');
    const statusBox = document.getElementById('submission-status-box');

    if (!checks.length || !statusBox) return;

    if (checked.length === checks.length) {
      statusBox.className = "p-3 bg-emerald-50 border-2 border-emerald-300 rounded-xl text-xs text-emerald-900 font-bold flex items-center justify-between";
      statusBox.innerHTML = `
        <span class="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          SẴN SÀNG NỘP BÀI (Đã hoàn thành ${checked.length}/${checks.length} yêu cầu)
        </span>
        <span class="text-emerald-700 font-mono">Ready to Submit</span>
      `;
    } else {
      statusBox.className = "p-3 bg-amber-50 border-2 border-amber-200 rounded-xl text-xs text-amber-900 font-bold flex items-center justify-between";
      statusBox.innerHTML = `
        <span class="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          CHƯA ĐỦ ĐIỀU KIỆN (Còn ${checks.length - checked.length} mục chưa tích chọn)
        </span>
        <span class="text-amber-700 font-mono">${checked.length}/${checks.length} Checked</span>
      `;
    }
  };

  // ================= QUIZ INITIALIZATION =================
  window.initQuizzes = function() {
    const quizContainer = document.getElementById('quiz-questions-list');
    if (!quizContainer || !LAB_19_DATA || !LAB_19_DATA.quizzes) return;

    quizContainer.innerHTML = '';
    LAB_19_DATA.quizzes.forEach((q, qIndex) => {
      const qCard = document.createElement('div');
      qCard.className = "p-4 bg-white border-2 border-slate-200 rounded-2xl space-y-3 shadow-sm hover-glow-box";
      qCard.innerHTML = `
        <div class="flex items-start gap-2.5">
          <span class="px-2 py-0.5 rounded font-mono text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 shrink-0">Câu ${qIndex + 1}</span>
          <p class="text-sm font-bold text-slate-900 leading-snug">${q.question}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
          ${q.options.map((opt, optIndex) => `
            <button onclick="checkQuizAnswer('${q.id}', ${optIndex}, this)" class="quiz-opt-btn text-left p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-xs text-slate-800 transition font-sans flex items-center gap-2">
              <span class="w-5 h-5 rounded-full border border-slate-300 bg-white flex items-center justify-center font-mono font-bold text-[11px] text-slate-600 shrink-0">${String.fromCharCode(65 + optIndex)}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
        <div id="quiz-feedback-${q.id}" class="hidden text-xs p-3 rounded-xl mt-2 font-sans leading-relaxed"></div>
      `;
      quizContainer.appendChild(qCard);
    });
    renderLatexMath();
  };

  window.checkQuizAnswer = function(quizId, selectedIndex, btn) {
    const quiz = LAB_19_DATA.quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    const parent = btn.closest('.p-4');
    const allButtons = parent.querySelectorAll('.quiz-opt-btn');
    const feedbackBox = document.getElementById(`quiz-feedback-${quizId}`);

    allButtons.forEach(b => {
      b.disabled = true;
      b.classList.remove('hover:bg-blue-50', 'hover:border-blue-300');
    });

    if (selectedIndex === quiz.correctIndex) {
      btn.classList.add('bg-emerald-50', 'border-emerald-500', 'text-emerald-900', 'font-bold');
      if (feedbackBox) {
        feedbackBox.className = "text-xs p-3 rounded-xl mt-2 font-sans bg-emerald-50 border border-emerald-300 text-emerald-900 block";
        feedbackBox.innerHTML = `✅ <strong>Chính xác!</strong> ${quiz.explanation}`;
      }
    } else {
      btn.classList.add('bg-red-50', 'border-red-400', 'text-red-900', 'font-bold');
      allButtons[quiz.correctIndex].classList.add('bg-emerald-50', 'border-emerald-500', 'text-emerald-900', 'font-bold');
      if (feedbackBox) {
        feedbackBox.className = "text-xs p-3 rounded-xl mt-2 font-sans bg-red-50 border border-red-300 text-red-900 block";
        feedbackBox.innerHTML = `❌ <strong>Chưa chính xác!</strong> ${quiz.explanation}`;
      }
    }
  };

  // Run initializations
  showSlide(0);
  window.initQuizzes();
  window.initGatesChecklist();
  window.updateRepoNamePreview();
  window.updateSubmissionProgress();
  setTimeout(renderLatexMath, 300);
});
