import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Stack,
  TextField,
  Typography
} from "@mui/material";

const medicineTypeList = [
  {
    value: 'Pill',
    label: 'Pill',
  },
  {
    value: 'Cream',
    label: 'Cream',
  },
  {
    value: 'Syrup',
    label: 'Syrup',
  }
];

const MedicineForm = (props) => {
  const [name, setName] = useState('');
  const [unitPrice, setUnitPrice] = useState(0);
  const [units, setUnits] = useState(0);
  const [type, setType] = useState(medicineTypeList[0].value);
  const navigate = useNavigate();

  const {medicine} = props;

  useEffect(() => {
    if (medicine) {
      setName(medicine.name);
      setUnitPrice(medicine.unitPrice);
      setUnits(medicine.units);
      setType(medicine.type);
    }
  }, [medicine]);

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const unitPriceChangeHandler = (event) => {
    setUnitPrice(event.target.value);
  };

  const unitsChangeHandler = (event) => {
    setUnits(event.target.value);
  };

  const typeChangeHandler = (event) => {
    setType(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const newMedicine = {
      name: name,
      unitPrice: unitPrice,
      units: units,
      type: type
    };

    props.onAddMedicine(newMedicine);
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
              <TextField
                fullWidth
                id="type"
                select
                label="Medicine type"
                value={type || medicineTypeList[0].value}
                onChange={typeChangeHandler}
              >
                {medicineTypeList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item>
              <Stack direction="row" spacing={4}>
                <Button variant="contained" type="submit">Save</Button>
                <Button variant="outlined" onClick={() => navigate(-1)}>Cancel</Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default MedicineForm;