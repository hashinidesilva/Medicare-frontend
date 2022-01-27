import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip
} from "@mui/material";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';

const emptyRow = {key: 0, medicineName: "", dose: "", frequency: 0, duration: 0, quantity: 0, additionalInfo: ""};

const columns = [
  {field: 'medicineName', headerName: 'Medicine Name'},
  {field: 'dose', headerName: 'Dose'},
  {field: 'frequency', headerName: 'Frequency'},
  {field: 'duration', headerName: 'Duration \n(in days)'},
  {field: 'quantity', headerName: 'Quantity'},
  {field: 'additionalInfo', headerName: 'Additional Information'},
];

const getTodayDate = () => {
  let date = new Date(),
    month = '' + (date.getMonth() + 1),
    day = '' + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  return [year, month, day].join('-');
};

const PrescriptionForm = ({patient}) => {
  const [prescriptions, setPrescriptions] = useState([emptyRow]);
  const [medicines, setMedicines] = useState([]);
  const [date, setDate] = useState(getTodayDate());
  const navigate = useNavigate();

  useEffect(async () => {
    const response = await axios.get("http://localhost:8080/medicines");
    const data = await response.data;
    setMedicines(data.map(medicine => {
      return {
        id: medicine.id,
        label: medicine.name,
        type: medicine.type
      };
    }));
  }, []);

  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };

  const medicineNameChangeHandler = (value, index) => {
    setPrescriptions((prevState) => prevState.map((row, rowId) => rowId === index ?
      {...row, medicineName: value.label, medicineType: value.type} : row));
  };

  const doseChangeHandler = (event, index, medicineType) => {
    const newValue = event.target.value;
    setPrescriptions((prevState) => prevState.map((row, rowId) => {
      if (rowId === index) {
        if (medicineType === 'Pill') {
          const quantity = parseInt(newValue) * row.frequency * row.duration;
          return {...row, dose: newValue, quantity: quantity};
        }
        return {...row, dose: newValue};
      }
      return row;
    }));
  };

  const frequencyChangeHandler = (event, index, medicineType) => {
    const newValue = event.target.value;
    setPrescriptions((prevState) => prevState.map((row, rowId) => {
      if (rowId === index) {
        if (medicineType === 'Pill') {
          const quantity = parseInt(row.dose) * newValue * row.duration;
          return {...row, frequency: newValue, quantity: quantity};
        }
        return {...row, frequency: newValue};
      }
      return row;
    }));
  };

  const durationChangeHandler = (event, index, medicineType) => {
    const newValue = event.target.value;
    setPrescriptions((prevState) => prevState.map((row, rowId) => {
      if (rowId === index) {
        if (medicineType === 'Pill') {
          const quantity = parseInt(row.dose) * row.frequency * newValue;
          return {...row, duration: newValue, quantity: quantity};
        }
        return {...row, duration: newValue};
      }
      return row;
    }));
  };

  const quantityChangeHandler = (event, index) => {
    const newValue = event.target.value;
    setPrescriptions((prevState) => prevState.map((row, rowId) => rowId === index ?
      {...row, quantity: newValue} : row));
  };

  const additionalInfoChangeHandler = (event, index) => {
    const newValue = event.target.value;
    setPrescriptions((prevState) => prevState.map((row, rowId) => rowId === index ?
      {...row, additionalInfo: newValue} : row));
  };

  const savePrescriptionData = async () => {
    const prescription = {
      patientId: patient.id,
      date: date,
      medicines: prescriptions.map(pres => {
        return {
          medicineName: pres.medicineName,
          dose: pres.dose,
          frequency: pres.frequency,
          duration: pres.duration,
          quantity: pres.quantity,
          additionalInfo: pres.additionalInfo,
        };
      })
    };

    await fetch("http://localhost:8080/prescriptions", {
      method: 'POST',
      body: JSON.stringify(prescription),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    navigate("/patients");
  };

  return (
    <Box sx={{padding: 3, border: 1}}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <TextField
            id="date"
            label="Date"
            type="date"
            value={date}
            variant="outlined"
            InputLabelProps={{shrink: true}}
            onChange={dateChangeHandler}
          />
        </Grid>
        <Grid item>
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map(column => (<TableCell key={column.field}>{column.headerName}</TableCell>))}
                </TableRow>
              </TableHead>
              <TableBody>
                {prescriptions.map((prescription, index) => (
                  <TableRow
                    key={prescription.key}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                  >
                    <TableCell width="250px">
                      <Autocomplete
                        disableClearable
                        options={medicines}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={(event, value) => medicineNameChangeHandler(value, index)}
                        renderInput={(params) =>
                          <TextField
                            {...params}
                            placeholder="Select medicine"
                            size="small"
                          />
                        }/>
                    </TableCell>
                    <TableCell width="70px">
                      <TextField
                        disabled={prescription.medicineType === 'Cream'}
                        size="small"
                        value={prescription.dose}
                        onChange={event => doseChangeHandler(event, index, prescription.medicineType)}/>
                    </TableCell>
                    <TableCell width="70px">
                      <TextField
                        size="small"
                        value={prescription.frequency}
                        onChange={event => frequencyChangeHandler(event, index, prescription.medicineType)}/>
                    </TableCell>
                    <TableCell width="70px">
                      <TextField
                        size="small"
                        value={prescription.duration}
                        onChange={event => durationChangeHandler(event, index, prescription.medicineType)}/>
                    </TableCell>
                    <TableCell width="70px">
                      <TextField
                        disabled={prescription.medicineType === 'Pill'}
                        size="small"
                        value={prescription.quantity}
                        onChange={event => quantityChangeHandler(event, index)}/>
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        size="small"
                        value={prescription.additionalInfo}
                        onChange={event => additionalInfoChangeHandler(event, index)}/>
                    </TableCell>
                    <TableCell align="right" width={'10px'}>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => {
                          setPrescriptions((prevState) => prevState.filter(pres => pres.key !== prescription.key));
                        }}>
                          <DeleteIcon color="error"/>
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction={"row"} spacing={4} marginTop={3}>
            <Button
              variant="contained"
              onClick={() => setPrescriptions((prevState) => [...prevState, {...emptyRow, key: prevState.length}])}
            >
              Add row
            </Button>
            <Button variant="contained" onClick={savePrescriptionData}>Save</Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PrescriptionForm;