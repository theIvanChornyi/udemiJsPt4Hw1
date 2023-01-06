function showThankDialog(message) {
  const prevModalDialog = document.querySelector('.modal__dialog');
  const modal = document.querySelector('.modal');

  prevModalDialog.classList.add('hide');
  // openModal();

  const thankMessage = document.createElement('div');
  thankMessage.classList.add('modal__dialog');
  thankMessage.innerHTML = `<div class="modal__content">
        <div data-modalClose class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
    </div>`;
  modal.append(thankMessage);

  setTimeout(() => {
    thankMessage.remove();

    prevModalDialog.classList.add('show');
    prevModalDialog.classList.remove('hide');

    // closeModal();
  }, 4000);
}

module.exports = showThankDialog;
