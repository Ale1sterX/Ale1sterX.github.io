// Theme toggle + persistence
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('site-theme');

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.classList.add('light-theme');
    themeToggle.textContent = '🌞';
  } else {
    document.documentElement.classList.remove('light-theme');
    themeToggle.textContent = '🌙';
  }
}

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme(prefersDark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => {
  const isLight = document.documentElement.classList.contains('light-theme');
  const next = isLight ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem('site-theme', next);
});

// Nav active link on scroll
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(navLinks).map(a => document.getElementById(a.getAttribute('href').substring(1)));

function onScroll() {
  const y = window.scrollY + 120;
  let idx = sections.length - 1;
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].offsetTop > y) {
      idx = Math.max(0, i - 1);
      break;
    }
  }
  navLinks.forEach((a, i) => a.classList.toggle('active', i === idx));
}

window.addEventListener('scroll', onScroll);
onScroll();
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("light-mode");
});
