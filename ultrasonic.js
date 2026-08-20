const dYear = document.getElementById('detailYear');
const dProgress = document.getElementById('detailProgress');
const dNav = document.querySelector('.detail-nav');
if (dYear) dYear.textContent = new Date().getFullYear();

const dObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      dObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
document.querySelectorAll('.reveal').forEach((el) => dObserver.observe(el));

let dTicking = false;
const dUpdate = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  if (dProgress) dProgress.style.width = `${Math.min(100, ratio * 100)}%`;
  dNav?.classList.toggle('scrolled', window.scrollY > 24);
  dTicking = false;
};
window.addEventListener('scroll', () => {
  if (!dTicking) { requestAnimationFrame(dUpdate); dTicking = true; }
}, { passive: true });
dUpdate();


const detailReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!detailReduceMotion && window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.glass').forEach((glass) => {
    glass.addEventListener('pointermove', (event) => {
      const rect = glass.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 100;
      const y = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 100;
      glass.style.setProperty('--glass-x', `${x.toFixed(1)}%`);
      glass.style.setProperty('--glass-y', `${y.toFixed(1)}%`);
    });
    glass.addEventListener('pointerleave', () => {
      glass.style.setProperty('--glass-x', '50%');
      glass.style.setProperty('--glass-y', '0%');
    });
  });
}
