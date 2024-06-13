'use strict';

// Class User để đại diện cho thông tin của người dùng
class User {
  constructor(
    firstName,
    lastName,
    userName,
    password,

    // thiết lập mặc dịnh một số tham số cho bảng tin
    pageSize = 10,
    category = 'general'
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;

    // người dùng cài đặt một số tham số cho bảng tin
    this.pageSize = pageSize;
    this.category = category;
  }
}

// Class Task để chứa các thông tin về Task trong Todo List
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
