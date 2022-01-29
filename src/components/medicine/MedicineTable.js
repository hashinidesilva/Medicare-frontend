import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import Table from "../UI/Table";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";

const MedicineTable = (props) => {
  const [medicines, setMedicines] = useState([]);
  const {searchText} = props;

  useEffect(async () => {
    const response = await axios.get("http://localhost:8080/medicines",
      {
        params: {medicineName: searchText === '' ? null : searchText}
      });
    const data = await response.data;
    setMedicines(data);
  }, [searchText]);

  const columns = [
    {field: 'name', headerName: 'Medicine', width: '400'},
    {field: 'type', headerName: 'Type', flex: 1},
    {field: 'unitPrice', headerName: 'Unit Price', flex: 1},
    {field: 'units', headerName: 'Units', flex: 1},
    {
      field: 'actions',
      type: 'actions',
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
      ],
    },
  ];

  return (
    <Table columns={columns} rows={medicines}/>
  );
};

export default MedicineTable;