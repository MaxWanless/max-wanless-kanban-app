import { useContext } from "react";
import { ModeContext } from "../../themes/ModeContext";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

// Icons
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ColorModeToggle = () => {
  const { mode, setMode } = useContext(ModeContext);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <Tooltip title="Colour Mode">
      <IconButton onClick={toggleColorMode}>
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ColorModeToggle;
