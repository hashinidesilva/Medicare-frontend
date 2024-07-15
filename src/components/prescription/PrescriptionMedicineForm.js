import React, {useEffect, useState} from 'react';

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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const emptyRow = {
  id: 0,
  dose: '',
  frequency: 0,
  frequencyText: '',
  duration: 0,
  quantity: 0,
  additionalInfo: '',
  price: 0.0,
  medicine: {
    id: 0,
    name: '',
    type: '',
    units: 0,
    unitPrice: 0,
  },
};

const columns = [
  {field: 'medicineName', headerName: 'Medicine Name'},
  {field: 'frequencyText', headerName: 'Frequency'},
  {field: 'dose', headerName: 'Dose'},
  {field: 'frequency', headerName: 'Frequency \n(in num)'},
  {field: 'duration', headerName: 'Duration \n(in days)'},
  {field: 'quantity', headerName: 'Quantity'},
  {field: 'additionalInfo', headerName: 'Additional Information'},
  {field: 'price', headerName: 'Price (Rs)'},
];

const emptyMedicineOption = {
  id: 0,
  label: '',
  type: '',
  units: 0,
  unitPrice: 0,
};

const isPillOrCapsule = (type) => {
  return type === 'Pill' || type === 'Capsule';
};

const getPrescriptions = (prescription, index) => {
  return {
    key: index,
    id: prescription.id,
    dose: prescription.dose,
    frequency: prescription.frequency,
    frequencyText: prescription.frequencyText,
    duration: prescription.duration,
    quantity: prescription.quantity,
    additionalInfo: prescription.additionalInfo,
    price: prescription.price,
    medicine: {
      id: prescription.medicine.id,
      name: prescription.medicine.name,
      type: prescription.medicine.type,
      units: prescription.medicine.units,
      unitPrice: prescription.medicine.unitPrice,
    },
  };
};

