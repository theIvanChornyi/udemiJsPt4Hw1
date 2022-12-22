const sliderWindow = document.querySelector('.offer__slider-wrapper');
const slidesArr = document.querySelectorAll('.offer__slide');
const slider = document.querySelector('.offer_slider-inner');
const sliderControls = document.querySelector('.offer__slider-counter');

const currentSlideNumber = sliderControls.querySelector('#current');
const slideAmountNumber = sliderControls.querySelector('#total');

let currentSlide = 1;
let offset = 0;
const width = window.getComputedStyle(sliderWindow).width;
const normalizedWidth = parseInt(width, 10);
const slidesAmount = slidesArr.length;

slider.style.display = 'flex';
slider.style.width = slidesAmount * 100 + '%';
slider.style.transition = `transform 250ms linear`;
sliderWindow.style.overflow = 'hidden';
slidesArr.forEach(slide => (slide.style.width = width));

slideAmountNumber.textContent = padNum(slidesAmount);
currentSlideNumber.textContent = padNum(currentSlide);

sliderControls.addEventListener('click', onHandleClick);

function onHandleClick(e) {
  const { action } = e.target.closest('div').dataset;
  if (action === 'prev') prevSlide();
  if (action === 'next') nextSlide();
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
  slider.style.transform = `translateX(-${offset}px)`;
  currentSlideNumber.textContent = padNum(currentSlide);
}
