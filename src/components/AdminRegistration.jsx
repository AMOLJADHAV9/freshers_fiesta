import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './AdminRegistration.css';

const AdminRegistration = ({ onRegistration }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    // Validate passwords
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Register new admin user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // In a real application, you would store additional admin info in Firestore
      // and set custom claims for admin privileges
      
      setSuccess(true);
      onRegistration(user);
    } catch (err) {
      console.error('Error registering admin: ', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Email already in use.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else {
        setError('Failed to register admin. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-registration-container">
      <h2 className="admin-registration-title">Admin Registration</h2>
      
      {success && (
        <div className="success-message">
          Admin registered successfully!
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            required
          />
        </div>
        
        <div className="form-field">
          <label className="form-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
        </div>
        
        <div className="form-field">
          <label className="form-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>
        
        <div className="form-field">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`submit-button ${loading ? 'submit-button-disabled' : ''}`}
        >
          {loading ? 'Registering...' : 'Register Admin'}
        </button>
      </form>
      
      <div className="admin-login-link">
        <p>
          Already have an admin account? 
          <a href="/admin/login" className="login-link">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default AdminRegistration;