import { useState } from "react";
import { Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MedicineTable from "../components/medicine/MedicineTable";

const LowInventory = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <Paper elevation={3} sx={{padding: 2}}>
      <Grid container direction="column" spacing={5}>
        <Grid item>
          <Typography variant="h4">Low Inventory</Typography>
        </Grid>
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
  );
};


export default LowInventory;