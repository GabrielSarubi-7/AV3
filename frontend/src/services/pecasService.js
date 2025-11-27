// Final/src/services/pecasService.js
import API from "./api";

export const getPecas = () => API.get("/pecas").then(r => r.data);
export const getPeca = (id) => API.get(`/pecas/${id}`).then(r => r.data);
export const createPeca = (payload) => API.post("/pecas", payload).then(r => r.data);
export const updatePeca = (id, payload) => API.put(`/pecas/${id}`, payload).then(r => r.data);
export const deletePeca = (id) => API.delete(`/pecas/${id}`).then(r => r.data);
