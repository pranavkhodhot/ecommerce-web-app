const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const db = new sqlite3.Database("./ecommerce.db");

app.use(cors());
app.use(express.json());

//Get all products
app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM Products", [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(rows);
  });
});

//Get products by category
app.get("/api/products/category/:id", (req, res) => {
  const categoryId = req.params.id;
  db.all(
    `SELECT p.product_id, p.product_name, p.price, p.description, p.product_image FROM Products p
     JOIN Product_Categories pc ON p.product_id = pc.product_id
     WHERE pc.category_id = ${categoryId}`,
    (err, rows) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.json(rows);
    }
  );
});

//Get all categories
app.get("/api/categories", (req, res) => {
  db.all("SELECT * FROM Categories", (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(rows);
  });
});

//Get product details by product id
app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const sql = `SELECT * FROM Products WHERE product_id = ${productId}`;
  db.get(sql, (err, row) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (!row) {
      res.status(404).send("Product not found");
    } else {
      res.json(row);
    }
  });
});

//Get all orders
app.get("/api/orders", (req, res) => {
  db.all("SELECT * FROM Orders", (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

//Add order to orders tables and product idems to Order_Products table
app.post("/api/checkout", (req, res) => {
  const { cart, fullName, email, phone, address } = req.body;
  const db = new sqlite3.Database("./ecommerce.db");
  db.serialize(() => {
    const orderDate = new Date().toISOString().split("T")[0];
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    db.run(
      `INSERT INTO Orders (customer_name, email_address, phone_number, address, order_date, total) VALUES (?, ?, ?, ?, ?, ?)`,
      [fullName, email, phone, address, orderDate, total],
      function (err) {
        if (err) {
          console.error(err.message);
          db.close();
          return res.status(500).json({ error: "Failed to create order" });
        }
        const orderId = this.lastID;
        const updateStockStatement = db.prepare(
          `UPDATE Products SET stock = stock - ? WHERE product_id = ?`
        );
        const insertOrderItemStatement = db.prepare(
          `INSERT INTO Order_Items (order_id, product_id, quantity, price_per_item) VALUES (?, ?, ?, ?)`
        );
        let remainingItems = cart.length;
        cart.forEach((item) => {
          updateStockStatement.run(item.quantity, item.product_id, (err) => {
            if (err) {
              console.error(
                `Failed to update stock for product_id ${item.product_id}: ${err.message}`
              );
            }
          });
          insertOrderItemStatement.run(
            orderId,
            item.product_id,
            item.quantity,
            item.price,
            (err) => {
              if (err) {
                console.error(
                  `Failed to insert order item for product_id ${item.product_id}: ${err.message}`
                );
              }
              remainingItems -= 1;
              if (remainingItems === 0) {
                updateStockStatement.finalize();
                insertOrderItemStatement.finalize();
                db.close();
                res.json({ success: true });
              }
            }
          );
        });
      }
    );
  });
});

//Get order details via order id
app.get('/api/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const db = new sqlite3.Database('./ecommerce.db'); 
  db.serialize(() => {
    db.get(
      `SELECT order_id, customer_name, email_address, phone_number, address, order_date, total 
       FROM Orders 
       WHERE order_id = ${orderId}`,
      (err, order) => {
        if (err) {
          console.error(err.message);
          db.close(); 
          return res.status(500).json({ error: 'Failed to fetch order details' });
        }
        if (!order) {
          db.close(); 
          return res.status(404).json({ error: 'Order not found' });
        }
        db.all(
          `SELECT oi.product_id, p.product_name, oi.quantity, oi.price_per_item , p.product_image
           FROM Order_Items oi
           JOIN Products p ON oi.product_id = p.product_id
           WHERE oi.order_id = ${orderId}`,
          (err, products) => {
            if (err) {
              console.error(err.message);
              db.close();
              return res.status(500).json({ error: 'Failed to fetch order products' });
            }
            res.json({ ...order, products });
            db.close(); 
          }
        );
      }
    );
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
