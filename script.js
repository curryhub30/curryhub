let cart = [];

function addToCart(item, price) {
  cart.push({ item, price });
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';

  let total = 0;
  cart.forEach((entry, i) => {
    total += entry.price;
    cartItems.innerHTML += `<li>${entry.item} - $${entry.price.toFixed(2)} <button onclick="removeItem(${i})">❌</button></li>`;
  });

  cartTotal.textContent = total.toFixed(2);
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function submitOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const message = cart.map(c => `${c.item} - $${c.price.toFixed(2)}`).join('\n');
  const total = cart.reduce((sum, c) => sum + c.price, 0).toFixed(2);
  const finalMessage = `Hi! I want to order:\n${message}\nTotal: $${total}`;

  window.open(`https://wa.me/11234567890?text=${encodeURIComponent(finalMessage)}`);
}
