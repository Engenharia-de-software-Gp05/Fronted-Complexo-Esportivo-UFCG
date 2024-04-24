import React from "react";
import { Grid, Paper, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";

const ListDetailDesktop = ({
  HeaderDesktopComponent,
  ContentDesktopComponent,
}) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        backgroundColor: theme.palette.surface.inverse_on,
        height: "100%",
      }}
    >
      <Grid
        container
        height={"100%"}
        padding={2}
        rowGap={4}
        direction={"column"}
        alignItems={"left"}
        aria-label="ListDetailDesktop"
        wrap="nowrap"
      >
        <Grid item aria-label="ListDetail-Header">
          {<HeaderDesktopComponent />}
        </Grid>
        <Grid item container spacing={4} aria-label="ListDetail-Content">
          {<ContentDesktopComponent />}
        </Grid>
      </Grid>
    </Paper>
  );
};

const ListDetailMobile = ({
  HeaderMobileComponent,
  ContentMobileComponent,
}) => {
  return (
    <Grid container direction={"column"} wrap="nowrap">
      <Grid item xs={1}>
        <HeaderMobileComponent />
      </Grid>
      <Grid item xs={11}>
        <ContentMobileComponent />
      </Grid>
    </Grid>
  );
};

const ListDetail = ({
  HeaderDesktopComponent,
  ContentDesktopComponent,
  HeaderMobileComponent,
  ContentMobileComponent,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return isMobile ? (
    <ListDetailMobile
      HeaderMobileComponent={HeaderMobileComponent}
      ContentMobileComponent={ContentMobileComponent}
    />
  ) : (
    <ListDetailDesktop
      HeaderDesktopComponent={HeaderDesktopComponent}
      ContentDesktopComponent={ContentDesktopComponent}
    />
  );
};

export default ListDetail;
