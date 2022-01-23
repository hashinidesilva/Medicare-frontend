import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Box, Button, Grid, IconButton, InputAdornment,
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
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import MedicationIcon from '@mui/icons-material/Medication';
import PatientForm from "./patient/PatientForm";

const PatientsTable = () => {
  const [patients, setPatients] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({});
  const navigate =useNavigate()

  useEffect(async () => {
    const response = await axios.get("http://localhost:8080/patients",
      {
        params: {patientName: searchText === '' ? null : searchText}
      });
    const data = await response.data;
    setPatients(data);
  }, [searchText]);

  const searchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  console.log("selected patients", selectedPatient);

  return (
    <Box sx={{margin: '20px', display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Grid container direction="column" spacing={3}>
        <Grid container justifyContent="space-between" alignItems="center" item>
          <TextField
            id="search-text"
            placeholder="Search patients..."
            type="text"
            value={searchText}
            onChange={searchTextChangeHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon/>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" startIcon={<AddIcon/>} component={Link} to="/new-patient">Add Patient</Button>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={3} justifyContent={"space-between"}>
            <TableContainer component={Paper}>
              <Table sx={{minWidth: 100}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Age</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow
                      key={patient.name}
                      sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                      <TableCell component="th" scope="row">{patient.name}</TableCell>
                      <TableCell align="right">{patient.age}</TableCell>
                      <TableCell align="right" width={'10px'}>
                        <IconButton onClick={() => {
                          setIsEditing(true);
                          setSelectedPatient(patient);
                        }}>
                          <EditIcon/>
                        </IconButton>
                      </TableCell>
                      <TableCell align="right" width={'10px'}>
                        <IconButton onClick={() => {
                         navigate("/prescriptions")
                        }}>
                          <MedicationIcon/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {isEditing && (
              <PatientForm patient={selectedPatient}/>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientsTable;