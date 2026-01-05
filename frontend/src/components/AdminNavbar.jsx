import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/userLogout";

export default function AdminNavbar() {
  const loc = useLocation();

  const linkClass = (path) =>
    `px-3 py-2 rounded ${loc.pathname === path ? "bg-white/20 text-white" : "text-white/90 hover:bg-white/10"}`;

const logout = useLogout();

  return (
    <div className="bg-purple-700 text-white px-6 py-3 rounded-b-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/admin" className={linkClass("/dashboard/admin")}>Overview</Link>
          <Link to="/dashboard/admin/manage" className={linkClass("/dashboard/admin/manage")}>Manage Akun</Link>
          <Link to="/dashboard/admin/publikasi" className={linkClass("/dashboard/admin/publikasi")}>Manage Publikasi</Link>
        </div>

        <div>
          <button
            onClick={logout}
            className="bg-white text-purple-700 px-3 py-1.5 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
