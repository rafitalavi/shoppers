import React from "react";
import { Routes, Route } from "react-router-dom";


// ✅ Layout
import MainLayout from "./layouts/Mainlayout";

// ✅ Context Providers
import { CategoryProvider } from "./context/CategoryContext";
import { SubcategoryProvider } from "./context/SubcategoryContext";
import { ProductProvider } from "./context/ProductContext";

// ✅ Pages
import Homepage from "./pages/Homepage";
import AllProductsPage from "./pages/AllProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Error from "./components/ui/Error";

const App = () => {
  return (
    <CategoryProvider>
      <SubcategoryProvider>
        <ProductProvider>
          <Routes>
            {/* ✅ Wrap all public pages inside MainLayout */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Homepage />} />
              <Route path="products" element={<AllProductsPage />} />
              <Route path="product/:slug" element={<ProductDetailPage />} />

             
             <Route path="*" element={<Error />} /> {/* Catch-all 404 */}
            </Route>
          </Routes>
        </ProductProvider>
      </SubcategoryProvider>
    </CategoryProvider>
  );
};

export default App;
