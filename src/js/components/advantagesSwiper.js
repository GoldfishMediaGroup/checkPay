import Swiper from 'swiper/bundle';
window.$ = window.jQuery = require('jquery');
import { rem } from '.././utils/constants';

import { gsap, ScrollTrigger } from 'gsap/all';

function advantagesSwiper() {
  const section = document.querySelector('#advantages');

  if (!section) return;

  const swiperEl = document.querySelector('.advantages__swiper');
  const cursor = document.querySelector('.advantages__cursor');
  const cursorIcon = cursor?.querySelector('svg');
  const cursorZone = section?.querySelector('.advantages__nav-zones');

  let mm = gsap.matchMedia();

  mm.add('(min-width: 768px)', () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: '.advantages__inner',
        start: 'top top',
        end: `+=120%`,
        pin: true,
        // scrub: 2,
        invalidateOnRefresh: true,
        pinSpacer: true,
      }
    });
  });

  const swiper = new Swiper(swiperEl, {
    slidesPerView: 'auto',
    speed: 600,
    centeredSlides: true,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 300000,
      disableOnInteraction: false
    },
    breakpoints: {
      768: {
        spaceBetween: rem(8),
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        allowTouchMove: false
      }
    }
  });

  gsap.set(cursor, { xPercent: -50, yPercent: -50 });

  const xSetter = gsap.quickSetter(cursor, 'x', 'px');
  const ySetter = gsap.quickSetter(cursor, 'y', 'px');

  const updateCursor = (e) => {
    xSetter(e.clientX);
    ySetter(e.clientY);
  };

  window.addEventListener('mousemove', updateCursor);

  cursorZone.addEventListener('mouseenter', () => {
    gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' });
  });

  cursorZone.addEventListener('mouseleave', () => {
    gsap.to(cursor, { opacity: 0, scale: 0, duration: 0.2, ease: 'power2.in' });
  });

  const prevZone = section.querySelector('._prev');
  const nextZone = section.querySelector('._next');

  prevZone.addEventListener('mouseenter', () => {
    gsap.to(cursorIcon, { rotate: 180, duration: 0.2, ease: 'back.out(1.7)' });
  });

  nextZone.addEventListener('mouseenter', () => {
    gsap.to(cursorIcon, { rotate: 0, duration: 0.2, ease: 'back.out(1.7)' });
  });

  prevZone.addEventListener('click', () => swiper.slidePrev());
  nextZone.addEventListener('click', () => swiper.slideNext());

  section.addEventListener('mousedown', () => {
    gsap.to(cursor, { scale: 0.8, duration: 0.15 });
  });
  section.addEventListener('mouseup', () => {
    gsap.to(cursor, { scale: 1, duration: 0.15 });
  });
}

// Запуск

// let mm = gsap.matchMedia();

// mm.add('(min-width: 768px)', () => {
//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: '.advantages__inner',
//       start: 'top top',
//       end: `+=200%`,
//       pin: true,
//       scrub: 2,
//       invalidateOnRefresh: true
//     }
//   });
// });

export default advantagesSwiper;
