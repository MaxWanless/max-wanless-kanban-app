import _axios from "axios";
// import queryString from "query-string";

const baseUrl = "https://kanban-server-jbq6.onrender.com/api/v1/";

const getToken = () => localStorage.getItem("token");

const axios = _axios.create({
  baseURL: baseUrl,
});

axios.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  };
});

axios.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      return alert(err);
    }
    throw err.response;
  }
);

export default axios;
