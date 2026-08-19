/**
 * slides.js - Presentation Controller, Simulator Hooks, KaTeX Auto-Renderer & Quiz Logic
 * Controls 16 Slides, Fullscreen, Keyboard Shortcuts, Simulators and Quizzes (Light Theme with Hover Glow).
 */

document.addEventListener('DOMContentLoaded', () => {
  let currentSlideIndex = 0;
  const totalSlides = 16;

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
  setTimeout(renderLatexMath, 300);
});
