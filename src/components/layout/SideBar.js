import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Drawer, Grid, Toolbar } from "@mui/material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const SideBar = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleButtonClick = (index, path) => {
    setSelected(index);
    navigate(path);
  };

  const buttonStyles = (index) => ({
    backgroundColor: selected === index ? "#7c93ee" : "#4860bd",
    justifyContent: 'flex-start',
    paddingX: 2,
    color: 'white',
    '&:hover': {
      backgroundColor: selected === index ? "#7c93ee" : "#687fdc",
    }
  });

  return (
    <Drawer
      sx={{
        width: 210,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 210,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar/>
      <Box sx={{
        height: "100%", backgroundColor: "#4860bd",
        display: 'flex', alignItems: 'center',
        flexDirection: 'column', paddingY: 2, paddingX: 1.5
      }}>
        <Grid container justifyContent={'flex-start'} alignItems={'flex-start'} spacing={2}>
          <Grid item xs={12}>
            <Button size="medium" startIcon={<PersonOutlineOutlinedIcon/>}
                    justifyContent={'flex-start'} alignItems={'flex-start'}
                    onClick={() => handleButtonClick(0, "/patients")}
                    sx={buttonStyles(0)} fullWidth>
              Patients
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button size="medium" startIcon={<VaccinesOutlinedIcon/>}
                    onClick={() => handleButtonClick(1, "/medicines")}
                    sx={buttonStyles(1)} fullWidth>
              Inventory
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button size="medium" startIcon={<DescriptionOutlinedIcon/>}
                    onClick={() => handleButtonClick(2, "/prescriptions")}
                    sx={buttonStyles(2)} fullWidth>
              Prescriptions
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default SideBar;