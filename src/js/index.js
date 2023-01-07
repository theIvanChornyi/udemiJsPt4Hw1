import {
  calculator,
  cards,
  carousel,
  cookie,
  forms,
  modal,
  openModal,
  tabs,
  timer,
} from './modules';

window.addEventListener('DOMContentLoaded', () => {
  const openModalTimerId = setTimeout(openModal, 20000);

  calculator();
  cards();
  carousel();
  cookie();
  forms(openModalTimerId);
  timer();
  tabs();
  modal(openModalTimerId);
});
