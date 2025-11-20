// THEME TOGGLE + small UI helpers
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// initialize theme icon from saved preference (default: dark)
(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    body.classList.add("light");
    if (toggleBtn) toggleBtn.textContent = "☀️";
  } else {
    body.classList.remove("light");
    if (toggleBtn) toggleBtn.textContent = "🌙";
  }
})();

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("light");
    if (body.classList.contains("light")) {
      localStorage.setItem("theme", "light");
      toggleBtn.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "🌙";
    }
  });
}

// Smooth scrolling for internal anchors (nice polish)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // optionally update URL hash without jumping
    history.replaceState(null, '', this.getAttribute('href'));
  });
});
