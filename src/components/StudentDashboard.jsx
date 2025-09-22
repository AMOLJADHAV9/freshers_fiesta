import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import RegistrationForm from './RegistrationForm';
import './StudentDashboard.css';

const StudentDashboard = ({ onLogout }) => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('register'); // 'register' or 'myEvents'

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Get student info from auth
        const user = auth.currentUser;
        if (user) {
          setStudentInfo({
            name: user.displayName || 'Student',
            email: user.email
          });
        }

        // Fetch student's registrations
        if (user) {
          const q = query(
            collection(db, 'registrations'),
            where('email', '==', user.email)
          );
          const querySnapshot = await getDocs(q);
          const registrationsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setRegistrations(registrationsData);
        }
      } catch (err) {
        console.error('Error fetching student data: ', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (err) {
      console.error('Error signing out: ', err);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <div className="loading-text">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="student-info">
          <h2 className="dashboard-title">Student Dashboard</h2>
          {studentInfo && (
            <div className="student-details">
              <p>Welcome, {studentInfo.name}!</p>
              <p className="student-email">{studentInfo.email}</p>
            </div>
          )}
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'register' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Register for Events
        </button>
        <button
          className={`tab-button ${activeTab === 'myEvents' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('myEvents')}
        >
          My Registrations ({registrations.length})
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'register' ? (
          <div className="tab-content">
            <h3 className="tab-title">Event Registration</h3>
            <RegistrationForm />
          </div>
        ) : (
          <div className="tab-content">
            <h3 className="tab-title">My Event Registrations</h3>
            {registrations.length === 0 ? (
              <div className="no-registrations">
                <p>You haven't registered for any events yet.</p>
                <button 
                  onClick={() => setActiveTab('register')}
                  className="register-button"
                >
                  Register Now
                </button>
              </div>
            ) : (
              <div className="registrations-list">
                {registrations.map(reg => (
                  <div key={reg.id} className="registration-card">
                    <h4 className="event-name">{reg.fullName}</h4>
                    <p><strong>Branch:</strong> {reg.branch}</p>
                    <p><strong>Phone:</strong> {reg.phone}</p>
                    <p><strong>Type:</strong> {reg.participationType}</p>
                    <p><strong>Events:</strong> {reg.events.join(', ')}</p>
                    {reg.participationType === 'Group' && (
                      <div>
                        <p><strong>Group Name:</strong> {reg.groupName}</p>
                        <p><strong>Group Members:</strong> {reg.groupMembers.map(m => `${m.name} (${m.rollNo})`).join(', ')}</p>
                      </div>
                    )}
                    <p><strong>Registered At:</strong> {reg.createdAt?.toDate().toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;