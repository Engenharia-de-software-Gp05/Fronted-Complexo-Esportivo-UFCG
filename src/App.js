import { ThemeProvider } from "@emotion/react";
import LightTheme from "./theme";
import { CssBaseline } from "@mui/material/";
import ErrorPage from "./pages/wrong-code";
import OkEmailPage from "./pages/email-check";
import RedefinePasswordCheck from "./pages/new-password-check";
import Rotas from "./Routes";

function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <Rotas />
      <ErrorPage />
      <OkEmailPage />
      <RedefinePasswordCheck />
    </ThemeProvider>
  );
}

export default App;