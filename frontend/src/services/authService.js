import API from "./api";
export const login = (payload) => API.post("/auth/login", payload).then(r => r.data);
export const me = () => API.get("/auth/me").then(r => r.data);
export const logout = () => { localStorage.removeItem("aerocode_token"); localStorage.removeItem("aerocode_user"); };
