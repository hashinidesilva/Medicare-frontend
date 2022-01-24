import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PatientForm from "./PatientForm";
import axios from "axios";
import { Box } from "@mui/material";

const EditPatient = () => {
  const [patient, setPatient] = useState({});
  const params = useParams();
  const {patientId} = params;

  useEffect(async () => {
    const response = await axios.get(`http://localhost:8080/patients/${patientId}`);
    const data = await response.data;
    setPatient(data);
  }, []);

  const submitHandler = async (patient) => {
    await fetch("http://localhost:8080/patients", {
      method: 'PUT',
      body: JSON.stringify(patient),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // const data = await response.json();
  };

  return (
    <Box sx={{margin: "20px", width: '75%', justifyContent: "center"}}>
      <PatientForm onAddPatient={submitHandler} patient={patient}/>
    </Box>
  );
};

export default EditPatient;