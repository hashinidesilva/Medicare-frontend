import { useNavigate } from "react-router-dom";

import { AppBar, Toolbar } from "@mui/material";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "#ffffff"}}>
      <Toolbar>
        <img src="/bklogo.jpeg" alt="Logo" style={{height: 55, cursor: 'pointer'}} onClick={() => navigate("/")}/>
        {/*<IconButton aria-label="notifications" sx={{color: "white"}}>*/}
        {/*  <Notifications fontSize="large"/>*/}
        {/*</IconButton>*/}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;