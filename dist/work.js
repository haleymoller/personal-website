(function () {
  // Align button stack top with photo top
  function alignButtons() {
    const profile = document.querySelector('.profile');
    const photo = document.querySelector('.headshot');
    const buttons = document.getElementById('navButtons');
    if (!profile || !photo || !buttons) return;

    // Let CSS handle centering on desktop; clear any inline top set previously.
    buttons.style.top = '';
    // On mobile, CSS switches to static flow in media query.
  }

  function balancePhotoGaps() {
    const brand = document.querySelector('.brand');
    const photo = document.querySelector('.headshot');
    const bio = document.querySelector('.bio');
    const contact = document.querySelector('.contact-btn');
    const backHome = document.querySelector('.back-home');
    if (!brand || !photo || !bio) return;

    // On small screens, rely on CSS spacing
    if (window.innerWidth <= 640) {
      photo.style.marginTop = '';
      photo.style.marginBottom = '';
      bio.style.marginTop = '';
      if (contact) contact.style.marginTop = '';
      if (backHome) backHome.style.marginTop = '';
      return;
    }

    // Reset to base margins first
    photo.style.marginTop = '0px';
    photo.style.marginBottom = '24px';
    bio.style.marginTop = '0px';

    // Measure actual rendered gaps
    const brandRect = brand.getBoundingClientRect();
    const photoRect = photo.getBoundingClientRect();
    const bioRect = bio.getBoundingClientRect();

    const gapAbove = photoRect.top - brandRect.bottom; // px
    const gapBelow = bioRect.top - photoRect.bottom;   // px

    // Make the bottom gap match the top gap exactly (visually)
    const targetTop = 24; // desired gap above
    const topCorrection = targetTop - gapAbove;
    const newTop = Math.max(0, targetTop + topCorrection);
    photo.style.marginTop = `${newTop.toFixed(2)}px`;

    // Now set bottom gap to measured top gap for perfect symmetry
    const equalBottom = Math.max(0, (photo.getBoundingClientRect().top - brandRect.bottom));
    photo.style.marginBottom = `${equalBottom.toFixed(2)}px`;

    // Match the gap below the description to the gap above it (equalBottom)
    if (contact) {
      // Reset first to avoid compounding
      contact.style.marginTop = '0px';
      const contactRect = contact.getBoundingClientRect();
      const bioRect2 = bio.getBoundingClientRect();
      const gapBelowBio = contactRect.top - bioRect2.bottom;
      // Make gap below description equal to the gap above (closer)
      const targetGapBelowBio = equalBottom;
      const newContactTop = Math.max(0, targetGapBelowBio - gapBelowBio);
      contact.style.marginTop = `${newContactTop.toFixed(2)}px`;
    } else if (backHome) {
      backHome.style.marginTop = '0px';
      const backRect = backHome.getBoundingClientRect();
      const bioRect2 = bio.getBoundingClientRect();
      const gapBelowBio2 = backRect.top - bioRect2.bottom;
      const newBackTop = Math.max(0, equalBottom - gapBelowBio2);
      backHome.style.marginTop = `${newBackTop.toFixed(2)}px`;
    }
  }

  function onLayout() {
    alignButtons();
    balancePhotoGaps();
  }

  // Run on load, after image load, and after resize; also schedule a micro delay
  window.addEventListener('load', () => {
    onLayout();
    setTimeout(onLayout, 50);
    setTimeout(onLayout, 200);
  });
  window.addEventListener('resize', onLayout);

  // If the headshot loads after DOMContentLoaded, re-run
  const photoEl = document.querySelector('.headshot');
  if (photoEl) {
    if (!photoEl.complete) {
      photoEl.addEventListener('load', onLayout, { once: true });
    }
  }
})();


