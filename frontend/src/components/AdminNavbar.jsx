import { Link, useLocation } from "react-router-dom";

export default function AdminNavbar() {
  const loc = useLocation();

  const linkClass = (path) =>
    `px-3 py-2 rounded ${loc.pathname === path ? "bg-white/20 text-white" : "text-white/90 hover:bg-white/10"}`;

  return (
    <div className="bg-purple-700 text-white px-6 py-3 flex items-center gap-4 rounded-b-lg">
      <Link to="/dashboard/admin" className={linkClass("/dashboard/admin")}>Overview</Link>
      <Link to="/dashboard/admin/manage" className={linkClass("/dashboard/admin/manage")}>Manage Akun</Link>
    </div>
  );
}
