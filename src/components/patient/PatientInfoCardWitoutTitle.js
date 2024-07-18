import {Card, Typography} from '@mui/material';
import {getFullAge} from '../../util/MedicineUtil';

const PatientInfoCardWithoutTitles = ({patient = {}}) => {
  return (
      <Card variant="outlined"
            sx={{backgroundColor: '#bfdef8', padding: '5px', paddingX: '10px'}}>
        <Typography>{patient.name}</Typography>
        <Typography>{patient.regNo}</Typography>
        <Typography>{getFullAge(patient.age, patient.ageMonths)}</Typography>
      </Card>
  );
};

export default PatientInfoCardWithoutTitles;