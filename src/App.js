import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Patient_List from './components/Patient_List';
import Update_Patient from './components/Update_Patient';
import Patient_Details from './components/Patient_Details';
import Patient_Form from './components/Patient_Form';
import Appointment_Details from './components/Appointment_Details';
import Appointment_List from './components/Appointment_List';
import Appointment_Form from './components/Appointment_Form';
import Payment_Form from './components/Payment_Form';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/patients" element={<Patient_List />} />
          <Route path="/patients/create" element={<Patient_Form />} />
          <Route path="/patients/${id}" element={<Update_Patient />} />
          <Route path="/patients/details" element={<Patient_Details />} />
          <Route path="/appointments/create" element={<Appointment_Form />} />
          <Route path="/appointments/:appointment_id/details" element={<Appointment_Details/>} />
          <Route path="/appointments/List" element={<Appointment_List/>} />
          <Route path="/appointments/payment" element={<Payment_Form />}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
