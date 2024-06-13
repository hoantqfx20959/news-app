'use strict';

const loginModal = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');

const welcomeMessage = document.getElementById('welcome-message');
const btnLogout = document.getElementById('btn-logout');

displayHome();

/////////////////////////////////////////////////////////
///////////////////
// hàm hiện thị nội dung
function displayHome() {
  // TH đã có người đăng nhập
  if (currentUser) {
    loginModal.style.display = 'none';
    mainContent.style.display = 'block';
    // hiển thị thông điệp chào mừng
    welcomeMessage.textContent = `Welcome ${currentUser.firstName}`;
  } // TH chưa có người đăng nhập
  else {
    loginModal.style.display = 'block';
    mainContent.style.display = 'none';
  }
}

///////////////////
// thêm sự kiện vào nút logout
btnLogout.addEventListener('click', function () {
  const checkLogout = confirm('Bạn muốn thoát?');
  if (checkLogout) {
    // gắn giá trị currentUser thành null biểu thị chưa có người đăng nhập
    currentUser = null;
    // cập nhật lại dữ liệu localStorage
    saveToStorage('currentUser', currentUser);
    // cập nhật lại màn hình hiện thị
    displayHome();
  }
});
