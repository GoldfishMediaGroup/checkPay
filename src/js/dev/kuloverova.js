import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
// import 'swiper/css/bundle';
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';

import '../libs/dynamic_adapt';

window.$ = window.jQuery = require('jquery');

import popup from '../utils/popup';
import form from '../utils/form';
import scroll from '../utils/scroll';
import fancybox from '../utils/fancybox';

import smoothScroll from '../components/smoothScroll';
import headerBurger from '../components/headerBurger';
import heroSwiper from '../components/heroSwiper';
import expertiseAnim from '../components/expertiseAnim';
import toolsAnim from '../components/toolsAnim';
import advantagesSwiper from '../components/advantagesSwiper';
import application from '../components/application';
import headerScroll from '../components/headerScroll';
import footerCookieDisclamer from '../components/footerCookieDisclamer';

export const modules = {};

const isMobile = window.innerWidth < 768;
window.addEventListener('resize', () => {
  const nowMobile = window.innerWidth < 768;
  if (nowMobile !== isMobile) {
    location.reload();
  }
});

gsap.registerPlugin(ScrollTrigger);
smoothScroll();

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '1';
  popup();
  form();
  scroll();
  fancybox();

  headerBurger();
  heroSwiper();
  expertiseAnim();
  toolsAnim();
  advantagesSwiper();
  headerScroll();
  footerCookieDisclamer();
  // application();
});
