// import { gsap, ScrollTrigger } from 'gsap/all';

// function toolsAnim() {
//   const section = document.querySelector('.tools');
//   if (!section) return;
//   const cardList = section.querySelector('.tools__card-wrap');

//   const cards = section.querySelectorAll('.tools__card');

//   cards.forEach((card) => {
//     const clone = card.cloneNode(true);
//     cardList.appendChild(clone);
//   });
//   const allCards = section.querySelectorAll('.tools__card');

//   const lastCard = allCards[allCards.length - 1];

//   cardList.prepend(lastCard);

//   let mm = gsap.matchMedia();

//   mm.add('(min-width: 768px)', () => {
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: '.tools__inner',
//         start: 'top top ',
//         end: `+=${cards.length * 200}%`,
//         pin: true,
//         scrub: 1,
//         onLeaveBack: () => {
//           cardList.prepend(lastCard);
//         }
//       }
//     });
//     tl.to({}, { duration: 1 });
//     cards.forEach((card, i) => {
//       if (i < cards.length - 1) {
//         tl.to({}, { duration: 3 });
//         tl.to(card, {
//           duration: 1,
//           ease: 'power2.out',
//           onStart: () => {
//             moveNext();
//           },
//           onReverseComplete: () => {
//             movePrev();
//           }
//         });
//         tl.to({}, { duration: 1 });
//       }
//     });
//       tl.to({}, { duration: 1 });

//     function moveNext() {
//       const cards = section.querySelectorAll('.tools__card');
//       cardList.appendChild(cards[0]);
//     }

//     function movePrev() {
//       const cards = section.querySelectorAll('.tools__card');
//       cardList.prepend(cards[cards.length - 1]);
//     }
//     return () => {
//       gsap.set(cards, { clearProps: 'all' });
//     };
//   });
// }

// export default toolsAnim;

import { gsap, ScrollTrigger } from 'gsap/all';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

function toolsAnim() {
  const section = document.querySelector('.tools');
  if (!section) return;

  const cardList = section.querySelector('.tools__card-wrap');
  const initialCards = section.querySelectorAll('.tools__card'); // Оригинальные карты
  const container = section.querySelector('.tools__card-container');

  let mm = gsap.matchMedia();
  let swiperInstance = null;

  mm.add(
    {
      isDesktop: '(min-width: 768px)',
      isMobile: '(max-width: 767px)'
    },
    (context) => {
      let { isDesktop, isMobile } = context.conditions;

      if (isDesktop) {
        if (section.querySelectorAll('.tools__card').length === initialCards.length) {
          initialCards.forEach((card) => {
            const clone = card.cloneNode(true);
            cardList.appendChild(clone);
          });
        }

        const allCards = section.querySelectorAll('.tools__card');
        const lastCard = allCards[allCards.length - 1];
        cardList.prepend(lastCard);

        const progress = section.querySelector('.swiper-progress__circle');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.tools__inner',
            start: 'top top',
            end: `+=${initialCards.length * 200}%`,
            pin: true,
            scrub: 1
            // onLeaveBack: () => {
            //   cardList.prepend(section.querySelectorAll('.tools__card')[allCards.length - 1]);
            // }
          }
        });

        tl.to({}, { duration: 1 });

        initialCards.forEach((card, i) => {
          if (i < initialCards.length - 1) {
            tl.to({}, { duration: 3 });
            tl.to(card, {
              duration: 1,
              ease: 'power2.out',
              onStart: () => moveNext(),
              onReverseComplete: () => movePrev()
            });
            tl.to({}, { duration: 1 });
            tl.to(
              progress,
              {
                left: `${((i + 1) / (initialCards.length - 1)) * 100}%`,
                duration: 4,
                ease: 'power2.out'
              },
              '<'
            );
          }
        });
        // tl.to(
        //   progress,
        //   {
        //     left: '100%', // Или другое значение, например xPercent: 100
        //     ease: 'none', // Важно: none для линейной связи со скроллом
        //     duration: tl.duration() // Растягиваем на всю длину существующих шагов
        //   },
        //   0
        // );
      }

      if (isMobile) {
        const currentCards = section.querySelectorAll('.tools__card');
        if (currentCards.length > initialCards.length) {
          currentCards.forEach((card, index) => {
            if (index >= initialCards.length) {
              card.remove();
            }
          });
        }

        container.classList.add('swiper');
        cardList.classList.add('swiper-wrapper');

        const mobileCards = section.querySelectorAll('.tools__card');
        mobileCards.forEach((card) => card.classList.add('swiper-slide'));

        const pagin = container.querySelector('.swiper-pagination');
        swiperInstance = new Swiper(container, {
          modules: [Navigation, Pagination],
          slidesPerView: 1,
          spaceBetween: 16,
          centeredSlides: true,
          loop: true,
          speed: 600,
          pagination: {
            el: pagin,
            dynamicBullets: true
          }
        });
      }

      function moveNext() {
        const currentCards = section.querySelectorAll('.tools__card');
        cardList.appendChild(currentCards[0]);
      }

      function movePrev() {
        const currentCards = section.querySelectorAll('.tools__card');
        cardList.prepend(currentCards[currentCards.length - 1]);
      }

      return () => {
        if (swiperInstance) {
          swiperInstance.destroy(true, true);
          swiperInstance = null;
        }

        container.classList.remove('swiper');
        cardList.classList.remove('swiper-wrapper');
        initialCards.forEach((card) => card.classList.remove('swiper-slide'));

        gsap.set(initialCards, { clearProps: 'all' });
      };
    }
  );
}

export default toolsAnim;
