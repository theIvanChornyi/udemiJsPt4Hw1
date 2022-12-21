'use strict';
import { showThankDialog } from './thanksModal.js';

const forms = document.querySelectorAll('form');
const message = {
  pending: 'img/form/spinner.svg',
  sucess: 'Спасибо, в ближайшем времени мы с вами свяжемся.',
  reject: 'Ой, что-то пошло не так!',
};

forms.forEach(form => postFormData(form));

function postFormData(form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const statusMessage = document.createElement('img');
    statusMessage.src = message.pending;
    statusMessage.style.cssText = `
    display: block;
    margin: 0 auto;
    `;
    form.insertAdjacentElement('afterend', statusMessage);

    const request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    request.setRequestHeader('Content-type', 'aplication/json');
    const formData = new FormData(form);

    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    const json = JSON.stringify(object);
    request.send(json);
    request.addEventListener('load', () => {
      if (request.status === 200) {
        showThankDialog(message.sucess);
        console.dir(request.response);
      } else {
        showThankDialog(message.reject);
      }
      statusMessage.remove();
    });

    form.reset();
  });
}