const PrescriptionMedicineForm = React.memo((props) => {
  const [prescriptions, setPrescriptions] = useState([emptyRow]);
  const [availableMedicines, setAvailableMedicines] = useState([]);
  const {medicines, onShowSummary, allMedicines, onCancel} = props;

  useEffect(() => {
    if (medicines && medicines.length > 0) {
      setPrescriptions(
          medicines.map((value, key) => getPrescriptions(value, key)));
    }
  }, [medicines]);

  useEffect(() => {
    if (allMedicines && allMedicines.length > 0) {
      setAvailableMedicines([...allMedicines, emptyMedicineOption]);
    }
  }, [allMedicines]);

  const medicineNameChangeHandler = (value, index) => {
    setPrescriptions((prevState) => prevState.map((row, rowId) => {
      if (rowId === index) {
        if (value.type === 'Cream') {
          return {
            ...row,
            medicine: {
              id: value.id,
              name: value.label,
              units: value.units,
              type: value.type,
              unitPrice: value.unitPrice,
            },
            dose: '',
          };
        }
        return {
          ...row,
          medicine: {
            id: value.id,
            name: value.label,
            units: value.units,
            type: value.type,
            unitPrice: value.unitPrice,
          },
        };
      }
      return row;
    }));
  };

  const doseChangeHandler = (event, index, medicineType) => {
    const newValue = event.target.value;
    setPrescriptions((prevState) => prevState.map((row, rowId) => {
      if (rowId === index) {
        if (isPillOrCapsule(medicineType)) {
          const quantity = Math.ceil(
              parseFloat(newValue) * row.frequency * row.duration);
          return {
            ...row,
            dose: newValue,
            quantity: quantity,
            price: quantity * row.medicine?.unitPrice,
          };
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
        if (isPillOrCapsule(medicineType)) {
          const quantity = Math.ceil(
              parseFloat(row.dose) * newValue * row.duration);
          return {
            ...row,
            frequency: newValue,
            quantity: quantity,
            price: quantity * row.medicine?.unitPrice,
          };
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
        if (isPillOrCapsule(medicineType)) {
          const quantity = Math.ceil(
              parseFloat(row.dose) * row.frequency * newValue);
          return {
            ...row,
            duration: newValue,
            quantity: quantity,
            price: quantity * row.medicine?.unitPrice,
          };
        }
        return {...row, duration: newValue};
      }
      return row;
    }));
  };

  const quantityChangeHandler = (event, index) => {
    const newValue = event.target.value;
    setPrescriptions(
        (prevState) => prevState.map((row, rowId) => rowId === index ?
            {
              ...row,
              quantity: newValue,
              price: newValue * row.medicine.unitPrice,
            } : row));
  };

  const additionalInfoChangeHandler = (event, index) => {
    const newValue = event.target.value;
    setPrescriptions(
        (prevState) => prevState.map((row, rowId) => rowId === index ?
            {...row, additionalInfo: newValue} : row));
  };

  const frequencyTextChangeHandler = (event, index) => {
    const newValue = event.target.value;
    setPrescriptions(
        (prevState) => prevState.map((row, rowId) => rowId === index ?
            {...row, frequencyText: newValue} : row));
  };

  const handleClick = () => {
    onShowSummary(prescriptions);
  };

  return (
      <Box>
        <TableContainer>
          <Table sx={{minWidth: 650, border: 1, borderColor: 'grey.400'}}>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                    <TableCell key={column.field} sx={{
                      fontSize: 15,
                      paddingRight: 0,
                      fontWeight: 600,
                    }}>
                      {column.headerName}
                    </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {prescriptions.length > 0 &&
                  prescriptions.map((prescription, index) => (
                      <TableRow
                          key={index}
                          sx={{
                            '&:last-child td, &:last-child th': {
                              border: 0,
                              paddingY: 1,
                            },
                          }}
                      >
                        <TableCell width="260px" sx={{paddingRight: 0}}>
                          <Autocomplete
                              value={availableMedicines.find(
                                      med => med.label ===
                                          prescription.medicine.name) ??
                                  emptyMedicineOption}
                              disableClearable
                              options={availableMedicines}
                              isOptionEqualToValue={(
                                  option, value) => option.id === value.id}
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
                        <TableCell width="130px" sx={{paddingRight: 0}}>
                          <TextField
                              size="small"
                              value={prescription.frequencyText}
                              onChange={event => frequencyTextChangeHandler(
                                  event, index)}/>
                        </TableCell>
                        <TableCell width="90px" sx={{paddingRight: 0}}>
                          <TextField
                              disabled={prescription.medicine.type === 'Cream'}
                              size="small"
                              value={prescription.dose}
                              onChange={event => doseChangeHandler(event, index,
                                  prescription.medicine.type)}/>
                        </TableCell>
                        <TableCell width="50px" sx={{paddingRight: 0}}>
                          <TextField
                              size="small"
                              value={prescription.frequency}
                              onChange={event => frequencyChangeHandler(event,
                                  index, prescription.medicine.type)}/>
                        </TableCell>
                        <TableCell width="60px" sx={{paddingRight: 0}}>
                          <TextField
                              size="small"
                              value={prescription.duration}
                              onChange={event => durationChangeHandler(event,
                                  index, prescription.medicine.type)}/>
                        </TableCell>
                        <TableCell width="70px" sx={{paddingRight: 0}}>
                          <TextField
                              error={prescription.medicine.units <
                                  prescription.quantity}
                              disabled={isPillOrCapsule(
                                  prescription.medicine.type)}
                              size="small"
                              value={prescription.quantity}
                              onChange={event => quantityChangeHandler(event,
                                  index)}
                              helperText={prescription.quantity !== 0 &&
                                  prescription.medicine.units <
                                  prescription.quantity &&
                                  ('Available quantity:' +
                                      prescription.medicine.units)}/>
                        </TableCell>
                        <TableCell width="170px" sx={{paddingRight: 0}}>
                          <TextField
                              multiline
                              rows={2}
                              size="small"
                              value={prescription.additionalInfo}
                              onChange={event => additionalInfoChangeHandler(
                                  event, index)}/>
                        </TableCell>
                        <TableCell sx={{
                          textAlign: 'right',
                        }}>
                          {prescription.price}
                        </TableCell>
                        <TableCell align="right"
                                   sx={{paddingX: 0, alignItems: 'flex-start'}}>
                          <Tooltip title="Delete">
                            <IconButton onClick={() => {
                              setPrescriptions((prevState) => prevState.filter(
                                  pres => pres.key !== prescription.key));
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
        <Stack direction={'row'} spacing={3} marginTop={3}>
          <Button
              variant="contained"
              sx={{backgroundColor: '#b25600'}}
              onClick={() => setPrescriptions((prevState) => [
                ...prevState,
                {...emptyRow, key: prevState.length}])}
          >
            Add row
          </Button>
          <Button
              variant="contained"
              sx={{backgroundColor: '#0003b2'}}
              onClick={handleClick}
              disabled={prescriptions.length === 0 ||
                  prescriptions.find(
                      prescription => prescription.medicine.name === '') !==
                  undefined}
          >
            Next
          </Button>
          <Button
              variant="contained"
              sx={{
                backgroundColor: 'white',
                color: '#4860bd',
                border: 1,
                borderColor: '#6379d0',
                '&:hover': {
                  backgroundColor: 'white',
                  borderColor: '#3d4f96',
                  elevation: 0,
                },
              }}
              onClick={onCancel}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
  );
});

export default PrescriptionMedicineForm;