/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/helpers/requests.js":
/*!************************************!*\
  !*** ./src/js/helpers/requests.js ***!
  \************************************/
/***/ ((module) => {

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  });
  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, status:${response.status}`);
  }

  return response.json();
}

async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, status:${response.status}`);
  }

  return response.json();
}

module.exports = { postData, getData };


/***/ }),

/***/ "./src/js/modules/calculator.js":
/*!**************************************!*\
  !*** ./src/js/modules/calculator.js ***!
  \**************************************/
/***/ ((module) => {

function calculator() {
  const resultRef = document.querySelector('.calculating__result span');

  const initObj = {
    sex: 'female',
    height: null,
    weight: null,
    age: null,
    activityRatio: 1.375,
  };

  const userData = JSON.parse(localStorage.getItem('userData')) || initObj;

  function init(selector, active) {
    if (arguments.length === 2) {
      document.querySelectorAll(`${selector} div`).forEach(ref => {
        if (ref.dataset.gender === userData.sex) {
          ref.classList.add(active);
        } else if (+ref.dataset.activity === userData.activityRatio) {
          ref.classList.add(active);
        } else {
          ref.classList.remove(active);
        }
      });
    }
    if (arguments.length === 1) {
      const { height, weight, age } = userData;
      document
        .querySelectorAll('.calculating__choose_medium input')
        .forEach(ref => {
          if (height && ref.id === 'height') {
            ref.value = height;
          }
          if (weight && ref.id === 'weight') {
            ref.value = weight;
          }
          if (age && ref.id === 'age') {
            ref.value = age;
          }
        });
    }
  }

  function calcDayRatio() {
    const { sex, height, weight, age, activityRatio } = userData;
    if (!sex || !height || !weight || !age || !activityRatio) {
      return (resultRef.textContent = '?');
    }
    if (sex === 'female') {
      resultRef.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * activityRatio
      );
    }
    if (sex === 'male') {
      resultRef.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * activityRatio
      );
    }
  }

  function getSwitcherData(selector, activeClass) {
    const ref = document.querySelector(`${selector}`);

    ref.addEventListener('click', e => {
      if (e.target.dataset.gender) {
        userData.sex = e.target.dataset.gender;
        togleActiveClass(ref, e, activeClass);
      }
      if (e.target.dataset.activity) {
        userData.activityRatio = +e.target.dataset.activity;
        togleActiveClass(ref, e, activeClass);
      }
      localStorage.setItem('userData', JSON.stringify(userData));
    });
  }

  function togleActiveClass(elements, event, className) {
    elements
      .querySelectorAll('div')
      .forEach(item => item.classList.remove(className));
    event.target.classList.add(className);
    calcDayRatio();
  }

  function getInputsData(selector) {
    const ref = document.querySelector(selector);
    ref.addEventListener('input', ({ target }) => {
      const fieldValues = target.value;

      if (fieldValues.match(/\D/g)) {
        target.style.border = '1px solid red';
      } else {
        target.style.border = '';

        switch (target.id) {
          case 'height':
            userData.height = +fieldValues.trim();
            break;
          case 'weight':
            userData.weight = +fieldValues.trim();
            break;
          case 'age':
            userData.age = +fieldValues.trim();
            break;

          default:
            break;
        }
        localStorage.setItem('userData', JSON.stringify(userData));
      }

      calcDayRatio();
    });
  }

  init('#gender', 'calculating__choose-item_active');
  init('.calculating__choose_big', 'calculating__choose-item_active');
  init('.calculating__choose_medium');
  calcDayRatio();
  getSwitcherData('#gender', 'calculating__choose-item_active');
  getSwitcherData(
    '.calculating__choose_big',
    'calculating__choose-item_active'
  );
  getInputsData('.calculating__choose_medium');
}
module.exports = calculator;


/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { getData } = __webpack_require__(/*! ../helpers/requests */ "./src/js/helpers/requests.js");
const MenuCard = __webpack_require__(/*! ./menuCard.js */ "./src/js/modules/menuCard.js");

function cards() {
  getData('http://localhost:3000/menu').then(createCard);

  const menu = document.querySelector('.menu .container');
  function createCard(arr) {
    arr.forEach(({ title, descr, price, img, altimg }) =>
      new MenuCard(title, descr, price, img, altimg).insert(menu)
    );
  }
}

module.exports = cards;


/***/ }),

/***/ "./src/js/modules/carousel.js":
/*!************************************!*\
  !*** ./src/js/modules/carousel.js ***!
  \************************************/
