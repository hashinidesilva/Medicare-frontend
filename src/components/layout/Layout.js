import { Fragment } from "react";

import { Container, Box, Toolbar } from "@mui/material";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Layout = (props) => {
  return (
    <Fragment>
      <Box sx={{display: 'flex', minHeight: '100vh', backgroundColor: "#f2f3f5"}}>
        <NavBar/>
        <Box component="main" sx={{flexGrow: 1, padding: {xs: '1rem', sm: '2rem'}, ml: {sm: '210px'}}}>
          <SideBar/>
          <Toolbar/>
          <Container>
            {props.children}
          </Container>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Layout;