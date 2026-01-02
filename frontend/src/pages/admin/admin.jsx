import { useEffect, useState } from "react";
import { fetchAccounts } from "../../api/admin.api";
import { useLogout } from "../../hooks/userLogout";

import CreateUserModal from "../../components/CreateUserModal";
import AdminNavbar from "../../components/AdminNavbar";

export default function Admin() {
  const [status, setStatus] = useState(""); // empty means all
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  // counts for the overview cards
  const [counts, setCounts] = useState({ total: 0, submitted: 0, verified: 0, rejected: 0 });
  const [countsLoading, setCountsLoading] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);

  const logout = useLogout();

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchAccounts(status || undefined);
      setAccounts(res.data.data);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        logout(); // token invalid / bukan admin
      } else {
        alert("Gagal memuat data");
      }
    } finally {
      setLoading(false);
    }
  };

  // load counts for overview cards
  const loadCounts = async () => {
    setCountsLoading(true);
    try {
      const [allRes, submittedRes, verifiedRes, rejectedRes] = await Promise.all([
        fetchAccounts(),
        fetchAccounts("submitted"),
        fetchAccounts("verified"),
        fetchAccounts("rejected"),
      ].map((p) => p.catch((e) => ({ data: { data: [] } }))));

      setCounts({
        total: allRes.data.data?.length ?? 0,
        submitted: submittedRes.data.data?.length ?? 0,
        verified: verifiedRes.data.data?.length ?? 0,
        rejected: rejectedRes.data.data?.length ?? 0,
      });
    } catch (err) {
      console.error("Gagal memuat counts:", err);
    } finally {
      setCountsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [status]);

  useEffect(() => {
    loadCounts();
  }, []);

  const cardClass = (active) =>
    `bg-white p-6 rounded-lg shadow-sm cursor-pointer flex-1 ${active ? "ring-2 ring-offset-2 ring-purple-400" : ""}`;

  return (
    <div className="min-h-screen">
      {/* Purple header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-sm opacity-90">Kelola akun dosen dan verifikasi</p>
            </div>

            <div>
              <button
                onClick={() => setCreateOpen(true)}
                className="bg-white text-purple-600 px-4 py-2 rounded shadow hover:bg-gray-100"
              >
                Buat Akun Baru
              </button>
            </div>
          </div>

          <AdminNavbar />
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 px-6">
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={cardClass(status === "")} onClick={() => setStatus("")}> 
            <div className="text-sm text-gray-500">Total Akun</div>
            <div className="mt-3 text-3xl font-bold">{countsLoading ? '...' : counts.total}</div>
            <div className="mt-2 text-sm text-gray-400">Semua status</div>
          </div>

          <div className={cardClass(status === "submitted")} onClick={() => setStatus("submitted")}>
            <div className="text-sm text-gray-500">Dikirim (Submitted)</div>
            <div className="mt-3 text-3xl font-bold text-yellow-600">{countsLoading ? '...' : counts.submitted}</div>
            <div className="mt-2 text-sm text-gray-400">Menunggu verifikasi</div>
          </div>

          <div className={cardClass(status === "verified")} onClick={() => setStatus("verified")}>
            <div className="text-sm text-gray-500">Terverifikasi</div>
            <div className="mt-3 text-3xl font-bold text-green-600">{countsLoading ? '...' : counts.verified}</div>
            <div className="mt-2 text-sm text-gray-400">Akun aktif</div>
          </div>

          <div className={cardClass(status === "rejected")} onClick={() => setStatus("rejected")}>
            <div className="text-sm text-gray-500">Ditolak</div>
            <div className="mt-3 text-3xl font-bold text-red-600">{countsLoading ? '...' : counts.rejected}</div>
            <div className="mt-2 text-sm text-gray-400">Perlu tindak lanjut</div>
          </div>
        </div>

        {/* Daftar Akun summary card (link to Manage page) */}
        <div className="bg-white rounded-lg shadow mt-6 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Daftar Akun</h2>
            <p className="text-sm text-gray-500 mt-1">{counts.total} akun terdaftar — {counts.submitted} menunggu verifikasi</p>
          </div>

          <div>
            <a href="/dashboard/admin/manage" className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700">Kelola Akun</a>
          </div>
        </div>
      </div>

      <CreateUserModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={() => { loadData(); loadCounts(); }}
      />
    </div>
  );
}
