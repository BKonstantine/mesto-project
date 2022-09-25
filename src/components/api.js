const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "4e230485-f983-40b1-9766-124232c72697",
    "Content-Type": "application/json",
  },
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const getProfileContent = () => {
  return fetch(`${config.baseUrl}/users/me `, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
export { getInitialCards, getProfileContent }