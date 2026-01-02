import { useState } from "react";
import { registerDosen } from "../api/auth.api";

export default function CreateUserModal({ isOpen, onClose, onCreated }) {
  const [loading, setLoading] = useState(false);
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerDosen(form);
      alert(res.message || "Akun berhasil dibuat");
      onCreated?.();
      onClose?.();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal membuat akun");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>

      <div className="relative z-10 w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold">Buat Akun Dosen</h3>
          <button className="text-gray-500" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input name="email" type="email" onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input name="password" type="password" onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input name="nama" onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NIDN</label>
            <input name="nidn" onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ID Card</label>
            <input name="id_card" onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Citizenship</label>
            <input name="citizenship" onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Afiliasi ID</label>
            <input name="id_afiliasi" onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
          </div>

          <div className="col-span-2 flex justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 mr-2 rounded border">Batal</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? 'Menyimpan...' : 'Buat Akun'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
