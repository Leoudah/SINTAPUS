import { useState } from "react";
import { updateAccountStatus, updatePublicationStatus } from "../api/admin.api";
import { useLogout } from "../hooks/userLogout";

export default function VerifyModal({ id, onClose, onSuccess, type = "account" }) {
  const [status, setStatus] = useState("verified");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const logout = useLogout();

  const submit = async () => {
    setLoading(true);
    try {
      const updateFunction = type === "publication" ? updatePublicationStatus : updateAccountStatus;
      await updateFunction(id, {
        status,
        verification_note: note || null,
      });

      onClose();
      if (onSuccess) onSuccess();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            {type === "publication" ? "Verifikasi Publikasi" : "Verifikasi Akun"}
          </h3>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verification Note (optional)
            </label>
            <textarea
              rows="3"
              placeholder="Catatan untuk user (opsional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-md border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={loading}
            className={`px-4 py-2 text-sm rounded-md text-white ${status === "rejected"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
              } disabled:opacity-50`}
          >
            {loading ? "Menyimpan..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
