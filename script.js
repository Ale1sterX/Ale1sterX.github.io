// -----------------------------
// UI Helpers: theme, mobile nav, fades, contact form
// -----------------------------
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const menuBtn = document.getElementById('menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const yearEl = document.getElementById('year') || document.querySelector('#year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

/* Load and apply theme from localStorage */
(function(){
  const saved = localStorage.getItem('theme');
  if(saved === 'dark'){
    html.classList.add('dark');
    if(themeToggle) themeToggle.checked = true;
    if(themeToggleMobile) themeToggleMobile.checked = true;
  } else if(!saved){
    // if no saved preference, use system preference
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
      html.classList.add('dark');
      if(themeToggle) themeToggle.checked = true;
      if(themeToggleMobile) themeToggleMobile.checked = true;
    }
  }
})();

/* Toggle both controls */
function toggleThemeFromControl(checked){
  if(checked){
    html.classList.add('dark');
    localStorage.setItem('theme','dark');
  } else {
    html.classList.remove('dark');
    localStorage.setItem('theme','light');
  }
}
themeToggle?.addEventListener('change', (e) => {
  toggleThemeFromControl(e.target.checked);
  if(themeToggleMobile) themeToggleMobile.checked = e.target.checked;
});
themeToggleMobile?.addEventListener('change', (e) => {
  toggleThemeFromControl(e.target.checked);
  if(themeToggle) themeToggle.checked = e.target.checked;
});

/* Mobile menu toggle */
menuBtn?.addEventListener('click', () => {
  mobileNav.classList.toggle('hidden');
});

/* Smooth scroll for anchors */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (ev) => {
    const href = a.getAttribute('href');
    if(!href || href === '#') return;
    const target = document.querySelector(href);
    if(target){
      ev.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      if(!mobileNav.classList.contains('hidden')) mobileNav.classList.add('hidden');
    }
  });
});

/* Intersection fade-ins */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll('.fade').forEach(el => io.observe(el));

/* Contact form opens user's mail client */
function handleContact(evt){
  evt.preventDefault();
  const form = evt.target;
  const name = (form.name.value || '').trim();
  const email = (form.email.value || '').trim();
  const message = (form.message.value || '').trim();
  const note = document.getElementById('form-note');
  if(!name || !email || !message){
    if(note) note.textContent = 'Please fill all fields.';
    return false;
  }
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
  if(note) note.textContent = 'Opening your mail app…';
  return false;
}
window.handleContact = handleContact;
