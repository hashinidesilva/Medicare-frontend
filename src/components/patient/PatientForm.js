import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import useInput from '../../hooks/useInput';

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
  },
];

const PatientForm = (props) => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const {patient, error, loading} = props;

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(value => value.trim() !== '', '');

  const {
    value: age,
    isValid: ageIsValid,
    hasError: ageHasError,
    valueChangeHandler: ageChangeHandler,
    inputBlurHandler: ageBlurHandler,
  } = useInput(value => value > 0, 0);

  const {
    value: gender,
    isValid: genderIsValid,
    hasError: genderHasError,
    valueChangeHandler: genderChangeHandler,
    inputBlurHandler: genderBlurHandler,
  } = useInput(value => genderList.map(item => item.value).includes(value),
      genderList[0].value);

  const {
    value: nic,
    valueChangeHandler: nicChangeHandler,
    inputBlurHandler: nicBlurHandler,
  } = useInput(value => value?.trim() === '' || value?.trim().length === 10 ||
      value?.trim().length === 12, '');

  const {
    value: address,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
  } = useInput(() => true, '');

  const {
    value: tpNumber,
    valueChangeHandler: tpNumberChangeHandler,
    inputBlurHandler: tpNumberBlurHandler,
  } = useInput(() => true, '');

  const {
    value: allergies,
    valueChangeHandler: allergiesChangeHandler,
    inputBlurHandler: allergiesBlurHandler,
  } = useInput(() => true, '');

  useEffect(() => {
    if (patient) {
      nameChangeHandler(patient.name);
      ageChangeHandler(patient.age);
      genderChangeHandler(patient.gender);
      nicChangeHandler(patient.nic ?? '');
      addressChangeHandler(patient.address ?? '');
      tpNumberChangeHandler(patient.tpNumber ?? '');
      allergiesChangeHandler(patient.allergies ?? '');
      setChecked(patient.allergies === 'None');
    }
  }, [patient]);

  const formIsValid = nameIsValid && ageIsValid && genderIsValid;

  const handleAllergyCheck = (event) => {
    const value = event.target.checked;
    if (value) {
      allergiesChangeHandler('None');
    } else {
      allergiesChangeHandler('');
    }
    setChecked(value);

  };

  const submitHandler = (event) => {
    event.preventDefault();
    const newPatient = {name, age, gender, nic, tpNumber, address, allergies};
    props.onAddPatient(newPatient);
  };

  return (
      <Box sx={{border: 1, borderColor: '#1e88e5'}}>
        <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 40,
              justifyContent: 'flex-start',
              backgroundColor: '#1e88e5',
              paddingLeft: '20px',
            }}>
          <Typography variant="h5" color="#ffffff">Patient Form</Typography>
        </Box>
        <Divider/>
        <form onSubmit={submitHandler} style={{margin: '20px'}}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
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
                  helperText={nameHasError && 'Name must not be empty'}
              />
            </Grid>
            <Grid item xs={6}>
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
                  helperText={ageHasError && 'Age must be > 0'}
              />
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
              <TextField
                  fullWidth
                  id="nic"
                  label="NIC"
                  type="text"
                  value={nic}
                  onChange={(event) => nicChangeHandler(event.target.value)}
                  onBlur={nicBlurHandler}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  fullWidth
                  id="address"
                  label="Address"
                  type="text"
                  value={address}
                  onChange={(event) => addressChangeHandler(event.target.value)}
                  onBlur={addressBlurHandler}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  fullWidth
                  id="tpnumber"
                  label="Telephone Number"
                  type="number"
                  value={tpNumber}
                  onChange={(event) => tpNumberChangeHandler(
                      event.target.value)}
                  onBlur={tpNumberBlurHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                      disabled={checked}
                      fullWidth
                      multiline
                      id="allergies"
                      label="Allergies"
                      type="text"
                      value={allergies}
                      onChange={(event) => allergiesChangeHandler(
                          event.target.value)}
                      onBlur={allergiesBlurHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Stack direction={'row'} alignItems={'center'}
                         sx={{paddingLeft: 0}}>
                    <Checkbox
                        size="small"
                        checked={checked}
                        onChange={handleAllergyCheck}
                        inputProps={{'aria-label': 'controlled'}}
                    />
                    <Typography variant="caption">No allergies</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={2} direction={'row'}>
                <Button
                    variant="contained"
                    type="submit"
                    disabled={!formIsValid || loading}
                    sx={{backgroundColor: '#0003b2'}}
                >
                  Save
                </Button>
                <Button
                    variant="contained"
                    onClick={() => navigate(-1)}
                    sx={{backgroundColor: '#b25600'}}
                >
                  Cancel
                </Button>
              </Stack>
            </Grid>
            {error && <Typography color={'red'}
                                  sx={{margin: '20px'}}>{error}</Typography>}
          </Grid>
        </form>
      </Box>
  );
};

export default PatientForm;