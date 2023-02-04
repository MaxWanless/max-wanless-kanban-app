import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

// Api
import axiosAuth from "../api/axiosAuth";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [usernameErrText, setusernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setusernameErrText("");
    setPasswordErrText("");

    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();

    let err = false;

    if (username === "") {
      err = true;
      setusernameErrText("Please fill this field");
    }
    if (password === "") {
      err = true;
      setPasswordErrText("Please fill this field");
    }

    if (err) return;

    setLoading(true);

    try {
      const res = await axiosAuth.login({
        username,
        password,
      });
      setLoading(false);
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (err) {
      console.log(err);
      const errors = err.data.errors;
      errors.forEach((e) => {
        if (e.param === "username") setusernameErrText(e.msg);
        if (e.param === "password") setPasswordErrText(e.msg);
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Box component="form" marginTop={1} onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username (demoKanban)"
          name="username"
          disabled={loading}
          error={usernameErrText !== ""}
          helperText={usernameErrText}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password (demoKanban)"
          name="password"
          type="password"
          disabled={loading}
          error={passwordErrText !== ""}
          helperText={passwordErrText}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="success"
          type="submit"
          loading={loading}
        >
          Login
        </LoadingButton>
        <Button component={Link} to="/signup" sx={{ textTransform: "none" }}>
          Don't have an account? Signup
        </Button>
      </Box>
    </>
  );
};

export default Login;
