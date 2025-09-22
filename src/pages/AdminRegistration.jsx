import React from 'react';
import AdminRegistrationForm from '../components/AdminRegistrationForm';
import './AdminRegistration.css';

const AdminRegistration = () => {
  const handleRegistrationSuccess = (user) => {
    // Handle successful registration
    console.log('Admin registered successfully:', user);
    // In a real application, you might redirect to the admin dashboard
    // or show a success message with next steps
  };

  return (
    <div className="admin-registration-page">
      <div className="page-header">
        <h1 className="page-title">Fresher's Fiesta Admin Portal</h1>
        <p className="page-subtitle">Create your administrator account</p>
      </div>
      
      <AdminRegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
      
      <div className="page-footer">
        <p>© {new Date().getFullYear()} Fresher's Fiesta. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AdminRegistration;