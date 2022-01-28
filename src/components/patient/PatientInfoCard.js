import { Card, CardContent, Stack, Typography } from "@mui/material";

const PatientInfoCard = ({patient = {}}) => {

  return (
    <Card variant="outlined" sx={{backgroundColor: "#E8E8E8"}}>
      <CardContent>
        <Typography mx={2} variant="h5" gutterBottom>Patient Information</Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <div>
            <Typography mx={2} color="text.secondary">Name</Typography>
            <Typography mx={2}>{patient.name}</Typography>
          </div>
          <div>
            <Typography mx={2} color="text.secondary">Age</Typography>
            <Typography mx={2}>{patient.age}</Typography>
          </div>
          <div>
            <Typography mx={2} color="text.secondary">Gender</Typography>
            <Typography mx={2}>{patient.gender}</Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PatientInfoCard;