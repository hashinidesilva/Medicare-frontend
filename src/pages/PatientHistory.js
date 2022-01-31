import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";
import PatientInfoCard from "../components/patient/PatientInfoCard";
import { Box, Grid } from "@mui/material";

const PatientHistory = () => {
  const [patient, setPatient] = useState({});
  const params = useParams();
  const {patientId} = params;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:8080/patients/${patientId}`);
      const data = await response.data;
      setPatient(data);
    }

    fetchData();
  }, [patientId]);

  return (
    <Box sx={{margin: '20px', display: "flex"}}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={4}>
          <PatientInfoCard patient={patient}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientHistory;