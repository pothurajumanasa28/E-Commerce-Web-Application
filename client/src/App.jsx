import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Product from "./pages/product";
import Navbar from "./assets/components/Navbar";
import Cart from "./pages/cart";
import ProductDetails from "./pages/productDetails";
import Checkout from "./pages/checkout";
import OrderSuccess from "./pages/orderSuccess";
import AdminRoute from "./assets/components/AdminRoute";
import Admin from "./pages/admin";
function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/products"
          element={<Product />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />
        <Route
    path="/checkout"
    element={<Checkout />}
/>
<Route
    path="/order-success"
    element={<OrderSuccess />}
/>
<Route
    path="/admin"
    element={
        <AdminRoute>
            <Admin />
        </AdminRoute>
    }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;