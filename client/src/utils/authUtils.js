import axiosAuth from "../api/axiosAuth";

const authUtils = {
  isAuthenticated: async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      const res = await axiosAuth.verifyToken();
      return res.user;
    } catch {
      return false;
    }
  },
};

export default authUtils;
