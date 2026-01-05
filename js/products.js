const list = document.getElementById("productList");
const statusDiv = document.getElementById("status");
const searchInput = document.getElementById("searchInput");

function showLoading() {
  statusDiv.innerHTML = `<div class="alert alert-info">Yükleniyor...</div>`;
}

function showError(msg) {
  statusDiv.innerHTML = `<div class="alert alert-danger">${msg}</div>`;
}

function showEmpty() {
  statusDiv.innerHTML = `<div class="alert alert-warning">Ürün bulunamadı.</div>`;
}

function loadProducts(url) {
  showLoading();
  list.innerHTML = "";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      statusDiv.innerHTML = "";

      if (!data.products || data.products.length === 0) {
        showEmpty();
        return;
      }

      data.products.forEach(p => {
        list.innerHTML += `
          <div class="col-md-3">
            <div class="card h-100">
              <img src="${p.thumbnail}" class="card-img-top">
              <div class="card-body">
                <h6>${p.title}</h6>
                <p>$${p.price}</p>
                <a href="detail.html?id=${p.id}" class="btn btn-sm btn-primary">Detay</a>
              </div>
            </div>
          </div>
        `;
      });
    })
    .catch(() => {
      showError("API erişilemiyor.");
    });
}

// İlk yükleme
loadProducts("https://dummyjson.com/products");

// Arama
searchInput.addEventListener("input", e => {
  const q = e.target.value.trim();
  if (q.length > 1) {
    loadProducts(`https://dummyjson.com/products/search?q=${q}`);
  } else {
    loadProducts("https://dummyjson.com/products");
  }
});
