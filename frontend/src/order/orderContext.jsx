import { createContext, useContext } from "react";

export const OrderContext = createContext(null);

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error("useOrders must be used within a <OrderProvider>");    
  }
  return ctx;
}