import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import PrescriptionSummary from "../../components/prescription/PrescriptionSummary";

const PrescriptionHistory = () => {
  const [prescription, setPrescription] = useState({});
  const params = useParams();
  const {prescriptionId} = params;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:8080/medicare/v1/prescriptions/${prescriptionId}`);
      const data = await response.data;
      setPrescription(data);
    }

    fetchData();
  }, [prescriptionId]);

  return (
    <PrescriptionSummary prescription={prescription}/>
  );
};

export default PrescriptionHistory;