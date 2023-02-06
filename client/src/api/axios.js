import _axios from "axios";
// import queryString from "query-string";

const baseUrl = process.env.REACT_APP_BASE_URL;
console.log({ baseUrl });
console.log(process.env.REACT_APP_BASE_URL);
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
