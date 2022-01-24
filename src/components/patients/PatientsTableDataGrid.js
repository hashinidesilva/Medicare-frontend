import { useEffect, useState } from "react";

import axios from "axios";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import MedicationIcon from '@mui/icons-material/Medication';
import { DataGrid } from "@mui/x-data-grid";

const PatientsTableDataGrid = (props) => {
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

  const columns = [
    {field: 'name', headerName: 'Name', width: '400'},
    {field: 'age', headerName: 'Age'},
    {
      field: 'actions',
      type: 'actions',
      getActions: () => [
        <Tooltip title="Edit">
          <IconButton onClick={(event) => props.onEdit(event.row)}>
            <EditIcon/>
          </IconButton>
        </Tooltip>,
        <Tooltip title="Add prescription">
          <IconButton onClick={props.onAddMedicine}>
            <MedicationIcon/>
          </IconButton>
        </Tooltip>
      ],
    },
  ];

  const rowClickHandler = (event) => {
    console.log("EEE", event);
  };

  return (
    <div style={{height: 300, width: '100%'}}>
      <DataGrid rows={patients} columns={columns} onRowClick={rowClickHandler}/>
    </div>
  );
};

export default PatientsTableDataGrid;

