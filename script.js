// script.js - theme toggle + small helpers
// Drop-in replacement: toggles a "dark" class on <html>, persists to localStorage,
// updates the toggle button and respects user's system preference on first load.

// CSS expectation: your styles should switch based on `html.dark` (or .light)
// — this script simply toggles `document.documentElement.classList`.

(function () {
  const TOGGLE_SELECTOR = '#theme-toggle'; // change if your button uses a different id
  const STORAGE_KEY = 'site-theme'; // value: "dark" or "light"

  function prefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(theme) {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
    }
    // update toggle button UI if present
    const btn = document.querySelector(TOGGLE_SELECTOR);
    if (btn) {
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      btn.textContent = theme === 'dark' ? '🌙' : '☀️';
      // optional: add aria-label that reflects state
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // ignore - storage might be disabled in some browsers
      // fallback: nothing
    }
  }

  function loadTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) { /* ignore */ }
    // default: follow system preference
    return prefersDark() ? 'dark' : 'light';
  }

  function toggleTheme() {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    saveTheme(next);
  }

  // init after DOM ready. Works with defer or when script at bottom of body.
  function init() {
    const initial = loadTheme();
    applyTheme(initial);

    const btn = document.querySelector(TOGGLE_SELECTOR);
    if (btn) {
      // click handler
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        toggleTheme();
      });
      // keyboard accessibility is provided by default for <button>
    }

    // Listen for system preference changes and update only if user hasn't explicitly saved a preference.
    // (If user explicitly set theme, prefer that.)
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === null && window.matchMedia) {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener
          ? mq.addEventListener('change', (e) => applyTheme(e.matches ? 'dark' : 'light'))
          : mq.addListener((e) => applyTheme(e.matches ? 'dark' : 'light'));
      }
    } catch (e) { /* ignore */ }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
