import { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Grid, InputAdornment, Paper, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import PatientsTable from "../components/patient/PatientsTable";

const Patients = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <Paper elevation={3} sx={{padding: 2}}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
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
          </Stack>
        </Grid>
        <Grid item>
          <PatientsTable searchText={searchText}/>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Patients;