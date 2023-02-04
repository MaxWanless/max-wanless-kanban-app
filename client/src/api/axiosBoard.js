import axios from "./axios";

const axiosBoard = {
  create: () => axios.post("boards"),
  getAll: () => axios.get("boards"),
  updatePosition: (params) => axios.put("boards", params),
  getOne: (boardId) => axios.get(`boards/${boardId}`),
  delete: (boardId) => axios.delete(`boards/${boardId}`),
  update: (boardId, params) => axios.put(`boards/${boardId}`, params),
  getFavourites: () => axios.get("boards/favourites"),
  updateFavouritesPosition: (params) => axios.put("boards/favourites", params),
};

export default axiosBoard;
