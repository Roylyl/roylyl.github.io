(() => {
  const year = document.getElementById('pYear');
  const progress = document.getElementById('pProgress');
  if (year) year.textContent = new Date().getFullYear();
  if (!progress) return;

  let frame = 0;
  const update = () => {
    frame = 0;
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = distance > 0 ? window.scrollY / distance : 0;
    progress.style.width = `${Math.max(0, Math.min(100, ratio * 100))}%`;
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('pageshow', schedule);
  window.addEventListener('site-language-change', schedule);
  document.fonts?.ready.then(schedule);
  update();
})();
