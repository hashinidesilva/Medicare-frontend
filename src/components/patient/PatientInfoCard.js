import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";

const PatientInfoCard = ({patient = {}}) => {
  return (
    <Card
      sx={{
        backgroundColor: "#bfdef8",
        border: 1,
        borderColor: "#bfdef8",
        "&:hover": {border: 1, borderColor: "#95b9d7"}
      }}>
      <CardContent>
        <Typography sx={{fontSize: 19, textAlign: "flex-start", fontWeight: 600}} gutterBottom>Patient
          Information</Typography>
        <Divider/>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
          <Typography>Name</Typography>
          <Typography>{patient.name}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography>Age</Typography>
          <Typography>{patient.age}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography>Gender</Typography>
          <Typography>{patient.gender}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PatientInfoCard;