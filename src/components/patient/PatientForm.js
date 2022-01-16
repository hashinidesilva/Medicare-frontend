import { useState } from "react";

import { Box, Button, Stack, TextField, Toolbar } from "@mui/material";

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
      mode: 'no-cors',
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
    <Box sx={{margin: '20px', width: '800px'}}>
      <Toolbar/>
      <form onSubmit={submitHandler}>
        <Stack spacing={3}>
          <TextField id="date" label="Date" type="date" variant="outlined" InputLabelProps={{shrink: true}}/>
          <TextField id="name" label="Patient Name" type="text" variant="outlined" value={name} onChange={nameChangeHandler}/>
          <TextField id="age" label="Age" type="number" variant="outlined" value={age} onChange={ageChangeHandler}/>
          <Button variant="contained" type="submit">Submit</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default PatientForm;