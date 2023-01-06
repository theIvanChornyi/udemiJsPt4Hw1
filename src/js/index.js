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
