'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal');
  const openModalBtns = document.querySelectorAll('[data-modalOpen]');
  const openModalTimerId = setTimeout(openModal, 20000);

  openModalBtns.forEach(trigger =>
    trigger.addEventListener('click', openModal)
  );

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    const closeModalBtn = modal.querySelector('[data-modalClose]');
    closeModalBtn.addEventListener('click', closeModal, { once: true });
    modal.addEventListener('click', backdropCloseModal, { once: true });
    window.addEventListener('keydown', keyboardCloseModal, { once: true });
    document.body.style.overflow = 'hidden';
    clearInterval(openModalTimerId);
  }

  function backdropCloseModal(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }
  function keyboardCloseModal(e) {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  }

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = 'unset';
    modal.removeEventListener('click', backdropCloseModal, { once: true });
    window.removeEventListener('keydown', keyboardCloseModal, { once: true });
  }

  window.addEventListener('scroll', onEndOfPage);

  function onEndOfPage() {
    const leave = window.scrollY;
    const pageSize = document.documentElement.scrollHeight;
    const screenSize = document.documentElement.clientHeight;
    const isEndOfPage = leave + screenSize >= pageSize;

    if (isEndOfPage) {
      openModal();
      window.removeEventListener('scroll', onEndOfPage);
    }
  }
});
