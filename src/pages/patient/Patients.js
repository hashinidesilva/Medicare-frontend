import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Grid, InputAdornment, Paper, TextField, Tooltip, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import PatientsTable from "../../components/patient/PatientsTable";

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Typography fontSize={30} fontWeight={550} sx={{mb: 4}}>Patients</Typography>
      <Grid container justifyContent="space-between" alignItems={"center"} sx={{mb: 3}} direction={"row"} spacing={2}>
        <Grid item>
          <Tooltip title="Enter a name, address, or NIC to search for patients">
            <TextField
              autoFocus
              id="search-patients"
              label="Search"
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon/>
                  </InputAdornment>
                ),
              }}
            />
          </Tooltip>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon/>}
            component={Link}
            to="/patients/create"
          >
            Add Patient
          </Button>
        </Grid>
      </Grid>
      <Paper elevation={3} sx={{padding: 2}}>
        <PatientsTable searchTerm={searchTerm}/>
      </Paper>
    </>
  );
};

export default Patients;