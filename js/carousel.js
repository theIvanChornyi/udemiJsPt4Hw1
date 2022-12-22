const slider = document.querySelector('offer__slider-wrapper');
const sliderWindow = document.querySelector('offer_slider-inner');
const sliderControls = document.querySelector('.offer__slider-counter');

const currentSlideNumber = sliderControls.querySelector('#current');
const slideAmountNumber = sliderControls.querySelector('#total');

let currentSlide = 1;
let offset = 0;
const slidesAmount = slidesArr.length;
