import { Fragment } from "react";

import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Box, Toolbar } from "@mui/material";

const Layout = (props) => {
  return (
    <Fragment>
      <NavBar/>
      <Toolbar/>
      <Box sx={{display: 'flex'}}>
        <SideBar/>
        <Box sx={{flexGrow: 1}}>
          <main>{props.children}</main>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Layout;