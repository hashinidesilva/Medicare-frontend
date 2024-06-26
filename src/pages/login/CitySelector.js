import { Box, Paper } from "@mui/material";

const CitySelector = () => {
  return (
    <Box sx={{display: 'flex', minHeight: '100vh', backgroundColor: "#f2f3f5"}}>
      <Box sx={{
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Paper elevation={3} sx={{width: "30%", padding: 4, justifyContent: 'center'}}>
        </Paper>
      </Box>
    </Box>
  );
};

export default CitySelector;