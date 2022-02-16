import { Link } from "react-router-dom";

import Table from "../UI/Table";
import { Button } from "@mui/material";

const PrescriptionsTable = ({prescriptions = []}) => {

  const prescriptionsInfo = prescriptions.map(prescription => {
    return {
      id: prescription.id,
      date: prescription.date,
      diagnosis: prescription.diagnosis,
    };
  });

  const columns = [
    {field: 'date', headerName: 'Date', flex: 0.5},
    {field: 'diagnosis', headerName: 'Diagnosis', flex: 1},
    {
      field: 'actions',
      type: 'actions',
      flex: 0.5,
      renderCell: (params) => (
        <strong>
          <Button
            component={Link}
            to={`${params.id}`}
          >
            More info
          </Button>
        </strong>
      ),
    },
  ];

  return (
    <Table columns={columns} rows={prescriptionsInfo}/>
  );
};

export default PrescriptionsTable;