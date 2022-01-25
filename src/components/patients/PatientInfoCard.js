import { Card, CardContent, Typography } from "@mui/material";

const PatientInfoCard = ({patient}) => {

  return (
    <Card variant="outlined" sx={{backgroundColor: "#E8E8E8"}}>
      <CardContent>
        <Typography mx={2} variant="h5" gutterBottom>Patient Information</Typography>
        <Typography mx={2} color="text.secondary" gutterBottom>Name</Typography>
        <Typography mx={2}>{patient.name}</Typography>
        <Typography mx={2} color="text.secondary" sx={{marginTop: 1.5}} gutterBottom>Age</Typography>
        <Typography mx={2}>{patient.age}</Typography>
      </CardContent>
    </Card>
  );

};

export default PatientInfoCard;