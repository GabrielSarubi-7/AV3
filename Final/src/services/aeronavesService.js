// Final/src/services/aeronavesService.js
import API from "./api";

export const getAeronaves = () => API.get("/aeronaves").then(r => r.data);
export const getAeronave = (id) => API.get(`/aeronaves/${id}`).then(r => r.data);
export const createAeronave = (payload) => API.post("/aeronaves", payload).then(r => r.data);
export const updateAeronave = (id, payload) => API.put(`/aeronaves/${id}`, payload).then(r => r.data);
export const deleteAeronave = (id) => API.delete(`/aeronaves/${id}`).then(r => r.data);
