import { useState } from "react";
import { Link } from "react-router-dom";

import { Box, Button, Grid, InputAdornment, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MedicineTable from "../components/medicine/MedicineTable";

const Medicines = () => {
  const [searchText, setSearchText] = useState('');

  return (
    // <Box component={Paper}
    //      sx={{margin: "20px", padding: "40px", border: 1, borderColor: "ActiveCaption", height: 600}}
    // >
    <Box sx={{margin: '20px'}}>
      <Grid container direction="column" spacing={5}>
        <Grid item>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <TextField
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
              sx={{backgroundColor: "#14bdc2"}}
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
    </Box>
  );
};

export default Medicines;