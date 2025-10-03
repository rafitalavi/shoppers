import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: '60vh' }}>
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h3 className="mb-3">Oops! Page Not Found</h3>
      <p className="mb-4 text-muted">The page you are looking for doesn’t exist or has been moved.</p>
      <Button variant="primary" onClick={goHome}>
        Go Back Home
      </Button>
    </div>
  );
};

export default Error;
