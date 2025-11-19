/* Basic UI: theme toggle, mobile menu, smooth scroll, fade-in observer, contact form */

const themeBtn = document.getElementById('theme-toggle');
const menuBtn = document.getElementById('menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const yearEl = document.getElementById('year');

yearEl.textContent = new Date().getFullYear();

/* Theme persistence */
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}
themeBtn?.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/* Mobile menu */
menuBtn?.addEventListener('click', () => {
  mobileNav.classList.toggle('hidden');
});

/* Smooth scroll for anchors */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
      // close mobile nav
      if (!mobileNav.classList.contains('hidden')) mobileNav.classList.add('hidden');
    }
  });
});

/* Fade-in intersections */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      // optionally unobserve
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade').forEach(el => io.observe(el));

/* Contact form: opens the user's email client (works everywhere, no server needed) */
function handleContact(evt) {
  evt.preventDefault();
  const f = evt.target;
  const name = encodeURIComponent(f.name.value.trim());
  const email = encodeURIComponent(f.email.value.trim());
  const message = encodeURIComponent(f.message.value.trim());

  if (!name || !email || !message) {
    document.getElementById('form-note').textContent = 'Please fill all fields.';
    return false;
  }

  const subject = `Portfolio contact from ${name}`;
  const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
  // open mail client
  window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;

  document.getElementById('form-note').textContent = 'Opening your mail app…';
  return false;
}
