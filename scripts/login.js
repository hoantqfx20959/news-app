'use strict';

const inputUserName = document.getElementById('input-username');
const inputPassword = document.getElementById('input-password');
const btnSubmit = document.getElementById('btn-submit');

/////////////////////////////////////////////////////////
///////////////////
// thêm sự kiện vào nút login
btnSubmit.addEventListener('click', function () {
  // check validate
  const checkValidate = validate();
  if (checkValidate) {
    // kiểm tra thông tin đăng nhập
    const user = userArr.find(
      item => item.userName === inputUserName.value && item.password === inputPassword.value
    );

    // TH thông tin đăng nhập chính xác
    if (user) {
      // cập nhật mảng mới là lưu trữ user đang đăng nhập
      saveToStorage('currentUser', user);
      // điều hướng sang trang index
      window.location.href = '../index.html';
    }
    // TH thông tin đăng nhập không chính xác
    else {
      alert('Thông tin đăng nhập không chính xác!');
    }
  }
});

///////////////////
// hàm kiểm tra dữ liệu đầu vào
function validate() {
  let check = true;
  if (inputUserName.value === '' || inputPassword.value === '') {
    alert('Vui lòng không để trống!');
    check = false;
  }

  return check;
}
