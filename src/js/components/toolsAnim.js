import { gsap, ScrollTrigger } from 'gsap/all';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

gsap.registerPlugin(ScrollTrigger);

function toolsAnim() {
  const section = document.querySelector('.tools');
  if (!section) return;

  const cardList = section.querySelector('.tools__card-wrap');
  const initialCards = section.querySelectorAll('.tools__card');
  const container = section.querySelector('.tools__card-container');
  const progressCircle = section.querySelector('.swiper-progress__circle');

  let mm = gsap.matchMedia();
  let swiperInstance = null;


  let currentIndex = 0;
  const totalCards = initialCards.length;
  const totalSteps = totalCards - 1; 

  mm.add(
    {
      isDesktop: '(min-width: 768px)',
      isMobile: '(max-width: 767px)'
    },
    (context) => {
      let { isDesktop, isMobile } = context.conditions;


      function updateProgress() {
        if (!progressCircle || totalSteps <= 0) return;
        const percent = (currentIndex / totalSteps) * 100;
        progressCircle.style.left = `${percent}%`;
      }

      function animateContent(card) {
        const titles = card.querySelectorAll('.txt32, .txt28');


        gsap.set(titles, {
          opacity: 0,
          y: 20,
          filter: 'blur(10px)'
        });

        // Запускаем анимацию
        gsap.to(titles, {
          opacity: 1,
          y: 0,
          delay: 0.2,
          filter: 'blur(0px)',
          duration: 0.6,
          stagger: 0.2, // txt28 пойдет чуть позже txt32 автоматически
          ease: 'power2.out',
          overwrite: true // Важно для Safari, чтобы не было конфликтов
        });
      }


      function moveNext() {
        const currentCards = section.querySelectorAll('.tools__card');
        if (currentCards.length > 0) {
          cardList.appendChild(currentCards[0]);
          const activeCard = section.querySelectorAll('.tools__card')[1]; // Проверь индекс активной
          animateContent(activeCard);
          if (currentIndex < totalSteps) {
            currentIndex++;
            updateProgress();
          }
        }
      }

      function movePrev() {
        const currentCards = section.querySelectorAll('.tools__card');
        if (currentCards.length > 0) {
          cardList.prepend(currentCards[currentCards.length - 1]);

          if (currentIndex > 0) {
            currentIndex--;
            updateProgress();
          }
        }
      }


      if (isDesktop) {
 
        currentIndex = 0;
        updateProgress();


        if (section.querySelectorAll('.tools__card').length === initialCards.length) {
          initialCards.forEach((card) => {
            const clone = card.cloneNode(true);
            cardList.appendChild(clone);
          });
        }

        
        const allCards = section.querySelectorAll('.tools__card');
        cardList.prepend(allCards[allCards.length - 1]);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.tools__inner',
            start: 'top top',
            end: `+=${totalCards * 100}%`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            // Если пользователь резко улетел вверх страницы
            onLeaveBack: () => {
              currentIndex = 0;
              updateProgress();
              // Возвращаем исходный порядок карточек, если нужно
              // (зависит от того, насколько критичен порядок при сбросе)
            }
          }
        });

      
        tl.to({}, { duration: 0.8 });

    
        initialCards.forEach((_, i) => {
          if (i < totalSteps) {
            tl.to({}, { duration: 2 }); 

            tl.to(
              {},
              {
                duration: 1,
                onStart: () => moveNext(),
                onReverseComplete: () => movePrev()
              }
            );
          }
        });

        tl.to({}, { duration: 0.8 });
      }


      if (isMobile) {
        const currentCards = section.querySelectorAll('.tools__card');
        if (currentCards.length > initialCards.length) {
          currentCards.forEach((card, index) => {
            if (index >= initialCards.length) card.remove();
          });
        }

        container.classList.add('swiper');
        cardList.classList.add('swiper-wrapper');
        initialCards.forEach((card) => card.classList.add('swiper-slide'));

        swiperInstance = new Swiper(container, {
          modules: [Navigation, Pagination],
          slidesPerView: 1,
          spaceBetween: 16,
          centeredSlides: true,
          loop: true,
          pagination: {
            el: container.querySelector('.swiper-pagination'),
            dynamicBullets: true
          }
        });
      }


      return () => {
        if (swiperInstance) {
          swiperInstance.destroy(true, true);
          swiperInstance = null;
        }
        container.classList.remove('swiper');
        cardList.classList.remove('swiper-wrapper');
        initialCards.forEach((card) => card.classList.remove('swiper-slide'));

        if (progressCircle) progressCircle.style.left = '0%';
        gsap.set(initialCards, { clearProps: 'all' });
      };
    }
  );
}

export default toolsAnim;
