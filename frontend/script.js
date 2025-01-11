//Commonly used elements
const categoryDropdown = document.getElementById("category-dropdown");
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const checkoutBtn = document.getElementById("checkout-btn");
const checkoutFormContainer = document.getElementById(
  "checkout-form-container"
);
const cancelBtn = document.getElementById("cancel-btn");
const userInfoForm = document.getElementById("user-info-form");

//Fetch categories from backend and populate dropdown
fetch("http://localhost:3000/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    categories.forEach((category) => {
      var option = document.createElement("option");
      option.value = category.category_id;
      option.textContent = category.category_name;
      categoryDropdown.appendChild(option);
    });
  })
  .catch((err) => console.error("Error fetching categories:", err));

//add eventlistewner for when category is changed
categoryDropdown.addEventListener("change", (event) => {
  var selectedCategoryId = event.target.value;
  if (selectedCategoryId) {
    fetchProductsByCategory(selectedCategoryId);
  } else {
    fetchAllProducts();
  }
});

//Fetch all products
function fetchAllProducts() {
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((products) => {
      renderProducts(products);
    })
    .catch((err) => console.error("Error fetching products:", err));
}

//Fetch products depending on categoryId from backend and populate products list
function fetchProductsByCategory(categoryId) {
  fetch(`http://localhost:3000/api/products/category/${categoryId}`)
    .then((response) => response.json())
    .then((products) => {
      renderProducts(products);
    })
    .catch((err) => console.error("Error fetching products:", err));
}

//Render products to the product list
function renderProducts(products) {
  productList.innerHTML = "";
  if (products.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
  } else {
    products.forEach((product) => {
      var productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
            <img src="./assets/${product.product_image}.png" alt="${
        product.product_name
      }" class="product-image">
            <h3>${product.product_name}</h3>
            <p>${product.description || "No description available"}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            `;
      productCard.addEventListener("click", () => {
        window.location.href = `product.html?product_id=${product.product_id}`;
      });
      productList.appendChild(productCard);
    });
  }
}

//Retrieve cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

//Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

//Render cart items
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = "<p class='align-center'>Your cart is empty.</p>";
    return;
  }

  cart.forEach((item, index) => {
    var cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <p><strong>${item.product_name}</strong></p>
      <p>Price: $${item.price.toFixed(2)}</p>
      <div class="quantity-control">
        <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
        <span class="quantity">${item.quantity}</span>
        <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
      </div>
    `;
    cartList.appendChild(cartItem);
  });

  document.querySelectorAll(".quantity-btn").forEach((button) => {
    button.addEventListener("click", handleQuantityChange);
  });
}

//Handle quantity change in cart
function handleQuantityChange(event) {
  var cart = getCart();
  var index = event.target.dataset.index;
  var action = event.target.dataset.action;

  if (action === "increase") {
    cart[index].quantity += 1;
  } else if (action === "decrease") {
    cart[index].quantity -= 1;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  }

  saveCart(cart);
  renderCart();
}

checkoutBtn.addEventListener("click", () => {
  var cart = getCart();
  if (cart.length > 0) {
    checkoutFormContainer.classList.remove("hidden");
    checkoutFormContainer.style.display = "flex";
  } else {
    alert("Your cart is empty.");
  }
});

cancelBtn.addEventListener("click", () => {
  checkoutFormContainer.style.display = "none";
});

userInfoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const fullName = document.getElementById("full-name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  console.log(fullName)

  fetch("http://localhost:3000/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart, fullName, email, phone, address }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to process checkout");
      }
      return response.json();
    })
    .then(() => {
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      checkoutFormContainer.style.display = "none";
      renderCart();
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to place order. Please try again.");
    });
});

renderCart();
fetchAllProducts();
