import { lenis } from './smoothScroll';

function skipBtnClick() {
  const btns = document.querySelectorAll('.skip');

  if (btns.length === 0) return;

  btns.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('href');
      lenis.scrollTo(targetId, {
        offset: 0,
        immediate: true
      });
    });
  });
}

export default skipBtnClick;
