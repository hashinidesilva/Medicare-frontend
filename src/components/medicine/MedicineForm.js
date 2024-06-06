import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import useInput from "../../hooks/useInput";

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
  const navigate = useNavigate();
  const {medicine, error} = props;

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler
  } = useInput(value => value.trim() !== '', '');

  const {
    value: unitPrice,
    isValid: unitPriceIsValid,
    hasError: unitPriceHasError,
    valueChangeHandler: unitPriceChangeHandler,
    inputBlurHandler: unitPriceBlurHandler
  } = useInput(value => value > 0, 0);

  const {
    value: units,
    isValid: unitsIsValid,
    hasError: unitsHasError,
    valueChangeHandler: unitsChangeHandler,
    inputBlurHandler: unitsBlurHandler
  } = useInput(value => value > 0, 0);

  const {
    value: minUnits,
    isValid: minUnitsIsValid,
    hasError: minUnitsHasError,
    valueChangeHandler: minUnitsChangeHandler,
    inputBlurHandler: minUnitsBlurHandler
  } = useInput(value => value > 0, 0);

  const {
    value: type,
    isValid: typeIsValid,
    hasError: typeHasError,
    valueChangeHandler: typeChangeHandler,
    inputBlurHandler: typeBlurHandler
  } = useInput(value => medicineTypeList.map(item => item.value).includes(value), medicineTypeList[0].value);

  const formIsValid = nameIsValid && unitPriceIsValid && unitsIsValid && typeIsValid && minUnitsIsValid;

  useEffect(() => {
    if (medicine) {
      nameChangeHandler(medicine.name);
      unitPriceChangeHandler(medicine.unitPrice);
      unitsChangeHandler(medicine.units);
      minUnitsChangeHandler(medicine.minimumUnits);
      typeChangeHandler(medicine.type);
    }
  }, [medicine, nameChangeHandler, unitPriceChangeHandler, unitsChangeHandler, typeChangeHandler]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const newMedicine = {
      name: name,
      unitPrice: unitPrice,
      units: units,
      minimumUnits: minUnits,
      type: type
    };

    props.onAddMedicine(newMedicine);
  };

  return (
    <Box sx={{border: 1, borderColor: "#1e88e5", width: '100%'}}>
      <Box
        sx={{
          display: "flex",
          alignItems: 'center',
          height: 40,
          justifyContent: "flex-start",
          backgroundColor: "#1e88e5",
          paddingLeft: '20px'
        }}>
        <Typography variant="h5" color="#ffffff">Medicine Form</Typography>
      </Box>
      <form onSubmit={submitHandler} style={{margin: '20px'}}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              error={nameHasError}
              fullWidth
              id="name"
              label="Medicine name"
              type="text"
              value={name}
              onChange={(event) => nameChangeHandler(event.target.value)}
              onBlur={nameBlurHandler}
              helperText={nameHasError && "Name must not be empty"}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={typeHasError}
              fullWidth
              id="type"
              select
              label="Medicine type"
              value={type || medicineTypeList[0].value}
              onChange={(event) => typeChangeHandler(event.target.value)}
              onBlur={typeBlurHandler}
            >
              {medicineTypeList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="unit-price">Unit Price</InputLabel>
              <OutlinedInput
                error={unitPriceHasError}
                id="unit-price"
                startAdornment={<InputAdornment position="start">Rs</InputAdornment>}
                label="Unit Price"
                value={unitPrice}
                onChange={(event) => unitPriceChangeHandler(event.target.value)}
                onBlur={unitPriceBlurHandler}
              />
              {unitPriceHasError && <FormHelperText error>Unit price must be > 0</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={unitsHasError}
              fullWidth
              id="units"
              label="Units"
              type="number"
              value={units}
              onChange={(event) => unitsChangeHandler(event.target.value)}
              onBlur={unitsBlurHandler}
              helperText={unitsHasError && "Units must be > 0"}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={minUnitsHasError}
              fullWidth
              id="minUnits"
              label="Minimum Units"
              type="number"
              value={minUnits}
              onChange={(event) => minUnitsChangeHandler(event.target.value)}
              onBlur={minUnitsBlurHandler}
              helperText={minUnitsHasError && "Minimum Units must be > 0"}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} direction={"row"}>
              <Button
                variant="contained"
                type="submit"
                disabled={!formIsValid}
                sx={{backgroundColor: "#0003b2"}}
              >
                Save
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate(-1)}
                sx={{backgroundColor: "#b25600"}}
              >
                Cancel
              </Button>
            </Stack>
          </Grid>
          {error && <Typography color={"red"} sx={{margin: '20px'}}>{error}</Typography>}
        </Grid>
      </form>
    </Box>
  );
};

export default MedicineForm;