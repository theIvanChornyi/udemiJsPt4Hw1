'use-strict';
window.addEventListener('DOMContentLoaded', () => {
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
});
