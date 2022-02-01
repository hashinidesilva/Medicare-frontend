import { useNavigate } from "react-router-dom";

import { Box, Paper } from "@mui/material";
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
    <Box sx={{marginTop: "50px", display: "flex", justifyContent: "center"}}>
      <Paper elevation={3} sx={{width: "75%", padding: 2}}>
        <MedicineForm onAddMedicine={submitHandler}/>
      </Paper>
    </Box>
  );
};

export default NewMedicine;