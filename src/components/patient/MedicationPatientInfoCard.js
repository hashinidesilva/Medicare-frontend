import { Card, CardContent, Typography } from "@mui/material";

const MedicationPatientInfoCard = ({patient = {}}) => {

  return (
    <Card variant="outlined" sx={{backgroundColor: "#00b2af"}}>
      <CardContent>
        <Typography color="#ffffff">{patient.name}</Typography>
        <Typography color="#ffffff">{`${patient.age} years`}</Typography>
      </CardContent>
    </Card>
  );
};

export default MedicationPatientInfoCard;