import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Search_Bar from './Search_Bar'; // Assuming Search_Bar is in the same folder
import '../styles/PatientList.css';

const Patient_List = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/patients');
      setPatients(response.data);
      setFilteredPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleSearch = (query) => {
    const filtered = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(query.toLowerCase()) ||
        patient.mobile.includes(query) ||
        patient.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  const handleAddPatient = () => {
    navigate('/patients/create');
  };

  const handleUpdatePatient = (id) => {
    navigate('/patients/${id}');
  };

  const handleDeletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/patients/${id}`);
      fetchPatients(); // Refresh patient list after deletion
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div className="patient-list-container">
      <h2>Patient List</h2>
      <Search_Bar onSearch={handleSearch} />
      
      <button onClick={handleAddPatient}>Add Patient</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Address</th>
            <th>Medical History</th>
            <th>Policy No</th>
            <th>Emergency Contact</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.mobile}</td>
              <td>{patient.email}</td>
              <td>{patient.address}</td>
              <td>{patient.medical_history}</td>
              <td>{patient.policy_no}</td>
              <td>{patient.emergency_contact}</td>
              <td className="patient-actions">
                <button onClick={() => handleUpdatePatient(patient.id)}>Update</button>
                <button onClick={() => handleDeletePatient(patient.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patient_List;