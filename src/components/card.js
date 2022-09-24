import { togglePopupImage } from "./modal.js";

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

export {
  initialCards,
  photoGrid,
  cardTemplate,
  createCard,
  renderCard,
  deleteItem,
};
