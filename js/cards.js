class MenuCard {
  constructor(title, text, price, picture, alt, ...clases) {
    this.title = title;
    this.text = text;
    this.price = +price;
    this.picture = picture;
    this.alt = alt;
    this.clases = clases.join(' ');

    this.transfer = 27;
  }

  insert(elem) {
    this.html = `<div class="${this.clases || 'menu__item'}">
      <img src=${this.picture} alt=${this.alt} />
      <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
      <div class="menu__item-descr">
        Меню ${this.title} - ${this.text}.
      </div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total">
          <span>${this.price || 0}</span> грн/день
        </div>
      </div>
    </div>`;
    elem.insertAdjacentHTML('beforeend', this.html);
  }

  changetoUAH() {
    this.price = this.price * this.transfer;
  }
}

const fitness = new MenuCard(
  '"Фитнес"',
  'это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  229,
  'img/tabs/vegy.jpg',
  'vegy'
);

const premium = new MenuCard(
  '“Премиум”',
  'мы используем не только красивый дизайн упаковки,но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  550,
  'img/tabs/elite.jpg',
  'elite'
);

const simple = new MenuCard(
  '"Постное"',
  'это тщательный подбор ингредиентов: полноеотсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков',
  430,
  'img/tabs/post.jpg',
  'post'
);

const menu = document.querySelector('.menu .container');
const menuItems = [fitness, premium, simple];
menuItems.forEach(item => item.insert(menu));
