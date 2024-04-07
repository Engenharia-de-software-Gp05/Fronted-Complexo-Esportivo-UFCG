import { createTheme } from "@mui/material/styles";

const LightTheme = createTheme({
  palette: {
    primary: {
      main: "#8F4C36",
      on: "#FFFFFF",
      container: "#FFDBD0",
      on_container: "#3A0B00",
      fixed_dim: "#FFB59E",
      fixed_variant: "#723521",
    },
    secondary: {
      main: "#77574D",
      on: "#FFFFFF",
      container: "#FFDBD0",
      on_container: "#2C150E",
      fixed_dim: "#E7BDB1",
      fixed_variant: "#E7BDB1",
    },
    tertiary: {
      main: "#6B5E2F",
      on: "#FFFFFF",
      container: "#F5E2A7",
      on_container: "#231B00",
      fixed_dim: "#D8C68D",
      fixed_variant: "#52461A",
    },
    error: {
      main: "#BA1A1A",
      contrastText: "#FFFFFF",
      light: "#FFDAD6",
      on_light: "#410002",
    },
    surface: {
      main: "#FFF8F6",
      dim: "#E8D6D1",
      bright: "#FFF8F6",
      container: {
        lowest: "#FFFFFF",
        low: "#FFF1ED",
        main: "#FCEAE5",
        high: "#F7E4DF",
        highest: "#F1DFDA",
      },
      on: "#231917",
      on_variant: "#53433F",
      outline: "#85736E",
      outline_variant: "#D8C2BC",
    },
    background: {
      default: "#FFF8F6",
    },
  },
});

export default LightTheme;
