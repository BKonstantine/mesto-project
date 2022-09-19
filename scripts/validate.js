/* объект для сброса настроек валидации */
const validationResetSetting = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

/* функция отображения ошибки валидации */
const showInputError = (formElement, inputElement, errorMessage, setting) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(setting.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(setting.errorClass);
};

/* функция скрытия ошибки валидации */
const hideInputError = (formElement, inputElement, setting) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(setting.inputErrorClass);
  errorElement.classList.remove(setting.errorClass);
  errorElement.textContent = "";
};

/* функция проверки формы на валидность */
const isValid = (formElement, inputElement, setting) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, setting);
  } else {
    hideInputError(formElement, inputElement, setting);
  }
};

/* функция проверки нескольких форм на валидность  */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

/* сброс ошибок валидации */
const resetValid = (validationResetSetting, popup) => {
  const formElement = popup.querySelector(validationResetSetting.formSelector);
  const inputList = Array.from(
    formElement.querySelectorAll(validationResetSetting.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationResetSetting.submitButtonSelector
  );
  inputList.forEach((inputElement) =>
    hideInputError(formElement, inputElement, validationResetSetting)
  );
  toggleButtonState(inputList, buttonElement, validationResetSetting);
};

/* функция блокировки кнопок 'сохранить' и 'отправить' */
const toggleButtonState = (inputList, buttonElement, setting) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(setting.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(setting.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

/* функция установки слушателей на форму */
const setEventListeners = (formElement, setting) => {
  const inputList = Array.from(
    formElement.querySelectorAll(setting.inputSelector)
  );
  const buttonElement = formElement.querySelector(setting.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, setting);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, setting);
      toggleButtonState(inputList, buttonElement, setting);
    });
  });
};

/* функция установки слушателей события на все формы */
const enableValidation = (setting) => {
  const formList = Array.from(document.querySelectorAll(setting.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, setting);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
});
