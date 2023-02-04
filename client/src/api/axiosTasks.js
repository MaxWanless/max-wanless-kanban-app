import axios from "./axios";

const axiosTasks = {
  create: (boardId, params) => axios.post(`boards/${boardId}/tasks`, params),
  updatePosition: (boardId, params) =>
    axios.put(`boards/${boardId}/tasks/update-position`, params),
  update: (boardId, taskId, params) =>
    axios.put(`boards/${boardId}/tasks/${taskId}`, params),
  delete: (boardId, taskId) =>
    axios.delete(`boards/${boardId}/tasks/${taskId}`),
};

export default axiosTasks;
