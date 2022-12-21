const slidesArr = document.querySelectorAll('.offer__slide');
const sliderControls = document.querySelector('.offer__slider-counter');
const currentSlideNumber = sliderControls.querySelector('#current');
const slideAmountNumber = sliderControls.querySelector('#total');

let currentSlide = 1;
const slidesAmount = slidesArr.length;

slideAmountNumber.textContent = padNum(slidesAmount);
showSlides();
sliderControls.addEventListener('click', changeSlide);

function changeSlide(e) {
  const { action } = e.target.closest('div').dataset;
  if (action === 'prev') prevSlide();
  if (action === 'next') nextSlide();

  showSlides();
  currentSlideNumber.textContent = padNum(currentSlide);
}

function showSlides() {
  slidesArr.forEach((slide, index) => {
    if (currentSlide - 1 !== index) {
      slide.classList.add('hide');
      slide.classList.remove('show');
    } else {
      slide.classList.remove('hide');
      slide.classList.add('show');
    }
  });
}

function prevSlide() {
  if (currentSlide <= 1) return (currentSlide = slidesAmount);
  currentSlide -= 1;
}

function nextSlide() {
  if (currentSlide === slidesAmount) return (currentSlide = 1);
  currentSlide += 1;
}

function padNum(num) {
  return `${num}`.padStart(2, 0);
}
