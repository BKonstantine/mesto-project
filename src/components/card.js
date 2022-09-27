import { cardTemplate } from "./variables.js";

import { getProfileContent, deleteCard } from "./api.js";

import { togglePopupImage } from "../index.js";

/* функция создания карточки */
function createCard(item) {
  /* клонируем содержимое шаблона */
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardItemTitle = cardItem.querySelector(".card__title");
  const cardItemImage = cardItem.querySelector(".card__image");
  const cardItemTrash = cardItem.querySelector(".card__trash");
  const cardItemLike = cardItem.querySelector(".card__like");
  const cardItemLikeCounter = cardItem.querySelector(".card__like-counter");

  /* наполняем содержимым */
  cardItemTitle.textContent = item.name;
  cardItemLikeCounter.textContent = item.likes.length;
  cardItemImage.src = item.link;
  cardItemImage.alt = item.name;

  getProfileContent()
    .then((result) => {
      if (result._id !== item.owner._id) {
        cardItemTrash.classList.add("card__trash_hidden");
      }
    })
    .catch((err) => {
      console.log(err);
    });

  /* добавляем обработчики событий */
  cardItemTrash.addEventListener("click", () => deleteItem(cardItem, item._id));
  cardItemLike.addEventListener("click", (e) =>
    e.target.classList.toggle("card__like_active")
  );
  cardItemImage.addEventListener("click", () =>
    togglePopupImage(item.link, item.name)
  );

  return cardItem;
}

/* функция удаления карточки */
function deleteItem(item, id) {
  deleteCard(id)
    .then(() => {
      item.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

export { createCard, deleteItem };
