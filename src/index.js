import { closePopup } from "./components/utils.js";

import { renderCard } from "./components/card.js";

import {
  popups,
  buttonEdit,
  buttonAdd,
  popupFormBio,
  popupFormPlace,
  openProfileEdit,
  openAddCard,
  handleProfileFormSubmit,
  handleImageFormSubmit,
} from "./components/modal.js";

import { enableValidation } from "./components/validate.js";

/* вставить стартовый нобор карточек */
renderCard();

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
});

/* добавляем обработчики событий */
buttonEdit.addEventListener("click", openProfileEdit);
buttonAdd.addEventListener("click", openAddCard);
popupFormBio.addEventListener("submit", handleProfileFormSubmit);
popupFormPlace.addEventListener("submit", handleImageFormSubmit);

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
});
