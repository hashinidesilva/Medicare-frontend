import { useState } from "react";

import {
  Box,
  Button,
  FormControl, Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography
} from "@mui/material";

const MedicineForm = () => {
  const [name, setName] = useState('');
  const [unitPrice, setUnitPrice] = useState(0);
  const [units, setUnits] = useState(0);

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const unitPriceChangeHandler = (event) => {
    setUnitPrice(event.target.value);
  };

  const unitsChangeHandler = (event) => {
    setUnits(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const newMedicine = {
      name: name,
      unitPrice: unitPrice,
      units: units
    };
    const response = await fetch("http://localhost:8080/medicines", {
      method: 'POST',
      body: JSON.stringify(newMedicine),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    await response.json();
  };

  return (
    <Box sx={{margin: '20px', width: '75%', border: 1}}>
      <Box
        sx={{
          display: "flex",
          alignItems: 'center',
          width: "100%",
          height: 70,
          backgroundColor: 'primary.dark',
        }}>
        <Typography mx={2} color="#FFFFFF" variant="h4">Medicine Form</Typography>
      </Box>
      <Box sx={{margin: '20px'}}>
        <form onSubmit={submitHandler}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <TextField
                fullWidth
                id="name"
                label="Medicine name"
                type="text"
                variant="outlined"
                value={name}
                onChange={nameChangeHandler}
              />
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel htmlFor="unit-price">Unit Price</InputLabel>
                <OutlinedInput
                  id="unit-price"
                  startAdornment={<InputAdornment position="start">Rs</InputAdornment>}
                  label="Unit Price"
                  value={unitPrice}
                  onChange={unitPriceChangeHandler}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="units"
                label="Units"
                type="number"
                variant="outlined"
                value={units}
                onChange={unitsChangeHandler}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit">Add</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default MedicineForm;