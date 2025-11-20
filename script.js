// -----------------------------
// Theme toggle + mobile menu + fade-in
// -----------------------------
const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const yearEl = document.getElementById('year');

if (yearEl) yearEl.textContent = new Date().getFullYear();

// Initialize theme from localStorage, fallback to system preference
(function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
  } else if (saved === 'light') {
    document.body.classList.remove('dark');
    themeToggle.textContent = '🌙';
  } else {
    // no saved preference — use system
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.body.classList.add('dark');
      themeToggle.textContent = '☀️';
    } else {
      themeToggle.textContent = '🌙';
    }
  }
})();

// Toggle theme on click
themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
  if (mobileMenu.style.display === 'flex') {
    mobileMenu.style.display = 'none';
    mobileMenu.setAttribute('aria-hidden', 'true');
  } else {
    mobileMenu.style.display = 'flex';
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileMenu.style.flexDirection = 'column';
  }
});

// Intersection fade-in for elements with .fade
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade').forEach(el => observer.observe(el));
