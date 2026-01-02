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
