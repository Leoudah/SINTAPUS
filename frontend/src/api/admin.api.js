import api from "./axios.api";

// list akun dengan filter status
export const fetchAccounts = (status) => {
  return api.get("/admin/accounts", {
    params: { status }
  });
};

// detail akun
export const fetchAccountDetail = (id) => {
  return api.get(`/admin/accounts/${id}`);
};

// update status akun
export const updateAccountStatus = (id, payload) => {
  return api.put(`/admin/accounts/${id}/status`, payload);
};

// detail publikasi
export const fetchPublicationDetail = (id) => {
  return api.get(`/admin/publications/${id}`);
};

// update status publikasi
export const updatePublicationStatus = (id, payload) => {
  return api.put(`/admin/publications/${id}/status`, payload);
};

// Fetch publications with optional status filter
export const fetchPublications = (status) => {
  return api.get("/admin/publications", {
    params: { status },
  });
};