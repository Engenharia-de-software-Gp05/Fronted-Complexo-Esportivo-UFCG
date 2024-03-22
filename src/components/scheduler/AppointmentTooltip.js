import React, { useState, useEffect } from "react";
import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import IconButton from "@mui/material/IconButton";
import MoreIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Room from "@mui/icons-material/Room";
import classNames from "clsx";
import { Box, Typography } from "@mui/material";

const PREFIX = "Tooltip";

const classes = {
  icon: `${PREFIX}-icon`,
  textCenter: `${PREFIX}-textCenter`,
  header: `${PREFIX}-header`,
  commandButton: `${PREFIX}-commandButton`,
};

const getClassByLocation = (location) => {
  if (location === "Room 1")
    return "https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg";
  if (location === "Room 2")
    return "https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg";
  return "https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg";
};

const StyledAppointmentTooltipHeader = styled(AppointmentTooltip.Header)(
  () => ({
    [`&.${classes.header}`]: {
      height: "260px",
      backgroundSize: "cover",
    },
  }),
);

const StyledIconButton = styled(IconButton)(() => ({
  [`&.${classes.commandButton}`]: {
    backgroundColor: "rgba(255,255,255,0.65)",
  },
}));

const StyledGrid = styled(Grid)(() => ({
  [`&.${classes.textCenter}`]: {
    textAlign: "center",
  },
}));

const StyledRoom = styled(Room)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: palette.action.active,
  },
}));

const StyledAppointmentTooltipCommandButton = styled(
  AppointmentTooltip.CommandButton,
)(() => ({
  [`&.${classes.commandButton}`]: {
    backgroundColor: "rgba(255,255,255,0.65)",
  },
}));

const Header = ({ children, appointmentData, ...restProps }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        // TODO Integrar com API
        const url = getClassByLocation(appointmentData.location);
        setImageUrl(url);
      } catch (error) {
        console.log("Failed to load image: ", error);
        setImageError(true);
      }
    };
    fetchImageUrl();
  }, [appointmentData.location]);

  return (
    <StyledAppointmentTooltipHeader
      {...restProps}
      style={{ backgroundImage: `url(${imageUrl})` }}
      className={classNames(classes.header)}
      appointmentData={appointmentData}
    >
      {imageError && (
        <Box
          width={"100%"}
          height={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Typography>Image não carregada.</Typography>
        </Box>
      )}

      <StyledIconButton
        /* eslint-disable-next-line no-alert */
        onClick={() => alert(JSON.stringify(appointmentData))}
        className={classes.commandButton}
        size="large"
      >
        <MoreIcon />
      </StyledIconButton>
    </StyledAppointmentTooltipHeader>
  );
};

const Content = ({ children, appointmentData, ...restProps }) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Grid container alignItems="center">
      <StyledGrid item xs={2} className={classes.textCenter}>
        <StyledRoom className={classes.icon} />
      </StyledGrid>
      <Grid item xs={10}>
        <span>{appointmentData.location}</span>
      </Grid>
    </Grid>
  </AppointmentTooltip.Content>
);

const CommandButton = ({ ...restProps }) => (
  <StyledAppointmentTooltipCommandButton
    {...restProps}
    className={classes.commandButton}
  />
);

// Exportar os componentes e estilos
export { Header, Content, CommandButton };
