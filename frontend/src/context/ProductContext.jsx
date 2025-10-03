import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';
import Error from '../components/ui/Error';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loadingAll, setLoadingAll] = useState(true);

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (page = 1) => {
    setLoadingAll(true);
    try {
      const res = await api.get(`/products/?page=${page}`);
      const data = res.data;

      setAllProducts(data.results || []);
      setCurrentPage(page);

      // Django DRF pagination gives count + page_size
      if (data.count && data.results) {
        setTotalPages(Math.ceil(data.count / data.results.length));
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setAllProducts([]);
    } finally {
      setLoadingAll(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        loadingAll,
        currentPage,
        totalPages,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
