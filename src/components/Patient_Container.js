import React, { useState } from 'react';
import Patient_Form from './Patient_Form';
import Patient_Card from './Patient_Card';

const Patient_Container = () => {
  const [patientData, setPatientData] = useState(null);

  const handlePatientData = (data) => {
    setPatientData(data);
  };

  return (
    <div className="patient-container">
      <Patient_Form onPatientData={handlePatientData} />
      {patientData && <Patient_Card patient={patientData} />}
    </div>
  );
};

export default Patient_Container;