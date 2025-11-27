import axios from "axios";
const base = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const API = axios.create({ baseURL: base, timeout: 10000 });
API.interceptors.request.use(config => {
  const token = localStorage.getItem("aerocode_token");
  if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  return config;
});
export default API;