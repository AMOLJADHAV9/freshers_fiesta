import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundImage from '../assets/images/404-error.svg';
import Footer from '../components/Footer';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <img 
          src={NotFoundImage} 
          alt="404 Page Not Found" 
          className="not-found-image"
        />
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Oops! Page Not Found</h2>
        <p className="not-found-description">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="not-found-actions">
          <Link 
            to="/" 
            className="not-found-button primary"
          >
            🏠 Go to Home
          </Link>
          <Link 
            to="/admin" 
            className="not-found-button secondary"
          >
            👨‍💼 Admin Panel
          </Link>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default NotFound;