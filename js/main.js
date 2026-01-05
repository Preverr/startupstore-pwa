const container = document.getElementById("featuredProducts");

fetch("https://dummyjson.com/products?limit=4")
  .then(res => res.json())
  .then(data => {
    data.products.forEach(product => {
      container.innerHTML += `
        <div class="col-md-3">
          <div class="card h-100">
            <img src="${product.thumbnail}" class="card-img-top">
            <div class="card-body">
              <h6>${product.title}</h6>
              <p>$${product.price}</p>
              <a href="detail.html?id=${product.id}" class="btn btn-sm btn-primary">Detay</a>
            </div>
          </div>
        </div>
      `;
    });
  })
  .catch(() => {
    container.innerHTML = "<p>Veri yüklenemedi.</p>";
  });

// Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
