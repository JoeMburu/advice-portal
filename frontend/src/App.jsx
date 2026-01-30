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
import ProtectedRoute from "./ProtectedRoute.jsx";



export default function App() {
  
  const API_BASE = import.meta.env.VITE_API_URL; // e.g. https://your-backend.herokuapp.com  
  return (
    <>    
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/store" element={<Store />} />
        <Route path="/product/:slug" element={<ProductDetail />} />

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
