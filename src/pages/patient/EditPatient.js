import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {Box, Paper} from '@mui/material';
import PatientForm from '../../components/patient/PatientForm';
import api from '../../components/api/api';

const initialState = {
  name: '',
  age: 0,
  nic: '',
  allergies: '',
  tpNumber: '',
  address: '',
};

const EditPatient = () => {
  const [patient, setPatient] = useState(initialState);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const {patientId} = params;

  useEffect(async () => {
    try {
      const response = await api.get(
          `/patients/${patientId}`);
      const data = await response.data;
      setPatient(data);
    } catch (err) {
      navigate('/');
    }
  }, [patientId]);

  const submitHandler = async (patient) => {
    try {
      const response = await api.put(`/patients/${patientId}`,
          JSON.stringify(patient), {
            headers: {
              'Content-Type': 'application/json',
            },
          },
      );
      if (response.status !== 200) {
        throw new Error(`HTTP status ${response.status}: ${response.data}`);
      }
      navigate(-1);
    } catch (error) {
      setError('Failed to edit patient: ' + error.message);
    }
  };

  return (
      <Box sx={{marginTop: '50px', display: 'flex', justifyContent: 'center'}}>
        <Paper elevation={3} sx={{width: '75%', padding: 2}}>
          <PatientForm onAddPatient={submitHandler} patient={patient}
                       error={error}/>
        </Paper>
      </Box>
  );
};

export default EditPatient;