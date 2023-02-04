import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// Assets
import assets from "../../assets";

// Components
import Loading from "../common/Loading";

// Utils
import authUtils from "../../utils/authUtils";

const AuthLayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated();
      if (!isAuth) {
        setLoading(false);
      } else {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  return loading ? (
    <Loading fullHeight />
  ) : (
    <Container component="main" maxWidth="xs">
      <Box
        marginTop={8}
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <img
          src={assets.images.logoDark}
          alt="logo"
          style={{ width: "100px" }}
        />
        <Outlet />
      </Box>
    </Container>
  );
};

export default AuthLayout;
