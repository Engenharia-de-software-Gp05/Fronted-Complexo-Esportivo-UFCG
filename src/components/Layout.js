// Layout.js
import { Drawer, Grid, SwipeableDrawer, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";

const withDrawer = (WrappedComponent) => {
  return ({ setIsDrawerOpen, ...props }) => {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleDrawerOpen = () => {
      setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
      setOpenDrawer(false);
    };

    return (
      <>
        {isMobile ? (
          <>
            <SwipeableDrawer
              anchor="left"
              open={openDrawer}
              onClose={handleDrawerClose}
              onOpen={handleDrawerOpen}
            />
            <WrappedComponent
              setIsDrawerFormOpen={setIsDrawerOpen}
              {...props}
            />
          </>
        ) : (
          <Grid
            container
            height={"100vh"}
            padding={10}
            aria-label="LayoutDesktop-Grid"
          >
            <Grid item xs={1}>
              <Drawer variant="permanent" anchor="left">
                <div>Drawer Permanente</div>
              </Drawer>
            </Grid>
            <Grid item xs={11} alignSelf={"center"}>
              <WrappedComponent {...props} />
            </Grid>
          </Grid>
        )}
      </>
    );
  };
};

const Layout = ({
  layoutMobile: LayoutMobile,
  layoutDesktop: LayoutDesktop,
  setIsDrawerOpen,
}) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <>
      {isMobile ? (
        <LayoutMobile setIsDrawerFormOpen={setIsDrawerOpen} />
      ) : (
        <LayoutDesktop />
      )}
    </>
  );
};

Layout.propTypes = {
  layoutMobile: PropTypes.elementType,
  layoutDesktop: PropTypes.elementType,
};

export { Layout, withDrawer };
