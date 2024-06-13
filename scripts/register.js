'use strict';

const inputFirstName = document.getElementById('input-firstname');
const inputLastName = document.getElementById('input-lastname');
const inputUserName = document.getElementById('input-username');
const inputPassword = document.getElementById('input-password');
const inputPasswordConfirm = document.getElementById('input-password-confirm');
const btnSubmit = document.getElementById('btn-submit');

/////////////////////////////////////////////////////////
///////////////////
// thêm sự kiện vào nút register
btnSubmit.addEventListener('click', function () {
  // lấy dữ liệu
  const user = new User(
    inputFirstName.value,
    inputLastName.value,
    inputUserName.value,
    inputPassword.value
  );

  // check validate
  const checkValidate = validate(user);
  if (checkValidate) {
    // thêm dữ liệu vào mảng
    userArr.push(user);
    // lưu dữ liệu vào localStorage
    saveToStorage('userArr', userArr);

    alert('Đã đăng ký thành công!');
    // điều hướng sang trang login
    window.location.href = '../pages/login.html'; // window.location.assign('../pages/login.html');
  }
});

///////////////////
// hàm kiểm tra dữ liệu đầu vào
function validate(user) {
  let check = true;

  // kiểm tra dữ liệu đầu vào
  if (
    user.firstName.trim() === '' ||
    user.lastName.trim() === '' ||
    user.userName.trim() === '' ||
    user.password === '' ||
    inputPasswordConfirm.value === ''
  ) {
    alert('Đã xảy ra lỗi khi nhập dữ liệu');
    check = false;
  }

  // kiểm tra trùng userName
  if (!userArr.every(item => (item.userName !== user.userName ? true : false))) {
    alert('Username đã tồn tại!');
    check = false;
  }

  // kiểm tra password
  if (user.password !== inputPasswordConfirm.value) {
    alert('Password và Confirm Password phải giống nhau!');
    check = false;
  }
  if (user.password.length < 8) {
    alert('Password phải có nhiều hơn 8 ký tự!');
    check = false;
  }

  return check;
}
