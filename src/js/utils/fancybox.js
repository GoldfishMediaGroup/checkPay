import { Fancybox } from '@fancyapps/ui';

import { lenis } from '../components/smoothScroll';
const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;

function fancybox() {
  const header = document.querySelector('header');
  Fancybox.bind('[data-fancybox]', {
    animated: true,
    autoStart: false,
    placeFocusBack: false,
    idle: false,

    Images: {
      zoom: false // отключает zoom-анимацию при открытии
    },
    clickContent: false, // отключает zoom при клике
    wheel: false, // отключает zoom при скролле
    Carousel: {
      Panzoom: {
        // zoom: false,
        // pinchToZoom: false,
        // wheel: false,
        // touch: false
      }
    },
    Thumbs: false,
    Toolbar: {
      display: {
        middle: [],
        left: [],
        right: ['close']
      },
      items: {
        close: {
          tpl: `
          <button class="f-button f-button-close" data-fancybox-close>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 10L10 30" stroke="#ADC2C9" stroke-width="2" stroke-linecap="round" />
              <path d="M10 10L30 30" stroke="#ADC2C9" stroke-width="2" stroke-linecap="round" />
            </svg>    
          </button>
          `
        }
      }
    },
    on: {
      done: (fancybox) => {
        const fancyboxEl = fancybox.container,
          prevBtn = fancyboxEl.querySelector('.f-button.is-prev'),
          nextBtn = fancyboxEl.querySelector('.f-button.is-next');

        prevBtn &&
          (prevBtn.innerHTML = `
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.29289 19.3046C2.90237 19.6951 2.90237 20.3283 3.29289 20.7188L9.65685 27.0828C10.0474 27.4733 10.6805 27.4733 11.0711 27.0828C11.4616 26.6923 11.4616 26.0591 11.0711 25.6686L5.41421 20.0117L11.0711 14.3549C11.4616 13.9643 11.4616 13.3312 11.0711 12.9406C10.6805 12.5501 10.0474 12.5501 9.65686 12.9406L3.29289 19.3046ZM36 20.0117L36 19.0117L4 19.0117L4 20.0117L4 21.0117L36 21.0117L36 20.0117Z" fill="#ADC2C9" />
            </svg>
         `);

        nextBtn &&
          (nextBtn.innerHTML = `
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M36.7071 20.7071C37.0976 20.3166 37.0976 19.6834 36.7071 19.2929L30.3431 12.9289C29.9526 12.5384 29.3195 12.5384 28.9289 12.9289C28.5384 13.3195 28.5384 13.9526 28.9289 14.3431L34.5858 20L28.9289 25.6569C28.5384 26.0474 28.5384 26.6805 28.9289 27.0711C29.3195 27.4616 29.9526 27.4616 30.3431 27.0711L36.7071 20.7071ZM4 20V21H36V20V19H4V20Z" fill="#ADC2C9" />
            </svg>
          `);
      },

      init: function () {
        $('.fancybox-bg').fadeIn();
        if (lenis && typeof lenis.stop === 'function') {
          let scrollWith = getScrollbarWidth();
          // setTimeout(() => {
          // if (document.body.querySelector('.fancybox__container')) {
          //   document.body.querySelector('.fancybox__container').style.paddingRight = `${scrollWith}px`;
          //   document.body.querySelector('.fancybox__toolbar').style.paddingRight = `${scrollWith}px`;
          // }
          if (header) {
            header.style.paddingRight = `${scrollWith}px`;
          }
          lenis.stop();
          // }, 300);
        }
      },
      close: function () {
        $('.fancybox-bg').fadeOut();
        if (lenis && typeof lenis.start === 'function') {
          // document.body.style.paddingRight = ``;
          lenis.start();
          // document.body.querySelector('.fancybox__container').style.paddingRight = ``;
          // document.body.querySelector('.fancybox__toolbar').style.paddingRight = ``;
          setTimeout(() => {
            if (header) {
              header.style.paddingRight = ``;
            }
          }, 500);
        }
      }
    }
  });

  $('.fancybox-bg').on('click', function () {
    Fancybox.close();
  });
}

export default fancybox;
