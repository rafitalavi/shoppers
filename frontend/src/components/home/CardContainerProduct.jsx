import React from 'react';
import { Carousel, Spinner, Button } from 'react-bootstrap';
import { useProduct } from './../../context/ProductContext';
import ProductCard from './../ProductCard';
import { useNavigate } from 'react-router-dom';

const LatestProductsCarousel = () => {
  const { latestProducts, loading } = useProduct();
  const navigate = useNavigate();

  if (loading) return <Spinner animation="border" className="d-block mx-auto my-5" />;
  if (!latestProducts.length) return null;

  const handleShowMore = () => {
    navigate('/products'); // Redirect to main product listing page
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="mb-4 text-center fw-bold">Latest Products</h2>
        <Carousel indicators={false}>
  {latestProducts.map(product => (
    <Carousel.Item key={product.id}>
      <div className="d-flex justify-content-center">
        <div style={{ width: '250px' }}>
          <ProductCard product={product} />
        </div>
      </div>
    </Carousel.Item>
  ))}
</Carousel>


        <div className="text-center mt-4">
          <Button variant="primary" onClick={handleShowMore}>
            Show More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestProductsCarousel;
