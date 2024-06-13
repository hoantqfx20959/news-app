'use strict';

/////////////////////////////////////////////////////////
///////////////////
// hàm cập nhật localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// hàm lấy dữ liêu localStorage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// lấy dữ liệu user
const users = getFromStorage('userArr')
  ? getFromStorage('userArr')
  : [];

// chuyển đổi về dạng class instance
const userArr = users.map(user => parseUser(user));

// lấy dữ liệu current user
let currentUser = getFromStorage('currentUser')
  ? getFromStorage('currentUser')
  : null;

// lấy dữ liệu todo
const todos = getFromStorage('todoArr')
  ? getFromStorage('todoArr')
  : [];

// chuyển đổi về dạng class instance
const todoArr = todos.map(todo => parseTask(todo));

///////////////////
// hàm chuyển từ json về dạng class instance
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.password,

    userData.pageSize,
    userData.category
  );

  return user;
}

///////////////////
// hàm chuyển từ json về dạng class instance
function parseTask(taskData) {
  const task = new Task(
    taskData.task,
    taskData.owner,
    taskData.isDone
  );
  return task;
}

///////////////////
// hàm báo lỗi
const newsContainer = document.getElementById(
  'news-container'
);

const renderError = function (msg) {
  newsContainer.insertAdjacentText('beforeend', msg);
};
