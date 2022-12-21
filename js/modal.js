"use strict";

const modal = document.querySelector(".modal");
const openModalBtns = document.querySelectorAll("[data-modalOpen]");
const openModalTimerId = setTimeout(openModal, 20000);

openModalBtns.forEach((trigger) =>
  trigger.addEventListener("click", openModal)
);

export function openModal() {
  modal.focus();
  modal.classList.add("show");
  modal.classList.remove("hide");
  modal.addEventListener("click", backdropCloseModal, { once: true });
  window.addEventListener("keydown", keyboardCloseModal, { once: true });
  document.body.style.overflow = "hidden";
  clearInterval(openModalTimerId);
}

function backdropCloseModal(e) {
  if (
    e.target === e.currentTarget ||
    e.target.getAttribute("data-modalClose") === ""
  ) {
    closeModal();
  }
}
function keyboardCloseModal(e) {
  if (e.code === "Escape" && modal.classList.contains("show")) {
    closeModal();
  }
}

export function closeModal() {
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "unset";
}

window.addEventListener("scroll", onEndOfPage);

function onEndOfPage() {
  const leave = window.scrollY;
  const pageSize = document.documentElement.scrollHeight;
  const screenSize = document.documentElement.clientHeight;
  const isEndOfPage = leave + screenSize >= pageSize;

  if (isEndOfPage) {
    openModal();
    window.removeEventListener("scroll", onEndOfPage);
  }
}
