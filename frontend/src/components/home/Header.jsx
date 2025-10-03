import React from 'react';

const Header = () => {
  return (
    <header className='py-5' style={{ background: '#ff8418ff' }}>
      <div className='container px-4 pl-lg-5'>
        <div className='text-center fw-normal text-white'>
          <h1 className='display-4 fw-bold'>Welcome to Our Store</h1>
          <p className='lead fw-normal text-white-75 mb-4'>
            Discover the latest trends with PrimerShop
          </p>
    
        </div>
      </div>
    </header>
  );
};

export default Header;
