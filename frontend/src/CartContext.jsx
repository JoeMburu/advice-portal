
// import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { useAuth } from "./auth/authContext.jsx";

// const API_BASE = import.meta.env.VITE_API_URL;

// const CartContext = createContext(null);

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const { isLoggedIn } = useAuth();

//   // helper: auth header if token exists
//   const authConfig = () => {
//     const token = localStorage.getItem("access_token");
//     return token
//       ? { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
//       : { withCredentials: true };
//   };

//   // fetch full cart from backend
//   const fetchCart = async () => {
//     try {
//       setLoading(true);

//       let res;
//       if (isLoggedIn) {
//         res = await axios.get(`${API_BASE}/cart/`, authConfig());        
//       }
//       else {
//         res = await axios.get(`${API_BASE}/cart/`);        
//       }
//       setCart(res.data.cart || res.data);
      
//     } catch (err) {
//       console.error("fetchCart error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // add product to cart
//   const addToCart = async (productId) => {
//     try {
//       if (!isLoggedIn) {
//         await axios.post(`${API_BASE}/cart/add/${productId}/`, null, authConfig())
//       } else {
//         await axios.post(`${API_BASE}/cart/add/${productId}/`, null)
//       };
//       await fetchCart();
//     } catch (err) {
//       console.error("addToCart error:", err);
//     }
//   };

//   // remove product
//   const removeFromCart = async (productId) => {
//     try {
//       await axios.post(`${API_BASE}/cart/remove/${productId}/`, null, authConfig());
//       await fetchCart();
//     } catch (err) {
//       console.error("removeFromCart error:", err);
//     }
//   };

//   // decrease quantity
//   const decreaseItem = async (productId) => {
//     try {
//       await axios.post(`${API_BASE}/cart/decrease_product/${productId}/`, null, authConfig());
//       await fetchCart();
//     } catch (err) {
//       console.error("decreaseItem error:", err);
//     }
//   };

//   // compute totals
//   const totalItems = useMemo(() => {
//     if (!cart?.items) return 0;
//     return cart.items.reduce((sum, i) => sum + i.quantity, 0);
//   }, [cart]);

//   const totalAmount = useMemo(() => {
//     if (!cart?.items) return 0;
//     return cart.items.reduce((sum, i) => sum + Number(i.subtotal || 0), 0);
//   }, [cart]);

//   // load cart on app start
//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const value = {
//     cart,
//     loading,
//     addToCart,
//     removeFromCart,
//     decreaseItem,
//     fetchCart,
//     totalItems,
//     totalAmount,
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// }



