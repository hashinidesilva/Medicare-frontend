import { Link } from "react-router-dom";

import { Box, Drawer, List, ListItem, Toolbar } from "@mui/material";

const SideBar = () => {
  return (
    <Drawer
      sx={{
        width: 240,
        display: "flex", justifyContent: "center", alignItems: "center",
        // flexShrink: 0,
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
          <ListItem button component={Link} to="/patients">Patients</ListItem>
          <ListItem button component={Link} to="/medicines">Medicines</ListItem>
          <ListItem button component={Link} to="/prescriptions">Prescriptions</ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;