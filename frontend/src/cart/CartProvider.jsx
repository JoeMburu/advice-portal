import { useState, useEffect, useMemo, useCallback } from "react";
//import axios from "axios";
import axiosInstance from '../api/axiosInstance.jsx';
import { useAuth } from "../auth/authContext.jsx";
import { CartContext } from "./cartContext.jsx";

const API_BASE = import.meta.env.VITE_API_URL;

const CartProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

    // Fetch full cart (works for guest or logged-in; backend decides based on token)
  const fetchCart = useCallback(async () => {
  console.log("Method: Fetching cart...");
  setLoading(true);
  setError(null);
  try {
    const res = await axiosInstance.get(`${API_BASE}/cart/`);
    console.log("Cart fetched:", res.data);
    setCart(res.data.cart ?? res.data);
  } catch (err) {
    setError(err);
    console.error("fetchCart error:", err);
  } finally {
    setLoading(false);
  }
}, []);

  const addToCart = useCallback(async (productId, qty = 1) => {
    try {
      // If your endpoint doesn't accept qty, remove it
      await axiosInstance.post(`${API_BASE}/cart/add/${productId}/`, { quantity: qty });
      await fetchCart();
    } catch (err) {
      console.error("addToCart error:", err);
      throw err;
    }
  }, [fetchCart]);

  const removeFromCart = useCallback(async (productId) => {
    try {
      await axiosInstance.post(`${API_BASE}/cart/remove/${productId}/`);
      await fetchCart();
    } catch (err) {
      console.error("removeFromCart error:", err);
      throw err;
    }
  }, [fetchCart]);

  const decreaseItem = useCallback(async (productId) => {
    try {
      await axiosInstance.post(`/cart/decrease_product/${productId}/`);
      await fetchCart();
    } catch (err) {
      console.error("decreaseItem error:", err);
      throw err;
    }
  }, [fetchCart]);

  // Optional but useful helpers
  const clearCart = useCallback(async () => {
    try {
      //await axiosInstance.post("/cart/clear/");
      await fetchCart();
    } catch (err) {
      console.error("clearCart error:", err);
      throw err;
    }
  }, [fetchCart]);

  // Totals
  const totalItems = useMemo(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce((sum, i) => sum + Number(i.quantity || 0), 0);
  }, [cart]);

  const totalAmount = useMemo(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce((sum, i) => sum + Number(i.subtotal || 0), 0);
  }, [cart]);

  const vatAmount = useMemo(() => {
    if (!cart) return 0;
    return cart.vat_amount;
  }, [cart]);

  const grandTotal = useMemo(() => {
    if (!cart) return 0;
    return cart.grand_total;
  }, [cart]);

  // Load cart on app start, and when auth state changes (guest <-> logged in)
  useEffect(() => {
    // If you have auth init, avoid fetching before tokens/refresh settle
    //if (isInitializing) return;
    fetchCart();
  }, [fetchCart, isLoggedIn]);

  const value = useMemo(
    () => ({
      cart,
      loading,
      error,
      fetchCart,
      addToCart,
      removeFromCart,
      decreaseItem,
      clearCart,
      totalItems,
      totalAmount,
      vatAmount,
      grandTotal,
      isLoggedIn,
    }),
    [cart, loading, error, fetchCart, totalItems, addToCart, removeFromCart, decreaseItem, clearCart, totalAmount, isLoggedIn, vatAmount, grandTotal]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;