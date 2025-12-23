import api from "./axios.api";

export const login = async (email, password) => {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

// REGISTER DOSEN
export const registerDosen = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};