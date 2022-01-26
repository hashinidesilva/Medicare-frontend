import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";

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

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Medicine</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Units</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medicines.map((medicine) => (
            <TableRow
              key={medicine.name}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell component="th" scope="row">{medicine.name}</TableCell>
              <TableCell align="right">{medicine.type}</TableCell>
              <TableCell align="right">{medicine.unitPrice}</TableCell>
              <TableCell align="right">{medicine.units}</TableCell>
              <TableCell align="right" width={'10px'}>
                <Tooltip title="Edit">
                  <IconButton
                    component={Link}
                    to={`${medicine.id}/edit`}>
                    <EditIcon/>
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

export default MedicineTable;