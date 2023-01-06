const {
  calculator,
  cards,
  carousel,
  cookie,
  forms,
  modal,
  tabs,
  thanksModal,
  timer,
} = require('./modules');

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
