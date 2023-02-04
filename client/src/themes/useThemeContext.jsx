import { createTheme, ThemeProvider } from "@mui/material";
import { useContext } from "react";
import { ModeContext } from "./ModeContext";

export const ThemeContext = ({ children }) => {
  const { mode } = useContext(ModeContext);

  const lightTheme = createTheme({
    palette: {
      mode,
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
};
