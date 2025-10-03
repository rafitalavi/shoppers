import React from 'react';
import { Spinner, Button } from 'react-bootstrap';
import { useProduct } from './../../context/ProductContext';
import ProductCard from './../ProductCard';
import { useNavigate } from 'react-router-dom';

const LatestProductsCarousel = () => {
  const { latestProducts, loading } = useProduct();
  const navigate = useNavigate();

  if (loading) return <Spinner animation="border" className="d-block mx-auto my-5" />;
  if (!latestProducts.length) return null;

  const handleShowMore = () => navigate('/products');

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="mb-4 text-center fw-bold">Latest Products</h2>
        <div className="row g-4">
          {latestProducts.map(product => (
            <div key={product.id} className="col-12 col-sm-6 col-md-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

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
