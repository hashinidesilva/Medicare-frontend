import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

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
import api from '../api/api';

const emptyRow = {
  key: 0,
  dose: '',
  frequency: 0,
  frequencyText: '',
  duration: 0,
  quantity: 0,
  additionalInfo: '',
  medicine: {
    id: 0,
    name: '',
    type: '',
    units: 0,
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
];

const emptyMedicineOption = {
  id: 0,
  label: '',
  type: '',
  units: 0,
};

const isPillOrCapsule = (type) => {
  return type === 'Pill' || type === 'Capsule';
};

const getPrescriptions = (prescription, key) => {
  return {
    key,
    dose: prescription.dose,
    frequency: prescription.frequency,
    frequencyText: prescription.frequencyText,
    duration: prescription.duration,
    quantity: prescription.quantity,
    additionalInfo: prescription.additionalInfo,
    medicine: {
      id: prescription.medicine.id,
      name: prescription.medicine.name,
      type: prescription.medicine.type,
      units: prescription.medicine.units,
    },
  };
};

const PrescriptionForm = React.memo((props) => {
  const [prescriptions, setPrescriptions] = useState([emptyRow]);
  const [availableMedicines, setAvailableMedicines] = useState([]);
  const navigate = useNavigate();
  const {medicines, onShowSummary, patient} = props;

  useEffect(async () => {
    const response = await api.get('/medicines');
    const data = await response.data;
    const options = data.map(medicine => {
      return {
        id: medicine.id,
        label: medicine.name,
        type: medicine.type,
        units: medicine.units,
      };
    });
    setAvailableMedicines([...options, emptyMedicineOption]);
  }, []);

  useEffect(() => {
    if (medicines && medicines.length > 0) {
      setPrescriptions(
          medicines.map((value, key) => getPrescriptions(value, key)));
    }
  }, [medicines]);

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
        if (isPillOrCapsule(medicineType)) {
          const quantity = Math.ceil(
              parseFloat(row.dose) * newValue * row.duration);
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
        if (isPillOrCapsule(medicineType)) {
          const quantity = Math.ceil(
              parseFloat(row.dose) * row.frequency * newValue);
          return {...row, duration: newValue, quantity: quantity};
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
            {...row, quantity: newValue} : row));
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
    const prescription = {
      patientId: patient.id,
      medicines: prescriptions.map(pres => {
        return {
          dose: pres.dose,
          frequency: pres.frequency,
          frequencyText: pres.frequencyText,
          duration: pres.duration,
          quantity: pres.quantity,
          additionalInfo: pres.additionalInfo,
          medicine: {
            id: pres.medicine.id,
            name: pres.medicine.name,
            type: pres.medicine.type,
            units: pres.medicine.units,
          },
        };
      }),
    };
    onShowSummary(prescription);
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
                          key={prescription.key}
                          sx={{
                            '&:last-child td, &:last-child th': {
                              border: 0,
                              paddingY: 1,
                            },
                          }}
                      >
                        <TableCell width="250px" sx={{paddingRight: 0}}>
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
                        <TableCell width="50px" sx={{paddingRight: 0}}>
                          <TextField
                              size="small"
                              value={prescription.frequencyText}
                              onChange={event => frequencyTextChangeHandler(
                                  event, index)}/>
                        </TableCell>
                        <TableCell width="70px" sx={{paddingRight: 0}}>
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
                        <TableCell width="50px" sx={{paddingRight: 0}}>
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
                        <TableCell sx={{paddingRight: 0}}>
                          <TextField
                              fullWidth
                              multiline
                              rows={3}
                              size="small"
                              value={prescription.additionalInfo}
                              onChange={event => additionalInfoChangeHandler(
                                  event, index)}/>
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
              onClick={() => navigate('/patients')}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
  );
});

export default PrescriptionForm;