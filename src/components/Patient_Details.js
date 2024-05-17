import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Search_Bar from './Search_Bar';
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
      setPatients(response.data || []); 
      setFilteredPatients(response.data || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleSearch = (query) => {
    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(query.toLowerCase()) ||
      patient.mobile.includes(query) ||
      patient.email.toLowerCase().includes(query.toLowerCase()) ||
      (patient.appointments && patient.appointments.some(
        (appointment) =>
          appointment.details.toLowerCase().includes(query.toLowerCase()) ||
          appointment.appointment_date.includes(query) ||
          appointment.appointment_time.includes(query)
      ))
    );
    setFilteredPatients(filtered);
  };

  const handleViewDetails = (id) => {
    navigate(`/appointments/${id}/details`);
  };

  return (
    <div className="patient-list-container">
      <h2>Patient Details</h2>
      <Search_Bar onSearch={handleSearch} />
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
            <th>Appointments</th>
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
              <td>
              
                <ul>
                  {patient.appointments && patient.appointments.map((appointment) => (
                    <li key={appointment.id}>
                      {appointment.details} - {appointment.appointment_date} {appointment.appointment_time}
                    </li>
                  ))}
                </ul>
                <td>
                <button onClick={() => handleViewDetails(patient.id)}>View Appointment Details</button>
              </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patient_List;