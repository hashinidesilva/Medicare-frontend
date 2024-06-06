import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import PatientsTable from "../../components/patient/PatientsTable";

const Patients = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <Typography variant="h4" sx={{mb: 4}}>Patients</Typography>
      <Grid container justifyContent="space-between" alignItems={"center"} sx={{mb: 3}} direction={"row"} spacing={2}>
        <Grid item>
          <TextField
            autoFocus
            id="search-text"
            placeholder="Search patients..."
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon/>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{backgroundColor: "#0003b2"}}
            size="large"
            startIcon={<AddIcon/>}
            component={Link}
            to="/patients/create"
          >
            Add Patient
          </Button>
        </Grid>
      </Grid>
      <Paper elevation={3} sx={{padding: 2}}>
        <PatientsTable searchText={searchText}/>
      </Paper>
    </>
  );
};

export default Patients;