import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Tooltip } from "@mui/material";
import Table from "../UI/Table";

const PatientsTable = (props) => {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [open, setOpen] = useState(false);
  const {searchTerm} = props;

  useEffect(async () => {
    const response = await axios.get("http://localhost:8080/medicare/v1/patients",
      {
        params: {searchTerm: searchTerm === '' ? null : searchTerm}
      });
    const data = await response.data;
    setPatients(data.sort((patient1, patient2) => patient2.id - patient1.id));
  }, [searchTerm]);

  const deletePatientHandler = async () => {
    const response = await axios.delete(`http://localhost:8080/medicare/v1/patients/${selectedPatientId}`);
    await response.data;
    const patientsResponse = await axios.get("http://localhost:8080/medicare/v1/patients");
    const data = await patientsResponse.data;
    setPatients(data);
    setOpen(false);
  };

  const columns = [
    {field: 'name', headerName: 'Name', flex: 1},
    {field: 'age', headerName: 'Age', flex: 0.2},
    {field: 'gender', headerName: 'Gender', flex: 0.3},
    {field: 'nic', headerName: 'NIC', flex: 0.45},
    {field: 'address', headerName: 'Address', flex: 0.75},
    {field: 'tpNumber', headerName: 'TP Number', flex: 0.5},
    {
      field: 'allergies', headerName: 'Allergies', flex: 0.5,
      renderCell: (params) => (
        <Tooltip title={params.value || ''} placement="top-start" enterDelay={500} leaveDelay={200}>
          <Box
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              width: '100%',
              cursor: 'default',
            }}
          >
            {params.value}
          </Box>
        </Tooltip>
      )
    },
    {
      field: 'actions',
      type: 'actions',
      flex: 0.75,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <Tooltip title="Add prescription">
              <MedicationOutlinedIcon color={"primary"} sx={{fontSize: 30}}/>
            </Tooltip>
          }
          label="Add prescription"
          component={Link}
          to={`${params.id}/prescriptions/create`}
          sx={{p: 0}}
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title={"Edit"}>
              <EditOutlinedIcon sx={{color: "#b25600", fontSize: 30}}/>
            </Tooltip>
          }
          label="Edit"
          component={Link}
          to={`${params.id}/edit`}
          sx={{p: 0}}
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Show history">
              <HistoryRoundedIcon sx={{color: "#8a17e2", fontSize: 30}}/>
            </Tooltip>
          }
          label="Show history"
          component={Link}
          to={`${params.id}/prescriptions`}
          sx={{p: 0}}
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Delete">
              <DeleteForeverOutlinedIcon color="error" sx={{fontSize: 30}}/>
            </Tooltip>
          }
          label="Delete"
          onClick={handleClickOpen.bind(null, params.id)}
          sx={{p: 0}}
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

