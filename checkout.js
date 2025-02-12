document.getElementById("checkout-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Collect form data
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const zip = document.getElementById("zip").value;
  const cardNumber = document.getElementById("card-number").value;
  const expiry = document.getElementById("expiry").value;
  const cvv = document.getElementById("cvv").value;

  // Simple validation
  if (!name || !address || !city || !zip || !cardNumber || !expiry || !cvv) {
    alert("Please fill in all fields.");
    return;
  }

  // Simulate order submission
  alert(`Thank you for your order, ${name}! Your order is being processed.`);

  // Clear cart and localStorage
  localStorage.removeItem("cart");
  window.location.href = "index.html"; // Redirect to home page
});

document.getElementById("checkout-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Collect form data
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const zip = document.getElementById("zip").value;

  // Save to localStorage for confirmation page
  localStorage.setItem("customerName", name);
  localStorage.setItem("customerAddress", address);
  localStorage.setItem("customerCity", city);
  localStorage.setItem("customerZip", zip);

  // Redirect to confirmation page
  window.location.href = "order-confirmation.html";
});

import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe
const stripe = await loadStripe("your_publishable_key_here");

document.getElementById("checkout-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const zip = document.getElementById("zip").value;

  // Save customer data for confirmation page
  localStorage.setItem("customerName", name);
  localStorage.setItem("customerAddress", address);
  localStorage.setItem("customerCity", city);
  localStorage.setItem("customerZip", zip);

  // Get total amount from cart
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Create Payment Intent
  const response = await fetch("http://localhost:5000/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: totalAmount }),
  });

  const { clientSecret } = await response.json();

  // Confirm Payment
  const { error } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: elements.getElement(CardElement),
      billing_details: { name },
    },
  });

  if (error) {
    alert(error.message);
  } else {
    // Redirect to order confirmation
    window.location.href = "order-confirmation.html";
  }
});

const elements = stripe.elements();
const cardElement = elements.create("card");
cardElement.mount("#card-element");