/***/ ((module) => {

function carousel() {
  const slider = document.querySelector('.offer__slider');
  const sliderWindow = slider.querySelector('.offer__slider-wrapper');
  const sliderWrpapper = sliderWindow.querySelector('.offer_slider-inner');
  const slidesArr = sliderWrpapper.querySelectorAll('.offer__slide');
  const sliderControls = slider.querySelector('.offer__slider-counter');
  const currentSlideNumber = sliderControls.querySelector('#current');
  const slideAmountNumber = sliderControls.querySelector('#total');

  let currentSlide = 1;
  let offset = 0;
  const dots = [];

  const width = window.getComputedStyle(sliderWindow).width;
  const normalizedWidth = parseInt(width, 10);
  const slidesAmount = slidesArr.length;
  const paginator = document.createElement('ol');
  paginator.classList.add('carousel-indicators');
  slider.append(paginator);

  // slider styles
  slider.style.position = 'relative';
  sliderWrpapper.style.display = 'flex';
  sliderWrpapper.style.width = slidesAmount * 100 + '%';
  sliderWrpapper.style.transition = `transform 250ms linear`;
  sliderWindow.style.overflow = 'hidden';

  slidesArr.forEach((slide, index) => {
    slide.style.width = width;

    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('data-slide-to', index);
    paginator.append(dot);
    if (index + 1 === currentSlide) {
      dot.classList.add('dot--active');
    }
    dots.push(dot);
  });

  slideAmountNumber.textContent = padNum(slidesAmount);
  currentSlideNumber.textContent = padNum(currentSlide);

  sliderControls.addEventListener('click', onHandleClick);
  paginator.addEventListener('click', selectSlide);

  function onHandleClick(e) {
    const { action } = e.target.closest('div').dataset;
    if (action === 'prev') {
      prevSlide();
    }
    if (action === 'next') {
      nextSlide();
    }
  }

  function prevSlide() {
    if (offset <= 0) {
      offset = normalizedWidth * (slidesAmount - 1);
      currentSlide = slidesAmount;
    } else {
      offset -= normalizedWidth;
      currentSlide -= 1;
    }
    changeSlide();
  }
  function nextSlide() {
    if (offset >= normalizedWidth * (slidesAmount - 1)) {
      offset = 0;
      currentSlide = 1;
    } else {
      currentSlide += 1;
      offset += normalizedWidth;
    }
    changeSlide();
  }

  function padNum(num) {
    return `${num}`.padStart(2, 0);
  }
  function changeSlide() {
    sliderWrpapper.style.transform = `translateX(-${offset}px)`;
    currentSlideNumber.textContent = padNum(currentSlide);

    dots.forEach((dot, index) => {
      dot.classList.remove('dot--active');
      if (index + 1 === currentSlide) {
        dot.classList.add('dot--active');
      }
    });
  }

  function selectSlide(e) {
    const { slideTo } = e.target.dataset;
    if (slideTo) {
      const normalizedSlideIndex = +slideTo;
      offset = normalizedWidth * normalizedSlideIndex;
      currentSlide = normalizedSlideIndex + 1;
      changeSlide();
    }
  }
}

module.exports = carousel;


/***/ }),

/***/ "./src/js/modules/cookie.js":
/*!**********************************!*\
  !*** ./src/js/modules/cookie.js ***!
  \**********************************/
/***/ ((module) => {

function cookie() {
  class CookieConsent {
    constructor({ popup, btnConfirm, btnCancel, activeClass = '' } = {}) {
      this.popup = document.querySelector(popup);
      this.btnConfirm = document.querySelector(btnConfirm);
      this.btnCancel = document.querySelector(btnCancel);
      this.activeClass = activeClass;
      this.consentPropertyType = 'site_consent';
    }

    getItem(key) {
      const cookies = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});

      return cookies[key];
    }

    setItem(key, value) {
      const date = new Date();
      const expiresTime = new Date(date.setHours(date.getHours() + 1));
      document.cookie = `${key}=${value};expires=${expiresTime}`;
    }

    hasConsented() {
      if (this.getItem(this.consentPropertyType) === 'true') {
        return true;
      } else {
        return false;
      }
    }

    changeStatus(prop) {
      this.setItem(this.consentPropertyType, prop);
      if (this.hasConsented()) {
        myScripts();
      }
    }

    bindTriggers() {
      this.popup.addEventListener('click', e => {
        if (e.target.dataset.cookie) {
          this.changeStatus(e.target.dataset.cookie);
          this.popup.classList.remove(this.activeClass);
        }
      });
    }

    init() {
      try {
        if (this.hasConsented()) {
          myScripts();
        } else {
          this.popup.classList.add(this.activeClass);
        }

        this.bindTriggers();
      } catch (e) {
        console.error('Переданы не все данные');
      }
    }
  }
  new CookieConsent({
    activeClass: 'popup_active',
    popup: '.popup',
    btnConfirm: '[data-confirm]',
    btnCancel: '[data-cancel]',
  }).init();

  function myScripts() {
    console.log('Loading...');
  }
}

