import { useState } from "react";

import { InputAdornment, Paper, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MedicineTable from "../../components/medicine/MedicineTable";

const LowInventory = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <Typography fontSize={30} fontWeight={550} sx={{mb: 4}}>Low Inventory</Typography>
      <TextField
        autoFocus
        id="search-text"
        label="Search"
        type="text"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        sx={{mb: 3}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          ),
        }}
      />
      <Paper elevation={3} sx={{padding: 2}}>
        <MedicineTable searchText={searchText} showLowInventory={true}/>
      </Paper>
    </>
  );
};


export default LowInventory;