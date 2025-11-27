// Final/src/services/etapasService.js
import API from "./api";

export const getEtapas = () => API.get("/etapas").then(r => r.data);
export const getEtapa = (id) => API.get(`/etapas/${id}`).then(r => r.data);
export const createEtapa = (payload) => API.post("/etapas", payload).then(r => r.data);
export const updateEtapa = (id, payload) => API.put(`/etapas/${id}`, payload).then(r => r.data);
export const deleteEtapa = (id) => API.delete(`/etapas/${id}`).then(r => r.data);
