import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import PrescriptionSummary
  from '../../components/prescription/PrescriptionSummary';
import api from '../../components/api/api';

const PrescriptionHistory = () => {
  const [prescription, setPrescription] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const {prescriptionId} = params;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/prescriptions/${prescriptionId}`);
        const data = await response.data;
        setPrescription(data);
      } catch (err) {
        navigate('/');
      }
    }

    fetchData();
  }, [prescriptionId]);

  return (
      <PrescriptionSummary prescription={prescription}/>
  );
};

export default PrescriptionHistory;