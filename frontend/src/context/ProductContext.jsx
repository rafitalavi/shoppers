import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loadingLatest, setLoadingLatest] = useState(true);
  const [loadingAll, setLoadingAll] = useState(true);

  // Fetch latest products
  useEffect(() => {
    const fetchLatest = async () => {
      setLoadingLatest(true);
      try {
        const res = await api.get('/products/?latest=1');
        setLatestProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to fetch latest products:', err);
        setLatestProducts([]);
      } finally {
        setLoadingLatest(false);
      }
    };
    fetchLatest();
  }, []);

  // Fetch all products (paginated or not)
  useEffect(() => {
    const fetchAll = async () => {
      setLoadingAll(true);
      try {
        const res = await api.get('/products/');
        // DRF paginated result has `results`
        setAllProducts(res.data.results || []);
      } catch (err) {
        console.error('Failed to fetch all products:', err);
        setAllProducts([]);
      } finally {
        setLoadingAll(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <ProductContext.Provider value={{ latestProducts, loadingLatest, allProducts, loadingAll }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
