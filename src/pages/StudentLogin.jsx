import React from 'react';
import StudentLogin from '../components/StudentLogin';
import './StudentLogin.css';

const StudentLoginPage = ({ onLogin }) => {
  return (
    <div className="student-login-page">
      <div className="student-login-header">
        <h1 className="student-login-page-title">Fresher's Fiesta</h1>
        <p className="student-login-page-subtitle">Student Portal</p>
      </div>
      <StudentLogin onLogin={onLogin} />
    </div>
  );
};

export default StudentLoginPage;