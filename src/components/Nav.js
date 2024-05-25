import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Nav.css';

const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = () => {
      localStorage.clear();
      navigate('login')
  }

  return (
      <div className="header"><h1>Patient Appointment System</h1>
      {auth ?
        <ul className='nav-ul nav-bar sticky-top'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/patients">Patients</Link></li>
          <li><Link to="/patients/create">Add Patient</Link></li>
          <li><Link to="/patients/details">Patient Details</Link></li>
          <li><Link to="/appointments/create">Book Appointment</Link></li>
          <li><Link to="/appointments/list">Appointment List</Link></li>

          <li><Link to="/appointments/payment">Make Payment</Link></li>
          <li><Link onClick={logout} to="/login">Logout{auth.user} </Link></li>
        </ul>
        :
        <ul className='nav-ul nav-right'>
          <li><Link to="/login" className="btn-secondary">Login</Link></li>
          <li><Link to="/signup" className="btn-secondary">Signup</Link></li>
        </ul>
      }
      </div>
  );
};

export default Nav;