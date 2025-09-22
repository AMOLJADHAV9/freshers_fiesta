import React from 'react';
import StudentDashboard from '../components/StudentDashboard';
import './StudentDashboard.css';

const StudentDashboardPage = ({ onLogout }) => {
  return (
    <div className="student-dashboard-page">
      <StudentDashboard onLogout={onLogout} />
    </div>
  );
};

export default StudentDashboardPage;