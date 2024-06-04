import { Fragment } from "react";

import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Box, Toolbar } from "@mui/material";

const Layout = (props) => {
  return (
    <Fragment>
      <NavBar/>
      <Toolbar/>
      <Box sx={{display: 'flex', backgroundColor: "#f2f3f5", width: '100%', height: '100vh'}}>
        <SideBar/>
        <Box component="main" sx={{flexGrow: 1, margin: "40px"}}>
          {props.children}
        </Box>
      </Box>
    </Fragment>
  );
};

export default Layout;