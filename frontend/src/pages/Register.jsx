import { useState, useEffect } from "react";
import { registerDosen } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import backgroundImg from '../assets/unudtanda.png';
import api from "../api/axios.api";
import { LuEye, LuEyeOff } from 'react-icons/lu';

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nama: "",
    nidn: "",
    afiliasi: "",
    scopus_author_id: "",
    citizenship: "",
  });

  const [displayCitizenship, setDisplayCitizenship] = useState("");
  const [displayAfiliasi, setDisplayAfiliasi] = useState("");
  const [countries, setCountries] = useState([]);
  const [afiliasiList, setAfiliasiList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countriesRes, afiliasiRes] = await Promise.all([
          api.get("/public/countries"),
          api.get("/public/afiliasi")
        ]);
        setCountries(countriesRes.data.data);
        setAfiliasiList(afiliasiRes.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCitizenshipChange = (e) => {
    const value = e.target.value;
    setDisplayCitizenship(value);
    const country = countries.find(c => c.name === value);
    if (country) {
      setForm({ ...form, citizenship: country.id });
    } else {
      setForm({ ...form, citizenship: "" });
    }
  };

  const handleAfiliasiChange = (e) => {
    const value = e.target.value;
    setDisplayAfiliasi(value);
    const afiliasi = afiliasiList.find(a => a.institusi === value);
    if (afiliasi) {
      setForm({ ...form, afiliasi: afiliasi.id_afiliasi });
    } else {
      setForm({ ...form, afiliasi: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
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
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
              </button>
            </div>
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
              Scopus Author ID
            </label>
            <input
              name="scopus_author_id"
              onChange={handleChange}
              placeholder="Scopus Author ID"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Citizenship
            </label>
            <input
              list="countries"
              value={displayCitizenship}
              onChange={handleCitizenshipChange}
              placeholder="e.g., Indonesia"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <datalist id="countries">
              {countries.map(country => (
                <option key={country.id} value={country.name} />
              ))}
            </datalist>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Afiliasi
            </label>
            <input
              list="afiliasi"
              value={displayAfiliasi}
              onChange={handleAfiliasiChange}
              placeholder="Nama Institusi"
              className="w-full max-w-xs px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <datalist id="afiliasi">
              {afiliasiList.map(afiliasi => (
                <option key={afiliasi.id_afiliasi} value={afiliasi.institusi} />
              ))}
            </datalist>
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
