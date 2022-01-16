import { Box, Drawer, List, ListItem, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar/>
      <Box sx={{overflow: 'auto'}}>
        <List>
          <ListItem button component={Link} to="/new-patient">Patient Form</ListItem>
          <ListItem button component={Link} to="/new-medicine">Medicines</ListItem>
          <ListItem button>Patients</ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;