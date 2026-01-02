import { useEffect, useState } from "react";
import { fetchAccounts } from "../../api/admin.api";
import { useLogout } from "../../hooks/userLogout";

import AdminFilter from "../../components/AdminFilter";
import AccountTable from "../../components/AccountTable";

export default function Admin() {
  const [status, setStatus] = useState("submitted");
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  const logout = useLogout();

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchAccounts(status);
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

  useEffect(() => {
    loadData();
  }, [status]);

  return (
    <div>
      <h1>Admin Verification</h1>

      <AdminFilter status={status} setStatus={setStatus} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <AccountTable data={accounts} reload={loadData} />
      )}
    </div>
  );
}
