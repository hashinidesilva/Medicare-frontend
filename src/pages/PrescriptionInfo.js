import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import PatientInfoCard from "../components/patient/PatientInfoCard";
import MedicationsTable from "../components/patient/MedicationsTable";

const PrescriptionInfo = () => {
  const [prescription, setPrescription] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const {prescriptionId, patientId} = params;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:8080/medicare/v1/prescriptions/${prescriptionId}`);
      const data = await response.data;
      setPrescription(data);
    }

    fetchData();
  }, [prescriptionId]);

  const {patient, diagnosis, history, medicines} = prescription;
  const isHistoryPage = window.location.href.indexOf("history") > -1;

  return (
    <Paper elevation={3} sx={{padding: 2}}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <PatientInfoCard patient={patient}/>
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/*<TextField*/}
              {/*  id="history"*/}
              {/*  label="History and Management"*/}
              {/*  type="text"*/}
              {/*  InputProps={{*/}
              {/*    readOnly: true,*/}
              {/*  }}*/}
              {/*  fullWidth*/}
              {/*>*/}
              {/*  {date}*/}
              {/*</TextField>*/}

              <Box sx={{width: "97%", border: 1, borderRadius: 1, padding: 1, borderColor: "#808080"}}>
                <Typography variant="subtitle2" color="#808080">History and Management</Typography>
                <Typography>{history}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              {/*<TextField*/}
              {/*  id="diagnosis"*/}
              {/*  label="Diagnosis"*/}
              {/*  type="text"*/}
              {/*  InputProps={{*/}
              {/*    readOnly: true,*/}
              {/*  }}*/}
              {/*  fullWidth*/}
              {/*>*/}
              {/*  {diagnosis ?? ' '}*/}
              {/*</TextField>*/}
              <Box sx={{width: "97%", border: 1, borderRadius: 1, padding: 1, borderColor: "#808080"}}>
                <Typography variant="subtitle2" color="#808080">Diagnosis</Typography>
                <Typography paragraph={true}>{diagnosis}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <MedicationsTable medications={medicines}/>
        </Grid>
        {!isHistoryPage && (
          <Grid item xs={3}>
            <Stack direction={"row"} spacing={2}>
              <Button variant="contained" sx={{backgroundColor: "#b25600"}}
                      onClick={() => navigate(`edit`)}>Edit</Button>
              <Button variant="contained" sx={{backgroundColor: "#0003b2"}}
                      onClick={() => navigate("/patients")}>Confirm</Button>
            </Stack>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default PrescriptionInfo;