import Swiper from "swiper/bundle";

function heroSwiper() {
  const section = document.querySelector(".hero");
  if (!section) return;

  const swiperEl = section.querySelector(".swiper");
  const pagin = section.querySelector(".swiper-pagination");

  const swiper = new Swiper(swiperEl, {
    speed: 600,
    effect: "fade",
    allowTouchMove: false,
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: pagin,
      dynamicBullets: true,
    },
  });
}

export default heroSwiper;
