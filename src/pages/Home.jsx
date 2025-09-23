import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import ParticipationForm from '../components/ParticipationForm';

const Home = () => {
  return (
    <div className="home">
      <div className="home-intro">
        <h2 className="home-title">Fresher's Fiesta 2K25</h2>
        <p className="home-subtitle">
          Welcome to MPGI's biggest celebration of the year!
        </p>
        <div className="home-actions">
          <Link to="/admin" className="student-landing-button">
            Admin Portal
          </Link>
        </div>
      </div>
      
      <ParticipationForm />
    </div>
  );
};

export default Home;