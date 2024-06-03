import { Link } from "react-router-dom";

import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import VaccinesRoundedIcon from '@mui/icons-material/VaccinesRounded';

const SideBar = () => {
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
      <Box sx={{height: "100%", backgroundColor: 'rgb(5, 30, 52)'}}>
        <List>
          <ListItem component={Link} to="/patients">
            <ListItemIcon>
              <PersonIcon sx={{color: "#FFFFFF"}}/>
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={<Typography variant="h7" style={{color: '#FFFFFF'}}>Patients</Typography>}/>
          </ListItem>
          <ListItem component={Link} to="/medicines">
            <ListItemIcon>
              <VaccinesRoundedIcon sx={{color: "#FFFFFF"}}/>
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={<Typography variant="h7" style={{color: '#FFFFFF'}}>Inventory</Typography>}/>
          </ListItem>
          <ListItem component={Link} to="/prescriptions">
            <ListItemIcon>
              <DescriptionIcon sx={{color: "#FFFFFF"}}/>
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={<Typography variant="h7" style={{color: '#FFFFFF'}}>Prescriptions</Typography>}/>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;