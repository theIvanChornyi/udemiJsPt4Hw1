'use strict';
window.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  tabsParent.addEventListener('click', event => {
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((tab, i) => {
        if (target === tab) {
          hideTabs();
          showTab(i);
          changeTabs(i);
        }
      });
    }
  });

  hideTabs();
  showTab();

  function hideTabs() {
    tabsContent.forEach(tab => {
      tab.classList.add('hide');
      tab.classList.remove('show', 'fade');
    });
  }
  function showTab(i = 0) {
    tabsContent[i].classList.add('fade', 'show');
    tabsContent[i].classList.remove('hide');
  }
  function changeTabs(i) {
    tabs.forEach((tab, count) => {
      tab.classList.remove('tabheader__item_active');
      if (count === i) {
        tab.classList.add('tabheader__item_active');
      }
    });
  }
});
