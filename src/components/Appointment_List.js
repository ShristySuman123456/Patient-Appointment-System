import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Search_Bar from './Search_Bar'; // Assuming SearchBar is in the same folder

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/appointments');
      setAppointments(response.data);
      setFilteredAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleSearch = (query) => {
    const filtered = appointments.filter(
      (appointment) =>
        appointment.patientName.toLowerCase().includes(query.toLowerCase()) ||
        appointment.date.toLowerCase().includes(query.toLowerCase()) ||
        appointment.time.includes(query)
    );
    setFilteredAppointments(filtered);
  };

  const handleAddAppointment = () => {
    navigate('/appointments/create');
  };


  return (
    <div className="appointment-list-container">
      <h2>Appointment List</h2>
      <Search_Bar onSearch={handleSearch} />
      
      <button onClick={handleAddAppointment}>Add Appointment</button>
      <table>
        <thead>
          <tr>
            <th>Patient Id</th>
            <th>Details</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.patient_id}</td>
              <td>{appointment.details}</td>
              <td>{appointment.appointment_date}</td>
              <td>{appointment.appointment_time}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;