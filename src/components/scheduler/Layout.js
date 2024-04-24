import { useTheme } from "@emotion/react";
import { Grid, useMediaQuery } from "@mui/material";
import React from "react";

const LayoutDesktop = ({ ItemComponent, isMobile }) => {
  return (
    <>
      <Grid container height={"100vh"} aria-label="Grid-Container">
        <Grid item xs={1}>
          {/* Drawer */}
          Navbar
        </Grid>
        <Grid
          item
          xs={10}
          height={"50%"}
          alignSelf={"center"}
          aria-label="ListDetail-Grid"
        >
          <ItemComponent isMobile={isMobile} />
        </Grid>
        <Grid item xs={1}>
          Teste
        </Grid>
      </Grid>
    </>
  );
};

const LayoutMobile = ({ ItemComponent, isMobile }) => {
  return (
    <>
      {/* Drawer */}
      <Grid container direction={"column"} wrap={"nowrap"} height={"100vh"}>
        <ItemComponent isMobile={isMobile} />
      </Grid>
    </>
  );
};

const Layout = ({ ItemComponent }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return isMobile ? (
    <LayoutMobile ItemComponent={ItemComponent} isMobile={isMobile} />
  ) : (
    <LayoutDesktop ItemComponent={ItemComponent} isMobile={isMobile} />
  );
};

export default Layout;
