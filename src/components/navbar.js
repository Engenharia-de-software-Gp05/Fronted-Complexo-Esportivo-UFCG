import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Event from "@mui/icons-material/Event";
import Gradient from "@mui/icons-material/Gradient";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import School from "@mui/icons-material/School";
import Groups from "@mui/icons-material/Groups";
import Logout from "@mui/icons-material/Logout";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const roles = decodedToken.roles
        .slice(1, -1)
        .split(",")
        .map((role) => role.trim());
      setUserType(roles.includes("ROLE_ADMIN") ? "ROLE_ADMIN" : "ROLE_USER");
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderButtons = () => {
    switch (userType) {
      case "ROLE_USER":
      case "ROLE_PENDING":
        return [
          { text: "Agendar", link: "/scheduler" },
          { text: "Meus agendamentos", link: "/scheduler" },
          { text: "Quadras", link: "/list-courts" }
        ];
      case "ROLE_ADMIN":
      default:
        return [
          { text: "Agendar", link: "/scheduler" },
          { text: "Meus agendamentos", link: "/scheduler" },
          { text: "Quadras", link: "/list-courts" },
          { text: "Registrar Quadras", link: "/register-court" },
          { text: "Usuários", link: "/list-users" },
          { text: "Funcionários", link: "/list-employees" },
          { text: "Registrar Funcionários", link: "/register-employee" },
          { text: "Sair", link: "/" }
        ];
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          boxShadow: "none",
          backgroundColor: "transparent",
          color: "inherit",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
              bgcolor: "#FFFAFA",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            backgroundColor: "#FFFAFA",
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List
          sx={{
            backgroundColor: "#FFFAFA",
          }}
        >
          {renderButtons().map(({ text, link }, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={link}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 ? (
                    <CalendarMonth />
                  ) : index === 1 ? (
                    <Event />
                  ) : index === 2 ? (
                    <SportsVolleyballIcon />
                  ) : index === 3 ? (
                    <Gradient />
                  ) : index === 4 ? (
                    <School />
                  ) : index === 5 ? (
                    <Groups />
                  ) : index === 6 ? (
                    <HowToRegIcon />
                  ) : (
                    <Logout />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

