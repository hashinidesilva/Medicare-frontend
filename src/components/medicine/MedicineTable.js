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

const MedicineTable = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(async () => {
    const response = await axios.get("http://localhost:8080/medicines",
      {
        params: {medicineName: searchText === '' ? null : searchText}
      });
    const data = await response.data;
    setMedicines(data);
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
            placeholder="Search medicines..."
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
          <Button variant="contained" startIcon={<AddIcon/>} component={Link} to="/new-medicine">Add Medicine</Button>
        </Grid>
        <Grid item>
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Medicine</TableCell>
                  <TableCell align="right">Unit Price</TableCell>
                  <TableCell align="right">Units</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medicines.map((medicine) => (
                  <TableRow
                    key={medicine.name}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                  >
                    <TableCell component="th" scope="row">{medicine.name}</TableCell>
                    <TableCell align="right">{medicine.unitPrice}</TableCell>
                    <TableCell align="right">{medicine.units}</TableCell>
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

export default MedicineTable;