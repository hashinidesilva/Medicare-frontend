import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {Box, Paper} from '@mui/material';
import PatientForm from '../../components/patient/PatientForm';
import api from '../../components/api/api';
import CustomProgress from '../../components/UI/CustomProgress';
import useApi from '../../hooks/useAPI';

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const apiRequest = useApi();
  const {patientId} = params;

  useEffect(() => {
    const fetchPatient = async () => {
      setLoading(true);
      try {
        const response = await apiRequest({
          method: 'GET',
          url: `/patients/${patientId}`,
        });
        const data = await response.data;
        setPatient(data);
      } catch (err) {
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
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
          {loading && <CustomProgress/>}
          {!loading &&
              <PatientForm onAddPatient={submitHandler} patient={patient}
                           error={error}/>
          }
        </Paper>
      </Box>
  );
};

export default EditPatient;