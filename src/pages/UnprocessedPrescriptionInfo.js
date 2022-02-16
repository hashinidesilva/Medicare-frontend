import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Paper } from "@mui/material";
import PatientInfoCard from "../components/patient/PatientInfoCard";
import MedicationsTable from "../components/patient/MedicationsTable";

const UnprocessedPrescriptionInfo = () => {
  const [prescription, setPrescription] = useState({});
  const [open, setOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
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

  const prescriptionUpdateHandler = async () => {
    const updatedPrescription = {
      id: prescriptionId,
      patientId: patient.id,
      date: date,
      diagnosis: diagnosis,
      processed: true
    };
    const response = await fetch(`http://localhost:8080/medicare/v1/prescriptions/${prescriptionId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedPrescription),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await response.data;
    setOpen(false);
    navigate("/prescriptions");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmationPopup = (
    <Dialog
      maxWidth={"sm"}
      fullWidth={true}
      open={open}
      onClose={handleClose}
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Mark prescription as Done
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={prescriptionUpdateHandler} autoFocus>Yes</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Paper elevation={3} sx={{padding: 2, width: "100%"}}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={4}>
          <PatientInfoCard patient={patient}/>
        </Grid>
        <Grid item xs={12}>
          <MedicationsTable medications={medicines}/>
        </Grid>
        <Grid item>
          <Button variant="contained" size="large" onClick={handleClickOpen}>Processed</Button>
          {confirmationPopup}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UnprocessedPrescriptionInfo;