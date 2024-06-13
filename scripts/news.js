'use strict';

const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const pageNum = document.getElementById('page-num');

let totalResults = 0;

/////////////////////////////////////////////////////////
///////////////////
// TH đã đăng nhập tài khoản
if (currentUser) {
  countryNews('us');

  function countryNews(country) {
    // gọi hàm bất đồng bộ hiển thị nội dung
    dataNews(country, 1);

    // hàm bất đồng bộ lấy dữ liệu
    async function dataNews(country, page) {
      try {
        // kết nối với API
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=a9b3104c5838405e8e45cc23c2cdcdac`
        );
        // lấy dữ liệu
        const data = await res.json();
        console.log(data);
        // kiểm tra lỗi liên quan đến server
        if (
          (data.status === 'error' && data.code === 'rateLimited') ||
          (data.status === 'error' && data.code === 'corsNotAllowed')
        ) {
          throw new Error(data.message);
        }

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
      dataNews(country, ++pageNum.textContent);
    });

    btnPrev.addEventListener('click', function () {
      // hiển thị nội dung mới
      dataNews(country, --pageNum.textContent);
    });
  }
}
// TH chưa đăng nhập tài khoản
else {
  alert('Vui lòng đăng nhập để thực hiện các thao tác!');
  window.location.href = '../index.html';
}
