import { Card, CardContent, Typography } from "@mui/material";

const PatientAllergiesCard = ({allergies = ""}) => {

  return (
    <Card variant="outlined" sx={{backgroundColor: "#f195a2"}}>
      <CardContent>
        <Typography color="#ffffff">{`Allergies: ${allergies}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default PatientAllergiesCard;