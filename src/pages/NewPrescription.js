import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { Box, Grid, TextField } from "@mui/material";
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
  const params = useParams();
  const navigate = useNavigate();
  const prescriptionCtx = useContext(PrescriptionContext);

  const {patientId} = params;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:8080/patients/${patientId}`);
      const data = await response.data;
      setPatient(data);
    }

    fetchData();
  }, [patientId]);

  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };

  const prescriptionSubmitHandler = async (medication) => {
    const prescription = {...medication, date: date};
    const response = await fetch("http://localhost:8080/prescriptions", {
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
    <Box sx={{margin: '20px'}}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <PatientInfoCard patient={patient}/>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={3} >
            <Grid item xs={6}>
              <TextField
                id="date"
                label="Date"
                type="datetime-local"
                value={date}
                variant="outlined" x
                InputLabelProps={{shrink: true}}
                onChange={dateChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="diagnosis"
                multiline
                rows={3}
                label="Diagnosis"
                variant="outlined"
                InputLabelProps={{shrink: true}}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <MedicationsForm patient={patient} onSubmit={prescriptionSubmitHandler}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewPrescription;