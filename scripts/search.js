'use strict';

const navPageNum = document.getElementById('nav-page-num');
const inputQuery = document.getElementById('input-query');
const btnSubmit = document.getElementById('btn-submit');

const pageNum = document.getElementById('page-num');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');

let totalResults = 0;
let keywords = '';

/////////////////////////////////////////////////////////
///////////////////
// ẩn nút điều hướng
navPageNum.style.display = 'none';

///////////////////
// TH đã đăng nhập tài khoản
if (currentUser) {
  // thêm lệnh vào nút 'seach'
  btnSubmit.addEventListener('click', function () {
    pageNum.textContent = '1';
    newsContainer.innerHTML = '';
    // kiểm tra từ khóa
    if (inputQuery.value.trim() === '') {
      // báo lỗi nếu chưa có từ khóa
      navPageNum.style.display = 'none';
      renderError('Nhập từ khóa để tìm kiếm!');
    } else {
      keywords = inputQuery.value;
      // gọi hàm hiện thị nội dung đã tìm kiếm được
      getData(keywords, 1);
    }
  });

  ///////////////////
  // hàm bất đồng bộ lấy dữ liệu theo từ khóa
  async function getData(keywords, page) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${keywords}&sortBy=popularity&pageSize=${currentUser.pageSize}&page=${page}&apiKey=a9b3104c5838405e8e45cc23c2cdcdac`
      );
      const data = await res.json();

      // kiểm tra lỗi liên quan đến server
      if (
        (data.status === 'error' && data.code === 'rateLimited') ||
        (data.status === 'error' && data.code === 'corsNotAllowed')
      ) {
        navPageNum.style.display = 'none';
        throw new Error(data.message);
      }

      // kiểm tra lỗi khi không tìm được nội dung nào theo từ khóa
      if (data.totalResults == 0) {
        // ẩn nút chuyển trang
        navPageNum.style.display = 'none';
        throw new Error('Không có bài viết nào phù hợp với từ khóa. Vui lòng thử lại!');
      }

      // hiện nút điều hướng
      navPageNum.style.display = 'block';

      // hiện thị nội dung
      displayNewList(data);
    } catch (err) {
      renderError(`${err.message}`);
      throw err;
    }
  }

  ///////////////////
  // hàm hiện thị nội dung
  function displayNewList(data) {
    // láy giá trị cho biến totalResults
    totalResults = data.totalResults;
    // lệnh điều hướng
    getBtnNext();
    getBtnPrev();

    let html = '';

    // code HTML hiện thị nội dung
    data.articles.forEach(article => {
      html += `
      <div class="new-article">
        <div class="article-img">
          <img style="width: 400px;" src=${
            article.urlToImage ? article.urlToImage : 'no_image_available.jpg'
          } alt="${article.publishedAt}"/>
        </div>
        <div class="article-content">
          <h4>${article.title ? article.title : ''}</h4>
          <p>${article.description ? article.description : ''}</p>
          <button><a href=${article.url} target="_blank">View</a></button>
        </div>
      </div>
      `;
    });

    newsContainer.innerHTML = html;
  }

  ///////////////////
  // hàm nút điều hướng
  function getBtnNext() {
    if (pageNum.textContent == Math.ceil(totalResults / currentUser.pageSize)) {
      btnNext.style.display = 'none';
    } else {
      btnNext.style.display = 'block';
    }
  }

  function getBtnPrev() {
    // ẩn nút Prev khi ở page 1
    if (pageNum.textContent == 1) {
      btnPrev.style.display = 'none';
    } else {
      btnPrev.style.display = 'block';
    }
  }

  ///////////////////
  // thêm lệnh vào nút điều hướng
  btnNext.addEventListener('click', function () {
    // hiển thị nội dung mới
    getData(keywords, ++pageNum.textContent);
  });

  btnPrev.addEventListener('click', function () {
    // hiển thị nội dung mới
    getData(keywords, --pageNum.textContent);
  });
}
// TH chưa đăng nhập tài khoản
else {
  alert('Vui lòng đăng nhập để thực hiện các thao tác!');
  window.location.href = '../index.html';
}
