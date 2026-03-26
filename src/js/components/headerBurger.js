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
    gsap.set('.header__link', { opacity: 0, y: '20' });
    gsap.set('.header .btn-primary', { opacity: 0, scale: 0.9 });
    gsap.set('.header__contacts li', { opacity: 0, x: -50 });
    body.classList.add(disableScrollClass);

    burger.classList.add('isOpen');
    navWrapper.classList.add('isOpen');

    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: 'smooth'
    // });

    gsap
      .timeline()
      .to('.header__link', {
        opacity: 1,
        y: 0,
        delay: 0.2,
        duration: 0.6,
        stagger: {
          amount: 0.2
        }
      })
      .to(
        '.header .btn-primary',
        {
          opacity: 1,
          scale: 1,
          duration: 0.3
        },
        '-=0.2'
      )
      .to(
        '.header__contacts li',
        {
          opacity: 1,
          x: 0,
          duration: 0.2,
          stagger: {
            amount: 0.1
          }
        },
        '-=0.3'
      );
  }

  function closeBurger() {
    const tl = gsap.timeline();

    tl.to('.header__contacts li', {
      opacity: 0,
      x: -50,
      duration: 0.4,
      stagger: {
        amount: 0.2,
        from: 'end'
      }
    })
      .to(
        '.header .btn-primary',
        {
          opacity: 0,
          scale: 0.9,
          duration: 0.4
        },
        '-=0.2'
      )
      .to(
        '.header__link',
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: {
            amount: 0.2,
            from: 'end'
          },
          onComplete: () => {
            burger.classList.remove('isOpen');
            navWrapper.classList.remove('isOpen');
          }
        },
        '-=0.4'
      );

    tl.timeScale(1.5);
    body.classList.remove(disableScrollClass);
  }

  burger.addEventListener('click', () => {
    burger.classList.contains('isOpen') ? closeBurger() : openBurger();
  });

  // logo.addEventListener('click', closeBurger);

  navWrapper.addEventListener('click', (e) => {
    if (
      e.target.closest('.header__link')
      // e.target.closest('.header__social')
    ) {
      closeBurger();
    }
  });

  // window.addEventListener('resize', () => {
  //   if (window.innerWidth > 1024 && burger.classList.contains('isOpen')) {
  //     closeBurger();
  //   }
  // });
}

export default headerBurger;
