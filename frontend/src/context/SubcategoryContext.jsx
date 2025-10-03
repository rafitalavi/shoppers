// context/SubcategoryContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';
import { useCategory } from './CategoryContext';

const SubcategoryContext = createContext();

export const SubcategoryProvider = ({ children }) => {
  const { selectedCategory } = useCategory(); // depends on CategoryContext
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null); // for filtering products

  useEffect(() => {
    if (!selectedCategory) {
      setSubcategories([]);
      setSelectedSubcategory(null);
      setLoading(false);
      return;
    }

    const fetchSubcategories = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/subcategories/?category=${selectedCategory}`);
        setSubcategories(res.data);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [selectedCategory]);

  return (
    <SubcategoryContext.Provider
      value={{
        subcategories,
        loading,
        error,
        selectedSubcategory,
        setSelectedSubcategory,
      }}
    >
      {children}
    </SubcategoryContext.Provider>
  );
};

export const useSubcategory = () => useContext(SubcategoryContext);
