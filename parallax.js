(function () {
  const root = document.documentElement;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  let offset = 0;
  let target = 0;
  // Allow only upward parallax: range [-MAX_UP, 0]
  const MAX_UP = 400; // px upward range

  function setOffset(value) {
    offset = value;
    root.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`);
  }

  function animate() {
    // ease towards target
    offset += (target - offset) * 0.08;
    root.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`);
    requestAnimationFrame(animate);
  }

  function clampUpOnly(n) { return Math.min(0, Math.max(-MAX_UP, n)); }

  // Wheel input
  window.addEventListener('wheel', (e) => {
    // Scroll down (positive deltaY) moves background upward (negative offset)
    target = clampUpOnly(target - e.deltaY * 0.15);
  }, { passive: true });

  // Touch drag input
  let lastY = null;
  window.addEventListener('touchstart', (e) => { if (e.touches[0]) lastY = e.touches[0].clientY; }, { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (!e.touches[0] || lastY == null) return;
    const dy = lastY - e.touches[0].clientY;
    lastY = e.touches[0].clientY;
    // Drag up (dy > 0) moves background upward (negative offset)
    target = clampUpOnly(target - dy * 0.6);
  }, { passive: true });

  // Keyboard arrows/PageUp/PageDown
  window.addEventListener('keydown', (e) => {
    if (['ArrowDown','PageDown'].includes(e.key)) target = clampUpOnly(target - 20); // down moves upward background
    if (['ArrowUp','PageUp'].includes(e.key)) target = clampUpOnly(target + 20);   // up moves toward baseline
  });

  animate();
})();


