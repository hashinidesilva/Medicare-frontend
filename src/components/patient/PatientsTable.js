import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import MedicationIcon from '@mui/icons-material/Medication';
import HistoryIcon from '@mui/icons-material/History';
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";
import Table from "../UI/Table";

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
            <Tooltip title={"Edit"}>
              <EditIcon sx={{color: "#c07015"}}/>
            </Tooltip>
          }
          component={Link}
          to={`${params.id}/edit`}
          label="Edit"
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Add prescription">
              <MedicationIcon sx={{color: "#1b15c0"}}/>
            </Tooltip>
          }
          label="Add prescription"
          component={Link}
          to={`${params.id}/prescriptions/create`}
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
      ],
    },
  ];

  return (
    <Table columns={columns} rows={patients}/>
  );
};

export default PatientsTable;

