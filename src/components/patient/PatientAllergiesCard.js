import {Card, Typography} from '@mui/material';

const PatientAllergiesCard = ({allergies = ''}) => {

  return (
      <Card variant="outlined"
            sx={{
              backgroundColor: '#f195a2',
              padding: '5px',
              paddingX: '10px',
              minHeight: '10.5vh',
            }}>
        <Typography color="#ffffff">{`Allergies: ${allergies}`}</Typography>
      </Card>
  );
};

export default PatientAllergiesCard;