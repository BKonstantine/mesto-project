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

/* получаем доступ к секции photo-grid */
const photoGrid = document.querySelector(".photo-grid");

/* получаем доступ к шаблону карточек */
const cardTemplate = document.querySelector(".card-template").content;

/* функция открытия попапа (универсальная)*/
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupOnEsc);
}

/* функция закрытия попапа (универсальная)*/
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupOnEsc);
}

function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

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

/* функция создания карточки */
function createCard(item) {
  /* клонируем содержимое шаблона */
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardItemTitle = cardItem.querySelector(".card__title");
  const cardItemImage = cardItem.querySelector(".card__image");
  const cardItemTrash = cardItem.querySelector(".card__trash");
  const cardItemLike = cardItem.querySelector(".card__like");

  /* наполняем содержимым */
  cardItemTitle.textContent = item.name;
  cardItemImage.src = item.link;
  cardItemImage.alt = item.name;

  /* добавляем обработчики событий */
  cardItemTrash.addEventListener("click", () => deleteItem(cardItem));
  cardItemLike.addEventListener("click", (e) =>
    e.target.classList.toggle("card__like_active")
  );
  cardItemImage.addEventListener("click", () =>
    togglePopupImage(item.link, item.name)
  );

  return cardItem;
}

/* функция отрисовки карточки */
function renderCard() {
  const cardList = initialCards.map((item) => {
    return createCard(item);
  });
  photoGrid.append(...cardList);
}

/* функция удаления карточки */
function deleteItem(item) {
  item.remove();
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

/* вставить стартовый нобор карточек */
renderCard();

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
