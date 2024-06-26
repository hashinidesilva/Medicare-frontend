import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Box, Paper} from '@mui/material';
import PatientForm from '../../components/patient/PatientForm';
import api from '../../components/api/api';

const NewPatient = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const submitHandler = async (patient) => {
    try {
      const response = await api.post('/patients',
          JSON.stringify(patient), {
            headers: {
              'Content-Type': 'application/json',
            },
          },
      );
      if (response.status !== 200) {
        throw new Error(`HTTP status ${response.status}: ${response.data}`);
      }
      const {id} = response.data;
      navigate(`/patients/${id}/prescriptions/create`);
    } catch (error) {
      setError('Failed to add patient: ' + error.message);
    }
  };

  return (
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Paper elevation={3} sx={{width: '75%', padding: 2}}>
          <PatientForm onAddPatient={submitHandler} error={error}/>
        </Paper>
      </Box>
  );
};

export default NewPatient;