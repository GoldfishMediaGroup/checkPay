function footerCookieDisclamer() {
  const cookie = document.querySelector('.cookie');
  const cookieBtn = document.querySelector('.cookie__btn');
  const bannerLink = document.querySelector('.banner__link');

  if ((cookie && !cookie.classList.contains('cookie--show')) || !cookie) {
    bannerLink && bannerLink.classList.add('cookie--hide');
  }

  if (!cookie) return;

  cookieBtn.addEventListener('click', () => {
    cookie.classList.remove('cookie--show');
    bannerLink && bannerLink.classList.add('cookie--hide');
  });

  // обработка скролла
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight; // текущая позиция низа окна
    const pageHeight = document.documentElement.scrollHeight; // вся высота документа

    // если пользователь дошёл до последних 200px страницы
    if (scrollPosition >= pageHeight - 100) {
      bannerLink && bannerLink.classList.add('near-end');
    } else {
      bannerLink && bannerLink.classList.remove('near-end');
    }
  });
}

export default footerCookieDisclamer;

