import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import MedicationIcon from '@mui/icons-material/Medication';
import HistoryIcon from '@mui/icons-material/History';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Tooltip } from "@mui/material";
import Table from "../UI/Table";

const PatientsTable = (props) => {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [open, setOpen] = useState(false);
  const {searchText} = props;

  useEffect(async () => {
    const response = await axios.get("http://localhost:8080/medicare/v1/patients",
      {
        params: {patientName: searchText === '' ? null : searchText}
      });
    const data = await response.data;
    setPatients(data);
  }, [searchText]);

  const deletePatientHandler = async () => {
    const response = await axios.delete(`http://localhost:8080/medicare/v1/patients/${selectedPatientId}`);
    await response.data;
    const patientsResponse = await axios.get("http://localhost:8080/medicare/v1/patients");
    const data = await patientsResponse.data;
    setPatients(data);
    setOpen(false);
  };

  const columns = [
    {field: 'name', headerName: 'Name', width: '400'},
    {field: 'age', headerName: 'Age', flex: 1},
    {field: 'gender', headerName: 'Gender', flex: 1},
    {
      field: 'actions',
      type: 'actions',
      flex: 0.5,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <Tooltip title="Add prescription">
              <MedicationIcon sx={{color: "#5600b2"}}/>
            </Tooltip>
          }
          label="Add prescription"
          component={Link}
          to={`${params.id}/prescriptions/create`}
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title={"Edit"}>
              <EditIcon sx={{color: "#b25600"}}/>
            </Tooltip>
          }
          component={Link}
          to={`${params.id}/edit`}
          label="Edit"
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Show history">
              <HistoryIcon sx={{color: "#c21465"}}/>
            </Tooltip>
          }
          label="Show history"
          component={Link}
          to={`${params.id}/prescriptions`}
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Delete">
              <DeleteForeverIcon color="error"/>
            </Tooltip>
          }
          onClick={handleClickOpen.bind(null, params.id)}
          label="Delete"
        />,
      ],
    },
  ];

  const handleClickOpen = (patientId) => {
    setSelectedPatientId(patientId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmationPopup = (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete patient.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={deletePatientHandler} autoFocus>Yes</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      <Table columns={columns} rows={patients}/>
      {confirmationPopup}
    </>
  );
};

export default PatientsTable;

