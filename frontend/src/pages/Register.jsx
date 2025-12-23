import { useState } from "react";
import { registerDosen } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    nama: "",
    nidn: "",
    id_card: "",
    citizenship: "",
    id_afiliasi: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerDosen(form);
      alert(res.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
      console.log(err)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" />
      <input name="nama" onChange={handleChange} placeholder="Nama Lengkap" />
      <input name="nidn" onChange={handleChange} placeholder="NIDN" />
      <input name="id_card" onChange={handleChange} placeholder="ID Card" />
      <input name="citizenship" onChange={handleChange} placeholder="Citizenship ID" />
      <input name="id_afiliasi" onChange={handleChange} placeholder="Afiliasi ID" />

      <button className="bg-blue-600 text-white px-4 py-2">
        Register
      </button>
    </form>
  );
}
