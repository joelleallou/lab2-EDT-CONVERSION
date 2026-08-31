import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App.jsx";

const theme = createTheme({
  palette: { primary: { main: "#1565c0" }, secondary: { main: "#00897b" }, background: { default: "#f4f7fb" } },
  typography: { fontFamily: "Inter, Roboto, Arial, sans-serif", h3: { fontWeight: 700 } },
  shape: { borderRadius: 14 }
});

createRoot(document.getElementById("root")).render(
  <StrictMode><ThemeProvider theme={theme}><CssBaseline /><App /></ThemeProvider></StrictMode>
);
