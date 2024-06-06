import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  FormControlLabel,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MedicineTable from "../../components/medicine/MedicineTable";

const Medicines = () => {
  const [searchText, setSearchText] = useState('');
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <Typography variant="h4" sx={{mb: 4}}>{`${checked ? "Low Inventory" : "Inventory"}`}< /Typography>
      <Grid container justifyContent="space-between" alignItems={"center"} sx={{mb: 3}} direction={"row"} spacing={2}>
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
          <Stack direction={"row"} justifyContent={"flex-end"} alignItems={"center"} spacing={3}>
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange}
              />}
              color="warning"
              label={<Typography variant="subtitle1" sx={{fontSize: '1.25rem'}}>Low Inventory</Typography>}
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
      </Grid>
      <Paper elevation={3} sx={{padding: 2}}>
        <MedicineTable searchText={searchText} showLowInventory={checked}/>
      </Paper>
    </>
  );
};

export default Medicines;