import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/images/maxresdefault.jpg';
import './StudentLanding.css';

const StudentLanding = () => {
  return (
    <div className="student-landing">
      <header className="student-landing-header" style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="header-content">
          <h1 className="header-title">Fresher's Fiesta</h1>
          <p className="header-subtitle">Annual Cultural Festival for New Students</p>
          <div className="header-actions">
            <Link to="/student/login" className="cta-button primary">Login / Register</Link>
            <Link to="/#registration" className="cta-button secondary">View Registration Form</Link>
          </div>
        </div>
      </header>

      <section className="introduction-section">
        <div className="container">
          <h2 className="section-title">Welcome to Fresher's Fiesta!</h2>
          <p className="section-description">
            Fresher's Fiesta is the annual cultural festival organized exclusively for new students 
            to showcase their talents and integrate into the college community. This vibrant event 
            offers a platform for freshers to participate in various competitions and activities.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎭</div>
              <h3 className="feature-title">Performing Arts</h3>
              <p className="feature-description">
                Showcase your talents in dance, music, drama, and theatrical performances.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">✍️</div>
              <h3 className="feature-title">Literary Arts</h3>
              <p className="feature-description">
                Participate in debates, poetry slams, storytelling, and creative writing contests.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎲</div>
              <h3 className="feature-title">Fun Activities</h3>
              <p className="feature-description">
                Enjoy interactive games, quizzes, and comedy shows for a fun-filled experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="registration-preview">
        <div className="container">
          <h2 className="section-title">Event Registration</h2>
          <p className="section-description">
            Register now for solo or group events and be part of this exciting celebration!
          </p>
          
          <div className="preview-card">
            <h3 className="preview-title">How to Register</h3>
            <ol className="registration-steps">
              <li>Create your student account or login if you already have one</li>
              <li>Fill out the registration form with your details</li>
              <li>Select the events you wish to participate in</li>
              <li>Choose between solo or group participation</li>
              <li>Submit your registration and get ready for the fiesta!</li>
            </ol>
            
            <Link to="/student/login" className="cta-button primary large">Get Started Now</Link>
          </div>
        </div>
      </section>

      <section className="event-categories">
        <div className="container">
          <h2 className="section-title">Event Categories</h2>
          
          <div className="categories-grid">
            <div className="category-card">
              <h3 className="category-title">Dancing</h3>
              <p className="category-description">Express yourself through various dance forms</p>
            </div>
            
            <div className="category-card">
              <h3 className="category-title">Singing</h3>
              <p className="category-description">Showcase your vocal talents</p>
            </div>
            
            <div className="category-card">
              <h3 className="category-title">Comedy</h3>
              <p className="category-description">Make everyone laugh with your humor</p>
            </div>
            
            <div className="category-card">
              <h3 className="category-title">Drama</h3>
              <p className="category-description">Act out scenes and stories</p>
            </div>
            
            <div className="category-card">
              <h3 className="category-title">Quiz</h3>
              <p className="category-description">Test your knowledge across various topics</p>
            </div>
            
            <div className="category-card">
              <h3 className="category-title">Debate</h3>
              <p className="category-description">Engage in intellectual discussions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentLanding;