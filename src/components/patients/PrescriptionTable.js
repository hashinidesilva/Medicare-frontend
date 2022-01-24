import { useEffect, useState } from "react";

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent, Grid, IconButton,
  Paper,
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

const emptyRow = {key: 0, medicineName: "", dose: "", frequency: "", duration: "", additionalInfo: ""};

const columns = [
  {field: 'medicineName', headerName: 'Medicine Name'},
  {field: 'dose', headerName: 'Dose'},
  {field: 'frequency', headerName: 'Frequency'},
  {field: 'duration', headerName: 'Duration'},
  {field: 'additionalInfo', headerName: 'Additional Information'},
];

const PrescriptionTable = (props) => {
  const [prescriptions, setPrescriptions] = useState([emptyRow]);
  const [medicines, setMedicines] = useState([]);
  const [date, setDate] = useState(new Date());
  const {patient} = props;

  useEffect(async () => {
    const response = await axios.get("http://localhost:8080/medicines");
    const data = await response.data;
    setMedicines(data.map(_ => _.name));
  }, []);

  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };

  const changeHandler = (event, field, index) => {
    const newValue = event.target.value;
    setPrescriptions((prevState) => prevState.map((row, rowId) => rowId === index ?
      {...row, [field]: newValue} : row));
  };

  const medicineNameChangeHandler = (value, index) => {
    setPrescriptions((prevState) => prevState.map((row, rowId) => rowId === index ?
      {...row, medicineName: value} : row));
  };

  const savePrescriptionData = () => {
    const prescription = {
      patientId: patient.id,
      date: date,
      medicines: prescriptions.map(pres => {
        return {
          medicineName: pres.medicineName,
          dose: pres.dose,
          frequency: pres.frequency,
          duration: pres.duration,
          additionalInfo: pres.dose,
        };
      })
    };

    console.log("DATA prescription", prescription);
  };

  return (
    <Box sx={{margin: '20px', width: '90%'}}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          {patient && (
            <Card variant="outlined" sx={{backgroundColor: "#E8E8E8"}}>
              <CardContent>
                <Typography mx={2} variant="h5" gutterBottom>Patient Information</Typography>
                <Typography mx={2} color="text.secondary" gutterBottom>Name</Typography>
                <Typography mx={2}>{patient.name}</Typography>
                <Typography mx={2} color="text.secondary" sx={{marginTop: 1.5}} gutterBottom>Age</Typography>
                <Typography mx={2}>{patient.age}</Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
        <Grid item>
          <TextField
            id="date"
            label="Date"
            type="date"
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
                    {columns.map(column => column.field === 'medicineName' ? (
                      <TableCell width="250px" key={column.field}>
                        <Autocomplete
                          autoComplete
                          includeInputInList
                          options={medicines}
                          onChange={(event, value) => medicineNameChangeHandler(value, index)}
                          renderInput={(params) =>
                            <TextField
                              {...params}
                              placeholder="Select medicine"
                              size="small"
                            />
                          }/>
                      </TableCell>
                    ) : (
                      <TableCell key={column.field}>
                        <TextField
                          size="small"
                          value={prescription[column.field]}
                          onChange={event => changeHandler(event, column.field, index)}/>
                      </TableCell>
                    ))}
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

export default PrescriptionTable;