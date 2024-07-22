import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import axios from 'axios';
import {Box, Paper} from '@mui/material';
import MedicineForm from '../../components/medicine/MedicineForm';
import CustomProgress from '../../components/UI/CustomProgress';

const EditMedicine = () => {
  const [medicine, setMedicine] = useState({name: '', unitPrice: 0, units: 0});
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const {medicineId} = params;

  useEffect(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/medicines/${medicineId}`);
      const data = await response.data;
      setMedicine(data);
    } catch (err) {
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [medicineId]);

  const submitHandler = async (medicine) => {
    try {
      setUpdateLoading(true);
      const response = await axios.put(`/medicines/${medicineId}`,
          JSON.stringify(medicine),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      await response.data;
      navigate(-1);
    } catch (err) {
      setUpdateLoading(false);
      setError('Failed to edit medicine: ' + error.message);
    }
  };

  return (
      <Box sx={{marginTop: '10px', display: 'flex', justifyContent: 'center'}}>
        <Paper elevation={3} sx={{width: '75%', padding: 2}}>
          {loading && <CustomProgress/>}
          {!loading &&
              <MedicineForm medicine={medicine} onAddMedicine={submitHandler}
                            loading={updateLoading}
                            error={error}/>
          }
        </Paper>
      </Box>
  );
};

export default EditMedicine;