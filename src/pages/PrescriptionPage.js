import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { Box, Grid } from "@mui/material";
import PatientInfoCard from "../components/patient/PatientInfoCard";
import PrescriptionForm from "../components/patient/PrescriptionForm";

const PrescriptionPage = () => {
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
    <Box sx={{margin: '20px', display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Grid container spacing={4} direction="column">
        <Grid item>
          <PatientInfoCard patient={patient}/>
        </Grid>
        <Grid item>
          <PrescriptionForm patient={patient}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PrescriptionPage;