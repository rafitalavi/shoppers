import React from 'react';
import { useCategory } from '../../context/CategoryContext';

const CardContainerCategory = () => {
  const { categories, loading, error, setSelectedCategory } = useCategory();

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center py-5 text-danger">Failed to load categories</div>;

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="mb-5 text-center fw-bold">Shop by Category</h2>
        <div className="row g-4">
          {categories.map(category => (
            <div key={category.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div
                className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden hover-scale"
                onClick={() => setSelectedCategory(category.id)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={category.image || 'https://via.placeholder.com/300'}
                  className="card-img-top"
                  alt={category.name}
                  style={{ height: '200px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{category.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hover-scale:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
};

export default CardContainerCategory;