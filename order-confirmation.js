// Retrieve order details from localStorage
const customerName = localStorage.getItem("customerName");
const customerAddress = localStorage.getItem("customerAddress");
const customerCity = localStorage.getItem("customerCity");
const customerZip = localStorage.getItem("customerZip");
const orderItems = JSON.parse(localStorage.getItem("cart")) || [];

// Populate confirmation page
document.getElementById("customer-name").textContent = customerName;
document.getElementById("customer-address").textContent = customerAddress;
document.getElementById("customer-city").textContent = customerCity;
document.getElementById("customer-zip").textContent = customerZip;

const orderSummary = document.getElementById("order-summary");

// Display ordered items
orderItems.forEach(item => {
  const listItem = document.createElement("li");
  listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
  orderSummary.appendChild(listItem);
});

// Clear cart data
localStorage.removeItem("cart");
