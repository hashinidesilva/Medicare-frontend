import { Card, CardContent, CardHeader, Divider, Stack, Typography } from "@mui/material";

const PatientInfoCard = ({patient = {}}) => {

  return (
    <Card variant="outlined" sx={{backgroundColor: "#00b2af", minWidth: 300}}>
      <CardHeader title={"Patient Information"} titleTypographyProps={{textAlign: "center", color: "#ffffff"}}/>
      <Divider color="#ffffff"/>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography color="#ffffff">Name</Typography>
          <Typography color="#ffffff">{patient.name}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography color="#ffffff">Age</Typography>
          <Typography color="#ffffff">{patient.age}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography color="#ffffff">Gender</Typography>
          <Typography color="#ffffff">{patient.gender}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PatientInfoCard;