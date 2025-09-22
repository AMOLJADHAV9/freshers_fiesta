import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Admin from './pages/Admin';
import StudentLoginPage from './pages/StudentLogin';
import StudentDashboardPage from './pages/StudentDashboard';
import StudentLanding from './pages/StudentLanding';
import NotFound from './pages/NotFound';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <Navigation user={user} />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student" element={<StudentLanding />} />
            <Route 
              path="/student/login" 
              element={!user ? <StudentLoginPage onLogin={setUser} /> : <Navigate to="/student/dashboard" />} 
            />
            <Route 
              path="/student/dashboard" 
              element={user ? <StudentDashboardPage onLogout={() => setUser(null)} /> : <Navigate to="/student/login" />} 
            />
            <Route path="/admin/*" element={<Admin user={user} onLogin={setUser} onLogout={() => setUser(null)} />} />
            {/* <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;