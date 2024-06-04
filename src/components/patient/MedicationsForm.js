import React from 'react';
import { useEffect, useState } from "react";

import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';

const emptyRow = {
  key: 0,
  medicineName: "",
  medicineType: "",
  availableUnits: 0,
  dose: "",
  frequency: 0,
  frequencyText: '',
  duration: 0,
  quantity: 0,
  additionalInfo: ""
};

const columns = [
  {field: 'medicineName', headerName: 'Medicine Name'},
  {field: 'frequencyText', headerName: 'Frequency'},
  {field: 'dose', headerName: 'Dose'},
  {field: 'frequency', headerName: 'Frequency \n(in num)'},
  {field: 'duration', headerName: 'Duration \n(in days)'},
  {field: 'quantity', headerName: 'Quantity'},
  {field: 'additionalInfo', headerName: 'Additional Information'},
];

const getPrescriptions = (prescription, key) => {
  return {
    key,
    medicineName: prescription.medicine.name,
    medicineType: prescription.medicine.type,
    availableUnits: prescription.medicine.minimumUnits,
    dose: prescription.dose,
    frequency: prescription.frequency,
    frequencyText: prescription.frequencyText,
    duration: prescription.duration,
    quantity: prescription.quantity,
    additionalInfo: prescription.additionalInfo,
  };
};

const MedicationsForm = React.memo((props) => {
  const [prescriptions, setPrescriptions] = useState([emptyRow]);
  const [availableMedicines, setAvailableMedicines] = useState([]);
  const {medicines} = props;

  const {patient, error} = props;
  console.log("MED", medicines);
  console.log("MEDIII", availableMedicines);
  console.log("PRESS", prescriptions);

  useEffect(async () => {
    const response = await axios.get("http://localhost:8080/medicare/v1/medicines");
    const data = await response.data;
    setAvailableMedicines(data.map(medicine => {
      return {
        id: medicine.id,
        label: medicine.name,
        type: medicine.type,
        units: medicine.units
      };
    }));
  }, []);

  useEffect(() => {
    if (medicines && medicines.length > 0) {
      console.log("QQQQQ", medicines);
      setPrescriptions(medicines.map((value, key) => getPrescriptions(value, key)));
    }
  }, [medicines]);

  const medicineNameChangeHandler = (value, index) => {
    setPrescriptions((prevState) => prevState.map((row, rowId) => {
      if (rowId === index) {
        if (value.type === 'Cream') {
          return {...row, medicineName: value.label, medicineType: value.type, availableUnits: value.units, dose: ""};
        }
        return {...row, medicineName: value.label, medicineType: value.type, availableUnits: value.units};
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

  const frequencyTextChangeHandler = (event, index) => {
    const newValue = event.target.value;
    setPrescriptions((prevState) => prevState.map((row, rowId) => rowId === index ?
      {...row, frequencyText: newValue} : row));
  };

  const savePrescriptionData = async () => {
    const prescription = {
      patientId: patient.id,
      medicines: prescriptions.map(pres => {
        return {
          medicineName: pres.medicineName,
          dose: pres.dose,
          frequency: pres.frequency,
          frequencyText: pres.frequencyText,
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
      <TableContainer>
        <Table sx={{minWidth: 650, border: 1, borderColor: 'grey.400'}}>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.field} sx={{fontSize: 15, paddingRight: 0, fontWeight: 600}}>
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {prescriptions.map((prescription, index) => (
              <TableRow
                key={prescription.key}
                sx={{'&:last-child td, &:last-child th': {border: 0, paddingY: 1}}}
              >
                <TableCell width="250px" sx={{paddingRight: 0}}>
                  <Autocomplete
                    // value={availableMedicines.find(med => med.label === prescription.medicineName)}
                    disableClearable
                    options={availableMedicines}
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
                <TableCell width="50px" sx={{paddingRight: 0}}>
                  <TextField
                    size="small"
                    value={prescription.frequencyText}
                    onChange={event => frequencyTextChangeHandler(event, index)}/>
                </TableCell>
                <TableCell width="70px" sx={{paddingRight: 0}}>
                  <TextField
                    disabled={prescription.medicineType === 'Cream'}
                    size="small"
                    value={prescription.dose}
                    onChange={event => doseChangeHandler(event, index, prescription.medicineType)}/>
                </TableCell>
                <TableCell width="50px" sx={{paddingRight: 0}}>
                  <TextField
                    size="small"
                    value={prescription.frequency}
                    onChange={event => frequencyChangeHandler(event, index, prescription.medicineType)}/>
                </TableCell>
                <TableCell width="50px" sx={{paddingRight: 0}}>
                  <TextField
                    size="small"
                    value={prescription.duration}
                    onChange={event => durationChangeHandler(event, index, prescription.medicineType)}/>
                </TableCell>
                <TableCell width="70px" sx={{paddingRight: 0}}>
                  <TextField
                    error={prescription.availableUnits < prescription.quantity}
                    disabled={prescription.medicineType === 'Pill'}
                    size="small"
                    value={prescription.quantity}
                    onChange={event => quantityChangeHandler(event, index)}
                    helperText={prescription.quantity !== 0 && prescription.availableUnits < prescription.quantity &&
                      ("Available quantity:" + prescription.availableUnits)}/>
                </TableCell>
                <TableCell sx={{paddingRight: 0}}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    size="small"
                    value={prescription.additionalInfo}
                    onChange={event => additionalInfoChangeHandler(event, index)}/>
                </TableCell>
                <TableCell align="right" sx={{paddingX: 0, alignItems: 'flex-start'}}>
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
        <Button
          variant="contained"
          sx={{backgroundColor: "#0003b2"}}
          onClick={savePrescriptionData}
          disabled={prescriptions.length === 0 ||
            prescriptions.find(prescription => prescription.medicineName === '') !== undefined}
        >
          Save
        </Button>
      </Stack>
      {error && <Typography color={"red"}>{error}</Typography>}
    </Box>
  );
});

export default MedicationsForm;