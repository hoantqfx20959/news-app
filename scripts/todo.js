'use strict';

const todoList = document.getElementById('todo-list');
const btnAdd = document.getElementById('btn-add');
const inputTank = document.getElementById('input-task');

/////////////////////////////////////////////////////////
// TH đã đăng nhập tài khoản
if (currentUser) {
  displayTodoList();

  ///////////////////
  // hàm hiển thị list todo
  function displayTodoList() {
    let html = '';

    // từ todoArr lọc task thuộc currentUser
    todoArr
      .filter(todo => todo.owner === currentUser.userName)
      .forEach(function (todo) {
        html += `
        <li class="${todo.isDone ? 'checked' : ''}">
          ${todo.task}<span class="close">x</span>
        </li>
        `;
      });

    todoList.innerHTML = html;

    // thêm sự kiện
    eventToggleTask();
    eventDeleteTask();
  }

  ///////////////////
  // thêm sự kiện vào nút add
  btnAdd.addEventListener('click', function () {
    const todo = new Task(inputTank.value, currentUser.userName, false);

    // kiểm tra đầu vào
    const checkValidate = validate(todo);

    if (checkValidate) {
      // thêm task mới vào todoArr
      todoArr.push(todo);
      // cập nhật lại todoArr
      saveToStorage('todoArr', todoArr);
      // hiển thị lại list todo
      displayTodoList();
      // xóa dư liệu form nhập
      inputTank.value = '';
    }
  });

  ///////////////////
  // hàm đánh dấu đã hoàn thành
  function eventToggleTask() {
    // lấy tất cả các phần tử li và thêm sự kiện vào
    document.querySelectorAll('#todo-list li').forEach(function (liEl) {
      liEl.addEventListener('click', function (e) {
        console.log(e);
        // tránh trùng sự kiện với delete
        if (e.target !== liEl.children[0]) {
          // chuyển đổi class checked
          liEl.classList.toggle('checked');

          // tìm task vừa kích vào
          const todo = todoArr.find(
            todoItem =>
              todoItem.owner === currentUser.userName &&
              todoItem.task === liEl.textContent.trim().slice(0, -1)
          );
          // console.log(liEl.textContent.trim().slice(0, -1));
          // console.log(todo);
          // thay đổi thuộc tính isDone
          todo.isDone = liEl.classList.contains('checked') ? true : false;

          // cập nhật lại todoArr
          saveToStorage('todoArr', todoArr);
        }
      });
    });
  }

  ///////////////////
  // hàm xóa task
  function eventDeleteTask() {
    // lấy tất cả các phần tử nút delete và thêm sự kiện vào
    document.querySelectorAll('#todo-list .close').forEach(function (closeEl) {
      closeEl.addEventListener('click', function () {
        // xác nhận xóa
        const checkDelete = confirm('Bạn chắc chắn muốn xóa?');

        if (checkDelete) {
          // xác định vị trí task được ấn xóa trong todoArr
          const index = todoArr.findIndex(
            item =>
              item.owner === currentUser.userName &&
              item.task === closeEl.parentElement.textContent.trim().slice(0, -1)
          );
          // xóa task ra khỏi todoArr
          todoArr.splice(index, 1);
          // cập nhật lại todoArr
          saveToStorage('todoArr', todoArr);
          // hiển thị lại list todo
          displayTodoList();
        }
      });
    });
  }

  function validate(todo) {
    let check = true;

    // kiểm tra dữ liệu đầu vào
    if (inputTank.value.trim() === '') {
      alert('Bạn chưa nhập ghi nhớ');
      check = false;
    }

    // // kiểm tra trùng todo
    // if (!todoArr.every(item => (item.task !== todo.task ? true : false))) {
    //   alert('Task đã tồn tại!');
    //   check = false;
    // }

    return check;
  }
}
// TH chưa đăng nhập tài khoản
else {
  alert('Vui lòng đăng nhập để thực hiện các thao tác!');
  window.location.href = '../index.html';
}
