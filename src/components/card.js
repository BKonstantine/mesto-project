import { cardTemplate } from "./variables.js";

import { togglePopupImage } from "../index.js";

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

/* функция удаления карточки */
function deleteItem(item) {
  item.remove();
}

export { createCard, deleteItem };
