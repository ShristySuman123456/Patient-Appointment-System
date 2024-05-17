import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Appointment_Form.css'; // Import CSS file for styling

const Appointment_Form = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    patient_id: '',
    details: '',
    appointment_date: '',
    appointment_time: '',
  });

  // State to store the list of patients
  const [patients, setPatients] = useState([]);

  // Fetch list of patients from the backend API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8080/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
        
      }
    };

    fetchPatients();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/appointments', formData);
      console.log(response.data); // Handle successful response
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <div className="appointment-form-container">
      <h2>Create New Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="patient_id">Select Patient:</label>
          <select id="patient_id" name="patient_id" value={formData.patient_id} onChange={handleChange}>
            <option value="">Select a patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="details">Appointment Details:</label>
          <textarea id="details" name="details" value={formData.details} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="appointment_date">Appointment Date:</label>
          <input type="date" id="appointment_date" name="appointment_date" value={formData.appointment_date} onChange={handleChange}></input>
        </div>
        <div className="form-group">
          <label htmlFor="appointment_time">Appointment Time:</label>
          <input type="time" id="appointment_time" name="appointment_time" value={formData.appointment_time} onChange={handleChange}></input>
        </div>
        <button type="submit" className="btn-primary">Create Appointment</button>
      </form>
    </div>
  );
};

export default Appointment_Form;