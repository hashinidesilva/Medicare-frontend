import {Grid} from '@mui/material';
import LowInventoryAlerts from './LowInventoryAlerts';

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