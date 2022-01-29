import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Divider, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";

const genderList = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
  {
    value: 'Non-binary',
    label: 'None-binary',
  }
];

const PatientForm = (props) => {
  const {patient} = props;
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState(genderList[0].value);
  const navigate = useNavigate();

  useEffect(() => {
    if (patient) {
      setName(patient.name);
      setAge(patient.age);
      setGender(patient.gender);
    }
  }, [patient]);

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setAge(event.target.value);
  };

  const genderChangeHandler = (event) => {
    setGender(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const newPatient = {
      name: name,
      age: age,
      gender: gender,
    };
    props.onAddPatient(newPatient);
  };

  return (
    <Box sx={{border: 1, borderColor: "ActiveCaption", width: "75%"}} component={Paper}>
      <Box
        sx={{
          display: "flex",
          alignItems: 'center',
          height: 70,
          justifyContent: "center"
        }}>
        <Typography variant="h4">Patient Form</Typography>
      </Box>
      <Divider/>
      <form onSubmit={submitHandler} style={{margin: '20px'}}>
        <Stack spacing={4}>
          <TextField
            fullWidth
            id="name"
            label="Patient name"
            type="text"
            variant="outlined"
            value={name}
            onChange={nameChangeHandler}
          />
          <TextField
            fullWidth
            id="age"
            label="Age"
            type="number"
            variant="outlined"
            value={age}
            onChange={ageChangeHandler}/>
          <TextField
            fullWidth
            id="gender"
            select
            label="Gender"
            value={gender || genderList[0].value}
            onChange={genderChangeHandler}
          >
            {genderList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Stack direction="row" spacing={4}>
            <Button
              variant="contained"
              type="submit"
              sx={{backgroundColor: "#1a14c2"}}
            >
              Save
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate(-1)}
              sx={{backgroundColor: "#c27114"}}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default PatientForm;