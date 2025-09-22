import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">Fresher's Fiesta Registration</h1>
        <p className="header-subtitle">
          Showcase your talents in our annual celebration of music, dance, drama, and more!
        </p>
        <div className="header-button-container">
          {/* <a 
            href="#registration" 
            className="header-button"
          >
            Register Now
          </a> */}
        </div>
      </div>
    </header>
  );
};

export default Header;