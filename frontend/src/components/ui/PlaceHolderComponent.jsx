import React from 'react';
import Placeholder from './Placeholder';

const PlaceHolderComponent = ({ count = 16 }) => {
  // create an array [0, 1, 2, ..., count-1]
  const placeholders = Array.from({ length: count });

  return (
    <section className="py-5" id="shop">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row g-3 justify-content-center">
          {placeholders.map((_, index) => (
            
              <Placeholder />
           
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlaceHolderComponent;
