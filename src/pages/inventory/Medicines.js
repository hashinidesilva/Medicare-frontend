import {useState} from 'react';
import {Link} from 'react-router-dom';

import {
  Button,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MedicineTable from '../../components/medicine/MedicineTable';

const Medicines = () => {
  const [searchText, setSearchText] = useState('');

  return (
      <>
        <Typography fontSize={30} fontWeight={550}
                    sx={{mb: 4}}>Inventory< /Typography>
        <Grid container justifyContent="space-between" alignItems={'center'}
              sx={{mb: 3}} direction={'row'} spacing={2}>
          <Grid item>
            <TextField
                autoFocus
                id="search-medicines"
                label="Search"
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
            <Stack direction={'row'} justifyContent={'flex-end'}
                   alignItems={'center'} spacing={3}>
              <Button variant="contained" sx={{backgroundColor: '#b25600'}}
                      component={Link} to="low-inventory">
                View Low Inventory
              </Button>
              <Button
                  variant="contained"
                  startIcon={<AddIcon/>}
                  color="primary"
                  component={Link}
                  to="create"
              >
                Add Medicine
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Paper elevation={3} sx={{padding: 2}}>
          <MedicineTable searchText={searchText}/>
        </Paper>
      </>
  );
};

export default Medicines;