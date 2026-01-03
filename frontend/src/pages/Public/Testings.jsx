import React, { useState, useEffect } from "react";
import { fetchAccounts } from "../../api/admin.api";
import AccountTable from "../../components/AccountTable";

function Testing() {

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

  const [current, setCurrent] = useState(0);

  return (
    <div>
    <h1>Hello World</h1>
    <AccountTable data={accounts} reload={loadData} />
    </div>
  );
}

export default Testing;
