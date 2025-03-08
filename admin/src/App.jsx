import { CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import AppRoute from "./routes/AppRoute";
import { ColorModeContext, useMode } from "./theme/theme";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <>
      <ToastContainer />
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRoute />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
