const orderId = new URLSearchParams(window.location.search).get('orderId');

//Fetch and the details of an order via order id
function fetchOrderDetails(orderId) {
  fetch(`http://localhost:3000/api/orders/${orderId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }
      return response.json();
    })
    .then((order) => {
      console.log(order)
      const orderDetails = document.getElementById('order-details');
      orderDetails.innerHTML = `
        <h2>Order #: ${order.order_id}</h2>
        <p><strong>Customer:</strong> ${order.customer_name}</p>
        <p><strong>Date:</strong> ${order.order_date}</p>
        <p><strong>Customer Phone Number:</strong> ${order.phone_number}</p>
        <p><strong>Customer Email Address:</strong> ${order.email_address}</p>
        <p><strong>Shipping Address:</strong> ${order.address}</p>
        <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
        <h3>Products:</h3>
        <ul id="product-list">
          ${order.products
            .map(
              (product) => `
            <li">
              <div class="order-image-div"> 
                <img src="./assets/${product.product_image}.png" alt="idk" class="product-image"">
              </div>
              <div class="align-center">
                <p><strong>${product.product_name}</strong></p>
                <p>Quantity: ${product.quantity}</p>
                <p>Price per item: $${product.price_per_item.toFixed(2)}</p>
              </div>
            </li>`
            )
            .join('')}
        </ul>
      `;
    })
    .catch((error) => {
      console.error(error);
      document.getElementById('order-details').innerHTML = '<p>Error loading order details.</p>';
    });
}

//Fetch order details when page loads
if (orderId) {
  fetchOrderDetails(orderId);
} else {
  document.getElementById('order-details').innerHTML = '<p>Invalid order ID.</p>';
}
