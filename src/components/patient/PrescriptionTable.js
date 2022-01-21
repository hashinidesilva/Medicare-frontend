import { useEffect, useState } from "react";

import {
  Autocomplete, Box,
  Button,
  Paper, Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import axios from "axios";

const emptyRow = {key: 0, name: "", dose: "", frequency: "", duration: "", comment: ""};

const columns = [
  {field: 'name', headerName: 'Medicine Name'},
  {field: 'dose', headerName: 'Dose'},
  {field: 'frequency', headerName: 'Frequency'},
  {field: 'duration', headerName: 'Duration'},
  {field: 'addInfo', headerName: 'Additional Information'},
];

const PrescriptionTable = () => {
  const [prescriptions, setPrescriptions] = useState([emptyRow]);
  const [medicines, setMedicines] = useState([]);

  useEffect(async () => {
    const response = await axios.get("http://localhost:8080/medicines");
    const data = await response.data;
    setMedicines(data.map(_ => _.name));
  }, []);

  const changeHandler = (event, field, index) => {
    const newValue = event.target.value;
    setPrescriptions((prevState) => prevState.map((row, rowId) => rowId === index ?
      {...row, [field]: newValue} : row));
  };

  const medicineNameChangeHandler = (value, index) => {
    setPrescriptions((prevState) => prevState.map((row, rowId) => rowId === index ?
      {...row, name: value} : row));
  };

  const savePrescriptionData = () => {

  };

  return (
    <Box sx={{margin: '20px', width: '90%'}}>
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
                {columns.map(column => column.field === 'name' ? (
                  <TableCell width="250px" key={column.field}>
                    <Autocomplete
                      autoComplete
                      includeInputInList
                      options={medicines}
                      value={prescription.name}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction={"row"} spacing={4} marginTop={5}>
        <Button
          variant="contained"
          onClick={() => setPrescriptions((prevState) => [{...emptyRow, key: prevState.length}, ...prevState])}
        >
          Add row
        </Button>
        <Button variant="contained" onClick={savePrescriptionData}>Save</Button>
      </Stack>
    </Box>
  );
};

export default PrescriptionTable;