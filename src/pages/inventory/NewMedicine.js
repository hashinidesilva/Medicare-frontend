import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Paper } from "@mui/material";
import MedicineForm from "../../components/medicine/MedicineForm";

const NewMedicine = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (medicine) => {
    try {
      const response = await fetch("http://localhost:8080/medicare/v1/medicines", {
        method: 'POST',
        body: JSON.stringify(medicine),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP status ${response.status}: ${errorData}`);
      }
      await response.json();
      navigate(-1);
    } catch (error) {
      setError('Failed to add medicine: ' + error.message);
    }

  };

  return (
    <Box sx={{marginTop: "10px", display: "flex", justifyContent: "center"}}>
      <Paper elevation={3} sx={{width: "75%", padding: 2}}>
        <MedicineForm onAddMedicine={submitHandler} error={error}/>
      </Paper>
    </Box>
  );
};

export default NewMedicine;