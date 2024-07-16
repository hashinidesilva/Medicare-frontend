import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {
  Button,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PatientsTable from '../../components/patient/PatientsTable';

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patientRegNo, setPatientRegNo] = useState('');

  return (
      <>
        <Typography fontSize={25} fontWeight={550}
                    sx={{mb: 2}}>Patients</Typography>
        <Grid container justifyContent="space-between" alignItems={'center'}
              sx={{mb: 3}} direction={'row'} spacing={2}>
          <Grid item>
            <Stack direction={'row'} justifyContent={'flex-start'}
                   alignItems={'center'} spacing={3}>
              <Tooltip
                  title="Enter a name, address, or NIC to search for patients">
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
                    sx={{
                      '& .MuiInputBase-root': {
                        height: '45px',
                      },
                    }}
                />
              </Tooltip>
              <TextField
                  id="search-patients-byid"
                  label="Patient ID"
                  type="text"
                  value={patientRegNo}
                  onChange={(event) => setPatientRegNo(event.target.value)}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon/>
                        </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      height: '45px',
                    },
                  }}
              />
            </Stack>
          </Grid>
          <Grid item>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon/>}
                component={Link}
                size={'small'}
                to="/patients/create"
            >
              Add Patient
            </Button>
          </Grid>
        </Grid>
        <Paper elevation={3} sx={{padding: 2}}>
          <PatientsTable searchTerm={searchTerm} regNo={patientRegNo}/>
        </Paper>
      </>
  );
};

export default Patients;