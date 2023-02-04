import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ModeProvider } from "./themes/ModeContext";
import { ThemeContext } from "./themes/useThemeContext";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";

// Pages
import Home from "./pages/Home";
import Board from "./pages/Board";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Components
import AuthLayout from "./components/Layouts/AuthLayout";
import AppLayout from "./components/Layouts/AppLayout";

// Styles
import "./css/scrollbars.css";

function App() {
  return (
    <ModeProvider>
      <ThemeContext>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="boards" element={<Home />} />
              <Route path="boards/:boardId" element={<Board />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeContext>
    </ModeProvider>
  );
}

export default App;

// https://www.youtube.com/watch?v=sqGowdB1tvY
