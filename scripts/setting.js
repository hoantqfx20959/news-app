'use strict';

const inputPageSize = document.getElementById('input-page-size');
const inputCategory = document.getElementById('input-category');
const btnSubmit = document.getElementById('btn-submit');

/////////////////////////////////////////////////////////
///////////////////
// TH đã đăng nhập tài khoản
if (currentUser) {
  // thêm sự kiện vào nút save setting
  btnSubmit.addEventListener('click', function () {
    if (validate) {
      // cập nhật lại cài đặt
      currentUser.pageSize = Number.parseInt(inputPageSize.value);
      currentUser.category = inputCategory.value;
      // cập nhật lại currentUser
      saveToStorage('currentUser', currentUser);

      // cập nhật lại userArr
      const index = userArr.findIndex(userItem => userItem.userName === currentUser.userName);
      userArr[index] = currentUser;
      saveToStorage('userArr', userArr);

      // thông báo và xóa form nhập
      alert('Cài đặt thành công!');
      inputPageSize.value = '';
      inputCategory.value = 'General';
    }
  });

  ///////////////////
  // hàm kiểm tra dữ liệu người dùng
  function validate() {
    let check = true;

    // kiểm tra inputPageSize
    if (Number.isNaN(Number.parseInt(inputPageSize.value))) {
      alert('News per page không hợp lệ!');
      check = false;
    }

    return check;
  }
}
// TH chưa đăng nhập tài khoản
else {
  alert('Vui lòng đăng nhập để thực hiện các thao tác!');
  window.location.href = '../index.html';
}
