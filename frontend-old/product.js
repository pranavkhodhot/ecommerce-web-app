const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("product_id");

//Fetch product details via a product id
function fetchProductDetails(productId) {
  fetch(`http://localhost:3000/api/products/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      const productDetails = document.getElementById("product-details");
      productDetails.innerHTML = `
        <h2>${product.product_name}</h2>
        <img src="./assets/${
          product.product_image
        }.png" alt="idk" class="product-image"">
        <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        <p><strong>Description:</strong> ${
          product.description || "No description available"
        }</p>
        <p><strong>Stock:</strong> ${product.stock} units available</p>
      `;

      const addToCartButton = document.getElementById("add-to-cart");
      addToCartButton.addEventListener("click", () => addToCart(product));
    })
    .catch((err) => {
      console.error("Error fetching product details:", err);
      const productDetails = document.getElementById("product-details");
      productDetails.innerHTML = "<p>Error loading product details.</p>";
    });
}

//Add product to cart
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find(
    (item) => item.product_id === product.product_id
  );
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.product_name} has been added to the cart!`);
}

if (productId) {
  fetchProductDetails(productId);
} else {
  const productDetails = document.getElementById("product-details");
  productDetails.innerHTML = "<p>Invalid product ID.</p>";
}
