import API from "./api";

export const getProjects = () => API.get("/projects").then(r => r.data);
export const getProject = (id) => API.get(`/projects/${id}`).then(r => r.data);
export const createProject = (payload) => API.post("/projects", payload).then(r => r.data);
export const updateProject = (id, payload) => API.put(`/projects/${id}`, payload).then(r => r.data);
export const deleteProject = (id) => API.delete(`/projects/${id}`).then(r => r.data);
