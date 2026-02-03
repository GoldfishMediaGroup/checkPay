import Swiper from 'swiper/bundle';
import { Autoplay, Controller } from 'swiper/modules';
window.$ = window.jQuery = require('jquery');
import { rem } from '.././utils/constants';

import { gsap, ScrollTrigger } from 'gsap/all';

import { e as effectInit } from './../../../node_modules/swiper/shared/effect-init.mjs';
import { e as effectTarget } from './../../../node_modules/swiper/shared/effect-target.mjs';
import { e as effectVirtualTransitionEnd } from './../../../node_modules/swiper/shared/effect-virtual-transition-end.mjs';
import { k as getSlideTransformEl } from './../../../node_modules/swiper/shared/utils.mjs';

function EffectCreativeMore({ swiper, extendParams, on }) {
  extendParams({
    creativeEffect: {
      limitProgress: 1,
      shadowPerProgress: false,
      progressMultiplierOpacity: (progress) => progress,
      // progressMultiplierX: (progress) => progress,
      progressMultiplierX: (progress) => {
        return progress * (1 - Math.abs(progress) * 0.13); // Чем дальше от центра, тем слабее сдвиг
      },
      progressMultiplierY: (progress) => progress,

      progressMultiplierZ: (progress) => progress,

      progressMultiplierScale: (progress) => progress,
      progressMultiplierRotation: (progress) => progress,

      perspective: true,
      prev: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      },
      next: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      }
    }
  });

  const getTranslateValue = (value) => {
    if (typeof value === 'string') return value;
    return `${value}px`;
  };

  const setTranslate = () => {
    const { slides, wrapperEl, slidesSizesGrid } = swiper;
    const params = swiper.params.creativeEffect;
    const {
      progressMultiplierOpacity,
      progressMultiplierX,
      progressMultiplierY,
      progressMultiplierZ,
      progressMultiplierScale,
      progressMultiplierRotation
    } = params;

    const isCenteredSlides = swiper.params.centeredSlides;

    if (isCenteredSlides) {
      const margin = slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;
      // wrapperEl.style.transform = `translateX(calc(50% - ${margin}px)) translateY(50%)`;
      // wrapperEl.style.transform = `translateX(calc(50% - ${margin}px)) translateZ(50px)`;
      wrapperEl.style.transform = `translateX(calc(50% - ${margin}px))`;
      // wrapperEl.style.transform = `translateX(calc(50% - ${margin}px)) rotateX(-5deg)`;
    }

    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i];
      const slideProgress = slideEl.progress;
      const progress = Math.min(Math.max(slideEl.progress, -params.limitProgress), params.limitProgress);
      let originalProgress = progress;

      if (!isCenteredSlides) {
        originalProgress = Math.min(Math.max(slideEl.originalProgress, -params.limitProgress), params.limitProgress);
      }

      const offset = slideEl.swiperSlideOffset;
      const t = [swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0];
      const r = [0, 0, 0];
      let custom = false;
      if (!swiper.isHorizontal()) {
        t[1] = t[0];
        t[0] = 0;
      }
      let data = {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: 1,
        opacity: 1
      };
      if (progress < 0) {
        data = params.next;
        custom = true;
      } else if (progress > 0) {
        data = params.prev;
        custom = true;
      } else {
        // data = params.current;
        // custom = true;
      }
      // set translate
      // (p) => progressMultiplierY(p) * 0.7
      const tm = [progressMultiplierX, progressMultiplierY, progressMultiplierZ];
      t.forEach((value, index) => {
        t[index] = `calc(${value}px + (${getTranslateValue(data.translate[index])} * ${Math.abs(tm[index](progress))}))`;
      });
      // set rotates
      r.forEach((value, index) => {
        r[index] = data.rotate[index] * Math.abs(progressMultiplierRotation(progress));
      });

      slideEl.style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;

      const translateString = t.join(', ');
      const rotateString = `rotateX(${r[0]}deg) rotateY(${r[1]}deg) rotateZ(${r[2]}deg)`;
      const scaleString =
        originalProgress < 0
          ? `scale(${1 + (1 - data.scale) * progressMultiplierScale(originalProgress)})`
          : `scale(${1 - (1 - data.scale) * progressMultiplierScale(originalProgress)})`;
      const opacityString =
        originalProgress < 0
          ? 1 + (1 - data.opacity) * progressMultiplierOpacity(originalProgress)
          : 1 - (1 - data.opacity) * progressMultiplierOpacity(originalProgress);
      const transform = `translate3d(${translateString}) ${rotateString} ${scaleString}`;

      // Set shadows
      // if ((custom && data.shadow) || !custom) {
      //   let shadowEl = slideEl.querySelector(".swiper-slide-shadow");
      //   if (!shadowEl && data.shadow) {
      //     // shadowEl = createShadow("creative", slideEl);
      //   }
      //   if (shadowEl) {
      //     const shadowOpacity = params.shadowPerProgress ? progress * (1 / params.limitProgress) : progress;
      //     shadowEl.style.opacity = Math.min(Math.max(Math.abs(shadowOpacity), 0), 1);
      //   }
      // }

      const targetEl = effectTarget(params, slideEl);
      targetEl.style.transform = transform;
      targetEl.style.opacity = opacityString;
      if (data.origin) {
        targetEl.style.transformOrigin = data.origin;
      }
    }
  };

  const setTransition = (duration) => {
    const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));

    transformElements.forEach((el) => {
      el.style.transitionDuration = `${duration}ms`;
      el.querySelectorAll('.swiper-slide-shadow').forEach((shadowEl) => {
        shadowEl.style.transitionDuration = `${duration}ms`;
      });
    });

    effectVirtualTransitionEnd({ swiper, duration, transformElements, allSlides: true });
  };

  effectInit({
    effect: 'creative',
    swiper,
    on,
    setTranslate,
    setTransition,
    perspective: () => swiper.params.creativeEffect.perspective,
    overwriteParams: () => ({
      watchSlidesProgress: true,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}

// function advantagesSwiper() {
//   const swiperEl = document.querySelector('.advantages__swiper');

//   let swiper = null;

//   if (swiperEl) {
//     swiper = new Swiper(swiperEl, {
//       modules: [Autoplay, EffectCreativeMore],
//       slidesPerView: 'auto',
//       centeredSlides: true,
//       speed: 800,

//       loop: true,

//       loopedSlides: 3,

//       effect: 'creative',
//       creativeEffect: {
//         perspective: true,
//         limitProgress: 5,

//         progressMultiplierX: (progress) => {

//           return progress/1.6;
//         },
//         progressMultiplierY: (progress) => {
//           const radius = 1.5;
//           return -(radius - Math.cos(((progress / 4) * Math.PI) / 2) * radius);
//         },
//         prev: {

//           translate: ['-180%', '-125%', 0],
//           rotate: [0, 15, 4]
//         },
//         next: {

//           translate: ['180%', '-125%', 0],
//           rotate: [0, -15, -4]
//         }
//       }
//     });
//   }

//   try {
//     setTimeout(() => {
//       if (swiper && swiper.autoplay) {
//         swiper.params.autoplay.delay = 5000;
//         // swiper.params.autoplay.delay = 0;
//         swiper.params.autoplay.disableOnInteraction = false;
//         swiper.autoplay.start(); // <-- важно!
//       }
//     }, 1000);
//   } catch (err) {}
//   // const swiperEl = document.querySelector('.advantages__swiper');
//   // var swiper = new Swiper(swiperEl, {
//   //   grabCursor: true,
//   //   centeredSlides: true,
//   //   slidesPerView: 'auto',
//   //   loop: true,
//   //   spaceBetween: rem(8)
//   // });
// }

function advantagesSwiper() {
  const swiperEl = document.querySelector('.advantages__swiper');
  if (!swiperEl) return;

  let mm = gsap.matchMedia();

  mm.add('(min-width: 768px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.advantages__inner',
        start: 'top top',
        end: `+=200%`,
        pin: true,
        scrub: 2,
        invalidateOnRefresh: true
      }
    });
  });
  let swiper = null;
  const isMobile = window.innerWidth < 768;

  // Базовые настройки для всех устройств
  const baseOptions = {
    modules: [Autoplay, EffectCreativeMore],
    slidesPerView: 'auto',
    centeredSlides: true,
    speed: 800,
    loop: true,
    loopedSlides: 3,
    grabCursor: true,
  };

  // Специфичные настройки для десктопа
  const desktopOptions = {
    effect: 'creative',
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    creativeEffect: {
      perspective: true,
      limitProgress: 5,
      progressMultiplierX: (progress) => progress / 1.6,
      progressMultiplierY: (progress) => {
        const radius = 1.5;
        return -(radius - Math.cos(((progress / 4) * Math.PI) / 2) * radius);
      },
      prev: {
        translate: ['-180%', '-125%', 0],
        rotate: [0, 15, 4]
      },
      next: {
        translate: ['180%', '-125%', 0],
        rotate: [0, -15, -4]
      }
    }
  };

  // Специфичные настройки для мобилки
  const mobileOptions = {
    effect: 'slide',
    spaceBetween: 10 // Чтобы слайды не слипались
  };

  // Собираем итоговый конфиг в зависимости от экрана
  const finalOptions = isMobile ? { ...baseOptions, ...mobileOptions } : { ...baseOptions, ...desktopOptions };

  swiper = new Swiper(swiperEl, finalOptions);

  // Обработка ресайза (опционально, если нужно, чтобы переключалось без перезагрузки)
  window.addEventListener('resize', () => {
    const nowMobile = window.innerWidth < 768;
    if (nowMobile !== isMobile) {
      location.reload(); // Самый безопасный способ для тяжелых кастомных эффектов
    }
  });
}

export default advantagesSwiper;
