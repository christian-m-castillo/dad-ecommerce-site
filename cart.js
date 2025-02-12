const cartContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display cart items
function loadCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "Total: $0.00";
    return;
  }

  cart.forEach((product, index) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");
    itemElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}" width="50">
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button class="remove" data-index="${index}">❌</button>
    `;
    cartContainer.appendChild(itemElement);
    total += product.price;
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;

  // Attach remove event listeners
  document.querySelectorAll(".remove").forEach(button => {
    button.addEventListener("click", removeFromCart);
  });
}

// Remove item from cart
function removeFromCart(event) {
  const index = event.target.dataset.index;
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// Load cart when the page loads
document.addEventListener("DOMContentLoaded", loadCart);
