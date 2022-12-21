import { getData } from './requests.js';
import { MenuCard } from './menuCard.js';

getData('http://localhost:3000/menu').then(createCard);

const menu = document.querySelector('.menu .container');
function createCard(arr) {
  arr.forEach(({ title, descr, price, img, altimg }) =>
    new MenuCard(title, descr, price, img, altimg).insert(menu)
  );
}
