import Swiper from 'swiper/bundle';

function heroSwiper() {
  // const section = document.querySelector(".hero");
  // if (!section) return;

  // const swiperEl = section.querySelector(".swiper");
  // const pagin = section.querySelector(".swiper-pagination");

  // const swiper = new Swiper(swiperEl, {
  //   speed: 600,
  //   effect: "fade",
  //   allowTouchMove: false,
  //   fadeEffect: {
  //     crossFade: true,
  //   },
  //   autoplay: {
  //     delay: 1800,
  //     disableOnInteraction: false,
  //   },
  //   loop: true,
  //   pagination: {
  //     el: pagin,
  //     dynamicBullets: true,
  //   },
  // });

  // The typewriter element
  const typeWriterWrap = document.querySelector('.hero__typewriter');

  if(!typeWriterWrap) return
  const typeWriterText = typeWriterWrap.querySelector('.hero__typewriter-text');

  const rawData = typeWriterText.getAttribute('data-array');
  const textArray = rawData
    .replace(/[\[\]]/g, '')
    .split(',')
    .map((item) => item.trim().replace(/['"]/g, ''));

  // Функция для эффекта удаления текста (backspace)
  function delWriter(text, i, cb) {
    if (i >= 0) {
      typeWriterText.innerHTML = text.substring(0, i--);
      // Для удаления обычно используют очень маленькую задержку (стираем быстро)
      var rndBack = 30 + Math.random() * 50;
      setTimeout(function () {
        delWriter(text, i, cb);
      }, rndBack);
    } else if (typeof cb == 'function') {
      // Пауза перед началом печати нового слова
      setTimeout(cb, 500);
    }
  }

  // Функция для эффекта печати
  function typeWriter(text, i, cb) {
    if (i <= text.length) {
      typeWriterText.innerHTML = text.substring(0, i++);

      // УСКОРЕНИЕ ТУТ:
      // Быстрая печать: от 40 до 90 мс за символ.
      // Если хочешь еще быстрее — уменьшай число 90.
      var rndTyping = 90 - Math.random() * 40;

      setTimeout(function () {

        typeWriter(text, i, cb);
      }, rndTyping);
    } else {
      // Пауза, когда слово напечатано полностью, перед тем как начать стирать
      setTimeout(function () {
        delWriter(text, i, cb);
      }, 1500);
    }
  }

  // Основная функция управления
  function StartWriter(i) {
    // Если слова закончились — идем по кругу
    if (i >= textArray.length) {
      StartWriter(0);
      return;
    }

    // Запускаем печать слова
    typeWriter(textArray[i], 0, function () {
      StartWriter(i + 1);
    });
  }

  // Старт через секунду после загрузки
  setTimeout(function () {
    StartWriter(0);
  }, 1000);
}

export default heroSwiper;
