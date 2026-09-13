# 🛒 E-Commerce Web Application

A full-stack E-Commerce Web Application that allows users to browse products, view product details, register/login, manage their shopping cart, and place orders. The application also includes an admin system for managing products and orders.

## 🌐 Live Demo

### Frontend

https://gorgeous-zuccutto-f80c29.netlify.app

### Backend API

https://ecommerce-backend-e3as.onrender.com

### GitHub Repository

https://github.com/pothurajumanasa28/E-Commerce-Web-Application

---

## ✨ Features

### 👤 User Features

* User registration and login
* Secure password hashing
* JWT-based authentication
* Browse available products
* View detailed product information
* Add products to cart
* Update cart items
* Remove products from cart
* View available stock
* Responsive user interface

### 👨‍💼 Admin Features

* Admin authentication
* Add new products
* Update existing products
* Delete products
* Manage product information
* Manage product stock
* View and manage orders

### 🔐 Security

* Passwords are securely hashed using bcrypt
* JWT authentication
* Protected backend routes
* Role-based authorization for admin operations
* Environment variables used for sensitive configuration

---

## 🛠️ Technologies Used

### Frontend

* React.js
* Vite
* React Router
* Axios
* CSS
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* dotenv

### Deployment

* Netlify – Frontend
* Render – Backend
* MongoDB Atlas – Database

---

## 📂 Project Structure

```text
E-Commerce-Web-Application/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   ├── .env
│   ├── createAdmin.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🔄 Application Flow

```text
User
  │
  ▼
React Frontend
  │
  │ Axios API Requests
  ▼
Express.js Backend
  │
  ▼
MongoDB Atlas
  │
  ▼
Products / Users / Orders
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/pothurajumanasa28/E-Commerce-Web-Application.git
```

```bash
cd E-Commerce-Web-Application
```

---

## 💻 Frontend Setup

Navigate to the client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on the local Vite development server.

---

## ⚙️ Backend Setup

Open another terminal and navigate to:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

> ⚠️ Never commit your `.env` file or database credentials to GitHub.

Start the backend:

```bash
npm start
```

---

## 🗄️ Database

This project uses **MongoDB Atlas** as the cloud database.

The backend connects to MongoDB using the `MONGO_URI` environment variable.

Main database collections include:

* Users
* Products
* Orders

---

## 🔑 Authentication

The application uses:

* **bcryptjs** for password hashing
* **JSON Web Tokens (JWT)** for authentication
* Role-based authorization for admin functionality

Users and administrators have different access permissions.

---

## 📡 API Overview

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Products

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Orders

```text
POST /api/orders
GET  /api/orders
```

> API routes may require authentication depending on the operation.

---

## ☁️ Deployment

### Frontend – Netlify

The React/Vite frontend is deployed using Netlify.

Live website:

https://gorgeous-zuccutto-f80c29.netlify.app

### Backend – Render

The Node.js/Express backend is deployed using Render.

Backend:

https://ecommerce-backend-e3as.onrender.com

### Database – MongoDB Atlas

MongoDB Atlas is used to store application data securely in the cloud.

---

## 📱 Responsive Design

The application is designed to provide a smooth experience across:

* 💻 Desktop
* 📱 Mobile
* 📟 Tablet

---

## 🎯 Project Objectives

The main objectives of this project are:

* Build a complete full-stack E-Commerce application
* Implement user authentication and authorization
* Develop RESTful APIs
* Connect a React frontend with an Express backend
* Store and manage data using MongoDB
* Implement shopping cart functionality
* Create an admin management system
* Deploy a full-stack application to the cloud

---

## 🔮 Future Enhancements

Possible future improvements include:

* Online payment integration
* Product search and filtering
* Product reviews and ratings
* Wishlist functionality
* Order tracking
* Email notifications
* Improved admin dashboard
* Product image upload
* Advanced analytics

---

## 👩‍💻 Author

**Manasa Pothuraju**

Computer Science & Engineering Student

---

## ⭐ Acknowledgements

This project was developed as a full-stack web development project to gain practical experience with React, Node.js, Express.js, MongoDB, authentication, REST APIs, and cloud deployment.

---

## 📄 License

This project is created for educational and portfolio purposes.
