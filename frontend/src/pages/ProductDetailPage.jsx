import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import ProductCard from "../components/products/ProductCard";
import PoductPagePlaceHolder from "../components/products/PoductPagePlaceHolder";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${slug}/`);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <PoductPagePlaceHolder/>;
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
        </div>
      </div>

      {/* Related Products */}
      {product.related_products && product.related_products.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-4">Related Products</h3>
          <div className="row g-3">
            {product.related_products.map((rel) => (
              <div key={rel.id} className="col-6 col-md-3">
                <ProductCard product={rel} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
