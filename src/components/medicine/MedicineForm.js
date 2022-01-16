import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput, Stack,
  TextField,
  Toolbar
} from "@mui/material";
import { useState } from "react";

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

  const submitHandler = (event) => {
    event.preventDefault();
    const newMedicine = {
      name: name,
      unitPrice: unitPrice,
      units: units
    };
  };

  return (
    <Box sx={{m: '20px', width: '800px'}}>
      <Toolbar/>
      <form onSubmit={submitHandler}>
        <Stack spacing={3}>
          <TextField
            id="name"
            label="Medicine Name"
            type="text"
            variant="outlined"
            value={name}
            onChange={nameChangeHandler}
          />
          <FormControl>
            <InputLabel htmlFor="unit-price">Unit Price</InputLabel>
            <OutlinedInput
              id="unit-price"
              startAdornment={<InputAdornment position="start">Rs</InputAdornment>}
              label="Unit Price"
              value={unitPrice}
              onChange={unitPriceChangeHandler}
            />
          </FormControl>
          <TextField
            id="units"
            label="Units"
            type="number"
            variant="outlined"
            value={units}
            onChange={unitsChangeHandler}
          />
          <Button variant="contained" type="submit">Add</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default MedicineForm;