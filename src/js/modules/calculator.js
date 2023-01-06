function calculator() {
  const resultRef = document.querySelector('.calculating__result span');

  const initObj = {
    sex: 'female',
    height: null,
    weight: null,
    age: null,
    activityRatio: 1.375,
  };

  const userData = JSON.parse(localStorage.getItem('userData')) || initObj;

  function init(selector, active) {
    if (arguments.length === 2) {
      document.querySelectorAll(`${selector} div`).forEach(ref => {
        if (ref.dataset.gender === userData.sex) {
          ref.classList.add(active);
        } else if (+ref.dataset.activity === userData.activityRatio) {
          ref.classList.add(active);
        } else {
          ref.classList.remove(active);
        }
      });
    }
    if (arguments.length === 1) {
      const { height, weight, age } = userData;
      document
        .querySelectorAll('.calculating__choose_medium input')
        .forEach(ref => {
          if (height && ref.id === 'height') {
            ref.value = height;
          }
          if (weight && ref.id === 'weight') {
            ref.value = weight;
          }
          if (age && ref.id === 'age') {
            ref.value = age;
          }
        });
    }
  }

  function calcDayRatio() {
    const { sex, height, weight, age, activityRatio } = userData;
    if (!sex || !height || !weight || !age || !activityRatio) {
      return (resultRef.textContent = '?');
    }
    if (sex === 'female') {
      resultRef.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * activityRatio
      );
    }
    if (sex === 'male') {
      resultRef.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * activityRatio
      );
    }
  }

  function getSwitcherData(selector, activeClass) {
    const ref = document.querySelector(`${selector}`);

    ref.addEventListener('click', e => {
      if (e.target.dataset.gender) {
        userData.sex = e.target.dataset.gender;
        togleActiveClass(ref, e, activeClass);
      }
      if (e.target.dataset.activity) {
        userData.activityRatio = +e.target.dataset.activity;
        togleActiveClass(ref, e, activeClass);
      }
      localStorage.setItem('userData', JSON.stringify(userData));
    });
  }

  function togleActiveClass(elements, event, className) {
    elements
      .querySelectorAll('div')
      .forEach(item => item.classList.remove(className));
    event.target.classList.add(className);
    calcDayRatio();
  }

  function getInputsData(selector) {
    const ref = document.querySelector(selector);
    ref.addEventListener('input', ({ target }) => {
      const fieldValues = target.value;

      if (fieldValues.match(/\D/g)) {
        target.style.border = '1px solid red';
      } else {
        target.style.border = '';

        switch (target.id) {
          case 'height':
            userData.height = +fieldValues.trim();
            break;
          case 'weight':
            userData.weight = +fieldValues.trim();
            break;
          case 'age':
            userData.age = +fieldValues.trim();
            break;

          default:
            break;
        }
        localStorage.setItem('userData', JSON.stringify(userData));
      }

      calcDayRatio();
    });
  }

  init('#gender', 'calculating__choose-item_active');
  init('.calculating__choose_big', 'calculating__choose-item_active');
  init('.calculating__choose_medium');
  calcDayRatio();
  getSwitcherData('#gender', 'calculating__choose-item_active');
  getSwitcherData(
    '.calculating__choose_big',
    'calculating__choose-item_active'
  );
  getInputsData('.calculating__choose_medium');
}
module.exports = calculator;
