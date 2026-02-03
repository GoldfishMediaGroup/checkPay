import { gsap, ScrollTrigger } from 'gsap/all';

function application() {
  const section = document.querySelector('.application');
  if (!section) return;

  let mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.application__inner',
        start: 'top top',
        end: `+=200%`,
        pin: true,
        scrub: 2,
        invalidateOnRefresh: true
      }
    });
  });
}

export default application;
