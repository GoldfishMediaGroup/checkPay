function headerScroll() {
  const nav = document.querySelector('header');

  if (!nav) return;
  
  const navOffsetTop = nav.offsetTop;

  function handleScroll() {
    if (window.scrollY > navOffsetTop) {
      nav.classList.add('fixed-nav');
    } else {
      nav.classList.remove('fixed-nav');
    }
  }

  function handleResize() {
    window.addEventListener('scroll', handleScroll);
  }

  if (nav) {
    handleResize();
  }

  let lastScrollPosition = 0;

  const updateMenuVisibility = () => {
    const currentScrollPosition = window.scrollY;

    // if (window.innerWidth <= 767) {
    if (currentScrollPosition > lastScrollPosition) {
      nav.classList.add('isActive');
    } else {
      nav.classList.remove('isActive');
    }
    // } else {
    //   nav.classList.remove('isActive');
    // }

    lastScrollPosition = currentScrollPosition;
  };

  window.addEventListener('scroll', updateMenuVisibility);
  // window.addEventListener('resize', updateMenuVisibility);

  // Вызываем функцию обновления видимости меню при загрузке страницы
  updateMenuVisibility();
}

export default headerScroll;
