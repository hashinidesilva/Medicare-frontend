import { Link } from "react-router-dom";

import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import VaccinesIcon from '@mui/icons-material/Vaccines';

const SideBar = () => {
  return (
    <Drawer
      sx={{
        width: 210,
        display: "flex", justifyContent: "center", alignItems: "center",
        '& .MuiDrawer-paper': {
          width: 210,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar/>
      <Box sx={{overflow: 'auto', width: '100%', display: "flex", height: "100%"}}>
        <List>
          <ListItem button component={Link} to="/patients">
            <ListItemIcon>
              <PermIdentityIcon/>
            </ListItemIcon>
            <ListItemText>Patients</ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/medicines">
            <ListItemIcon>
              <VaccinesIcon/>
            </ListItemIcon>
            <ListItemText>Medicines</ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/prescriptions">
            <ListItemIcon>
              <DescriptionIcon/>
            </ListItemIcon>
            <ListItemText>Prescriptions</ListItemText>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;