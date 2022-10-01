import { cardTemplate } from "./variables.js";

import { profileName } from "./variables";

import { deleteCard, putLikeCard, deleteLikeCard } from "./api.js";

import { togglePopupImage, userId } from "../index.js";

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

  if (userId !== item.owner._id) {
    cardItemTrash.classList.add("card__trash_hidden");
  }

  checkLike(item, cardItemLike);

  /* добавляем обработчики событий */
  cardItemTrash.addEventListener("click", () => deleteItem(cardItem, item._id));
  cardItemLike.addEventListener("click", (e) =>
    setupLike(e, item._id, cardItemLikeCounter)
  );

  cardItemImage.addEventListener("click", () =>
    togglePopupImage(item.link, item.name)
  );

  return cardItem;
}

/* функция установки лайков */
function setupLike(evt, id, counter) {
  if (!evt.target.classList.contains("card__like_active")) {
    putLikeCard(id)
      .then((result) => {
        if (
          result.likes.some((item) => item.name === profileName.textContent)
        ) {
          evt.target.classList.add("card__like_active");
          counter.textContent = result.likes.length;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    deleteLikeCard(id)
      .then((result) => {
        if (
          !result.likes.some((item) => item.name === profileName.textContent)
        ) {
          evt.target.classList.remove("card__like_active");
          counter.textContent = result.likes.length;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

/* функция проверки наличия лайков пользователя */
function checkLike(res, like) {
  if (res.likes.some((item) => item.name === profileName.textContent)) {
    like.classList.add("card__like_active");
  }
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
