(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{d:()=>N,x:()=>I});var t={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},n=document.querySelector(".photo-grid"),r=document.querySelector(".card-template").content,o=document.querySelector(".profile"),a=document.querySelector("#popup-bio"),c=document.querySelector("#popup-place"),i=document.querySelector("#popup-image"),u=document.querySelector("#popup-avatar"),l=document.querySelectorAll(".popup"),s=o.querySelector(".profile__edit-button"),p=o.querySelector(".profile__add-button"),d=o.querySelector(".profile__name"),f=o.querySelector(".profile__bio"),_=o.querySelector(".profile__avatar"),m=i.querySelector(".popup__image-place"),y=i.querySelector(".popup__image-title"),v=a.querySelector(".popup__form-bio"),h=a.querySelector(".popup__input_value_name"),S=a.querySelector(".popup__input_value_bio"),b=c.querySelector(".popup__form-place"),q=c.querySelector(".popup__input_value_place"),k=c.querySelector(".popup__input_value_link"),C=u.querySelector(".popup__form-avatar"),g=C.querySelector(".popup__input_value_link-avatar"),L={baseUrl:"https://nomoreparties.co/v1/plus-cohort-15",headers:{authorization:"4e230485-f983-40b1-9766-124232c72697","Content-Type":"application/json"}};function E(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function A(e){var t,n=r.querySelector(".card").cloneNode(!0),o=n.querySelector(".card__title"),a=n.querySelector(".card__image"),c=n.querySelector(".card__trash"),i=n.querySelector(".card__like"),u=n.querySelector(".card__like-counter");return o.textContent=e.name,u.textContent=e.likes.length,a.src=e.link,a.alt=e.name,I!==e.owner._id&&c.classList.add("card__trash_hidden"),t=i,e.likes.some((function(e){return e.name===d.textContent}))&&t.classList.add("card__like_active"),c.addEventListener("click",(function(){return function(e,t){(function(e){return fetch("".concat(L.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:L.headers}).then(E)})(t).then((function(){e.remove()})).catch((function(e){console.log(e)}))}(n,e._id)})),i.addEventListener("click",(function(t){return n=t,r=e._id,o=u,void(n.target.classList.contains("card__like_active")?function(e){return fetch("".concat(L.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:L.headers}).then(E)}(r).then((function(e){e.likes.some((function(e){return e.name===d.textContent}))||(n.target.classList.remove("card__like_active"),o.textContent=e.likes.length)})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(L.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:L.headers}).then(E)}(r).then((function(e){e.likes.some((function(e){return e.name===d.textContent}))&&(n.target.classList.add("card__like_active"),o.textContent=e.likes.length)})).catch((function(e){console.log(e)})));var n,r,o})),a.addEventListener("click",(function(){return N(e.link,e.name)})),n}var x=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},w=function(e,t){var n=t.querySelector(e.formSelector),r=Array.from(n.querySelectorAll(e.inputSelector)),o=n.querySelector(e.submitButtonSelector);r.forEach((function(t){return x(n,t,e)})),U(r,o,e)},U=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.removeAttribute("disabled")):(t.classList.add(n.inactiveButtonClass),t.setAttribute("disabled",!0))};function j(e){e.classList.add("popup_opened"),document.addEventListener("keydown",T)}function O(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",T)}function T(e){"Escape"===e.key&&O(document.querySelector(".popup_opened"))}function B(e,t){if(e){if("string"==typeof e)return P(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?P(e,t):void 0}}function P(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var D,I=null;function N(e,t){m.src=e,y.textContent=t,m.alt=t,j(i)}function J(e,t){var n=t.querySelector(".popup__button-dot");e?n.classList.remove("popup__button-dot_loading"):n.classList.add("popup__button-dot_loading")}Promise.all([fetch("".concat(L.baseUrl,"/users/me "),{headers:L.headers}).then(E),fetch("".concat(L.baseUrl,"/cards"),{headers:L.headers}).then(E)]).then((function(e){var t,r,o,a=(o=2,function(e){if(Array.isArray(e))return e}(r=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a=[],c=!0,i=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);c=!0);}catch(e){i=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(i)throw o}}return a}}(r,o)||B(r,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=a[0],i=a[1];I=c._id,d.textContent=c.name,f.textContent=c.about,_.src=c.avatar,t=i.map((function(e){return A(e)})),n.append.apply(n,function(e){return function(e){if(Array.isArray(e))return P(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||B(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(t))})).catch((function(e){console.log(e)})),D={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},Array.from(document.querySelectorAll(D.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);U(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"):t.setCustomValidity(""),t.validity.valid?x(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),U(n,r,t)}))}))}(e,D)})),s.addEventListener("click",(function(){j(a),h.value=d.textContent,S.value=f.textContent,w(t,a)})),p.addEventListener("click",(function(){j(c),b.reset(),w(t,c)})),_.addEventListener("click",(function(){j(u),C.reset(),w(t,u)})),v.addEventListener("submit",(function(e){var t,n;e.preventDefault(),J(!0,v),(t=h.value,n=S.value,fetch("".concat(L.baseUrl,"/users/me"),{method:"PATCH",headers:L.headers,body:JSON.stringify({name:t,about:n})}).then(E)).then((function(e){d.textContent=e.name,f.textContent=e.about,O(a)})).catch((function(e){console.log(e)})).finally((function(){J(!1,v)}))})),b.addEventListener("submit",(function(e){var t,r;e.preventDefault(),J(!0,b),(t=q.value,r=k.value,fetch("".concat(L.baseUrl,"/cards"),{method:"POST",headers:L.headers,body:JSON.stringify({name:t,link:r})}).then(E)).then((function(e){var t=A({name:e.name,link:e.link,likes:e.likes,owner:e.owner,_id:e._id});n.prepend(t),O(c)})).catch((function(e){console.log(e)})).finally((function(){J(!1,b)}))})),C.addEventListener("submit",(function(e){var t;e.preventDefault(),J(!0,C),(t=g.value,fetch("".concat(L.baseUrl,"/users/me/avatar "),{method:"PATCH",headers:L.headers,body:JSON.stringify({avatar:t})}).then(E)).then((function(e){_.src=e.avatar,O(u)})).catch((function(e){console.log(e)})).finally((function(){J(!1,C)}))})),l.forEach((function(e){e.addEventListener("click",(function(t){t.target.classList.contains("popup__close-button")&&O(e),t.target.classList.contains("popup_opened")&&O(e)}))}))})();