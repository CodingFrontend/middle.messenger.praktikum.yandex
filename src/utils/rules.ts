export const checkFirstAndLastNames = (str: string, fieldName: string) => {
  const rules =
    /(?!.*[0-9])(?=^[A-Z][a-z0-9_-]{0,19}|^[А-Я][а-я0-9_-]{0,19})(?=^\S)(?=[^!<>?=+@{}_$%])/;

  if (rules.test(str)) return '';
  return `${fieldName} должно содержать буквы латинского алфавита или кириллицы, начинаться с заглавной буквы, не допускаются пробелы, цифры и спецсимволы (кроме дефиса)`;
};

export const checkLogin = (str: string) => {
  const rules = /(?=^[a-zA-Z0-9_-]{3,20})(?=^\S)(?=[^!<>?=+@{}_$%]+$)/;

  if (rules.test(str)) return '';
  return `Логин должен содержать буквы латинского алфавита, от 3 до 20 символов, без пробелов и спецсимволов (кроме дефиса), допустимы цифры`;
};

export const checkEmail = (str: string) => {
  const rules = /(?=^[a-z]|[A-Z])(?=^\S+@\S+\.\S+$)(?=[^!<>?=+{}$%]+$)/;

  if (rules.test(str)) return '';
  return `Неверный формат email`;
};

export const checkPassword = (str: string) => {
  const rules = /(?=^[a-z0-9_-]{8,40})(?=.*\d)(?=.*[A-Z])/;

  if (rules.test(str)) return '';
  return `Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра`;
};

export const checkPhone = (str: string) => {
  const rules = /^(\+?[0-9]){10,15}$/;

  if (rules.test(str)) return '';
  return `Новерный формат номера`;
};

export const checkEmpty = (str: string) => {
  const rules = /^(?!\s*$).+$/;

  if (rules.test(str)) return '';
  return `Поле не может быть пустым`;
};
