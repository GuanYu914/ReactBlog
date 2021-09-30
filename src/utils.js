const TOKEN_NAME = "token";

export const setAuthToken = function (token) {
  window.localStorage.setItem(TOKEN_NAME, token);
};

export const getAuthToken = function () {
  return window.localStorage.getItem(TOKEN_NAME);
};
