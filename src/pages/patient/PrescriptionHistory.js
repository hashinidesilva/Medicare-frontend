import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import axios from 'axios';
import PrescriptionSummary
  from '../../components/prescription/PrescriptionSummary';
import CustomProgress from '../../components/UI/CustomProgress';

const PrescriptionHistory = () => {
  const [prescription, setPrescription] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const {prescriptionId} = params;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(`/prescriptions/${prescriptionId}`);
        const data = await response.data;
        setPrescription(data);
      } catch (err) {
        navigate('/');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [prescriptionId, navigate]);

  return (
      <>
        {loading && <CustomProgress/>}
        {!loading && <PrescriptionSummary prescription={prescription}/>}
      </>
  );
};

export default PrescriptionHistory;