module.exports = cookie;


/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const showThankDialog = __webpack_require__(/*! ./thanksModal */ "./src/js/modules/thanksModal.js");
const { postData } = __webpack_require__(/*! ../helpers/requests */ "./src/js/helpers/requests.js");

function forms() {
  const forms = document.querySelectorAll('form');
  const message = {
    pending: 'src/img/form/spinner.svg',
    sucess: 'Спасибо, в ближайшем времени мы с вами свяжемся.',
    reject: 'Ой, что-то пошло не так!',
  };

  forms.forEach(form => postFormData(form));

  function postFormData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const statusMessage = showSpinner(form);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      postData('http://localhost:3000/requests', json)
        .then(data => {
          showThankDialog(message.sucess);
          console.log(data);
        })
        .catch(() => {
          showThankDialog(message.reject);
        })
        .finally(() => {
          statusMessage.remove();
          form.reset();
        });
    });
  }

  function showSpinner(form) {
    const statusMessage = document.createElement('img');
    statusMessage.src = message.pending;
    statusMessage.style.cssText = `
    display: block;
    margin: 0 auto;
    `;
    form.insertAdjacentElement('afterend', statusMessage);
    return statusMessage;
  }
}

module.exports = forms;


/***/ }),

/***/ "./src/js/modules/index.js":
/*!*********************************!*\
  !*** ./src/js/modules/index.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const calculator = __webpack_require__(/*! ./calculator */ "./src/js/modules/calculator.js");
const cards = __webpack_require__(/*! ./cards */ "./src/js/modules/cards.js");
const carousel = __webpack_require__(/*! ./carousel */ "./src/js/modules/carousel.js");
const cookie = __webpack_require__(/*! ./cookie */ "./src/js/modules/cookie.js");
const forms = __webpack_require__(/*! ./forms */ "./src/js/modules/forms.js");
const menuCard = __webpack_require__(/*! ./menuCard */ "./src/js/modules/menuCard.js");
const modal = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
const tabs = __webpack_require__(/*! ./tabs */ "./src/js/modules/tabs.js");
const thanksModal = __webpack_require__(/*! ./thanksModal */ "./src/js/modules/thanksModal.js");
const timer = __webpack_require__(/*! ./timer */ "./src/js/modules/timer.js");

module.exports = {
  calculator,
  cards,
  carousel,
  cookie,
  forms,
  menuCard,
  modal,
  tabs,
  thanksModal,
  timer,
};


/***/ }),

/***/ "./src/js/modules/menuCard.js":
/*!************************************!*\
  !*** ./src/js/modules/menuCard.js ***!
  \************************************/
