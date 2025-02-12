// Sample product data (will be dynamic later)
const products = [
  { id: 1, name: "Earrings", price: 19.99, image: "./assets/earrings-01.jpg" },
  { id: 2, name: "Necklace", price: 29.99, image: "./assets/necklace-01.jpg" },
  { id: 3, name: "Pendants", price: 39.99, image: "./assets/pendants-01.jpg" },
];

const productsContainer = document.getElementById("products-container");
const cartCount = document.getElementById("cart-count");

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count
function updateCartCount() {
  cartCount.textContent = cart.length;
}

// Load products dynamically
function loadProducts() {
  productsContainer.innerHTML = "";
  products.forEach(product => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    productsContainer.appendChild(productElement);
  });

  // Attach event listeners to "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", addToCart);
  });
}

// Add product to cart
function addToCart(event) {
  const productId = parseInt(event.target.dataset.id);
  const product = products.find(p => p.id === productId);

  if (product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }
}

// Load products and update cart count when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  updateCartCount();
});