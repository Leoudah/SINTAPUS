import { useState } from "react";
import VerifyModal from "./VerifyModal";

export default function AccountTable({ data, reload }) {
  const [selectedId, setSelectedId] = useState(null);

  const statusBadge = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <>
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Nama</th>
              <th className="px-4 py-3 text-left">NIDN</th>
              <th className="px-4 py-3 text-left">Scopus_id</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {data.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  Tidak ada data
                </td>
              </tr>
            )}

            {data.map((row) => (
              <tr key={row.id_user} className="hover:bg-gray-50">
                <td className="px-4 py-3">{row.email}</td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(
                      row.status
                    )}`}
                  >
                    {row.status}
                  </span>
                </td>

                <td className="px-4 py-3">{row.nama || "-"}</td>
                <td className="px-4 py-3">{row.nidn || "-"}</td>
                <td className="px-4 py-3">{row.scopus_author_id || "-"}</td>

                <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setSelectedId(row.id_user)}
                      className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                    >
                      Verifikasi
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedId && (
        <VerifyModal
          id={selectedId}
          onClose={() => setSelectedId(null)}
          onSuccess={reload}
        />
      )}
    </>
  );
}
