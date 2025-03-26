const ordersList = document.getElementById('orders-list');

//Fetch all orders placed
function fetchOrders() {
  fetch('http://localhost:3000/api/orders')
    .then((response) => response.json())
    .then((orders) => {
      ordersList.innerHTML = '';

      if (orders.length === 0) {
        ordersList.innerHTML = '<p>No orders have been placed yet.</p>';
        return;
      }
      console.log(orders)

      orders.forEach((order) => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        orderCard.innerHTML = `
          <h2>Order ID: ${order.order_id}</h2>
          <p><strong>Customer:</strong> ${order.customer_name}</p>
          <p><strong>Customer Email:</strong> ${order.email_address}</p>
          <p><strong>Customer Address:</strong> ${order.address}</p>
          <p><strong>Customer Phone Number:</strong> ${order.phone_number}</p>
          <p><strong>Date:</strong> ${order.order_date}</p>
          <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
        `;
        orderCard.addEventListener('click', () => {
            window.location.href = `orderDetails.html?orderId=${order.order_id}`;
          });
        ordersList.appendChild(orderCard);
      });
    })
    .catch((err) => {
      console.error('Error fetching orders:', err);
      ordersList.innerHTML = '<p>Error loading orders. Please try again later.</p>';
    });
}

fetchOrders();
