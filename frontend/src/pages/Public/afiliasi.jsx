import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarPublik from "../../components/navbarpublik";
import { fetchAfiliasi } from "../../api/publik.api";

export default function Afiliasi() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPage = async (p = 1, qSearch = "") => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAfiliasi(p, qSearch);
      const payload = res?.data ?? {};
      const data = Array.isArray(payload.data) ? payload.data : [];
      setItems(data);
      setMeta(payload.meta ?? {});
    } catch (err) {
      setError("Gagal memuat data afiliasi");
      setItems([]);
      setMeta({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage(page, q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, q]);

  const totalPages = meta?.last_page || (meta?.total && meta?.per_page ? Math.ceil(meta.total / meta.per_page) : undefined);
  const totalRecords = meta?.total;

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (!totalPages || page < totalPages) setPage(page + 1);
  };

  const pageButtons = useMemo(() => {
    const total = totalPages || 1;
    return Array.from({ length: total }, (_, i) => i + 1);
  }, [totalPages]);

  return (
    <div>
      <NavbarPublik />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Afiliasi</h1>
          <div className="text-sm text-gray-600">{totalRecords ? `Page ${page} of ${totalPages ?? "?"} | Total ${totalRecords}` : ""}</div>
        </div>

        <div className="bg-white p-4 rounded shadow mb-4 flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
          <input
            value={q}
            onChange={(e) => {
              setPage(1);
              setQ(e.target.value);
            }}
            placeholder="Cari institusi / singkatan / alamat"
            className="w-full md:w-1/2 px-3 py-2 border rounded"
          />
        </div>

        {loading && <div className="text-gray-600">Memuat...</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {!loading && !error && items.length === 0 && <div className="text-gray-700">Tidak ada data afiliasi.</div>}

        {!loading && items.length > 0 && (
          <div className="bg-white border rounded-lg overflow-hidden shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Institusi</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Singkatan</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Alamat</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">Total Dosen</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">Total Publikasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((a) => (
                    <tr
                      key={a.id_afiliasi}
                      onClick={() => navigate(`/detailafiliasi/${a.id_afiliasi}`)}
                      className="hover:bg-blue-50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">{a.institusi}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{a.singkatan || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{a.alamat || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{a.total_dosen ?? 0}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{a.total_publikasi ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center gap-3">
          <button onClick={handlePrev} disabled={page === 1} className="px-3 py-1 bg-white border rounded disabled:opacity-50">Previous</button>
          {pageButtons.map((p) => (
            <button key={p} onClick={() => setPage(p)} className={`px-3 py-1 rounded ${p === page ? "bg-blue-600 text-white" : "bg-white border"}`}>
              {p}
            </button>
          ))}
          <button onClick={handleNext} disabled={totalPages ? page >= totalPages : false} className="px-3 py-1 bg-white border rounded disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
}
