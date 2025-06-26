const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await prisma.Products.findMany(); 
    res.json(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get products by category
app.get("/api/products/category/:id", async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const products = await prisma.Product_Categories.findMany({
      where: { category_id: categoryId },
      include: { product: true },
    });
    res.json(products.map((pc) => pc.product));
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all categories
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await prisma.Categories.findMany(); 
    res.json(categories);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get product details by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await prisma.products.findUnique({
      where: { product_id: id },
    });
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.json(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await prisma.Orders.findMany();
    res.json(orders);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Checkout: Create order and update stock
app.post("/api/checkout", async (req, res) => {
  const { cart, fullName, email, phone, address } = req.body;
  const orderDate = new Date().toISOString().split("T")[0];
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  try {
    const order = await prisma.orders.create({
      data: {
        customer_name: fullName,
        email_address: email,
        phone_number: phone,
        address,
        order_date: orderDate,
        total,
        Order_Items: {
          create: cart.map((item) => ({
            product_id: item.product.product_id,
            quantity: item.quantity,
            price_per_item: item.product.price,
          })),
        },
      },
    });

    // Update stock
    for (const item of cart) {
      await prisma.products.update({
        where: { product_id: item.product.product_id },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Checkout failed", detail: err.message });
  }
});

// Get order details
app.get("/api/orders/:orderId", async (req, res) => {
  const orderId = parseInt(req.params.orderId);
  try {
    const order = await prisma.orders.findUnique({
      where: { order_id: orderId },
      include: {
        Order_Items: {
          include: {
            Products: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const formattedOrder = {
      order_id: order.order_id,
      customer_name: order.customer_name,
      email_address: order.email_address,
      phone_number: order.phone_number,
      address: order.address,
      order_date: order.order_date,
      total: order.total,
      products: order.Order_Items.map((item) => ({
        product_id: item.product_id,
        product_name: item.Products?.product_name,
        quantity: item.quantity,
        price_per_item: item.price_per_item,
        product_image: item.Products?.product_image,
      })),
    };

    res.json(formattedOrder);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch order details",
      detail: err.message,
    });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
