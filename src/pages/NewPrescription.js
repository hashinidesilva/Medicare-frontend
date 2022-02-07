import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { Grid, Paper, TextField } from "@mui/material";
import PatientInfoCard from "../components/patient/PatientInfoCard";
import MedicationsForm from "../components/patient/MedicationsForm";
import PrescriptionContext from "../store/prescription-context";

const getTodayDate = () => {
  let date = new Date(),
    month = '' + (date.getMonth() + 1),
    day = '' + date.getDate(),
    year = date.getFullYear(),
    hours = date.getHours().toString(),
    minutes = date.getMinutes().toString();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  if (hours.length < 2)
    hours = '0' + hours;
  if (minutes.length < 2)
    minutes = '0' + minutes;
  return [year, month, day].join('-') + "T" + [hours, minutes].join(':');
};

const NewPrescription = () => {
  const [patient, setPatient] = useState({});
  const [date, setDate] = useState(getTodayDate());
  const [diagnosis, setDiagnosis] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const prescriptionCtx = useContext(PrescriptionContext);

  const {patientId} = params;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:8080/medicare/v1/patients/${patientId}`);
      const data = await response.data;
      setPatient(data);
    }

    fetchData();
  }, [patientId]);

  const prescriptionSubmitHandler = async (medication) => {
    const prescription = {...medication, date: date, diagnosis: diagnosis};
    const response = await fetch("http://localhost:8080/medicare/v1/prescriptions", {
      method: 'POST',
      body: JSON.stringify(prescription),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const savedPrescription = await response.data;
    prescriptionCtx.addItem(savedPrescription);
    navigate("/patients");
  };

  return (
    <Paper elevation={3} sx={{padding: 2}}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <PatientInfoCard patient={patient}/>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                id="date"
                label="Date"
                type="datetime-local"
                value={date}
                InputLabelProps={{shrink: true}}
                onChange={(event) => setDate(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
          <MedicationsForm patient={patient} onSubmit={prescriptionSubmitHandler}/>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NewPrescription;