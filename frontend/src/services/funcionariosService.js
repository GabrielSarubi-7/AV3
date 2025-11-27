import API from "./api";

export const getFuncionarios = () => API.get("/funcionarios").then(r => r.data);
export const getFuncionario = (id) => API.get(`/funcionarios/${id}`).then(r => r.data);
export const createFuncionario = (payload) => API.post("/funcionarios", payload).then(r => r.data);
export const updateFuncionario = (id, payload) => API.put(`/funcionarios/${id}`, payload).then(r => r.data);
export const deleteFuncionario = (id) => API.delete(`/funcionarios/${id}`).then(r => r.data);
