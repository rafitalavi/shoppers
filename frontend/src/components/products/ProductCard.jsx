import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const inStock = product.stock > 0;
  const hasDiscount = product.discount_price && product.discount_price !== product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  const handleDetails = () => navigate(`/product/${product.slug}`);

  return (
    <div className="card product-card h-100 shadow-lg rounded-3 overflow-hidden border-0 hover-scale">
      {/* Product Image */}
      <div className="position-relative image-container" onClick={handleDetails} style={{ cursor: 'pointer' }}>
        <img
          src={product.image || 'https://via.placeholder.com/300'}
          alt={product.name}
          className="card-img-top product-image"
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <span className="badge bg-danger discount-badge position-absolute top-0 start-0 m-2">
            -{discountPercentage}%
          </span>
        )}

        {/* Out of Stock Overlay */}
        {!inStock && (
          <div className="out-of-stock-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
            <span className="badge bg-dark bg-opacity-75 text-white px-3 py-2 fs-6">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="card-body d-flex flex-column p-3">
        {/* Product Name */}
        <h6
          className="card-title fw-bold text-center text-truncate mb-2"
          title={product.name}
        >
          {product.name}
        </h6>

        {/* Price */}
        <div className="text-center mb-3">
          {hasDiscount ? (
            <>
              <span className="h6 text-muted text-decoration-line-through me-2">
                ৳{product.price}
              </span>
              <span className="h5 text-danger fw-bold">৳{product.discount_price}</span>
            </>
          ) : (
            <span className="h5 fw-bold text-dark">৳{product.price}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto">
          <button
            className={`btn btn-dark w-100 ${!inStock ? 'disabled' : ''}`}
            disabled={!inStock}
          >
            <FiShoppingCart className="me-1" />
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
