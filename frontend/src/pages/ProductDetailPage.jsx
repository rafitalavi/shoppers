import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { FiShoppingCart } from "react-icons/fi";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${slug}/`); // <-- Django URL for details
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <div className="container py-5 text-center">Loading...</div>;
  if (!product) return <div className="container py-5 text-center">Product not found</div>;

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Product Image */}
        <div className="col-md-5">
          <img
            src={product.image || "https://via.placeholder.com/500"}
            alt={product.name}
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Product Info */}
        <div className="col-md-7">
          <h2 className="fw-bold mb-3">{product.name}</h2>
          <p className="text-muted">{product.description}</p>

          <div className="mb-3">
            {product.discount_price && product.discount_price !== product.price ? (
              <>
                <span className="h5 text-muted text-decoration-line-through me-2">
                  ৳{product.price}
                </span>
                <span className="h4 text-danger fw-bold">
                  ৳{product.discount_price}
                </span>
              </>
            ) : (
              <span className="h4 fw-bold">৳{product.price}</span>
            )}
          </div>

          {product.attributes_display && (
            <div className="mb-3">
              {Object.entries(product.attributes_display).map(([attr, values]) => (
                <div key={attr}>
                  <strong>{attr}:</strong> {values}
                </div>
              ))}
            </div>
          )}

          <button
            className="btn btn-dark btn-lg mt-3"
            disabled={product.stock <= 0}
          >
            <FiShoppingCart className="me-2" />
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
