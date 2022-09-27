import "./index.css";

import {
  validationResetSetting,
  photoGrid,
  popupBio,
  popupPlace,
  popupImage,
  popups,
  buttonEdit,
  buttonAdd,
  profileName,
  profileBio,
  profileAvatar,
  popupImagePlace,
  popupImageTitle,
  popupFormBio,
  formItemName,
  formItemBio,
  popupFormPlace,
  formItemPlace,
  formItemLink,
} from "./components/variables.js";

import { createCard } from "./components/card.js";

import { resetValid, enableValidation } from "./components/validate.js";

import { openPopup, closePopup } from "./components/modal.js";

import {
  getInitialCards,
  getProfileContent,
  updateProfileContent,
  postNewCard,
} from "./components/api.js";

/* функция открытия попапа профиля*/
function openProfileEdit() {
  openPopup(popupBio);
  formItemName.value = profileName.textContent;
  formItemBio.value = profileBio.textContent;
  resetValid(validationResetSetting, popupBio);
}

/* функция открытия попапа добавления карточки */
function openAddCard() {
  openPopup(popupPlace);
  popupFormPlace.reset();
  resetValid(validationResetSetting, popupPlace);
}

/* функция добавления и закрытия попапа для изображений */
function togglePopupImage(link, title) {
  popupImagePlace.src = link;
  popupImageTitle.textContent = title;
  popupImagePlace.alt = title;

  openPopup(popupImage);
}

/* функция отправки формы профиля */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  updateProfileContent(formItemName.value, formItemBio.value)
    .then((result) => {
      profileName.textContent = result.name;
      profileBio.textContent = result.about;
    })
    .catch((err) => {
      console.log(err);
    });
  closePopup(popupBio);
}

/* функция отправки формы карточки */
function handleImageFormSubmit(evt) {
  evt.preventDefault();
  postNewCard(formItemPlace.value, formItemLink.value)
    .then((result) => {
      const place = createCard({
        name: result.name,
        link: result.link,
        likes: result.likes,
        owner: result.owner,
      });
      photoGrid.prepend(place);
    })
    .catch((err) => {
      console.log(err);
    });
  closePopup(popupPlace);
  popupFormPlace.reset();
}
/* функция отрисовки карточки */
function renderCard(array) {
  const cardList = array.map((item) => {
    return createCard(item);
  });
  photoGrid.append(...cardList);
}

/* вставить стартовый нобор карточек */
getInitialCards()
  .then((result) => {
    renderCard(result);
  })
  .catch((err) => {
    console.log(err);
  });

/* Загружаем информацию о пользователе с сервера */
getProfileContent()
  .then((result) => {
    profileName.textContent = result.name;
    profileBio.textContent = result.about;
    profileAvatar.src = result.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

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

export { togglePopupImage };
