import { getAuthToken } from "./utils";
const BaseURL = "https://student-json-api.lidemy.me";

export const getPosts = function () {
  return fetch(`${BaseURL}/posts?_sort=createdAt&_order=desc`).then((res) =>
    res.json()
  );
};

export const getPostByID = function (id) {
  return fetch(`${BaseURL}/posts?id=${id}`).then((res) => res.json());
};

export const login = function (username, password) {
  return fetch(`${BaseURL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then((res) => res.json());
};

export const getMe = function () {
  const token = getAuthToken();

  return fetch(`${BaseURL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const postNewArticle = function (postTitle, postBody) {
  const token = getAuthToken();

  return fetch(`${BaseURL}/posts`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: postTitle,
      body: postBody,
    }),
  }).then((res) => res.json());
};
