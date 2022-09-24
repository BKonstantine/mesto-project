import { openPopup, closePopup } from "./utils.js";
import { photoGrid, createCard } from "./card.js";

import { validationResetSetting, resetValid } from "./validate.js";

/* получаем доступ к DOM элементам profile и popup */
const profile = document.querySelector(".profile");
const popupBio = document.querySelector("#popup-bio");
const popupPlace = document.querySelector("#popup-place");
const popupImage = document.querySelector("#popup-image");
const popups = document.querySelectorAll(".popup");

/* получаем доступ к кнопкам edit, close , add*/
const buttonEdit = profile.querySelector(".profile__edit-button");
const buttonAdd = profile.querySelector(".profile__add-button");

/* получаем доступ к name и bio пользователя */
const profileName = profile.querySelector(".profile__name");
const profileBio = profile.querySelector(".profile__bio");

/* получаем доступ к карточке и ее названию в попапе*/
const popupImagePlace = popupImage.querySelector(".popup__image-place");
const popupImageTitle = popupImage.querySelector(".popup__image-title");

/* получаем доступ к полям ввода */
const popupFormBio = popupBio.querySelector(".popup__form-bio");
const formItemName = popupBio.querySelector(".popup__input_value_name");
const formItemBio = popupBio.querySelector(".popup__input_value_bio");
const popupFormPlace = popupPlace.querySelector(".popup__form-place");
const formItemPlace = popupPlace.querySelector(".popup__input_value_place");
const formItemLink = popupPlace.querySelector(".popup__input_value_link");

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
  profileName.textContent = formItemName.value;
  profileBio.textContent = formItemBio.value;

  closePopup(popupBio);
}

/* функция отправки формы карточки */
function handleImageFormSubmit(evt) {
  evt.preventDefault();
  const place = createCard({
    name: formItemPlace.value,
    link: formItemLink.value,
  });
  photoGrid.prepend(place);
  closePopup(popupPlace);
  popupFormPlace.reset();
}

export {
  profile,
  popupBio,
  popupPlace,
  popupImage,
  popups,
  buttonEdit,
  buttonAdd,
  profileName,
  profileBio,
  popupImagePlace,
  popupImageTitle,
  popupFormBio,
  formItemName,
  formItemBio,
  popupFormPlace,
  formItemPlace,
  formItemLink,
  openProfileEdit,
  openAddCard,
  togglePopupImage,
  handleProfileFormSubmit,
  handleImageFormSubmit,
};
