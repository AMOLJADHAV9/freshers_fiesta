import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from '../components/AdminLogin';
import AdminRegistration from './AdminRegistration';
import AdminRegistrationForm from '../components/AdminRegistrationForm';
import AdminDashboard from '../components/AdminDashboard';
import AdminLanding from './AdminLanding';
import './Admin.css';

const Admin = ({ user, onLogin, onLogout }) => {
  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1 className="admin-title">Admin Panel</h1>
      </header>
      
      <main className="admin-main">
        <Routes>
          <Route path="/" element={<AdminLanding />} />
          <Route 
            path="/login" 
            element={!user ? <AdminLogin onLogin={onLogin} /> : <Navigate to="/admin/dashboard" />} 
          />
          <Route 
            path="/register" 
            element={!user ? <AdminRegistration /> : <Navigate to="/admin/dashboard" />} 
          />
          <Route 
            path="/register/form" 
            element={!user ? <AdminRegistrationForm onRegistrationSuccess={onLogin} /> : <Navigate to="/admin/dashboard" />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <AdminDashboard onLogout={onLogout} /> : <Navigate to="/admin/login" />} 
          />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </main>
    </div>
  );
};

export default Admin;