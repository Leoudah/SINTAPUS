import api from "./axios.api";


// list / paginated with optional search
export const fetchAccountDetail = (page, q = '') => {
  const params = new URLSearchParams({ page });
  if (q) params.set('q', q);
  return api.get(`/public/dosen?${params.toString()}`);
};

// afiliasi list with optional search
export const fetchAfiliasi = (page, q = '') => {
  const params = new URLSearchParams({ page });
  if (q) params.set('q', q);
  return api.get(`/public/afiliasi?${params.toString()}`);
};

// detail afiliasi by id
export const fetchAfiliasiDetail = (id, source = null) => {
  const params = new URLSearchParams();
  if (source) params.set('source', source);
  const queryString = params.toString();
  return api.get(`/public/afiliasi/${id}${queryString ? '?' + queryString : ''}`);
};

// detail dosen publik by id
export const fetchPublicDosenById = (id) => {
  return api.get(`/public/dosen/${id}`);
};

// publikasi dosen publik by id
export const fetchPublicDosenPublications = (id, page = 1, source = null) => {
  const params = new URLSearchParams({ page });
  if (source) params.set('source', source);
  return api.get(`/public/dosen/${id}/publikasi?${params.toString()}`);
};