import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import {
  Button, Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Paper, Typography
} from "@mui/material";
import PatientInfoCard from "../../components/patient/PatientInfoCard";
import PrescriptionsTable from "../../components/prescription/PrescriptionsTable";

const PrescriptionInfo = () => {
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

  const {patient, diagnosis, history, medicines} = prescription;

  const prescriptionUpdateHandler = async () => {
    const updatedPrescription = {
      id: prescriptionId,
      patientId: patient.id,
      diagnosis: diagnosis,
      history: history,
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
    navigate(`/prescriptions/${prescriptionId}/pdf`);
    return () => {
      setPrescription({});
    };
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handlePdfOpen = () => {
    navigate(`/prescriptions/${prescriptionId}/pdf`);
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
        {/*<DialogContentText id="alert-dialog-description">*/}
        <Typography variant="h7">
          Mark prescription as Done
        </Typography>
        {/*</DialogContentText>*/}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{backgroundColor: "#b25600"}}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{backgroundColor: "#0003b2"}}
          onClick={prescriptionUpdateHandler}
          autoFocus
        >Yes
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Paper elevation={3} sx={{padding: 2}}>
      <Grid container spacing={2} justifyContent="flex-start">
        <Grid item xs={12}>
          <Grid container spacing={5} justifyContent="space-between" alignItems="flex-start">
            <Grid item xs={5}>
              <PatientInfoCard patient={patient}/>
            </Grid>
            <Grid item>
              <Chip label={`No of Items: ${medicines?.length}`} color="warning" sx={{fontSize: 20}}>
              </Chip>

            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <PrescriptionsTable medications={medicines}/>
        </Grid>
        {!prescription?.processed &&
          <Grid item>
            <Button variant="contained" size="large" onClick={handleClickOpen}>Processed</Button>
            {confirmationPopup}
          </Grid>
        }
        {prescription?.processed &&
          <Grid item>
            <Button variant="contained" sx={{backgroundColor: "#0003b2"}} onClick={handlePdfOpen}>Show PDF</Button>
          </Grid>
        }
      </Grid>
    </Paper>
  );
};

export default PrescriptionInfo;