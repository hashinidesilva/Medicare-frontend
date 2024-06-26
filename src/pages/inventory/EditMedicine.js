import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {Box, Paper} from '@mui/material';
import MedicineForm from '../../components/medicine/MedicineForm';
import api from '../../components/api/api';

const EditMedicine = () => {
  const [medicine, setMedicine] = useState({name: '', unitPrice: 0, units: 0});
  const navigate = useNavigate();
  const params = useParams();
  const {medicineId} = params;

  useEffect(async () => {
    try {
      const response = await api.get(`/medicines/${medicineId}`);
      const data = await response.data;
      setMedicine(data);
    } catch (err) {
      navigate('/');
    }
  }, [medicineId]);

  const submitHandler = async (medicine) => {
    await api.put(`/medicines/${medicineId}`, JSON.stringify(medicine),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    navigate(-1);
  };

  return (
      <Box sx={{marginTop: '10px', display: 'flex', justifyContent: 'center'}}>
        <Paper elevation={3} sx={{width: '75%', padding: 2}}>
          <MedicineForm medicine={medicine} onAddMedicine={submitHandler}/>
        </Paper>
      </Box>
  );
};

export default EditMedicine;