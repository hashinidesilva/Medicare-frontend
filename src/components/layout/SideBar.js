import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {Box, Button, Drawer, Grid, Toolbar} from '@mui/material';
import PersonOutlineOutlinedIcon
  from '@mui/icons-material/PersonOutlineOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';

const SideBar = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/home')) {
      setSelected(0);
    } else if (location.pathname.includes('/patients')) {
      setSelected(1);
    } else if (location.pathname.includes('/medicines')) {
      setSelected(2);
    } else if (location.pathname.includes('/prescriptions')) {
      setSelected(3);
    } else if (location.pathname.includes('/analytics')) {
      setSelected(4);
    }
  }, [location.pathname]);

  const handleButtonClick = (index, path) => {
    setSelected(index);
    navigate(path);
  };

  const buttonStyles = (index) => ({
    backgroundColor: selected === index ? '#7c93ee' : '#4860bd',
    justifyContent: 'flex-start',
    paddingX: 2,
    color: 'white',
    '&:hover': {
      backgroundColor: selected === index ? '#7c93ee' : '#687fdc',
    },
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
          height: '100%', backgroundColor: '#4860bd',
          display: 'flex', alignItems: 'center',
          flexDirection: 'column', paddingY: 2, paddingX: 1.5,
        }}>
          <Grid container justifyContent={'flex-start'}
                alignItems={'flex-start'} spacing={2}>
            <Grid item xs={12}>
              <Button size="medium" startIcon={<DashboardOutlinedIcon/>}
                      onClick={() => handleButtonClick(0, '/home')}
                      sx={buttonStyles(0)} fullWidth>
                Overview
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button size="medium" startIcon={<PersonOutlineOutlinedIcon/>}
                      onClick={() => handleButtonClick(1, '/patients')}
                      sx={buttonStyles(1)} fullWidth>
                Patients
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button size="medium" startIcon={<VaccinesOutlinedIcon/>}
                      onClick={() => handleButtonClick(2, '/medicines')}
                      sx={buttonStyles(2)} fullWidth>
                Inventory
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button size="medium" startIcon={<DescriptionOutlinedIcon/>}
                      onClick={() => handleButtonClick(3, '/prescriptions')}
                      sx={buttonStyles(3)} fullWidth>
                Prescriptions
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button size="medium" startIcon={<AnalyticsOutlinedIcon/>}
                      onClick={() => handleButtonClick(4, '/analytics')}
                      sx={buttonStyles(4)} fullWidth>
                Analytics
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
  );
};

export default SideBar;