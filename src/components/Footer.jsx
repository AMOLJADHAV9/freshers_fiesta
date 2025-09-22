import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-title">Fresher's Fiesta</h3>
            <p className="footer-subtitle">Annual cultural fest for freshers</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-section">
              <h4 className="footer-links-title">Quick Links</h4>
              <ul className="footer-links-list">
                <li><a href="#" className="footer-link">Home</a></li>
                <li><a href="#registration" className="footer-link">Registration</a></li>
                <li><a href="/admin" className="footer-link">Admin</a></li>
              </ul>
            </div>
            
            <div className="footer-links-section">
              <h4 className="footer-links-title">Contact</h4>
              <ul className="footer-links-list">
                <li className="footer-contact-item">Email: amolj9238@gmail.com</li>
                <li className="footer-contact-item">Phone: +91 9552678123</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-divider">
          <div className="footer-college-info">
            <p className="footer-college-name">MPGI SOE Nanded</p>
          </div>
          <div className="footer-developer-info">
            <p className="footer-developer">Developed by Amol Jadhav</p>
            <p className="footer-copyright">© {new Date().getFullYear()} AI TECH Lab. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;