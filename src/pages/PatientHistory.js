import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import PatientInfoCard from "../components/patient/PatientInfoCard";
import { Grid, Paper } from "@mui/material";
import PrescriptionsTable from "../components/patient/PrescriptionsTable";

const PatientHistory = () => {
  const [patient, setPatient] = useState({});
  const params = useParams();
  const {patientId} = params;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:8080/medicare/v1/patients/${patientId}`);
      const data = await response.data;
      setPatient(data);
    }

    fetchData();
  }, [patientId]);

  return (
    <Paper elevation={3} sx={{padding: 2}}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={4}>
          <PatientInfoCard patient={patient}/>
        </Grid>
        <Grid item xs={12}>
          <PrescriptionsTable prescriptions={patient.prescriptions}/>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PatientHistory;