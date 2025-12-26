import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from '../assets/unudtanda.png';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    const token = localStorage.getItem("token");

    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    console.log(payload);
    if (payload.role === "Admin") {
      navigate("/dashboard/admin");
    } else if (payload.role === "Dosen") {
      navigate("/dashboard/dosen");
    } else {
      localStorage.removeItem("token");
      navigate("/login");
    }


  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImg})`, filter: 'blur(5px)' }}></div>
      <div className="absolute inset-0 bg-blue-500 opacity-50"></div>
      <div className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Masuk ke Akun SINTA
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Masuk
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Belum punya akun?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Daftar
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
