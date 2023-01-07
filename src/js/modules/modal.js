export function modal(openModalTimerId) {
  const openModalBtns = document.querySelectorAll('[data-modalOpen]');

  openModalBtns.forEach(trigger =>
    trigger.addEventListener('click', openModal)
  );

  window.addEventListener('scroll', onEndOfPage);

  function onEndOfPage() {
    const leave = window.scrollY;
    const pageSize = document.documentElement.scrollHeight;
    const screenSize = document.documentElement.clientHeight;
    const isEndOfPage = leave + screenSize >= pageSize;

    if (isEndOfPage) {
      openModal(openModalTimerId);
      window.removeEventListener('scroll', onEndOfPage);
    }
  }
}

const modalRef = document.querySelector('.modal');

export function openModal(openModalTimerId) {
  modalRef.focus();
  modalRef.classList.add('show');
  modalRef.classList.remove('hide');
  modalRef.addEventListener('click', backdropCloseModal, { once: true });
  window.addEventListener('keydown', keyboardCloseModal, { once: true });
  document.body.style.overflow = 'hidden';
  clearInterval(openModalTimerId);
}

export function closeModal() {
  modalRef.classList.add('hide');
  modalRef.classList.remove('show');
  document.body.style.overflow = 'unset';
}

function backdropCloseModal(e) {
  if (
    e.target === e.currentTarget ||
    e.target.getAttribute('data-modalClose') === ''
  ) {
    closeModal();
  }
}
function keyboardCloseModal(e) {
  if (e.code === 'Escape' && modalRef.classList.contains('show')) {
    closeModal();
  }
}
