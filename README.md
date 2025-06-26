# E-Commerce Web App 🛍️

A full-featured **E-Commerce Web Application** built with a modern tech stack: **Angular** + **Tailwind CSS** on the frontend,**Express.js** + **Prisma** on the backend, and **MySQL** for the database. Designed with responsiveness, simplicity, and clean architecture in mind — this project showcases my ability to build robust full stack applications.



---

## Features ✨
- 🔥 Responsive UI: Built using Angular and Tailwind CSS for a sleek, mobile-first design.
- ⚙️ Server-side Logic: Express.js manages routing and API logic efficiently.
- 🛒 Cart & Checkout Flow: Add to cart, view cart items, and place orders.
- 💾 Persistent Data: MySQL handles product, category, and order data using Prisma ORM.
- 📦 Product & Order Management: Fully supports CRUD operations for products and order placement.
- 📈 Scalable Structure: Clear separation of concerns between frontend and backend.

---

## Technologies Used 🛠️
- **Frontend:** Angular, Tailwind CSS
- **Backend:** Node.js, Express.js
- **ORM:** Prisma
- **Database:** MySQL
- **Development Tools:** npm, Angular CLI

---

## How to Run the Application 🚀

Follow these steps to set up and run the E-Commerce Web App locally:

### 1. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Run the folllowing command to install required node modules
   ```bash
   npm install
   ```
3. Create a .env file in the backend directory with your MySQL connection string:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/database_name"
   ```
4. Generate and migrate the Prisma schema:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
5. Run the folllowing command to start up Express server
   ```bash
   node server.js
   ```
### 2. Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Run the folllowing command to install required node modules
   ```bash
   npm install
   ```
3. Run the folllowing command to start Frontend
   ```bash
   ng serve
   ```
   ![Screenshot 2025-06-26 at 2 38 40 PM](https://github.com/user-attachments/assets/ae4b958f-ffd9-4e1c-a3ee-a0c6c9327676)

