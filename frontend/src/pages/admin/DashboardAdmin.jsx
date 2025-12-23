import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/admin.api";
import UserTable from "../../components/UserTable";
// import { useLogout } from "../hooks/useLogout";

function DashboardAdmin() {
  // const logout = useLogout();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then(data => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <UserTable users={users} />
    </div>
  );
}

export default DashboardAdmin;
