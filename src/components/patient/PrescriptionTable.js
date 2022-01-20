import { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Autocomplete, InputBase } from "@mui/material";

const emptyRow = {
  id: 1,
  name: "",
  dose: "",
  frequency: "",
  duration: "",
};

const PrescriptionTable = () => {

  const [medicines, setMedicines] = useState();

  const columns = [
    {
      field: 'name',
      headerName: 'Medicine name',
      width: 280,
      renderCell: (params) => {
        return (
          <Autocomplete
            autoComplete
            includeInputInList
            id="combo-box-demo"
            options={medicines}
            fullWidth
            renderInput={(params) =>
              <InputBase
                fullWidth
                placeholder="Select medicine"
                ref={params.InputProps.ref}
                inputProps={params.inputProps}
                autoFocus
              />
            }
          />
        );
      },
    },
    {field: 'dose', headerName: 'Dose', editable: true},
    {field: 'frequency', headerName: 'Frequency', editable: true},
    {field: 'duration', headerName: 'Duration', editable: true},
    {field: 'comments', headerName: 'Additional Information', width: 300, editable: true},
  ];

  useEffect(async () => {
    const response = await axios.get("http://localhost:8080/medicines");
    const data = await response.data;
    setMedicines(data.map(_ => _.name));
  }, []);

  return (
    <div style={{height: 300, width: '100%'}}>
      <DataGrid rows={[emptyRow]} columns={columns}/>
    </div>
  );
};

export default PrescriptionTable;