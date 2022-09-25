fetch("https://nomoreparties.co/v1/plus-cohort-15/cards", {
  headers: {
    authorization: "4e230485-f983-40b1-9766-124232c72697",
  },
})
  .then((res) => res.json())
  .then((result) => {
    /* renderCard(result); */
    console.log(result);
  });