const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const container = document.getElementById("detail");

fetch(`https://dummyjson.com/products/${id}`)
  .then(res => res.json())
  .then(p => {
    container.innerHTML = `
      <div class="col-md-6">
        <img src="${p.thumbnail}" class="img-fluid">
      </div>
      <div class="col-md-6">
        <h2>${p.title}</h2>
        <p class="text-muted">${p.category}</p>
        <p>${p.description}</p>
        <h4>$${p.price}</h4>
      </div>
    `;
  })
  .catch(() => {
    container.innerHTML = `
      <div class="alert alert-danger">
        Ürün detayları yüklenemedi.
      </div>
    `;
  });
