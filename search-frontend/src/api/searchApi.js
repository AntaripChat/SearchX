import axios from "axios";

const API = "http://localhost:8000";

export const searchDocuments = async (query) => {
  const res = await axios.get(`${API}/search?q=${query}`);
  return res.data;
};