import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Paper } from "@mui/material";
import PatientForm from "../../components/patient/PatientForm";

const NewPatient = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const submitHandler = async (patient) => {
    try {
      const response = await fetch("http://localhost:8080/medicare/v1/patients", {
        method: 'POST',
        body: JSON.stringify(patient),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP status ${response.status}: ${errorData}`);
      }
      const savedPatientId = await response.json();
      navigate(`/patients/${savedPatientId}/prescriptions/create`);
    } catch (error) {
      setError('Failed to add patient: ' + error.message);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center"}}>
      <Paper elevation={3} sx={{width: "75%", padding: 2}}>
        <PatientForm onAddPatient={submitHandler} error={error}/>
      </Paper>
    </Box>
  );
};

export default NewPatient;