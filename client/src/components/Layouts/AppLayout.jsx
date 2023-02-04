import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";

// Components
import Loading from "../common/Loading";
import Sidebar from "../common/Sidebar";

// Utils
import authUtils from "../../utils/authUtils";

const AppLayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/login");
      } else {
        dispatch(setUser(user));
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate, dispatch]);

  return loading ? (
    <Loading fullHeight />
  ) : (
    <Box display="flex">
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          width: "max-content",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
