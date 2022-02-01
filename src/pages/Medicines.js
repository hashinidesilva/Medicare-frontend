import { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Grid, InputAdornment, Paper, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MedicineTable from "../components/medicine/MedicineTable";

const Medicines = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <Paper elevation={3} sx={{padding: 2}}>
      <Grid container direction="column" spacing={5}>
        <Grid item>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <TextField
              autoFocus
              id="search-text"
              placeholder="Search medicines..."
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
              startIcon={<AddIcon/>}
              size="large"
              sx={{backgroundColor: "#0003b2"}}
              component={Link}
              to="/medicines/create"
            >
              Add Medicine
            </Button>
          </Stack>
        </Grid>
        <Grid item>
          <MedicineTable searchText={searchText}/>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Medicines;