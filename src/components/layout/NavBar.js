import {useNavigate} from 'react-router-dom';

import {AppBar, Box, Button, Stack, Toolbar, Typography} from '@mui/material';

const NavBar = () => {
  const navigate = useNavigate();
  const city = localStorage.getItem('city') || 0;

  const cityName = parseInt(city) === 1 ? 'ELLA' : parseInt(city) === 2
      ? 'MATARA' : '';

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('city');
    navigate('/login');
  };

  return (
      <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: '#ffffff',
          }}>
        <Toolbar>
          <Stack direction={'row'} alignItems="center"
                 justifyContent="space-between" sx={{width: '100%'}}>
            <Box sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
                 onClick={() => navigate('/')}>
              <img src="/bklogo.jpeg" alt="Logo"
                   style={{height: 50, width: 100, marginRight: 5}}/>
              <Typography fontWeight={700} variant="h7" color="#3d3f94">
                {cityName}
              </Typography>
            </Box>
            <Button variant="contained" color={'success'}
                    size={'small'} onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
  );
};

export default NavBar;