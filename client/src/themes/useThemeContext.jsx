import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
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
    <ThemeProvider
      theme={
        mode === "dark"
          ? responsiveFontSizes(darkTheme)
          : responsiveFontSizes(lightTheme)
      }
    >
      {children}
    </ThemeProvider>
  );
};
