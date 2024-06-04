import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { Grid, Paper, TextField } from "@mui/material";
import MedicationsForm from "../components/patient/MedicationsForm";
import MedicationPatientInfoCard from "../components/patient/MedicationPatientInfoCard";
import PatientAllergiesCard from "../components/patient/PatientAllergiesCard";

const NewPrescription = () => {
  const [patient, setPatient] = useState({});
  const [diagnosis, setDiagnosis] = useState("");
  const [history, setHistory] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const {patientId, prescriptionId} = params;

  useEffect(async () => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8080/medicare/v1/patients/${patientId}`);
        const data = response.data;
        setPatient(data);
      } catch (err) {
        navigate("/");
      }
    }

    async function fetchPrescriptionData() {
      try {
        const response = await axios.get(`http://localhost:8080/medicare/v1/prescriptions/${prescriptionId}`);
        const data = response.data;
        setDiagnosis(data.diagnosis);
        setHistory(data.history);
        setMedicines(data.medicines);
      } catch (err) {
        navigate("/");
      }
    }

    fetchData();
    if (prescriptionId !== undefined) {
      fetchPrescriptionData();
    }
  }, [patientId, prescriptionId]);

  console.log("WWWW", medicines);

  const prescriptionSubmitHandler = async (medication) => {
    const prescription = {...medication, diagnosis: diagnosis, history: history};
    try {
      const response = await fetch("http://localhost:8080/medicare/v1/prescriptions", {
        method: 'POST',
        body: JSON.stringify(prescription),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP status ${response.status}: ${errorData}`);
      }
      const prescriptionId = await response.text();
      navigate(`/patients/${patientId}/prescriptions/${prescriptionId}`);
    } catch (error) {
      setError('Failed to submit prescription: ' + error.message);
    }
  };

  return (
    <Paper elevation={3} sx={{padding: 2}}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Grid container spacing={3.5}>
            <Grid item xs={12}>
              <MedicationPatientInfoCard patient={patient}/>
            </Grid>
            <Grid item xs={12}>
              <PatientAllergiesCard allergies={patient.allergies}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={history}
                fullWidth
                id="history"
                multiline
                rows={3}
                label="History and Management"
                type={"text"}
                onChange={(event) => setHistory(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={diagnosis}
                fullWidth
                id="diagnosis"
                multiline
                rows={3}
                label="Diagnosis"
                onChange={(event) => setDiagnosis(event.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <MedicationsForm patient={patient} onSubmit={prescriptionSubmitHandler} error={error}
                           medicines={medicines}/>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NewPrescription;