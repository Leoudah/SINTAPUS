import api from "./axios.api";

export const getAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const updateUserStatus = async (id, status) => {
  const res = await api.patch(`/admin/users/${id}`, {
    status,
  });
  return res.data;
};
