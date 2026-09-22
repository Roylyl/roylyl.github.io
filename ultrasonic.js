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
document.documentElement.classList.add('reveal-ready');
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
