import { ThemeProvider } from "@emotion/react";
import LightTheme from "./theme";
import { CssBaseline } from "@mui/material/";
import Rotas from "./Routes";

function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <Rotas />
    </ThemeProvider>
  );
}

export default App;