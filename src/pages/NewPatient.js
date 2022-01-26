import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import PatientForm from "../components/patient/PatientForm";

const NewPatient = () => {
  const navigate = useNavigate();

  const submitHandler = async (patient) => {
    const response = await fetch("http://localhost:8080/patients", {
      method: 'POST',
      body: JSON.stringify(patient),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const savedPatient = await response.json();
    navigate(`/patients/${savedPatient.id}/prescriptions`);
  };

  return (
    <Box sx={{margin: '20px', width: '75%'}}>
      <PatientForm onAddPatient={submitHandler}/>
    </Box>
  );
};

export default NewPatient;