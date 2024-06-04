import { Card, CardContent, Typography } from "@mui/material";

const PatientAllergiesCard = ({allergies = ""}) => {

  return (
    <Card variant="outlined" sx={{backgroundColor: "#d0707f"}}>
      <CardContent>
        <Typography color="#ffffff">{`Allergies: ${allergies}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default PatientAllergiesCard;