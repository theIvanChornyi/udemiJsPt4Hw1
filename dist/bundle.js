(()=>{var t={378:t=>{t.exports={postData:async function(t,e){const s=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:e});if(!s.ok)throw new Error(`Could not fetch ${t}, status:${s.status}`);return s.json()},getData:async function(t){const e=await fetch(t);if(!e.ok)throw new Error(`Could not fetch ${t}, status:${e.status}`);return e.json()}}},682:t=>{t.exports=function(){const t=document.querySelector(".calculating__result span"),e=JSON.parse(localStorage.getItem("userData"))||{sex:"female",height:null,weight:null,age:null,activityRatio:1.375};function s(t,s){if(2===arguments.length&&document.querySelectorAll(`${t} div`).forEach((t=>{t.dataset.gender===e.sex||+t.dataset.activity===e.activityRatio?t.classList.add(s):t.classList.remove(s)})),1===arguments.length){const{height:t,weight:s,age:o}=e;document.querySelectorAll(".calculating__choose_medium input").forEach((e=>{t&&"height"===e.id&&(e.value=t),s&&"weight"===e.id&&(e.value=s),o&&"age"===e.id&&(e.value=o)}))}}function o(){const{sex:s,height:o,weight:n,age:a,activityRatio:i}=e;if(!(s&&o&&n&&a&&i))return t.textContent="?";"female"===s&&(t.textContent=Math.round((447.6+9.2*n+3.1*o-4.3*a)*i)),"male"===s&&(t.textContent=Math.round((88.36+13.4*n+4.8*o-5.7*a)*i))}function n(t,s){const o=document.querySelector(`${t}`);o.addEventListener("click",(t=>{t.target.dataset.gender&&(e.sex=t.target.dataset.gender,a(o,t,s)),t.target.dataset.activity&&(e.activityRatio=+t.target.dataset.activity,a(o,t,s)),localStorage.setItem("userData",JSON.stringify(e))}))}function a(t,e,s){t.querySelectorAll("div").forEach((t=>t.classList.remove(s))),e.target.classList.add(s),o()}s("#gender","calculating__choose-item_active"),s(".calculating__choose_big","calculating__choose-item_active"),s(".calculating__choose_medium"),o(),n("#gender","calculating__choose-item_active"),n(".calculating__choose_big","calculating__choose-item_active"),document.querySelector(".calculating__choose_medium").addEventListener("input",(({target:t})=>{const s=t.value;if(s.match(/\D/g))t.style.border="1px solid red";else{switch(t.style.border="",t.id){case"height":e.height=+s.trim();break;case"weight":e.weight=+s.trim();break;case"age":e.age=+s.trim()}localStorage.setItem("userData",JSON.stringify(e))}o()}))}},996:(t,e,s)=>{const{getData:o}=s(378),n=s(48);t.exports=function(){o("http://localhost:3000/menu").then((function(e){e.forEach((({title:e,descr:s,price:o,img:a,altimg:i})=>new n(e,s,o,a,i).insert(t)))}));const t=document.querySelector(".menu .container")}},35:t=>{t.exports=function(){const t=document.querySelector(".offer__slider"),e=t.querySelector(".offer__slider-wrapper"),s=e.querySelector(".offer_slider-inner"),o=s.querySelectorAll(".offer__slide"),n=t.querySelector(".offer__slider-counter"),a=n.querySelector("#current"),i=n.querySelector("#total");let c=1,r=0;const l=[],d=window.getComputedStyle(e).width,u=parseInt(d,10),m=o.length,h=document.createElement("ol");function p(t){return`${t}`.padStart(2,0)}function f(){s.style.transform=`translateX(-${r}px)`,a.textContent=p(c),l.forEach(((t,e)=>{t.classList.remove("dot--active"),e+1===c&&t.classList.add("dot--active")}))}h.classList.add("carousel-indicators"),t.append(h),t.style.position="relative",s.style.display="flex",s.style.width=100*m+"%",s.style.transition="transform 250ms linear",e.style.overflow="hidden",o.forEach(((t,e)=>{t.style.width=d;const s=document.createElement("li");s.classList.add("dot"),s.setAttribute("data-slide-to",e),h.append(s),e+1===c&&s.classList.add("dot--active"),l.push(s)})),i.textContent=p(m),a.textContent=p(c),n.addEventListener("click",(function(t){const{action:e}=t.target.closest("div").dataset;"prev"===e&&(r<=0?(r=u*(m-1),c=m):(r-=u,c-=1),f()),"next"===e&&(r>=u*(m-1)?(r=0,c=1):(c+=1,r+=u),f())})),h.addEventListener("click",(function(t){const{slideTo:e}=t.target.dataset;if(e){const t=+e;r=u*t,c=t+1,f()}}))}},575:t=>{t.exports=function(){function t(){console.log("Loading...")}new class{constructor({popup:t,btnConfirm:e,btnCancel:s,activeClass:o=""}={}){this.popup=document.querySelector(t),this.btnConfirm=document.querySelector(e),this.btnCancel=document.querySelector(s),this.activeClass=o,this.consentPropertyType="site_consent"}getItem(t){const e=document.cookie.split(";").map((t=>t.split("="))).reduce(((t,[e,s])=>({...t,[e.trim()]:s})),{});return e[t]}setItem(t,e){const s=new Date,o=new Date(s.setHours(s.getHours()+1));document.cookie=`${t}=${e};expires=${o}`}hasConsented(){return"true"===this.getItem(this.consentPropertyType)}changeStatus(e){this.setItem(this.consentPropertyType,e),this.hasConsented()&&t()}bindTriggers(){this.popup.addEventListener("click",(t=>{t.target.dataset.cookie&&(this.changeStatus(t.target.dataset.cookie),this.popup.classList.remove(this.activeClass))}))}init(){try{this.hasConsented()?t():this.popup.classList.add(this.activeClass),this.bindTriggers()}catch(t){console.error("Переданы не все данные")}}}({activeClass:"popup_active",popup:".popup",btnConfirm:"[data-confirm]",btnCancel:"[data-cancel]"}).init()}},824:(t,e,s)=>{"use strict";const o=s(854),{postData:n}=s(378);t.exports=function(){const t=document.querySelectorAll("form");t.forEach((t=>function(t){t.addEventListener("submit",(e=>{e.preventDefault();const s=function(t){const e=document.createElement("img");return e.src="src/img/form/spinner.svg",e.style.cssText="\n    display: block;\n    margin: 0 auto;\n    ",t.insertAdjacentElement("afterend",e),e}(t),a=new FormData(t),i=JSON.stringify(Object.fromEntries(a.entries()));n("http://localhost:3000/requests",i).then((t=>{o("Спасибо, в ближайшем времени мы с вами свяжемся."),console.log(t)})).catch((()=>{o("Ой, что-то пошло не так!")})).finally((()=>{s.remove(),t.reset()}))}))}(t)))}},236:(t,e,s)=>{const o=s(682),n=s(996),a=s(35),i=s(575),c=s(824),r=s(221),l=s(523),d=s(854),u=s(945);t.exports={calculator:o,cards:n,carousel:a,cookie:i,forms:c,modal:r,tabs:l,thanksModal:d,timer:u}},221:t=>{"use strict";t.exports=function(){const t=document.querySelector(".modal"),e=document.querySelectorAll("[data-modalOpen]"),s=setTimeout(o,2e4);function o(){t.focus(),t.classList.add("show"),t.classList.remove("hide"),t.addEventListener("click",n,{once:!0}),window.addEventListener("keydown",a,{once:!0}),document.body.style.overflow="hidden",clearInterval(s)}function n(t){t.target!==t.currentTarget&&""!==t.target.getAttribute("data-modalClose")||i()}function a(e){"Escape"===e.code&&t.classList.contains("show")&&i()}function i(){t.classList.add("hide"),t.classList.remove("show"),document.body.style.overflow="unset"}e.forEach((t=>t.addEventListener("click",o))),window.addEventListener("scroll",(function t(){const e=window.scrollY,s=document.documentElement.scrollHeight;e+document.documentElement.clientHeight>=s&&(o(),window.removeEventListener("scroll",t))}))}},523:t=>{"use strict";t.exports=function(){const t=document.querySelectorAll(".tabheader__item"),e=document.querySelectorAll(".tabcontent");function s(){e.forEach((t=>{t.classList.add("hide"),t.classList.remove("show","fade")}))}function o(t=0){e[t].classList.add("fade","show"),e[t].classList.remove("hide")}document.querySelector(".tabheader__items").addEventListener("click",(e=>{const n=e.target;n&&n.classList.contains("tabheader__item")&&t.forEach(((e,a)=>{n===e&&(s(),o(a),function(e){t.forEach(((t,s)=>{t.classList.remove("tabheader__item_active"),s===e&&t.classList.add("tabheader__item_active")}))}(a))}))})),s(),o()}},854:t=>{t.exports=function(t){const e=document.querySelector(".modal__dialog"),s=document.querySelector(".modal");e.classList.add("hide");const o=document.createElement("div");o.classList.add("modal__dialog"),o.innerHTML=`<div class="modal__content">\n        <div data-modalClose class="modal__close">&times;</div>\n        <div class="modal__title">${t}</div>\n    </div>`,s.append(o),setTimeout((()=>{o.remove(),e.classList.add("show"),e.classList.remove("hide")}),4e3)}},945:t=>{t.exports=function(){((t,e)=>{const s=document.querySelector(".promotion__timer"),o=s.querySelector("#days"),n=s.querySelector("#hours"),a=s.querySelector("#minutes"),i=s.querySelector("#seconds"),c=()=>{const t=(t=>{const e=Date.parse(t)-new Date;let s,o,n,a;return e<=0?(s=0,o=0,n=0,a=0):(s=Math.floor(e/864e5),o=Math.floor(e/36e5%24),n=Math.floor(e/1e3/60%60),a=Math.floor(e/1e3%60)),{total:e,days:s,hours:o,minutes:n,seconds:a}})("2023-5-20");o.textContent=`${t.days}`.padStart(2,0),n.textContent=`${t.hours}`.padStart(2,0),a.textContent=`${t.minutes}`.padStart(2,0),i.textContent=`${t.seconds}`.padStart(2,0),t.total<=10&&clearInterval(r)};c();const r=setInterval(c,1e3)})()}},48:t=>{t.exports=class{constructor(t,e,s,o,n,...a){this.title=t,this.text=e,this.price=+s,this.picture=o,this.alt=n,this.clases=a.join(" "),this.transfer=27}changetoUAH(){return this.price=this.price*this.transfer}insert(t){this.html=`<div class="${this.clases||"menu__item"}">\n      <img src=${this.picture} alt=${this.alt} />\n      <h3 class="menu__item-subtitle">${this.title}</h3>\n      <div class="menu__item-descr">\n        Меню ${this.title} - ${this.text}.\n      </div>\n      <div class="menu__item-divider"></div>\n      <div class="menu__item-price">\n        <div class="menu__item-cost">Цена:</div>\n        <div class="menu__item-total">\n          <span>${this.changetoUAH()||0}</span> грн/день\n        </div>\n      </div>\n    </div>`,t.insertAdjacentHTML("beforeend",this.html)}}}},e={};function s(o){var n=e[o];if(void 0!==n)return n.exports;var a=e[o]={exports:{}};return t[o](a,a.exports,s),a.exports}(()=>{const{calculator:t,cards:e,carousel:o,cookie:n,forms:a,modal:i,tabs:c,thanksModal:r,timer:l}=s(236);window.addEventListener("DOMContentLoaded",(()=>{t(),e(),o(),n(),a(),l(),c(),i(),r()}))})()})();
//# sourceMappingURL=bundle.js.map