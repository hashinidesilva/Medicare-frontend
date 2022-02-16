import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Divider, MenuItem, Stack, TextField, Typography } from "@mui/material";
import useInput from "../../hooks/useInput";

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
  const navigate = useNavigate();
  const {patient} = props;

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler
  } = useInput(value => value.trim() !== '', '');

  const {
    value: age,
    isValid: ageIsValid,
    hasError: ageHasError,
    valueChangeHandler: ageChangeHandler,
    inputBlurHandler: ageBlurHandler
  } = useInput(value => value > 0, 0);

  const {
    value: gender,
    isValid: genderIsValid,
    hasError: genderHasError,
    valueChangeHandler: genderChangeHandler,
    inputBlurHandler: genderBlurHandler
  } = useInput(value => genderList.map(item => item.value).includes(value), genderList[0].value);

  useEffect(() => {
    if (patient) {
      nameChangeHandler(patient.name);
      ageChangeHandler(patient.age);
      genderChangeHandler(patient.gender);
    }
  }, [patient, nameChangeHandler, ageChangeHandler, genderChangeHandler]);

  const formIsValid = nameIsValid && ageIsValid && genderIsValid;

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
    <Box sx={{border: 1, borderColor: "#1e88e5"}}>
      <Box
        sx={{
          display: "flex",
          alignItems: 'center',
          height: 70,
          justifyContent: "center",
          backgroundColor: "#1e88e5"
        }}>
        <Typography variant="h4" color="#ffffff">Patient Form</Typography>
      </Box>
      <Divider/>
      <form onSubmit={submitHandler} style={{margin: '20px'}}>
        <Stack spacing={4}>
          <TextField
            error={nameHasError}
            fullWidth
            required
            id="name"
            label="Patient name"
            type="text"
            value={name}
            onChange={(event) => nameChangeHandler(event.target.value)}
            onBlur={nameBlurHandler}
            helperText={nameHasError && "Name must not be empty"}
          />
          <TextField
            error={ageHasError}
            fullWidth
            required
            id="age"
            label="Age"
            type="number"
            value={age}
            onChange={(event) => ageChangeHandler(event.target.value)}
            onBlur={ageBlurHandler}
            helperText={ageHasError && "Age must be > 0"}
          />
          <TextField
            error={genderHasError}
            fullWidth
            required
            id="gender"
            select
            label="Gender"
            value={gender || genderList[0].value}
            onChange={(event) => genderChangeHandler(event.target.value)}
            onBlur={genderBlurHandler}
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
              disabled={!formIsValid}
              sx={{backgroundColor: "#0003b2"}}
            >
              Save
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate(-1)}
              sx={{backgroundColor: "#b25600"}}
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