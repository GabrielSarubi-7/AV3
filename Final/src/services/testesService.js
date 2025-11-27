// Final/src/services/testesService.js
import API from "./api";

export const getTestes = () => API.get("/testes").then(r => r.data);
export const getTeste = (id) => API.get(`/testes/${id}`).then(r => r.data);
export const createTeste = (payload) => API.post("/testes", payload).then(r => r.data);
export const updateTeste = (id, payload) => API.put(`/testes/${id}`, payload).then(r => r.data);
export const deleteTeste = (id) => API.delete(`/testes/${id}`).then(r => r.data);
