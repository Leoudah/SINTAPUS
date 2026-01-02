import { useState } from "react";
import { updateAccountStatus } from "../api/admin.api";
import { useLogout } from "../hooks/userLogout";

export default function VerifyModal({ id, onClose, onSuccess }) {
  const [status, setStatus] = useState("verified");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const logout = useLogout();

  const submit = async () => {
    setLoading(true);
    try {
      await updateAccountStatus(id, {
        status,
        verification_note: note || null
      });

      onClose();
      onSuccess(); // reload data tanpa refresh page
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        logout();
      } else {
        alert("Gagal update status");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: "1px solid black", padding: 10 }}>
      <h3>Verifikasi Akun</h3>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="verified">Verified</option>
        <option value="rejected">Rejected</option>
      </select>

      <textarea
        placeholder="Verification note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <br />

      <button disabled={loading} onClick={submit}>
        Submit
      </button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
