import React from 'react';
import { useProduct } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const AllProductsPage = () => {
  const { allProducts, loadingAll } = useProduct();

  if (loadingAll) {
    return <div className="text-center my-5">Loading all products...</div>;
  }

  return (
    <div className="container py-4">
<h2 className="mb-4 text-center py-3 bg-light fw-bold">
  All Products
</h2>

      {allProducts.length === 0 ? (
        <p className="text-center">No products available.</p>
      ) : (
        <div className="row g-3">
          {allProducts.map((product) => (
            <div key={product.id} className="col-6 col-md-4 col-lg-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProductsPage;
