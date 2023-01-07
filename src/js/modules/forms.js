import { showThankDialog } from './thanksModal';
import { postData } from '../helpers/requests';

export function forms(openModalTimerId) {
  const forms = document.querySelectorAll('form');
  const message = {
    pending: 'src/img/form/spinner.svg',
    sucess: 'Спасибо, в ближайшем времени мы с вами свяжемся.',
    reject: 'Ой, что-то пошло не так!',
  };

  forms.forEach(form => postFormData(form));

  function postFormData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const statusMessage = showSpinner(form);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      postData('http://localhost:3000/requests', json)
        .then(data => {
          showThankDialog(message.sucess, openModalTimerId);
          console.log(data);
        })
        .catch(() => {
          showThankDialog(message.reject, openModalTimerId);
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
}
