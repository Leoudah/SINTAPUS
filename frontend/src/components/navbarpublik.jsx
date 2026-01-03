import { Link } from "react-router-dom";

export default function NavbarPublik() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold text-blue-600">SINTA</Link>
          <Link to="/dosenpublik" className="text-gray-700 hover:text-blue-600">Dosen Publik</Link>
          <Link to="/afiliasi" className="text-gray-700 hover:text-blue-600">Afiliasi</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
          <Link to="/register" className="bg-blue-600 text-white px-3 py-1 rounded">Daftar</Link>
        </div>
      </div>
    </nav>
  );
}
