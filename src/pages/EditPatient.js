import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PatientForm from "../components/patient/PatientForm";
import axios from "axios";
import { Box, Paper } from "@mui/material";

const initialState = {name: '', age: 0, nic: '', allergies: '', tpNumber: '', address: ''};

const EditPatient = () => {
  const [patient, setPatient] = useState(initialState);
  const navigate = useNavigate();
  const params = useParams();
  const {patientId} = params;

  useEffect(async () => {
    const response = await axios.get(`http://localhost:8080/medicare/v1/patients/${patientId}`);
    const data = await response.data;
    setPatient(data);
  }, [patientId]);

  const submitHandler = async (patient) => {
    console.log("QQQ", patient);
    await fetch(`http://localhost:8080/medicare/v1/patients/${patientId}`, {
      method: 'PUT',
      body: JSON.stringify(patient),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    navigate(-1);
  };

  return (
    <Box sx={{marginTop: "50px", display: "flex", justifyContent: "center"}}>
      <Paper elevation={3} sx={{width: "75%", padding: 2}}>
        <PatientForm onAddPatient={submitHandler} patient={patient}/>
      </Paper>
    </Box>
  );
};

export default EditPatient;