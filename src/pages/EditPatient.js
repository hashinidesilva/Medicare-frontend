import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PatientForm from "../components/patient/PatientForm";
import axios from "axios";
import { Box } from "@mui/material";

const EditPatient = () => {
  const [patient, setPatient] = useState({name: '', age: 0});
  const navigate = useNavigate();
  const params = useParams();
  const {patientId} = params;

  useEffect(async () => {
    const response = await axios.get(`http://localhost:8080/patients/${patientId}`);
    const data = await response.data;
    setPatient(data);
  }, [patientId]);

  const submitHandler = async (patient) => {
    await fetch(`http://localhost:8080/patients/${patientId}`, {
      method: 'PUT',
      body: JSON.stringify(patient),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    navigate(-1);
  };

  return (
    <Box sx={{margin: "20px", width: '75%', justifyContent: "center"}}>
      <PatientForm onAddPatient={submitHandler} patient={patient}/>
    </Box>
  );
};

export default EditPatient;