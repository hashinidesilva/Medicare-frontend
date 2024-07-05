import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Box, Paper} from '@mui/material';
import PatientForm from '../../components/patient/PatientForm';
import api from '../../components/api/api';
import Swal from 'sweetalert2';

const NewPatient = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitHandler = async (patient) => {
    try {
      setLoading(true);
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
      Swal.fire({
        icon: 'success',
        title: `Patient ${patient.name} Created`,
        timer: 3000,
      });
      navigate(-1);
    } catch (error) {
      setError('Failed to add patient: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Paper elevation={3} sx={{width: '75%', padding: 2}}>
          <PatientForm onAddPatient={submitHandler} error={error}
                       loading={loading}/>
        </Paper>
      </Box>
  );
};

export default NewPatient;