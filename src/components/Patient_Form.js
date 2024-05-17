import React, { useState} from 'react';
import axios from 'axios';
import '../styles/PatientForm.css';

const Patient_Form = ({ onPatientData }) => {
  const [formData, setFormData] = useState({
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


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await axios.post('http://localhost:8080/patients', formData);
      console.log(response.data);

      if (typeof onPatientData === 'function') {
        onPatientData(response.data); // Pass the new patient data back to the parent
      } else {
        console.error('Error: onPatientData is not a function');
      }
      // Clear form fields after successful submission
      setFormData({
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
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <input type="radio" id="male" name="gender" value="male" onChange={handleChange} /> Male
          <input type="radio" id="female" name="gender" value="female" onChange={handleChange} /> Female
          <input type="radio" id="other" name="gender" value="other" onChange={handleChange} /> Other
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile Number:</label>
          <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea name="address" rows={6} cols={50} onChange={handleChange} value={formData.address} />
        </div>
        <div className="form-group">
          <label>Medical History:</label>
          <textarea name="medical_history" rows={6} cols={50} onChange={handleChange} value={formData.medical_history} />
        </div>
        <div className="form-group">
          <label htmlFor="policy_no">Policy Number:</label>
          <input type="text" id="policy_no" name="policy_no" value={formData.policy_no} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="emergency_contact">Emergency Contact:</label>
          <input type="text" id="emergency_contact" name="emergency_contact" value={formData.emergency_contact} onChange={handleChange} />
        </div>
        <button type="submit">Create Patient</button>
      </form>
    </div>
  );
};


export default Patient_Form;