import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { Box, Grid, Paper, Typography } from "@mui/material";
import PatientInfoCard from "../components/patient/PatientInfoCard";
import MedicationsTable from "../components/patient/MedicationsTable";

const PrescriptionInfo = () => {
  const [prescription, setPrescription] = useState({});
  const params = useParams();
  const {prescriptionId} = params;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:8080/medicare/v1/prescriptions/${prescriptionId}`);
      const data = await response.data;
      setPrescription(data);
    }

    fetchData();
  }, [prescriptionId]);

  const {patient, date, diagnosis, medicines} = prescription;

  return (
    <Paper elevation={3} sx={{padding: 2}}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={4}>
          <PatientInfoCard patient={patient}/>
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box sx={{border: 1, borderRadius: 1, padding: 1, borderColor: "#808080"}}>
                <Typography variant="subtitle1" color="#808080">Date</Typography>
                <Typography>{date}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{width: "90%", border: 1, borderRadius: 1, padding: 1, borderColor: "#808080"}}>
                <Typography variant="subtitle1" color="#808080">Diagnosis</Typography>
                <Typography paragraph={true}>{diagnosis}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <MedicationsTable medications={medicines}/>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PrescriptionInfo;