import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Patient_Card = ({ patient_id }) => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/patients/${patient_id}`);
      setPatient(response.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  const { name, age, gender, mobile, email, address, medical_history, policy_no, emergency_contact } = patient;

  return (
    <div className="patient-card-container">
      <div className="patient-card">
        <h3>{name}</h3>
        <p>Age: {age}</p>
        <p>Gender: {gender}</p>
        <p>Mobile: {mobile}</p>
        <p>Email: {email}</p>
        <p>Address: {address}</p>
        <p>Medical History: {medical_history}</p>
        <p>Policy Number: {policy_no}</p>
        <p>Emergency Contact: {emergency_contact}</p>
      </div>
    </div>
  );
};

export default Patient_Card;