

function scroll() {

  const allAnchors = document.querySelectorAll('.nav-link, .nav-link-end, .nav-top-link');
  if (allAnchors.length <= 0) return;
  allAnchors.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      // Если клик по .nav-top-link → скроллим в самый верх
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

      // Определяем куда скроллить (start или end)
      const scrollPosition = anchor.classList.contains('nav-link-end') ? 'end' : 'start';

      // Если якорь найден на текущей странице — скроллим
      if (scrollBlock) {
        e.preventDefault();
        // scrollBlock.scrollIntoView({
        //   behavior: 'smooth',
        //   block: scrollPosition
        // });
        smoothScrollToElement(scrollBlock, 2500);
      }
      // Если нет — браузер сам перейдет на другую страницу с якорем
    });
  });



  function smoothScrollToElement(element, duration = 1000) {
  const startY = window.scrollY;
  const targetY = element.getBoundingClientRect().top + window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  // функция плавности (быстро в начале, замедляется к концу)
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
