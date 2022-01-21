import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const PatientForm = (props) => {
  const patient = props.patient;
  const [name, setName] = useState(patient ? patient.name : '');
  const [age, setAge] = useState(patient ? patient.age : 0);
  const navigate = useNavigate();

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setAge(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const newPatient = {
      name: name,
      age: age
    };
    const response = await fetch("http://localhost:8080/patients", {
      method: 'POST',
      body: JSON.stringify(newPatient),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log("DATA:", data);
    navigate("/prescriptions");
  };

  return (
    <Box sx={{margin: '20px', width: '75%', border: 1}}>
      <Box
        sx={{
          display: "flex",
          alignItems: 'center',
          width: "100%",
          height: 70,
          backgroundColor: 'primary.dark',
        }}>
        <Typography mx={2} color="#FFFFFF" variant="h4">Patient Form</Typography>
      </Box>
      <Box sx={{margin: '20px'}}>
        <form onSubmit={submitHandler}>
          <Grid container direction="column" spacing={3} sx={{flexGrow: 1}}>
            <Grid item>
              <TextField
                fullWidth
                id="date"
                label="Date"
                type="date"
                variant="outlined"
                InputLabelProps={{shrink: true}}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="name"
                label="Patient name"
                type="text"
                variant="outlined"
                value={name}
                onChange={nameChangeHandler}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="age"
                label="Age"
                type="number"
                variant="outlined"
                value={age}
                onChange={ageChangeHandler}/>
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit">Submit</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default PatientForm;