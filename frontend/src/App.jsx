import React from "react";
import { Routes, Route } from "react-router-dom";

// ✅ UI Components
import NavBar from "./components/ui/NavBar";
import Footer from "./components/ui/Footer";

// ✅ Home Page Components
import Header from "./components/home/Header";
import HeroSection from "./components/home/HeroSection";
import CardContainerCategory from "./components/home/CardcontainerCatecogy";
import LatestProductsCarousel from "./components/home/CardContainerProduct";

// ✅ Context Providers
import { CategoryProvider } from "./context/CategoryContext";
import { SubcategoryProvider } from "./context/SubcategoryContext";
import { ProductProvider } from "./context/ProductContext";

// ✅ Example Pages
import ProductDetailPage from "./pages/ProductDetailPage";
import AllProductsPage from './pages/AllProductsPage';

const App = () => {
  return (
    <CategoryProvider>
      <SubcategoryProvider>
        <ProductProvider>
          <div className="d-flex flex-column min-vh-100">
            <NavBar />
            <main className="flex-grow-1">
              <Routes>
                {/* 🏠 Home */}
                <Route
                  path="/"
                  element={
                    <>
                      <Header />
                      <HeroSection />
                      <LatestProductsCarousel />
                      <CardContainerCategory />
                      
                    </>
                  }
                />
                <Route path="/products" element={<AllProductsPage />} />
                {/* 🛍 Product Details */}
                <Route path="/product/:slug" element={<ProductDetailPage />} />

                {/* 404 Not Found (Optional) */}
                <Route path="*" element={<h1 className="text-center mt-5">404 - Page Not Found</h1>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ProductProvider>
      </SubcategoryProvider>
    </CategoryProvider>
  );
};

export default App;
