const progress = document.getElementById('ssProgress');
const year = document.getElementById('ssYear');
const nav = document.querySelector('.ss-nav');
const art = document.querySelector('.app-icon-stage');
const hero = document.querySelector('.ss-hero');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (year) year.textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
document.documentElement.classList.add('reveal-ready');
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.querySelectorAll('.feature-cards .reveal, .ui-grid .reveal, .scene-grid .reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min((i % 4) * 125, 380)}ms`;
});

let ticking = false;
const clamp = (v, min=0, max=1) => Math.min(max, Math.max(min, v));
const update = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  if (progress) progress.style.width = `${Math.min(100, ratio * 100)}%`;
  nav?.classList.toggle('scrolled', window.scrollY > 24);
  if (!reduceMotion && art && hero && window.innerWidth > 760) {
    const rect = hero.getBoundingClientRect();
    const p = clamp((-rect.top + 40) / Math.max(window.innerHeight * .8, 520));
    art.style.setProperty('--ss-hero-y', `${(12 * p).toFixed(2)}px`);
  }
  ticking = false;
};
window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(update); ticking = true; }
}, { passive: true });
window.addEventListener('resize', update);
update();
