const { getData } = require('../helpers/requests');
const MenuCard = require('../template/menuCard.js');

function cards() {
  getData('http://localhost:3000/menu').then(createCard);

  const menu = document.querySelector('.menu .container');
  function createCard(arr) {
    arr.forEach(({ title, descr, price, img, altimg }) =>
      new MenuCard(title, descr, price, img, altimg).insert(menu)
    );
  }
}

module.exports = cards;
