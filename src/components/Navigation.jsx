import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ user }) => {
  const location = useLocation();
  
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isStudentRoute = location.pathname.startsWith('/student');
  
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
              isStudentRoute ? (
                <>
                  <Link 
                    to="/student/dashboard" 
                    className="navigation-link"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/" 
                    className="navigation-link"
                  >
                    Home
                  </Link>
                </>
              ) : isAdminRoute ? (
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
                    to="/student/dashboard" 
                    className="navigation-link"
                  >
                    Student Dashboard
                  </Link>
                  <Link 
                    to="/admin/dashboard" 
                    className="navigation-link"
                  >
                    Admin Dashboard
                  </Link>
                </>
              )
            ) : (
              isStudentRoute ? (
                <>
                  <Link 
                    to="/student" 
                    className="navigation-link"
                  >
                    Home
                  </Link>
                  <Link 
                    to="/student/login" 
                    className="navigation-link"
                  >
                    Login
                  </Link>
                </>
              ) : isAdminRoute ? (
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
                    to="/student" 
                    className="navigation-link"
                  >
                    Students
                  </Link>
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