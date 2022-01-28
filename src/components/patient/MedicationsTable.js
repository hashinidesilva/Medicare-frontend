import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

const MedicationsTable = ({medications = []}) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Medicine name</TableCell>
            <TableCell align="right">Medicine type</TableCell>
            <TableCell align="right">Dose</TableCell>
            <TableCell align="right">Frequency</TableCell>
            <TableCell align="right">Duration</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">AdditionalInfo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medications.map((medication) => (
            <TableRow
              key={medication.medicine.id}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell component="th" scope="row">{medication.medicine.name}</TableCell>
              <TableCell align="right">{medication.medicine.type}</TableCell>
              <TableCell align="right">{medication.dose}</TableCell>
              <TableCell align="right">{medication.frequency}</TableCell>
              <TableCell align="right">{medication.duration}</TableCell>
              <TableCell align="right">{medication.quantity}</TableCell>
              <TableCell align="right">{medication.additionalInfo}</TableCell>
              <TableCell align="right">
                <Checkbox/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

};

export default MedicationsTable;