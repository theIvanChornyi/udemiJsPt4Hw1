export function carousel() {
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
