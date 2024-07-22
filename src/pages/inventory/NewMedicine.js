import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import axios from 'axios';
import {Box, Paper} from '@mui/material';
import MedicineForm from '../../components/medicine/MedicineForm';

const NewMedicine = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (medicine) => {
    try {
      setLoading(true);
      const response = await axios.post('/medicines',
          JSON.stringify(medicine),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      if (response.status !== 200) {
        throw new Error(`HTTP status ${response.status}: ${response.data}`);
      }
      await response.data;
      navigate(-1);
    } catch (error) {
      setError('Failed to add medicine: ' + error.message);
      setLoading(false);
    }

  };

  return (
      <Box sx={{marginTop: '10px', display: 'flex', justifyContent: 'center'}}>
        <Paper elevation={3} sx={{width: '75%', padding: 2}}>
          <MedicineForm onAddMedicine={submitHandler} error={error}
                        loading={loading}/>
        </Paper>
      </Box>
  );
};

export default NewMedicine;