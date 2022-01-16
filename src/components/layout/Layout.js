import { Fragment } from "react";

import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Box } from "@mui/material";

const Layout = (props) => {
  return (
    <Fragment>
      <NavBar/>
      <Box sx={{display: 'flex'}}>
        <SideBar/>
        <main>{props.children}</main>
      </Box>
    </Fragment>
  );
};

export default Layout;