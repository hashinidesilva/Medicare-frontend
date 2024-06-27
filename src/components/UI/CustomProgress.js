import {Box, CircularProgress} from '@mui/material';

const CustomProgress = () => {
  return (
      <Box sx={{
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <CircularProgress size="2rem"/>
      </Box>
  );
};

export default CustomProgress;