function scroll() {
  const allAnchors = document.querySelectorAll('.nav-link, .nav-link-end, .nav-top-link');
  if (allAnchors.length <= 0) return;

  allAnchors.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      if (anchor.classList.contains('nav-top-link')) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }

      const href = anchor.getAttribute('href');
      const blockId = href.startsWith('#') ? href : `#${href.split('#')[1]}`;
      const scrollBlock = document.querySelector(blockId);

      if (scrollBlock) {
        e.preventDefault();
        const offset = Number(anchor.dataset.offset) || 0;
        const isEnd = anchor.classList.contains('nav-link-end');
        smoothScrollToElement(scrollBlock, 1100, offset, isEnd);
      }
    });
  });

  function smoothScrollToElement(element, duration = 1000, offset = 0, isEnd = false) {
    const startY = window.scrollY;
    const rect = element.getBoundingClientRect();
    let targetY = rect.top + window.scrollY;

    if (isEnd) {
      targetY = (rect.bottom + window.scrollY) - window.innerHeight;
    }

    const finalTargetY = targetY - offset;
    const distance = finalTargetY - startY;
    const startTime = performance.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 5);

    function animateScroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }

    requestAnimationFrame(animateScroll);
  }
}

export default scroll;