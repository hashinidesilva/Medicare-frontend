import './HomePage.css';
import { Box, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" style={{height: '85vh'}}>
      <Typography variant="h2" component="h1" textAlign="center" style={{color: '#031348'}}>
        Welcome to BK Health Care
      </Typography>
    </Box>
  );
};

export default HomePage;