"use strict";
window.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");
  const message = {
    pending: "Идёт загрузка...",
    sucess: "Спасибо, в ближайшем времени мы с вами свяжемся.",
    reject: "Ой, что-то пошло не так!",
  };

  forms.forEach((form) => postFormData(form));

  function postFormData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      statusMessage.textContent = message.pending;
      form.append(statusMessage);

      const request = new XMLHttpRequest();
      request.open("POST", "server.php");
      request.setRequestHeader("Content-type", "aplication/json");
      const formData = new FormData(form);

      const object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      const json = JSON.stringify(object);
      request.send(json);
      request.addEventListener("load", () => {
        if (request.status === 200) {
          statusMessage.textContent = message.sucess;
          console.dir(request.response);
        } else {
          statusMessage.textContent = message.reject;
        }
      });
      setTimeout(() => {
        statusMessage.remove();
      }, 2000);
      form.reset();
    });
  }
});
