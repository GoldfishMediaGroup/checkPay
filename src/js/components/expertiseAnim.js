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
        end: `+=${cards.length * 200}%`,
        pin: true,
        scrub: 2,
        invalidateOnRefresh: true 
      }
    });

    cards.forEach((card, i) => {
      tl.to(card, {
        y: i * 6,
        duration: 1,
        ease: 'power2.out'
      });

      tl.to(
        card,
        {
          rotation: i % 3 === 0 ? 6 : i % 3 === 1 ? -6 : 4,
          duration: 0.8,
          ease: 'power1.out'
        },
        '>0.1'
      );
    });


    return () => {
      gsap.set(cards, { clearProps: 'all' });
    };
  });
}

export default expertiseAnim;
