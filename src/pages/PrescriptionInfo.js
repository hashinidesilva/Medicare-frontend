import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { Box, Stack } from "@mui/material";
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
      console.log("DATA", data);
      setPrescription(data);
    }

    fetchData();
  }, [prescriptionId]);

  const {patient, medicines} = prescription;

  return (
    <Box sx={{margin: '20px', display: "flex"}}>
      <Stack sx={{width: '100%'}} spacing={2}>
        <PatientInfoCard patient={patient}/>
        <MedicationsTable medications={medicines}/>
      </Stack>
    </Box>
  );
};

export default PrescriptionInfo;