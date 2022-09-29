import "./index.css";

import {
  validationResetSetting,
  photoGrid,
  popupBio,
  popupPlace,
  popupImage,
  popupAvatar,
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
  popupFormAvatar,
  formItemLinkAvatar,
} from "./components/variables.js";

import { createCard } from "./components/card.js";

import { resetValid, enableValidation } from "./components/validate.js";

import { openPopup, closePopup } from "./components/modal.js";

import {
  getInitialCards,
  getProfileContent,
  updateProfileContent,
  postNewCard,
  patchNewAvatar,
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

function openAvatarEdit() {
  openPopup(popupAvatar);
  popupFormAvatar.reset();
  resetValid(validationResetSetting, popupAvatar);
}

/* функция добавления и закрытия попапа для изображений */
function togglePopupImage(link, title) {
  popupImagePlace.src = link;
  popupImageTitle.textContent = title;
  popupImagePlace.alt = title;

  openPopup(popupImage);
}

function renderLoading(isLoading, form) {
  const button = form.querySelector(".popup__button-dot");
  if (isLoading) {
    button.classList.remove("popup__button-dot_loading");
  } else {
    button.classList.add("popup__button-dot_loading");
  }
}

/* функция отправки формы профиля */
function handleProfileFormSubmit(evt) {  
  evt.preventDefault();
  renderLoading(true, popupFormBio);
  updateProfileContent(formItemName.value, formItemBio.value)
    .then((result) => {
      profileName.textContent = result.name;
      profileBio.textContent = result.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupFormBio);
    });
  closePopup(popupBio);
}

/* функция отправки формы карточки */
function handleImageFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupFormPlace);
  postNewCard(formItemPlace.value, formItemLink.value)
    .then((result) => {
      const place = createCard({
        name: result.name,
        link: result.link,
        likes: result.likes,
        owner: result.owner,
        _id: result._id,
      });
      photoGrid.prepend(place);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupFormPlace);
    });
  closePopup(popupPlace);
  popupFormPlace.reset();
}

/* функция отправки формы аватара */
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupFormAvatar);
  patchNewAvatar(formItemLinkAvatar.value)
    .then((result) => {
      profileAvatar.src = result.avatar;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupFormAvatar);
    });
  closePopup(popupAvatar);
  popupFormAvatar.reset();
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
profileAvatar.addEventListener("click", openAvatarEdit);
popupFormBio.addEventListener("submit", handleProfileFormSubmit);
popupFormPlace.addEventListener("submit", handleImageFormSubmit);
popupFormAvatar.addEventListener("submit", handleAvatarFormSubmit);

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
