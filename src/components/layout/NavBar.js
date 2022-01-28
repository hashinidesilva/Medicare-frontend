import { AppBar, Toolbar, Typography } from "@mui/material";
import Notifications from "../notification/Notifications";

const NavBar = () => {
  return (
    <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{flexGrow: 1}}>
          Medicare
        </Typography>
        <Notifications/>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;