import './HomePage.css';
import { Box, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      {/*<img src="/homepage.jpeg" alt="Logo" style={{width:'100%',height:'100%',padding:0}}/>*/}
      <Typography variant="h2" component="h1" textAlign="center" style={{color: '#031348'}}>
        Welcome to BK Health Care
      </Typography>
    </Box>
  );
};

export default HomePage;