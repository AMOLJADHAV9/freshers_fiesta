import React from 'react';
import { Link } from 'react-router-dom';
import './AdminLanding.css';

const AdminLanding = () => {
  return (
    <div className="admin-landing-container">
      <div className="admin-landing-header">
        <h1 className="admin-landing-title">Admin Panel</h1>
        <p className="admin-landing-subtitle">
          Manage student registrations for Fresher's Fiesta events
        </p>
      </div>
      
      <div className="admin-landing-grid">
        <div className="admin-card">
          <h2 className="admin-card-title">View Registrations</h2>
          <p className="admin-card-description">
            Access all student registrations, filter by branch or event, and export data.
          </p>
          <Link 
            to="/admin/dashboard" 
            className="dashboard-link"
          >
            Go to Dashboard
          </Link>
        </div>
        
        <div className="admin-card">
          <h2 className="admin-card-title">Login</h2>
          <p className="admin-card-description">
            Already have an admin account? Login to access the dashboard.
          </p>
          <Link 
            to="/admin/login" 
            className="login-link"
          >
            Login
          </Link>
        </div>
        
        <div className="admin-card">
          <h2 className="admin-card-title">Register</h2>
          <p className="admin-card-description">
            New admin user? Register to get access to the admin panel.
          </p>
          <Link 
            to="/admin/register" 
            className="register-link"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLanding;