import React from 'react';
import LatestProductsCarouselPlaceholder from '../ui/LatestProductsCarouselPlaceholder';

const ProductPagePlaceholder = () => {
  return (
    <div>
      <section className="py-3">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            {/* Image Placeholder */}
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                className="card-img-top"
                src="https://img.icons8.com/?size=100&id=53386&format=png&color=000000"
                alt="placeholder"
              />
            </div>

            {/* Info Placeholder */}
            <div className="col-md-6">
              <div className="mb-3">
                <span className="placeholder col-4 "></span>
                <span className="placeholder col-12"></span>
                <span className="placeholder col-4"></span>
              </div>
              <p className="lead">
                <span className="placeholder col-12 mb-2"></span>
                <span className="placeholder col-12 mb-2"></span>
                <span className="placeholder col-12 mb-2"></span>
                <span className="placeholder col-12 mb-2"></span>
                <span className="placeholder col-12 mb-2"></span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related / Latest Products Placeholder */}
      <LatestProductsCarouselPlaceholder />
    </div>
  );
};

export default ProductPagePlaceholder;
