import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { Box } from "@mui/material";
import MedicineForm from "./MedicineForm";

const EditMedicine = () => {
  const [medicine, setMedicine] = useState({});
  const params = useParams();
  const {medicineId} = params;

  useEffect(async () => {
    const response = await axios.get(`http://localhost:8080/medicines/${medicineId}`);
    const data = await response.data;
    setMedicine(data);
  }, []);

  return (
    <Box sx={{margin: "20px", width: '75%', justifyContent: "center"}}>
      <MedicineForm medicine={medicine}/>
    </Box>
  );
};

export default EditMedicine;