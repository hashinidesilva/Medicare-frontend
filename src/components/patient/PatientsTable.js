import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Box, Button, Grid, InputAdornment,
  Paper,
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

const PatientsTable = () => {
  const [patients, setPatients] = useState([]);
  const [searchText, setSearchText] = useState('');

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
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientsTable;