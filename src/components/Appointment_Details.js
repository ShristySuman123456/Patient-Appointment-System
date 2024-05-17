import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Appointment_Form.css'; // Import the CSS file

const Appointment_Details = () => {
  const { patient_id } = useParams(); // Capture the patientId from the URL
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!patient_id) {
      setMessage('No patient ID provided');
      setLoading(false);
      return;
    }

    // Fetch the appointment data when the component mounts
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/patients/${patient_id}/appointments`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [patient_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="patient-appointments-container">
      <h1>Patient Appointments</h1>
      {message && <p className="message">{message}</p>}
      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              <p><strong>Id:</strong> {appointment.id}</p>
              <p><strong>Details:</strong> {appointment.details}</p>
              <p><strong>Appointment Date:</strong> {appointment.appointment_date}</p>
              <p><strong>Appointment Time:</strong> {appointment.appointment_time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Appointment_Details;