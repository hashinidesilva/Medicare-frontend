import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
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
    <Box sx={{border: 1, borderColor: "ActiveCaption", width: "75%"}} component={Paper}>
      <Box
        sx={{
          display: "flex",
          alignItems: 'center',
          height: 70,
          justifyContent: "center"
        }}>
        <Typography variant="h4">Medicine Form</Typography>
      </Box>
      <Divider/>
      <form onSubmit={submitHandler} style={{margin: '20px'}}>
        <Stack spacing={4}>
          <TextField
            fullWidth
            id="name"
            label="Medicine name"
            type="text"
            variant="outlined"
            value={name}
            onChange={nameChangeHandler}
          />
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
          <TextField
            fullWidth
            id="units"
            label="Units"
            type="number"
            variant="outlined"
            value={units}
            onChange={unitsChangeHandler}
          />
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
          <Stack direction="row" spacing={4}>
            <Button
              variant="contained"
              type="submit"
              sx={{backgroundColor: "#1a14c2"}}
            >
              Save
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate(-1)}
              sx={{backgroundColor: "#c27114"}}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default MedicineForm;