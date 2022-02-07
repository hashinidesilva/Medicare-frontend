import { useEffect, useState } from "react";

import {
  Autocomplete,
  Box,
  Button,
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

const MedicationsForm = (props) => {
  const [prescriptions, setPrescriptions] = useState([emptyRow]);
  const [medicines, setMedicines] = useState([]);

  const patient = props.patient;

  useEffect(async () => {
    const response = await axios.get("http://localhost:8080/medicare/v1/medicines");
    const data = await response.data;
    setMedicines(data.map(medicine => {
      return {
        id: medicine.id,
        label: medicine.name,
        type: medicine.type
      };
    }));
  }, []);

  const medicineNameChangeHandler = (value, index) => {
    setPrescriptions((prevState) => prevState.map((row, rowId) => {
      if (rowId === index) {
        if (value.type === 'Cream') {
          return {...row, medicineName: value.label, medicineType: value.type, dose: ""};
        }
        return {...row, medicineName: value.label, medicineType: value.type};
      }
      return row;
    }));
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
    props.onSubmit(prescription);
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.field} sx={{fontSize: 16}}>{column.headerName}</TableCell>
              ))}
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
                    onChange={(event, value) =>
                      medicineNameChangeHandler(value, index)}
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
          sx={{backgroundColor: "#b25600"}}
          onClick={() => setPrescriptions((prevState) => [...prevState, {...emptyRow, key: prevState.length}])}
        >
          Add row
        </Button>
        <Button variant="contained" sx={{backgroundColor: "#0003b2"}} onClick={savePrescriptionData}>Save</Button>
      </Stack>
    </Box>
  );
};

export default MedicationsForm;