import { useState } from "react";
import { Link } from "react-router-dom";

import { Box, Button, Grid, InputAdornment, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import PatientsTable from "../components/patient/PatientsTable";

const Patients = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <Box sx={{margin: '20px', display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <TextField
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
              sx={{backgroundColor:"#14bdc2"}}
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
    </Box>
  );
};

export default Patients;