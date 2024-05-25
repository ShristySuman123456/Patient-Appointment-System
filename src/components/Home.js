import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to Patient Management System</h1>
          <p>A platform to manage patient information efficiently.</p>
          <Link to="/patients" className="btn-primary">View Patients</Link>
          <Link to="/patients/create" className="btn-primary">Add New Patient</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;