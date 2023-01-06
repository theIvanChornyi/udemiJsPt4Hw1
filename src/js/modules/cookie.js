function cookie() {
  class CookieConsent {
    constructor({ popup, btnConfirm, btnCancel, activeClass = '' } = {}) {
      this.popup = document.querySelector(popup);
      this.btnConfirm = document.querySelector(btnConfirm);
      this.btnCancel = document.querySelector(btnCancel);
      this.activeClass = activeClass;
      this.consentPropertyType = 'site_consent';
    }

    getItem(key) {
      const cookies = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});

      return cookies[key];
    }

    setItem(key, value) {
      const date = new Date();
      const expiresTime = new Date(date.setHours(date.getHours() + 1));
      document.cookie = `${key}=${value};expires=${expiresTime}`;
    }

    hasConsented() {
      if (this.getItem(this.consentPropertyType) === 'true') {
        return true;
      } else {
        return false;
      }
    }

    changeStatus(prop) {
      this.setItem(this.consentPropertyType, prop);
      if (this.hasConsented()) {
        myScripts();
      }
    }

    bindTriggers() {
      this.popup.addEventListener('click', e => {
        if (e.target.dataset.cookie) {
          this.changeStatus(e.target.dataset.cookie);
          this.popup.classList.remove(this.activeClass);
        }
      });
    }

    init() {
      try {
        if (this.hasConsented()) {
          myScripts();
        } else {
          this.popup.classList.add(this.activeClass);
        }

        this.bindTriggers();
      } catch (e) {
        console.error('Переданы не все данные');
      }
    }
  }
  new CookieConsent({
    activeClass: 'popup_active',
    popup: '.popup',
    btnConfirm: '[data-confirm]',
    btnCancel: '[data-cancel]',
  }).init();

  function myScripts() {
    console.log('Loading...');
  }
}

module.exports = cookie;
