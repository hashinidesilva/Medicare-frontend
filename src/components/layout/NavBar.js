import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {
  AppBar,
  Avatar,
  Box,
  IconButton, ListItemIcon, Menu, MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import {LockResetOutlined, PowerSettingsNewOutlined} from '@mui/icons-material';
import ChangePasswordModel from '../user/ChangePasswordModel';

const menuStyles = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
};

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const city = localStorage.getItem('city') || 0;
  const open = Boolean(anchorEl);

  const cityName = parseInt(city) === 1 ? 'ELLA' : parseInt(city) === 2
      ? 'MATARA' : '';

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('city');
    sessionStorage.removeItem('auth');
    navigate('/login');
  };

  const handleChangePasswordClick = () => {
    setModalOpen(true);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ml: 2}}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{width: 40, height: 40}}/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={menuStyles}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
              <MenuItem onClick={handleChangePasswordClick}>
                <ListItemIcon>
                  <LockResetOutlined/>
                </ListItemIcon>
                Change Password
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <PowerSettingsNewOutlined/>
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
            <ChangePasswordModel open={modalOpen}
                                 handleClose={() => setModalOpen(false)}/>
          </Stack>
        </Toolbar>
      </AppBar>
  );
};

export default NavBar;