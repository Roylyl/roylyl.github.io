const root = document.documentElement;
const yearEl = document.getElementById('year');
const progressBar = document.getElementById('progressBar');
const header = document.querySelector('.site-header');
const hero = document.querySelector('.hero');
const heroCopy = document.querySelector('.hero-copy');
const heroPhoto = document.querySelector('.hero-photo');
const revealEls = [...document.querySelectorAll('.reveal')];
const parallaxEls = [...document.querySelectorAll('[data-depth]')];
const projectCards = [...document.querySelectorAll('.project-card')];
const pointerPanel = document.querySelector('.philosophy-statement');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (yearEl) yearEl.textContent = new Date().getFullYear();

// Apple-style stagger: items in the same grid enter one after another.
const staggerGroups = [
  '.focus-grid .reveal, .focus-grid > *',
  '.project-grid .reveal, .project-grid > *',
  '.skills-grid .reveal, .skills-grid > *',
  '.philosophy-grid .reveal, .philosophy-grid > *',
  '.social-grid .reveal, .social-grid > *',
  '.stage-gallery .reveal, .stage-gallery > *'
];
staggerGroups.forEach((selector) => {
  document.querySelectorAll(selector).forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index * 130, 420)}ms`;
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
revealEls.forEach((el) => revealObserver.observe(el));

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
let ticking = false;

function updateMotion() {
  const scrollTop = window.scrollY || window.pageYOffset;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? scrollTop / scrollable : 0;
  if (progressBar) progressBar.style.width = `${Math.min(ratio * 100, 100)}%`;
  header?.classList.toggle('scrolled', scrollTop > 24);

  if (!reduceMotion && hero && window.innerWidth > 700) {
    const rect = hero.getBoundingClientRect();
    const p = clamp((-rect.top + 36) / Math.max(window.innerHeight * 0.78, 520));
    hero.style.setProperty('--hero-copy-y', `${(-26 * p).toFixed(2)}px`);
    hero.style.setProperty('--hero-copy-scale', (1 - 0.025 * p).toFixed(4));
    hero.style.setProperty('--hero-copy-opacity', (1 - 0.38 * p).toFixed(3));
    hero.style.setProperty('--hero-photo-y', `${(18 * p).toFixed(2)}px`);
    hero.style.setProperty('--hero-photo-scale', (1 + 0.035 * p).toFixed(4));
  }

  if (!reduceMotion && window.innerWidth > 700) {
    parallaxEls.forEach((el) => {
      if (el === hero) return;
      const depth = parseFloat(el.dataset.depth || '0');
      const rect = el.getBoundingClientRect();
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
      const y = clamp(-offset * depth * 0.72, -20, 20);
      el.style.setProperty('--parallax-y', `${y.toFixed(2)}px`);
    });
  }

  // Emphasize the project card nearest to the viewport center.
  if (projectCards.length) {
    let active = null;
    let best = Infinity;
    const center = window.innerHeight * 0.54;
    projectCards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - center);
      if (distance < best) { best = distance; active = card; }
      if (!reduceMotion && window.innerWidth > 860) {
        const normalized = clamp(distance / window.innerHeight, 0, 1);
        card.style.setProperty('--project-scale', (1 - normalized * 0.018).toFixed(4));
        card.style.setProperty('--project-y', `${(normalized * 7).toFixed(2)}px`);
      }
    });
    projectCards.forEach((card) => card.classList.toggle('is-active', card === active));
  }

  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateMotion);
    ticking = true;
  }
}

window.addEventListener('scroll', requestTick, { passive: true });
window.addEventListener('resize', requestTick);
updateMotion();

// A restrained cursor glow on the philosophy statement; disabled on touch/reduced motion.
if (pointerPanel && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
  pointerPanel.addEventListener('pointermove', (event) => {
    const rect = pointerPanel.getBoundingClientRect();
    pointerPanel.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
    pointerPanel.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
  });
}


// Slow liquid-glass highlight follows the pointer only on devices with a real hover state.
if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
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


// Mobile menu for compact layouts.
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');
function getMenuLabel(open) {
  const lang = document.documentElement.lang;
  if (lang === 'en') return open ? 'Close menu' : 'Open menu';
  if (lang === 'zh-TW') return open ? '關閉選單' : '開啟選單';
  return open ? '关闭菜单' : '打开菜单';
}
function setMenu(open) {
  if (!header || !mobileMenuToggle || !nav) return;
  header.classList.toggle('menu-open', open);
  document.body.classList.toggle('mobile-menu-active', open);
  mobileMenuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  mobileMenuToggle.setAttribute('aria-label', getMenuLabel(open));
}
if (mobileMenuToggle && header && nav) {
  mobileMenuToggle.addEventListener('click', () => {
    setMenu(!header.classList.contains('menu-open'));
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1160) setMenu(false);
  });
  window.addEventListener('site-language-change', () => {
    mobileMenuToggle.setAttribute('aria-label', getMenuLabel(header.classList.contains('menu-open')));
  });
}

// Use one compact modal on phones instead of rendering three full-size QR cards.
const qrDialog = document.querySelector('.qr-dialog');
if (qrDialog) {
  const dialogImage = qrDialog.querySelector('img');
  const dialogKicker = qrDialog.querySelector('.qr-dialog-copy span');
  const dialogTitle = qrDialog.querySelector('.qr-dialog-copy strong');
  document.querySelectorAll('.qr-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.social-card');
      const source = card?.querySelector('.qr-frame img');
      if (!source || !dialogImage) return;
      dialogImage.src = source.currentSrc || source.src;
      dialogImage.alt = source.alt;
      if (dialogKicker) dialogKicker.textContent = card.querySelector('.social-meta span')?.textContent || '';
      if (dialogTitle) dialogTitle.textContent = card.querySelector('.social-meta h3')?.textContent || '';
      qrDialog.showModal();
    });
  });
  qrDialog.querySelector('.qr-dialog-close')?.addEventListener('click', () => qrDialog.close());
  qrDialog.addEventListener('click', (event) => {
    if (event.target === qrDialog) qrDialog.close();
  });
}

// Desktop QR rail controls. The same cards become a four-up grid on phones.
const socialCarousel = document.querySelector('[data-social-carousel]');
if (socialCarousel) {
  const socialTrack = socialCarousel.querySelector('.social-grid');
  const socialPrev = socialCarousel.querySelector('[data-social-prev]');
  const socialNext = socialCarousel.querySelector('[data-social-next]');
  const updateSocialArrows = () => {
    if (!socialTrack || !socialPrev || !socialNext) return;
    const maxScroll = Math.max(0, socialTrack.scrollWidth - socialTrack.clientWidth - 2);
    socialPrev.disabled = socialTrack.scrollLeft <= 2;
    socialNext.disabled = socialTrack.scrollLeft >= maxScroll;
  };
  const socialStep = () => {
    const card = socialTrack?.querySelector('.social-card');
    if (!card) return socialTrack?.clientWidth || 0;
    const gap = Number.parseFloat(getComputedStyle(socialTrack).gap) || 0;
    return card.getBoundingClientRect().width + gap;
  };
  socialPrev?.addEventListener('click', () => socialTrack?.scrollBy({ left: -socialStep(), behavior: 'smooth' }));
  socialNext?.addEventListener('click', () => socialTrack?.scrollBy({ left: socialStep(), behavior: 'smooth' }));
  socialTrack?.addEventListener('scroll', updateSocialArrows, { passive: true });
  window.addEventListener('resize', updateSocialArrows);
  updateSocialArrows();
}
