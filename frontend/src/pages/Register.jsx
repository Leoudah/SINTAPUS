import { useState } from "react";
import { registerDosen } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import backgroundImg from '../assets/unudtanda.png';

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
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImg})`, filter: 'blur(5px)' }}></div>
      <div className="absolute inset-0 bg-blue-500 opacity-50"></div>
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Daftar Akun SINTA
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              name="nama"
              onChange={handleChange}
              placeholder="Nama Lengkap"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NIDN
            </label>
            <input
              name="nidn"
              onChange={handleChange}
              placeholder="NIDN"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID Card
            </label>
            <input
              name="id_card"
              onChange={handleChange}
              placeholder="ID Card"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Citizenship ID
            </label>
            <input
              name="citizenship"
              onChange={handleChange}
              placeholder="Citizenship ID"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="col-span-2 flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Afiliasi ID
            </label>
            <input
              name="id_afiliasi"
              onChange={handleChange}
              placeholder="Afiliasi ID"
              className="w-full max-w-xs px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="col-span-2 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Daftar
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Sudah memiliki akun?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Masuk
          </a>
        </p>
      </div>
    </div>
  );
}
