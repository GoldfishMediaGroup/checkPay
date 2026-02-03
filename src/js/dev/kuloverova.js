import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
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

export const modules = {};
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

gsap.registerPlugin(ScrollTrigger);
smoothScroll();

document.addEventListener('DOMContentLoaded', () => {
  popup();
  form();
  scroll();
  fancybox();

  headerBurger();
  heroSwiper();
  expertiseAnim();
  toolsAnim();
  advantagesSwiper();
  application();
});
