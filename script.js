/* UI: theme toggle, mobile menu, smooth scroll, intersection fades, contact handler */

const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const menuBtn = document.getElementById('menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const yearEl = document.getElementById('year');
yearEl.textContent = new Date().getFullYear();

/* theme load */
(function loadTheme(){
  const t = localStorage.getItem('theme');
  if(t === 'dark' || (!t && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)){
    document.documentElement.classList.add('dark');
    document.documentElement.style.setProperty('--bg','#0b1220');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();

function toggleTheme(){
  document.documentElement.classList.toggle('dark');
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
themeToggle?.addEventListener('click', toggleTheme);
themeToggleMobile?.addEventListener('click', toggleTheme);

/* mobile menu */
menuBtn?.addEventListener('click', () => {
  mobileNav.classList.toggle('hidden');
});

/* smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if(!href || href === '#') return;
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      if(!mobileNav.classList.contains('hidden')) mobileNav.classList.add('hidden');
    }
  });
});

/* fade-ins */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll('.fade').forEach(el => io.observe(el));

/* contact form -> open mail client */
function handleContact(evt){
  evt.preventDefault();
  const f = evt.target;
  const name = (f.name.value || '').trim();
  const email = (f.email.value || '').trim();
  const message = (f.message.value || '').trim();
  const note = document.getElementById('form-note');

  if(!name || !email || !message){
    note.textContent = 'Please fill all fields.';
    return false;
  }

  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
  note.textContent = 'Opening your mail app…';
  return false;
}

/* expose handleContact to global (used inline in HTML) */
window.handleContact = handleContact;
