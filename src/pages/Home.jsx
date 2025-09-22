import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RegistrationForm from '../components/RegistrationForm';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      
      <main className="home-main">
        <div className="home-content">
          <div className="home-intro">
            <h2 className="home-title">Event Registration</h2>
            <p className="home-subtitle">
              Register for solo or group events and showcase your talents at Fresher's Fiesta!
            </p>
            <div className="home-actions">
              <Link to="/student" className="student-landing-button">
                Student Portal
              </Link>
              <Link to="/student/login" className="student-login-button">
                Student Login/Register
              </Link>
            </div>
          </div>
          
          {/* <div id="registration">
            <RegistrationForm />
          </div> */}
        </div>
        
        <section className="events-section">
          <div className="events-container">
            <h2 className="events-title">Event Categories</h2>
            <div className="events-grid">
              <div className="event-card">
                <h3 className="event-card-title performing-arts">Performing Arts</h3>
                <p className="event-card-description">Dance, music, drama, and theatrical performances</p>
              </div>
              <div className="event-card">
                <h3 className="event-card-title literary-arts">Literary Arts</h3>
                <p className="event-card-description">Debate, poetry, storytelling, and creative writing</p>
              </div>
              <div className="event-card">
                <h3 className="event-card-title fun-activities">Fun Activities</h3>
                <p className="event-card-description">Comedy, quizzes, and interactive games</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;