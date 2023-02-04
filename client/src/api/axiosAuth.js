import axios from "./axios";

const axiosAuth = {
  signup: (params) => axios.post("auth/signup", params),
  login: (params) => axios.post("auth/login", params),
  verifyToken: () => axios.post("auth/verify-token"),
};

export default axiosAuth;
