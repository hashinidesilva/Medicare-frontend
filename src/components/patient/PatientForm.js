import { useState } from "react";

import { Box, Button, Grid, TextField } from "@mui/material";

const PatientForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);

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
  };

  return (
    <Box sx={{margin: '20px', width: '800px', display: "flex", justifyContent: "center", alignItems: "center"}}>
      <form onSubmit={submitHandler}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <TextField
              id="date"
              label="Date"
              type="date"
              variant="outlined"
              InputLabelProps={{shrink: true}}
            />
          </Grid>
          <Grid item>
            <TextField
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
  );
};

export default PatientForm;