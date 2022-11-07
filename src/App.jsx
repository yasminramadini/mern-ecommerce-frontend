import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Products from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import Category from "./pages/admin/Category";
import AddCategory from "./pages/admin/AddCategory";
import EditCategory from "./pages/admin/EditCategory";
import EditProduct from "./pages/admin/EditProduct";
import User from "./pages/user/User";
import Home from "./pages/user/Home";
import ProductDetail from "./pages/user/ProductDetail";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import Cart from "./pages/user/Cart";
import Order from "./pages/user/Order";
import Orders from "./pages/admin/Orders";
import ProductByCategory from "./pages/user/ProductByCategory";

import { initializeCart } from "./features/cartSlice";
import { initializeUser } from "./features/userSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCart());
    dispatch(initializeUser());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />}>
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="categories" element={<Category />} />
          <Route path="categories/add" element={<AddCategory />} />
          <Route path="categories/edit/:id" element={<EditCategory />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        <Route path="/" element={<User />}>
          <Route path="/" exact element={<Home />} />
          <Route path="product/:slug" element={<ProductDetail />} />
          <Route
            path="products/category/:category"
            element={<ProductByCategory />}
          />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
