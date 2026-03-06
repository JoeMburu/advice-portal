import { useCallback, useMemo, useState } from "react";
import { OrderContext } from "./orderContext.jsx";  
import axiosInstance from '../api/axiosInstance.jsx';

const API_BASE = import.meta.env.VITE_API_URL;

const OrderProvider = ({ children }) => {
  const [placedOrder, setPlacedOrder] = useState(null); ;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const placeOrder = useCallback(async (contactInfo, deliveryInfo, paymentInfo, paymentMethod) => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        contactInfo,
        deliveryInfo,
        paymentInfo,
        paymentMethod
      }
      const res = await axiosInstance.post("/orders/place_order/", payload); // send order data to backend
      setPlacedOrder(res.data);
      const createdOrder = res.data;
      return createdOrder;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);  

  const value = useMemo(() => ({
    placedOrder,
    loading,
    error,   
    placeOrder
  }), [placedOrder, loading, error, placeOrder]); 

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}


export default OrderProvider;