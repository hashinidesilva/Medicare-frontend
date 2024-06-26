import LowInventoryAlerts from './dashboard/LowInventoryAlerts';
import {Grid} from '@mui/material';

const DashBoard = () => {
  return (
      <Grid container spacing={6} alignItems={'center'}
            justifyContent={'space-between'}>
        <Grid item xs={5}>
          <LowInventoryAlerts/>
        </Grid>
      </Grid>
  );
};

export default DashBoard;