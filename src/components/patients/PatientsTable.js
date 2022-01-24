import { useEffect, useState } from "react";

import axios from "axios";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import MedicationIcon from '@mui/icons-material/Medication';

const PatientsTable = (props) => {
  const [patients, setPatients] = useState([]);
  const {searchText} = props;

  useEffect(async () => {
    const response = await axios.get("http://localhost:8080/patients",
      {
        params: {patientName: searchText === '' ? null : searchText}
      });
    const data = await response.data;
    setPatients(data);
  }, [searchText]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow
              key={patient.name}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell component="th" scope="row">{patient.name}</TableCell>
              <TableCell align="right">{patient.age}</TableCell>
              <TableCell align="right" width={'10px'}>
                <Tooltip title="Edit">
                  <IconButton onClick={() => {
                    props.onPatientEdit(patient);
                  }}>
                    <EditIcon/>
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell align="right" width={'10px'}>
                <Tooltip title="Add prescription">
                  <IconButton onClick={() => props.onAddMedicine(patient)}>
                    <MedicationIcon/>
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PatientsTable;

