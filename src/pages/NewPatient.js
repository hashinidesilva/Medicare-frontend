import { useState } from "react";

import { Box } from "@mui/material";
import PatientForm from "../components/patients/PatientForm";
import PrescriptionTable from "../components/patients/PrescriptionTable";

const NewPatient = () => {
  const [newPatient, setNewPatient] = useState({});
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);

  const submitHandler = async (patient) => {
    const response = await fetch("http://localhost:8080/patients", {
      method: 'POST',
      body: JSON.stringify(patient),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    setNewPatient(data);
    setShowPrescriptionForm(true);
  };

  return (
    <Box sx={{margin: '20px', width: '75%'}}>
      {!showPrescriptionForm && <PatientForm onAddPatient={submitHandler}/>}
      {showPrescriptionForm && <PrescriptionTable patient={newPatient}/>}
    </Box>
  );
};

export default NewPatient;