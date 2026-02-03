import { gsap, ScrollTrigger } from 'gsap/all';
window.$ = window.jQuery = require('jquery');

function headerBurger() {
  const section = document.querySelector('header');
  if (!section) return;

  const burger = document.querySelector('.header__burger');
  if (!burger) return;
  const body = document.body;

  const logo = document.querySelector('.header__logo');
  const navWrapper = document.querySelector('.header__menu');



  // Класс для блокировки скролла
  const disableScrollClass = 'no-scroll';

  function openBurger() {
    body.classList.add(disableScrollClass);

    burger.classList.add('isOpen');
    navWrapper.classList.add('isOpen');

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  function closeBurger() {
    body.classList.remove(disableScrollClass);

    burger.classList.remove('isOpen');
    navWrapper.classList.remove('isOpen');
  }

  burger.addEventListener('click', () => {
    burger.classList.contains('isOpen') ? closeBurger() : openBurger();
  });

  // logo.addEventListener('click', closeBurger);

  // navWrapper.addEventListener('click', (e) => {
  //   if (
  //     e.target.closest('.header__link') 
  //     // e.target.closest('.header__social') 
  //   ) {
  //     closeBurger();
  //   }
  // });

  // window.addEventListener('resize', () => {
  //   if (window.innerWidth > 1024 && burger.classList.contains('isOpen')) {
  //     closeBurger();
  //   }
  // });


}

export default headerBurger;
