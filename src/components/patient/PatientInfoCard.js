import {Card, CardContent, Divider, Stack, Typography} from '@mui/material';

const PatientInfoCard = ({patient = {}}) => {
  return (
      <Card
          sx={{
            backgroundColor: '#bfdef8',
            border: 1,
            borderColor: '#bfdef8',
            minHeight: '21vh',
            '&:hover': {border: 1, borderColor: '#95b9d7'},
          }}>
        <CardContent>
          <Typography
              sx={{fontSize: 15, textAlign: 'flex-start', fontWeight: 600}}
              gutterBottom>Patient
            Information</Typography>
          <Divider/>
          <Stack direction="row" alignItems="center"
                 justifyContent="space-between" spacing={3}>
            <Typography variant={'subtitle2'}>Name</Typography>
            <Typography variant={'subtitle2'}>{patient.name}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center"
                 justifyContent="space-between" spacing={3}>
            <Typography variant={'subtitle2'}>Reg No</Typography>
            <Typography variant={'subtitle2'}>{patient.regNo}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center"
                 justifyContent="space-between">
            <Typography variant={'subtitle2'}>Age</Typography>
            <Typography variant={'subtitle2'}>{patient.age}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center"
                 justifyContent="space-between">
            <Typography variant={'subtitle2'}>Gender</Typography>
            <Typography variant={'subtitle2'}>{patient.gender}</Typography>
          </Stack>
        </CardContent>
      </Card>
  );
};

export default PatientInfoCard;