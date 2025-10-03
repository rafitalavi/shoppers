import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories/');
        // Ensure full URL for image if needed
        const categoriesWithFullImage = res.data.map(cat => ({
          ...cat,
          image: cat.image.startsWith('http') 
            ? cat.image 
            : `${api.defaults.baseURL}${cat.image}`,
        }));
        setCategories(categoriesWithFullImage);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading, error, selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
