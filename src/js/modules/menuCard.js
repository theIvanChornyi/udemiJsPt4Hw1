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
  changetoUAH() {
    return (this.price = this.price * this.transfer);
  }
  insert(elem) {
    this.html = `<div class="${this.clases || 'menu__item'}">
      <img src=${this.picture} alt=${this.alt} />
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">
        Меню ${this.title} - ${this.text}.
      </div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total">
          <span>${this.changetoUAH() || 0}</span> грн/день
        </div>
      </div>
    </div>`;
    elem.insertAdjacentHTML('beforeend', this.html);
  }
}

module.exports = MenuCard;
