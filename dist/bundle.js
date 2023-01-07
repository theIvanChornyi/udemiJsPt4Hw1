/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/helpers/requests.js":
/*!************************************!*\
  !*** ./src/js/helpers/requests.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
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


/***/ }),

/***/ "./src/js/modules/calculator.js":
/*!**************************************!*\
  !*** ./src/js/modules/calculator.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calculator": () => (/* binding */ calculator)
/* harmony export */ });
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


/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cards": () => (/* binding */ cards)
/* harmony export */ });
/* harmony import */ var _helpers_requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/requests */ "./src/js/helpers/requests.js");
/* harmony import */ var _template_menuCard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../template/menuCard.js */ "./src/js/template/menuCard.js");



function cards() {
  (0,_helpers_requests__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/menu').then(createCard);

  const menu = document.querySelector('.menu .container');
  function createCard(arr) {
    arr.forEach(({ title, descr, price, img, altimg }) =>
      new _template_menuCard_js__WEBPACK_IMPORTED_MODULE_1__.MenuCard(title, descr, price, img, altimg).insert(menu)
    );
  }
}


/***/ }),

/***/ "./src/js/modules/carousel.js":
/*!************************************!*\
  !*** ./src/js/modules/carousel.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "carousel": () => (/* binding */ carousel)
/* harmony export */ });
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


/***/ }),

/***/ "./src/js/modules/cookie.js":
/*!**********************************!*\
  !*** ./src/js/modules/cookie.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cookie": () => (/* binding */ cookie)
/* harmony export */ });
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


/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "forms": () => (/* binding */ forms)
/* harmony export */ });
/* harmony import */ var _thanksModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./thanksModal */ "./src/js/modules/thanksModal.js");
/* harmony import */ var _helpers_requests__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/requests */ "./src/js/helpers/requests.js");



function forms(openModalTimerId) {
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
      (0,_helpers_requests__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
        .then(data => {
          (0,_thanksModal__WEBPACK_IMPORTED_MODULE_0__.showThankDialog)(message.sucess, openModalTimerId);
          console.log(data);
        })
        .catch(() => {
          (0,_thanksModal__WEBPACK_IMPORTED_MODULE_0__.showThankDialog)(message.reject, openModalTimerId);
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


/***/ }),

/***/ "./src/js/modules/index.js":
/*!*********************************!*\
  !*** ./src/js/modules/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calculator": () => (/* reexport safe */ _calculator__WEBPACK_IMPORTED_MODULE_0__.calculator),
/* harmony export */   "cards": () => (/* reexport safe */ _cards__WEBPACK_IMPORTED_MODULE_1__.cards),
/* harmony export */   "carousel": () => (/* reexport safe */ _carousel__WEBPACK_IMPORTED_MODULE_2__.carousel),
/* harmony export */   "closeModal": () => (/* reexport safe */ _modal__WEBPACK_IMPORTED_MODULE_5__.closeModal),
/* harmony export */   "cookie": () => (/* reexport safe */ _cookie__WEBPACK_IMPORTED_MODULE_3__.cookie),
/* harmony export */   "forms": () => (/* reexport safe */ _forms__WEBPACK_IMPORTED_MODULE_4__.forms),
/* harmony export */   "modal": () => (/* reexport safe */ _modal__WEBPACK_IMPORTED_MODULE_5__.modal),
/* harmony export */   "openModal": () => (/* reexport safe */ _modal__WEBPACK_IMPORTED_MODULE_5__.openModal),
/* harmony export */   "showThankDialog": () => (/* reexport safe */ _thanksModal__WEBPACK_IMPORTED_MODULE_7__.showThankDialog),
/* harmony export */   "tabs": () => (/* reexport safe */ _tabs__WEBPACK_IMPORTED_MODULE_6__.tabs),
/* harmony export */   "timer": () => (/* reexport safe */ _timer__WEBPACK_IMPORTED_MODULE_8__.timer)
/* harmony export */ });
/* harmony import */ var _calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculator */ "./src/js/modules/calculator.js");
/* harmony import */ var _cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cards */ "./src/js/modules/cards.js");
/* harmony import */ var _carousel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./carousel */ "./src/js/modules/carousel.js");
/* harmony import */ var _cookie__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cookie */ "./src/js/modules/cookie.js");
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _thanksModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./thanksModal */ "./src/js/modules/thanksModal.js");
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./timer */ "./src/js/modules/timer.js");











/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "modal": () => (/* binding */ modal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function modal(openModalTimerId) {
  const openModalBtns = document.querySelectorAll('[data-modalOpen]');

  openModalBtns.forEach(trigger =>
    trigger.addEventListener('click', openModal)
  );

  window.addEventListener('scroll', onEndOfPage);

  function onEndOfPage() {
    const leave = window.scrollY;
    const pageSize = document.documentElement.scrollHeight;
    const screenSize = document.documentElement.clientHeight;
    const isEndOfPage = leave + screenSize >= pageSize;

    if (isEndOfPage) {
      openModal(openModalTimerId);
      window.removeEventListener('scroll', onEndOfPage);
    }
  }
}

const modalRef = document.querySelector('.modal');

function openModal(openModalTimerId) {
  modalRef.focus();
  modalRef.classList.add('show');
  modalRef.classList.remove('hide');
  modalRef.addEventListener('click', backdropCloseModal, { once: true });
  window.addEventListener('keydown', keyboardCloseModal, { once: true });
  document.body.style.overflow = 'hidden';
  clearInterval(openModalTimerId);
}

function closeModal() {
  modalRef.classList.add('hide');
  modalRef.classList.remove('show');
  document.body.style.overflow = 'unset';
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
  if (e.code === 'Escape' && modalRef.classList.contains('show')) {
    closeModal();
  }
}


/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tabs": () => (/* binding */ tabs)
/* harmony export */ });
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


/***/ }),

/***/ "./src/js/modules/thanksModal.js":
/*!***************************************!*\
  !*** ./src/js/modules/thanksModal.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showThankDialog": () => (/* binding */ showThankDialog)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");


function showThankDialog(message, openModalTimerId) {
  const prevModalDialog = document.querySelector('.modal__dialog');
  const modal = document.querySelector('.modal');

  prevModalDialog.classList.add('hide');
  (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(openModalTimerId);

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

    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)();
  }, 4000);
}


/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timer": () => (/* binding */ timer)
/* harmony export */ });
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


/***/ }),

/***/ "./src/js/template/menuCard.js":
/*!*************************************!*\
  !*** ./src/js/template/menuCard.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MenuCard": () => (/* binding */ MenuCard)
/* harmony export */ });
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules */ "./src/js/modules/index.js");


window.addEventListener('DOMContentLoaded', () => {
  const openModalTimerId = setTimeout(_modules__WEBPACK_IMPORTED_MODULE_0__.openModal, 20000);

  (0,_modules__WEBPACK_IMPORTED_MODULE_0__.calculator)();
  (0,_modules__WEBPACK_IMPORTED_MODULE_0__.cards)();
  (0,_modules__WEBPACK_IMPORTED_MODULE_0__.carousel)();
  (0,_modules__WEBPACK_IMPORTED_MODULE_0__.cookie)();
  (0,_modules__WEBPACK_IMPORTED_MODULE_0__.forms)(openModalTimerId);
  (0,_modules__WEBPACK_IMPORTED_MODULE_0__.timer)();
  (0,_modules__WEBPACK_IMPORTED_MODULE_0__.tabs)();
  (0,_modules__WEBPACK_IMPORTED_MODULE_0__.modal)(openModalTimerId);
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map