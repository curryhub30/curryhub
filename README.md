<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>CurryHub Menu & Order</title>
<style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background: #fffaf0;
    color: #333;
  }
  h1, h2 {
    color: #8b0000;
  }
  .menu-item {
    border-bottom: 1px solid #ddd;
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .menu-item div {
    max-width: 70%;
  }
  .menu-item button {
    background: #8b0000;
    color: white;
    border: none;
    padding: 8px 14px;
    border-radius: 5px;
    cursor: pointer;
  }
  .menu-item button:hover {
    background: #a00000;
  }
  #order-summary {
    margin-top: 20px;
    background: #f9f5f0;
    padding: 15px;
    border-radius: 8px;
    min-height: 80px;
  }
  input[type="text"] {
    width: 100%;
    padding: 8px;
    margin-top: 15px;
    font-size: 1rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
  #place-order-btn {
    margin-top: 15px;
    padding: 10px 18px;
    background: #8b0000;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1.1rem;
    cursor: pointer;
  }
  #place-order-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  footer {
    margin-top: 40px;
    text-align: center;
    color: #666;
  }
</style>
<script src="https://cdn.emailjs.com/dist/email.min.js"></script>
</head>
<body>

<h1>CurryHub - Authentic South Indian Flavours</h1>

<h2>Menu</h2>
<div id="menu">
  <div class="menu-item">
    <div><strong>Chicken Fry</strong> — Juicy spicy marinated chicken pieces</div>
    <div>£3.00 <button onclick="addToOrder('Chicken Fry', 3.00)">Add</button></div>
  </div>
  <div class="menu-item">
    <div><strong>Lamb Curry</strong> — Slow-cooked lamb with warming spices</div>
    <div>£4.50 <button onclick="addToOrder('Lamb Curry', 4.50)">Add</button></div>
  </div>
  <div class="menu-item">
    <div><strong>Paneer Curry</strong> — Soft paneer in creamy tomato-onion gravy</div>
    <div>£3.00 <button onclick="addToOrder('Paneer Curry', 3.00)">Add</button></div>
  </div>
  <div class="menu-item">
    <div><strong>Veg Pulao</strong> — Fragrant basmati rice with vegetables and spices</div>
    <div>£3.00 <button onclick="addToOrder('Veg Pulao', 3.00)">Add</button></div>
  </div>
  <div class="menu-item">
    <div><strong>Chicken Pakoda</strong> — Crispy deep-fried chicken bites</div>
    <div>£2.99 <button onclick="addToOrder('Chicken Pakoda', 2.99)">Add</button></div>
  </div>
  <!-- Add more items as needed -->
</div>

<h2>Your Order</h2>
<div id="order-summary">No items added yet.</div>

<h3>Your Name</h3>
<input type="text" id="customer-name" placeholder="Enter your name" />

<button id="place-order-btn" disabled onclick="placeOrder()">Place Order</button>

<script>
  emailjs.init('YOUR_USER_ID'); // Replace with your EmailJS user ID

  const order = [];

  function addToOrder(itemName, price) {
    order.push({ name: itemName, price });
    updateOrderSummary();
  }

  function updateOrderSummary() {
    const summary = document.getElementById('order-summary');
    const placeOrderBtn = document.getElementById('place-order-btn');
    if (order.length === 0) {
      summary.textContent = 'No items added yet.';
      placeOrderBtn.disabled = true;
      return;
    }
    let html = '<ul>';
    let total = 0;
    order.forEach(item => {
      html += <li>${item.name} — £${item.price.toFixed(2)}</li>;
      total += item.price;
    });
    html += </ul><p><strong>Total: £${total.toFixed(2)}</strong></p>;
    summary.innerHTML = html;
    placeOrderBtn.disabled = false;
  }

   document.getElementById('customer-name').addEventListener('input', () => {
    const placeOrderBtn = document.getElementById('place-order-btn');
    placeOrderBtn.disabled = !document.getElementById('customer-name').value.trim() || order.length === 0;
  });

  function placeOrder() {
    const name = document.getElementById('customer-name').value.trim();
    if (!name) {
      alert('Please enter your name.');
      return;
    }
    if (order.length === 0) {
      alert('Your order is empty.');
      return;
    }

    const orderDetails = order.map(item => • ${item.name} (£${item.price.toFixed(2)})).join('\\n');
    const total = order.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    const templateParams = {
      customer_name: name,
      order_items: orderDetails,
      total_price: total,
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
      .then(() => {
        alert('✅ Your order has been placed! We will contact you soon.');
        // Reset order
        order.length = 0;
        updateOrderSummary();
        document.getElementById('customer-name').value = '';
        document.getElementById('place-order-btn').disabled = true;

        // Open WhatsApp with order details
        const whatsappMsg = Hi CurryHub! 👋%0A%0AMy name is ${encodeURIComponent(name)}.%0AI would like to place the following order:%0A${encodeURIComponent(orderDetails)}%0A%0ATotal: £${total};
        window.open(https://wa.me/441234567890?text=${whatsappMsg}, '_blank');
      }, (error) => {
        alert('❌ Sorry, failed to send order. Please try again.');
        console.error(error);
      });
  }
</script>

<footer>
  <p>©️ 2025 CurryHub | Wembley, London</p>
  <p><strong>Phone:</strong> 0208 123 4567 | <strong>WhatsApp:</strong> <a href="https://wa.me/441234567890" target="_blank" rel="noopener">Chat with us</a></p>
</footer>

</body>
</html>
  
