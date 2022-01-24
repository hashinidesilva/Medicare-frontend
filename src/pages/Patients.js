import { useState } from "react";
import { Link } from "react-router-dom";

import { Box, Button, Grid, InputAdornment, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import PatientsTable from "../components/patients/PatientsTable";
import EditPatient from "../components/patients/EditPatient";
import CloseIcon from "@mui/icons-material/Close";
import PrescriptionTable from "../components/patients/PrescriptionTable";

const Patients = () => {
  const [searchText, setSearchText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [addPrescription, setAddPrescription] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({});

  const patientEditHandler = (patient) => {
    setSelectedPatient(patient);
    setIsEditing(true);
  };

  const openPrescriptionEditPage = (patient) => {
    setAddPrescription(true);
    setSelectedPatient(patient);
  };

  if (addPrescription) {
    return <PrescriptionTable patient={selectedPatient}/>;
  }

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
            <Button variant="contained" startIcon={<AddIcon/>} component={Link} to="/new-patient">Add Patient</Button>
          </Stack>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={2}>
            {/*<PatientsTableDataGrid onEdit={patientEditHandler} onAddMedicine={openPrescriptionEditPage}*/}
            {/*                   searchText={searchText}/>*/}
            <PatientsTable searchText={searchText} onPatientEdit={patientEditHandler}
                           onAddMedicine={openPrescriptionEditPage}/>
            {isEditing && (
              <Grid item xs={6}>
                <Button startIcon={<CloseIcon/>} onClick={() => setIsEditing(false)}>
                  Close
                </Button>
                <EditPatient patient={selectedPatient}/>
              </Grid>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Patients;