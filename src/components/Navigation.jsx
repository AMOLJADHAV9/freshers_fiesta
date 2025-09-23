import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ user }) => {
  const location = useLocation();
  
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  return (
    <nav className="navigation">
      <div className="navigation-container">
        <div className="navigation-content">
          <div className="navigation-brand">
            <Link to="/" className="navigation-title">
              Fresher's Fiesta
            </Link>
          </div>
          
          <div className="navigation-links">
            {user ? (
              isAdminRoute ? (
                <>
                  <Link 
                    to="/admin/dashboard" 
                    className="navigation-link"
                  >
                    Admin Dashboard
                  </Link>
                  <Link 
                    to="/" 
                    className="navigation-link"
                  >
                    Home
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/admin/dashboard" 
                    className="navigation-link"
                  >
                    Admin Dashboard
                  </Link>
                </>
              )
            ) : (
              isAdminRoute ? (
                <>
                  <Link 
                    to="/" 
                    className="navigation-link"
                  >
                    Home
                  </Link>
                  <Link 
                    to="/admin/login" 
                    className="navigation-link"
                  >
                    Admin Login
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/admin/login" 
                    className="navigation-link"
                  >
                    Admin
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;