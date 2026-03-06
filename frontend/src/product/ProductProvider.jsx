import { useCallback, useEffect, useMemo, useState } from "react";
//import axios from "axios";
import { ProductContext } from "./productContext.jsx";  
import axiosInstance from '../api/axiosInstance.jsx';

const API_BASE = import.meta.env.VITE_API_URL;

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);      // store listing / home page
  const [product, setProduct] = useState(null); // individual product details
  const [categories, setCategories] = useState([]);

  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);

  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    setError(null);
    try {
      const res = await axiosInstance.get(`${API_BASE}/store/products/`); // fetch all products
      setProducts(res.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  const fetchProductsByCategory = useCallback(async (categorySlug) => {
    if(!categorySlug) return;
    setLoadingProducts(true);
    setError(null);
    try {
      const res = await axiosInstance.get(`${API_BASE}/store/products/category/${categorySlug}/`); // fetch products by category
      setProducts(res.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoadingProducts(false);
    }
  }, []); 

  const fetchProduct = useCallback(async (productSlug) => {
    if(!productSlug) return;
    setLoadingProduct(true);
    setError(null); 
    try {
      const res = await axiosInstance.get(`${API_BASE}/store/product/${productSlug}/`); //
      setProduct(res.data[0]); // Assuming the API returns a list with a single product
    } catch (e) {
      setError(e);
    } finally {
      setLoadingProduct(false);
    } 
  }, []);

  const fetchProductCategories = useCallback(async () => {
    setLoadingCategories(true);
    setError(null);
    try {
      const res = await axiosInstance.get(`${API_BASE}/store/products/categories/`); // fetch product categories
      setCategories(res.data);
    } catch (e) {     
      setError(e);
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  // fetch initial lists once
  useEffect(() => {
    fetchProducts();
    fetchProductCategories();
  }, []);

  const loading = loadingProducts || loadingCategories || loadingProduct;

  const value = useMemo(() => ({
    products,
    product,
    categories,
    loading,
    error,
    fetchProducts,
    fetchProductCategories,
    fetchProduct,
    fetchProductsByCategory
  }), [products, product, categories, loading, error, fetchProducts, fetchProductCategories, fetchProduct, fetchProductsByCategory]); 

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}