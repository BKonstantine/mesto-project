/* объект для сброса настроек валидации */
const validationResetSetting = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

/* стартовый набор для блока card */
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

/* получаем доступ к секции photo-grid */
const photoGrid = document.querySelector(".photo-grid");

/* получаем доступ к шаблону карточек */
const cardTemplate = document.querySelector(".card-template").content;

/* получаем доступ к DOM элементам profile и popup */
const profile = document.querySelector(".profile");
const popupBio = document.querySelector("#popup-bio");
const popupPlace = document.querySelector("#popup-place");
const popupImage = document.querySelector("#popup-image");
const popups = document.querySelectorAll(".popup");

/* получаем доступ к кнопкам edit, close , add*/
const buttonEdit = profile.querySelector(".profile__edit-button");
const buttonAdd = profile.querySelector(".profile__add-button");

/* получаем доступ к name, bio и avatar пользователя */
const profileName = profile.querySelector(".profile__name");
const profileBio = profile.querySelector(".profile__bio");
const profileAvatar = profile.querySelector(".profile__avatar");

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

export {
  validationResetSetting,
  initialCards,
  photoGrid,
  cardTemplate,
  profile,
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
};
