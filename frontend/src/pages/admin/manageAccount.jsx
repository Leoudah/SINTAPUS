import { useEffect, useState } from "react";
import { fetchAccounts } from "../../api/admin.api";
import AdminNavbar from "../../components/AdminNavbar";
import AdminFilter from "../../components/AdminFilter";
import AccountTable from "../../components/AccountTable";

export default function ManageAccount() {
  const [status, setStatus] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchAccounts(status || undefined);
      setAccounts(res.data.data);
    } catch (err) {
      alert("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [status]);

  return (
    <div className="min-h-screen">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto mt-6 px-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Daftar Akun</h2>
            <div className="flex items-center gap-2">
              <AdminFilter status={status} setStatus={setStatus} />
            </div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <AccountTable data={accounts} reload={loadData} />
          )}
        </div>
      </div>
    </div>
  );
}
