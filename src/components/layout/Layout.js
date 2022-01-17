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
        <main>{props.children}</main>
      </Box>
    </Fragment>
  );
};

export default Layout;