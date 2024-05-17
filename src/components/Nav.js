import React from "react";
import { Link } from 'react-router-dom';
import '../styles/Nav.css'; // Import the CSS file for navigation styling

const Nav = () => {
  return (
    <nav>
    <div class="header"><h1>Patient Appointment System</h1></div>
      <ul className='nav-ul  nav-bar.sticky-top nav ul nav ul li '>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/patients">Patients</Link></li>
        <li><Link to="/patients/create">Create Patient</Link></li>
        <li><Link to="/patients/details">Patient Details</Link></li>
        <li><Link to="/appointments/create">Create Appointment</Link></li>
        <li><Link to="/appointments/List">Appointment List</Link></li>
        <li><Link to="/appointments/payment">Make Payment</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;