/***/ ((module) => {

class MenuCard {
  constructor(title, text, price, picture, alt, ...clases) {
    this.title = title;
    this.text = text;
    this.price = +price;
    this.picture = picture;
    this.alt = alt;
    this.clases = clases.join(' ');

    this.transfer = 27;
  }
  changetoUAH() {
    return (this.price = this.price * this.transfer);
  }
  insert(elem) {
    this.html = `<div class="${this.clases || 'menu__item'}">
      <img src=${this.picture} alt=${this.alt} />
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">
        Меню ${this.title} - ${this.text}.
      </div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total">
          <span>${this.changetoUAH() || 0}</span> грн/день
        </div>
      </div>
    </div>`;
    elem.insertAdjacentHTML('beforeend', this.html);
  }
}

module.exports = MenuCard;


/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((module) => {

"use strict";


function modal() {
  const modal = document.querySelector('.modal');
  const openModalBtns = document.querySelectorAll('[data-modalOpen]');
  const openModalTimerId = setTimeout(openModal, 20000);

  openModalBtns.forEach(trigger =>
    trigger.addEventListener('click', openModal)
  );

  function openModal() {
    modal.focus();
    modal.classList.add('show');
    modal.classList.remove('hide');
    modal.addEventListener('click', backdropCloseModal, { once: true });
    window.addEventListener('keydown', keyboardCloseModal, { once: true });
    document.body.style.overflow = 'hidden';
    clearInterval(openModalTimerId);
  }

  function backdropCloseModal(e) {
    if (
      e.target === e.currentTarget ||
      e.target.getAttribute('data-modalClose') === ''
    ) {
      closeModal();
    }
  }
  function keyboardCloseModal(e) {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  }

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = 'unset';
  }

  window.addEventListener('scroll', onEndOfPage);

  function onEndOfPage() {
    const leave = window.scrollY;
    const pageSize = document.documentElement.scrollHeight;
    const screenSize = document.documentElement.clientHeight;
    const isEndOfPage = leave + screenSize >= pageSize;

    if (isEndOfPage) {
      openModal();
      window.removeEventListener('scroll', onEndOfPage);
    }
  }
}
module.exports = modal;


/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((module) => {

"use strict";


function tabs() {
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  tabsParent.addEventListener('click', event => {
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((tab, i) => {
        if (target === tab) {
          hideTabs();
          showTab(i);
          changeTabs(i);
        }
      });
    }
  });

  hideTabs();
  showTab();

  function hideTabs() {
    tabsContent.forEach(tab => {
      tab.classList.add('hide');
      tab.classList.remove('show', 'fade');
    });
  }
  function showTab(i = 0) {
    tabsContent[i].classList.add('fade', 'show');
    tabsContent[i].classList.remove('hide');
  }
  function changeTabs(i) {
    tabs.forEach((tab, count) => {
      tab.classList.remove('tabheader__item_active');
      if (count === i) {
        tab.classList.add('tabheader__item_active');
      }
    });
  }
}

module.exports = tabs;


/***/ }),

/***/ "./src/js/modules/thanksModal.js":
/*!***************************************!*\
  !*** ./src/js/modules/thanksModal.js ***!
  \***************************************/
/***/ ((module) => {

function showThankDialog(message) {
  const prevModalDialog = document.querySelector('.modal__dialog');
  const modal = document.querySelector('.modal');

  prevModalDialog.classList.add('hide');
  // openModal();

  const thankMessage = document.createElement('div');
  thankMessage.classList.add('modal__dialog');
  thankMessage.innerHTML = `<div class="modal__content">
        <div data-modalClose class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
    </div>`;
  modal.append(thankMessage);

  setTimeout(() => {
    thankMessage.remove();

    prevModalDialog.classList.add('show');
    prevModalDialog.classList.remove('hide');

    // closeModal();
  }, 4000);
}

module.exports = showThankDialog;


/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((module) => {

'use-strict';

function timer() {
  const deadline = '2023-5-20';

  const getTimeRemaining = endtime => {
    const normalizeDeadline = Date.parse(endtime) - new Date();
    let days, hours, minutes, seconds;

    if (normalizeDeadline <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(normalizeDeadline / (1000 * 60 * 60 * 24));
      hours = Math.floor((normalizeDeadline / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((normalizeDeadline / 1000 / 60) % 60);
      seconds = Math.floor((normalizeDeadline / 1000) % 60);
    }

    return { total: normalizeDeadline, days, hours, minutes, seconds };
  };

  const timer = (selector, endTime) => {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds');

    const updateClock = () => {
      const deadline = getTimeRemaining(endTime);
      days.textContent = `${deadline.days}`.padStart(2, 0);
      hours.textContent = `${deadline.hours}`.padStart(2, 0);
      minutes.textContent = `${deadline.minutes}`.padStart(2, 0);
      seconds.textContent = `${deadline.seconds}`.padStart(2, 0);
      if (deadline.total <= 10) {
        clearInterval(clockInterval);
      }
    };

    updateClock();
    const clockInterval = setInterval(updateClock, 1000);
  };

  timer('.promotion__timer', deadline);
}

module.exports = timer;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
const {
  calculator,
  cards,
  carousel,
  cookie,
  forms,
  menuCard,
  modal,
  tabs,
  thanksModal,
  timer,
} = __webpack_require__(/*! ./modules */ "./src/js/modules/index.js");

window.addEventListener('DOMContentLoaded', () => {
  calculator();
  cards();
  carousel();
  cookie();
  forms();
  timer();
  tabs();
  modal();
  thanksModal();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map