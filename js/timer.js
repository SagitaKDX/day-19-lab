/**
 * timer.js - Countdown Timer Widget for Day 19 Lab
 * Supports compact display, task presets (NB1 - NB8, Sprint, Full), and Web Audio API alarm sound.
 */

class LabTimer {
  constructor() {
    this.totalSeconds = 120 * 60; // Default 120 mins classroom sprint
    this.remainingSeconds = this.totalSeconds;
    this.timerInterval = null;
    this.isRunning = false;

    this.displayElement = document.getElementById('timer-display');
    this.statusElement = document.getElementById('timer-status');
    this.btnToggle = document.getElementById('timer-toggle-btn');
    this.btnReset = document.getElementById('timer-reset-btn');
    this.taskSelect = document.getElementById('timer-preset-select');

    this.init();
  }

  init() {
    if (this.btnToggle) {
      this.btnToggle.onclick = () => this.toggle();
    }
    if (this.btnReset) {
      this.btnReset.onclick = () => this.reset();
    }
    if (this.taskSelect) {
      this.taskSelect.onchange = (e) => {
        const mins = parseInt(e.target.value, 10);
        this.setDuration(mins);
      };
    }
    this.updateDisplay();
  }

  setDuration(minutes) {
    this.pause();
    this.totalSeconds = minutes * 60;
    this.remainingSeconds = this.totalSeconds;
    this.updateDisplay();
  }

  toggle() {
    if (this.isRunning) {
      this.pause();
    } else {
      this.start();
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    if (this.btnToggle) {
      this.btnToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg> <span>Tạm Dừng</span>`;
      this.btnToggle.className = "px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-mono text-xs font-bold transition flex items-center gap-1 shadow-sm";
    }
    if (this.displayElement) {
      this.displayElement.classList.add('timer-running');
    }

    this.timerInterval = setInterval(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
        this.updateDisplay();
      } else {
        this.pause();
        this.playAlarmSound();
        if (this.statusElement) this.statusElement.innerText = "⏰ Hết giờ!";
      }
    }, 1000);
  }

  pause() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
    if (this.btnToggle) {
      this.btnToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg> <span>Bắt Đầu</span>`;
      this.btnToggle.className = "px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold transition flex items-center gap-1 shadow-sm";
    }
    if (this.displayElement) {
      this.displayElement.classList.remove('timer-running');
    }
  }

  reset() {
    this.pause();
    this.remainingSeconds = this.totalSeconds;
    this.updateDisplay();
    if (this.statusElement) this.statusElement.innerText = "";
  }

  updateDisplay() {
    if (!this.displayElement) return;
    const hrs = Math.floor(this.remainingSeconds / 3600);
    const mins = Math.floor((this.remainingSeconds % 3600) / 60);
    const secs = this.remainingSeconds % 60;

    const pad = (n) => String(n).padStart(2, '0');
    if (hrs > 0) {
      this.displayElement.innerText = `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    } else {
      this.displayElement.innerText = `${pad(mins)}:${pad(secs)}`;
    }

    // Color alert when <= 5 mins remaining
    if (this.remainingSeconds <= 300 && this.remainingSeconds > 0) {
      this.displayElement.style.color = '#ef4444';
    } else {
      this.displayElement.style.color = '';
    }
  }

  playAlarmSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const playBeep = (freq, startTime, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const now = ctx.currentTime;
      playBeep(880, now, 0.2);
      playBeep(880, now + 0.3, 0.2);
      playBeep(1174.66, now + 0.6, 0.4);
    } catch (e) {
      console.warn("Audio Context not allowed or supported", e);
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.labTimer = new LabTimer();
});
