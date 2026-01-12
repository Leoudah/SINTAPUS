import api from "./axios.api";

export const getPublicationStats = (id_dosen) => {
  return api.get(`/dosen/${id_dosen}/stats`);
};

export const createManualPublication = (id_dosen, data) => {
  return api.post(`/dosen/${id_dosen}/publikasi/manual`, data);
};

export const updatePublication = (id_dosen, id_publikasi, data) => {
  return api.put(`/dosen/${id_dosen}/publikasi/${id_publikasi}`, data);
};

export const deletePublication = (id_dosen, id_publikasi) => {
  return api.delete(`/dosen/${id_dosen}/publikasi/${id_publikasi}`);
};

export const getAllDosen = async () => {
  const res = await fetch("/api/dosen");
  return res.json();
};

export const searchDosen = async (keyword) => {
  const res = await fetch(`/api/dosen/search?keyword=${keyword}`);
  return res.json();
};

export const getAfiliasiDosen = async (dosenId) => {
  const res = await fetch(`/api/dosen/${dosenId}/afiliasi`);
  return res.json();
};
