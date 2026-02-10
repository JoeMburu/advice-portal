import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Header from "./pages/Header.jsx";
import Footer from "./pages/Footer.jsx";
import Login from "./pages/Login.jsx";
import Store from "./pages/Store.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AuthProvider from "./AuthProvider.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import ProtectedRoute from "./ProtectedRoute.jsx";


export default function App() {
  
  const API_BASE = import.meta.env.VITE_API_URL; // e.g. https://your-backend.herokuapp.com  
  const headerRef = useRef();

  const [cartQuantity, setCartQuantity] = useState(0);

  const authConfig = () => {
    const token = localStorage.getItem("access_token");    
    return token
      ? {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      : {
          withCredentials: true,
        };
  };
  
  useEffect(() => {
    async function fetchCartQuantity() {
     try {
        await axios.get(`${API_BASE}/cart/`, authConfig()).then((res) => {
          setCartQuantity(res.data.cart.items.reduce((acc, item) => acc + item.quantity, 0)); // <-- important
        });
        //setCartQuantity(response.data.cart.items.reduce((acc, item) => acc + item.quantity, 0));     
      } catch (err) {
        console.error("STATUS: ", err.response?.status);
        console.error("DATA: ", err.response?.data);
      }
    }
    fetchCartQuantity();  
  }, [API_BASE]);

  
  const handleRefreshCart = async () => {
    //headerRef.current.refreshCart(); // ← call Header function
    try {
        await axios.get(`${API_BASE}/cart/`, authConfig()).then((res) => {
          setCartQuantity(res.data.cart.items.reduce((acc, item) => acc + item.quantity, 0)); // <-- important
        });
        //setCartQuantity(response.data.cart.items.reduce((acc, item) => acc + item.quantity, 0));     
      } catch (err) {
        console.error("STATUS: ", err.response?.status);
        console.error("DATA: ", err.response?.data);
      }     
  };

 
  
  return (
    <>    
    <AuthProvider>
      <Header ref={headerRef} onRefreshCart={handleRefreshCart} cartQuantity={cartQuantity} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/store" element={<Store />} />
        <Route path="/product/:slug" element={<ProductDetail onRefreshCart={handleRefreshCart} />} />
        <Route path="/cart" element={<Cart onRefreshCart={handleRefreshCart} />} />
        <Route path="/checkout" element={<Checkout  />} />

        {/* protected routes */}
        <Route element={<ProtectedRoute />}>          
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer />
    </AuthProvider>      
    </>
  );
}
