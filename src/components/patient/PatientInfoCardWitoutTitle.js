import {Card, CardContent, Typography} from '@mui/material';

const PatientInfoCardWithoutTitles = ({patient = {}}) => {
  return (
      <Card variant="outlined"
            sx={{backgroundColor: '#bfdef8'}}>
        <CardContent>
          <Typography>{patient.name}</Typography>
          <Typography>{patient.regNo}</Typography>
          <Typography>{`${patient.age} years`}</Typography>
        </CardContent>
      </Card>
  );
};

export default PatientInfoCardWithoutTitles;