import React from 'react';

const HeroSection = () => {
  return (
    <section>
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">

          {/* Slide 1 */}
          <div className="carousel-item active">
            <div
              className="d-flex align-items-center justify-content-center text-center text-white"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1920&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '70vh',
              }}
            >
              <div className="container px-4 px-lg-5">
                <h1 className="display-4 fw-bold mb-3">Welcome to Your Store</h1>
                <p className="lead fw-normal text-white-75 mb-4">
                  Discover the latest trends with PrimerShop
                </p>
                <a href="#shop" className="btn btn-light btn-lg rounded-pill px-4 py-2 shadow">
                  Shop Now
                </a>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <div
              className="d-flex align-items-center justify-content-center text-center text-white"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1920&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '70vh',
              }}
            >
              <div className="container px-4 px-lg-5">
                <h1 className="display-4 fw-bold mb-3">New Arrivals</h1>
                <p className="lead fw-normal text-white-75 mb-4">
                  Shop the freshest styles of the season
                </p>
                <a href="#shop" className="btn btn-light btn-lg rounded-pill px-4 py-2 shadow">
                  Explore
                </a>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item">
            <div
              className="d-flex align-items-center justify-content-center text-center text-white"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1920&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '70vh',
              }}
            >
              <div className="container px-4 px-lg-5">
                <h1 className="display-4 fw-bold mb-3">Exclusive Offers</h1>
                <p className="lead fw-normal text-white-75 mb-4">
                  Get discounts on your favorite brands
                </p>
                <a href="#shop" className="btn btn-light btn-lg rounded-pill px-4 py-2 shadow">
                  Grab Now
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
