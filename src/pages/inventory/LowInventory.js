import { useState } from "react";

import { Grid, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MedicineTable from "../../components/medicine/MedicineTable";

const LowInventory = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <Stack spacing={5}>
      <Typography fontSize={30} fontWeight={400}>Low Inventory</Typography>
      <Paper elevation={3} sx={{padding: 2}}>
        <Grid container direction="column" spacing={5}>
          <Grid item>
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
          </Grid>
          <Grid item>
            <MedicineTable searchText={searchText} showLowInventory={true}/>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
};


export default LowInventory;