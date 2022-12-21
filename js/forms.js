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
    const statusMessage = showSpinner(form);

    const formData = new FormData(form);
    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });

    fetch('server.php', {
      method: 'POST',
      headers: {
        'Content-type': 'aplication/json',
      },
      body: JSON.stringify(object),
    })
      .then(data => {
        showThankDialog(message.sucess);
        console.log(data.body);
      })
      .catch(() => {
        showThankDialog(message.reject);
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
