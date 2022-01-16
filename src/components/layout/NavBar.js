import { AppBar, Toolbar } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        Medicare
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;