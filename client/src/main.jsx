import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App.jsx";

function Root() {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: mode === "dark" ? "#90caf9" : "#1565c0" },
      secondary: { main: mode === "dark" ? "#4db6ac" : "#00897b" },
      background: { default: mode === "dark" ? "#121212" : "#f4f7fb" }
    },
    typography: { fontFamily: "Inter, Roboto, Arial, sans-serif", h3: { fontWeight: 700 } },
    shape: { borderRadius: 14 }
  }), [mode]);

  return <ThemeProvider theme={theme}><CssBaseline /><App mode={mode} onToggleTheme={() => setMode((current) => current === "light" ? "dark" : "light")} /></ThemeProvider>;
}

createRoot(document.getElementById("root")).render(
  <StrictMode><Root /></StrictMode>
);
