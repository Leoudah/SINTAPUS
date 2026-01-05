import { useState } from "react";
import VerifyModal from "./VerifyModal";

export default function PublicationTable({ publications, onUpdate }) {
    const [selectedId, setSelectedId] = useState(null);
    return (
        <>
            <div className="overflow-x-auto rounded-lg border">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-2 text-left">Judul</th>
                            <th className="px-4 py-2 text-left">Dosen</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {publications.length === 0 && (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="px-4 py-6 text-center text-gray-500"
                                >
                                    Tidak ada data
                                </td>
                            </tr>
                        )}
                        {publications.map((row) => (
                            <tr key={row.id_publikasi} className="hover:bg-gray-50">
                                <td className="px-4 py-3">{row.judul}</td>
                                <td className="px-4 py-3">{row.creator}</td>
                                <td className="px-4 py-3">{row.status}</td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        onClick={() => setSelectedId(row.id_publikasi)}
                                        className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
                                    >
                                        Detail
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
                    type="publication"
                    onClose={() => setSelectedId(null)}
                    onSuccess={onUpdate}
                />
            )}
        </>
    );
}