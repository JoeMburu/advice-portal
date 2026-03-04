import { createContext, useContext } from "react";

export const ProductContext = createContext(null);

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error("useProducts must be used within a <ProductProvider>");    
  }
  return ctx;
}