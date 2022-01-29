import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { Box, Grid } from "@mui/material";
import PatientInfoCard from "../components/patient/PatientInfoCard";
import MedicationsTable from "../components/patient/MedicationsTable";

const PrescriptionInfo = () => {
  const [prescription, setPrescription] = useState({});
  const params = useParams();
  const {prescriptionId} = params;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:8080/prescriptions/${prescriptionId}`);
      const data = await response.data;
      setPrescription(data);
    }

    fetchData();
  }, [prescriptionId]);

  const {patient, medicines} = prescription;

  return (
    <Box sx={{margin: '20px', display: "flex"}}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={4}>
          <PatientInfoCard patient={patient}/>
        </Grid>
        <Grid item xs={12}>
          <MedicationsTable medications={medicines}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PrescriptionInfo;