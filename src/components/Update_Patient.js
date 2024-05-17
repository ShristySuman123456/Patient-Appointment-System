import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/UpdatePatient.css'; // Import the CSS file

const Update_Patient = () => {
  const { id } = useParams();
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: '',
    mobile: '',
    email: '',
    address: '',
    medical_history: '',
    policy_no: '',
    emergency_contact: '',
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the patient data when the component mounts
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/patients/${id}`);
        const data = await response.json();
        setPatientData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = patientData;

    try {
      const response = await fetch(`http://localhost:8080/patients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });
      if (response.ok) {
        setMessage('Patient updated successfully');
      } else {
        setMessage(`Failed to update patient : ${patientData.detail}`);
      }
    } catch (error) {
      console.error('Error updating patient:', error);
      setMessage('Failed to update patient');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="update-patient-container">
      <h1>Update Patient</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={patientData.name} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input type="number" name="age" value={patientData.age} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <input type="radio" name="female" value={patientData.gender} onChange={handleChange} required />Female
          <input type="radio" name="male" value={patientData.gender} onChange={handleChange} required />Male
          <input type="radio" name="others" value={patientData.gender} onChange={handleChange} required />Others
        </div>
        <div className="form-group">
          <label>Mobile:</label>
          <input type="number" name="mobile" value={patientData.mobile} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="text" name="email" value={patientData.email} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input type="text" name="address" value={patientData.address} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <label>Medical History:</label>
          <input type="text" name="medical_history" value={patientData.medical_history} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <label>Policy No:</label>
          <input type="text" name="policy_no" value={patientData.policy_no}  onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Emergency Contact:</label>
          <input type="text" name="emergency_contact" value={patientData.emergency_contact}  onChange={handleChange} required />
        </div>
        <div className="form-group">
          <button type="submit">Update Patient</button>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Update_Patient;