import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import MedicineForm from "../components/medicine/MedicineForm";

const NewMedicine = () => {
  const navigate = useNavigate();

  const submitHandler = async (medicine) => {
    const response = await fetch("http://localhost:8080/medicines", {
      method: 'POST',
      body: JSON.stringify(medicine),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    await response.json();
    navigate(-1);
  };

  return (
    <Box sx={{margin: '20px', width: '75%'}}>
      <MedicineForm onAddMedicine={submitHandler}/>
    </Box>
  );
};

export default NewMedicine;