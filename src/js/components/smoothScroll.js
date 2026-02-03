import Lenis from '@studio-freight/lenis';

import { gsap, ScrollTrigger } from 'gsap/all';
export let lenis;
// function smoothScroll() {
//   // lenis = new Lenis({
//   //   duration: 1.5,
//   //   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//   //   smoothWheel: true,
//   // });

//   // function raf(time) {
//   //   lenis.raf(time);
//   //   requestAnimationFrame(raf);
//   // }
//   // requestAnimationFrame(raf);
// }

function smoothScroll() {
  lenis = new Lenis({
    duration: 0.8,
    easing: (t) => t,
    direction: 'vertical',
    smoothWheel: true
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}
export default smoothScroll;
