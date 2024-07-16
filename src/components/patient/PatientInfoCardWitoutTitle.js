import {Card, Typography} from '@mui/material';

const PatientInfoCardWithoutTitles = ({patient = {}}) => {
  return (
      <Card variant="outlined"
            sx={{backgroundColor: '#bfdef8', padding: '5px', paddingX: '10px'}}>
        <Typography>{patient.name}</Typography>
        <Typography>{patient.regNo}</Typography>
        <Typography>{`${patient.age} years`}</Typography>
      </Card>
  );
};

export default PatientInfoCardWithoutTitles;