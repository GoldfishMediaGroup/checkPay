import { gsap, ScrollTrigger } from 'gsap/all';

function expertiseAnim() {
  const section = document.querySelector('.expertise');
  if (!section) return;

  const cards = gsap.utils.toArray('.expertise__card');

  let mm = gsap.matchMedia();

  mm.add('(min-width: 768px)', () => {
    gsap.set(cards, {
      x: (i) => i * -3,
      y: window.innerHeight + 100,
      rotation: 0,
      zIndex: (i) => i,
      autoAlpha: 1
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.expertise__inner',
        start: 'top top',
        end: `+=${cards.length * 100}%`,
        pin: true,
        scrub: 2,
        invalidateOnRefresh: true
      }
    });

    cards.forEach((card, i) => {
      const rotationAngle = (() => {
        switch (i) {
          case 0:
            return 6; // 1-я карточка
          case 1:
            return -6; // 2-я карточка
          case 2:
            return 4; // 3-я карточка
          case 3:
            return -8; // 4-я карточка (твой новый угол)
          case 4:
            return 7; // 5-я карточка (твой новый угол)
          default:
            return 0; // Для всех остальных, если они есть
        }
      })();
      tl.to(card, {
        y: i * 6,
        duration: 1,
        ease: 'power2.out'
      });

      tl.to(
        card,
        {
          rotation: rotationAngle,
          duration: 0.8,
          ease: 'power1.out'
        },
        '-=0.6'
      );
    });

    return () => {
      gsap.set(cards, { clearProps: 'all' });
    };
  });
}

export default expertiseAnim;
