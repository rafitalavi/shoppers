import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useProduct } from './../../context/ProductContext';
import ProductCard from '../products/ProductCard';
import LatestProductsCarouselPlaceholder from '../ui/LatestProductsCarouselPlaceholder'; // ✅ import placeholder
import { useNavigate } from 'react-router-dom';
import './LatestProductsCarousel.css';

const LatestProductsCarousel = () => {
  const { allProducts, loadingAll } = useProduct();
  const navigate = useNavigate();

  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 4;
    const width = window.innerWidth;
    if (width < 576) return 1;
    if (width < 768) return 2;
    if (width < 992) return 3;
    return 4;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const AUTO_PLAY_INTERVAL = 5000;
  const carouselProducts = allProducts.slice(0, 12);

  useEffect(() => {
    const handleResize = () => {
      const newVisibleCount = getVisibleCount();
      if (newVisibleCount !== visibleCount) {
        setVisibleCount(newVisibleCount);
        setCurrentIndex(0);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [visibleCount]);

  useEffect(() => {
    if (carouselProducts.length <= visibleCount) return;
    const timer = setInterval(() => handleNext(), AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [carouselProducts.length, visibleCount]);

  const handleShowMore = () => navigate('/products');
  const handleNext = () => {
    if (isTransitioning || carouselProducts.length <= visibleCount) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev + 1) % carouselProducts.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };
  const handlePrev = () => {
    if (isTransitioning || carouselProducts.length <= visibleCount) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev - 1 + carouselProducts.length) % carouselProducts.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };
  const goToSlide = (index) => {
    if (isTransitioning || carouselProducts.length <= visibleCount) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const getVisibleProducts = () => {
    if (carouselProducts.length <= visibleCount) return carouselProducts;
    const products = [];
    for (let i = 0; i < visibleCount; i++) {
      const productIndex = (currentIndex + i) % carouselProducts.length;
      products.push(carouselProducts[productIndex]);
    }
    return products;
  };

  const visibleProducts = getVisibleProducts();
  const totalSlides = carouselProducts.length;
  const showNavigation = carouselProducts.length > visibleCount;

  // ✅ Show placeholder while loading
  if (loadingAll) {
    return <LatestProductsCarouselPlaceholder count={visibleCount} />;
  }

  if (!carouselProducts.length) return null;

  return (
    <section className="latest-products-carousel py-4 py-md-5 bg-light">
      <div className="container">
        {/* Title + Button */}
        <div className="row align-items-center mb-3 mb-md-4">
          <div className="col-12 col-md-8">
            <h2 className="fw-bold mb-2 mb-md-0 text-center text-md-start">
              Latest Products
            </h2>
          </div>
          <div className="col-12 col-md-4 text-center text-md-end d-none d-md-block">
            <Button variant="outline-primary" onClick={handleShowMore} size="lg">
              View All Products
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div className="position-relative px-xxl-5">
          {showNavigation && (
            <>
              <Button
                variant="light"
                className="carousel-arrow carousel-arrow-prev d-none d-md-flex"
                onClick={handlePrev}
                disabled={isTransitioning}
              >
                <i className="bi bi-chevron-left"></i>
              </Button>
              <Button
                variant="light"
                className="carousel-arrow carousel-arrow-next d-none d-md-flex"
                onClick={handleNext}
                disabled={isTransitioning}
              >
                <i className="bi bi-chevron-right"></i>
              </Button>
            </>
          )}
          <div className="carousel-container">
            <div className="carousel-track">
              {visibleProducts.map((product, index) => (
                <div
                  key={`${product.id}-${currentIndex}-${index}`}
                  className="carousel-slide"
                  style={{ flex: `0 0 ${100 / visibleCount}%`, padding: visibleCount > 2 ? '0 12px' : '0 8px' }}
                >
                  <ProductCard product={product} className="h-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Buttons */}
          {showNavigation && (
            <div className="d-flex d-md-none justify-content-center gap-3 mt-4">
              <Button variant="outline-primary" onClick={handlePrev} disabled={isTransitioning} size="sm">
                <i className="bi bi-chevron-left"></i>
              </Button>
              <Button variant="outline-primary" onClick={handleNext} disabled={isTransitioning} size="sm">
                <i className="bi bi-chevron-right"></i>
              </Button>
            </div>
          )}
        </div>

        {/* Dots */}
        {showNavigation && (
          <div className="carousel-dots mt-3 mt-md-4">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestProductsCarousel;
