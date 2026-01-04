import api from "./axios.api";


// list / paginated
export const fetchAccountDetail = (page) => {
  return api.get(`/public/dosen?page=${page}`);
};

// detail dosen publik by id
export const fetchPublicDosenById = (id) => {
  return api.get(`/public/dosen/${id}`);
};

// publikasi dosen publik by id
export const fetchPublicDosenPublications = (id, page = 1) => {
  return api.get(`/public/dosen/${id}/publikasi?page=${page}`);
};