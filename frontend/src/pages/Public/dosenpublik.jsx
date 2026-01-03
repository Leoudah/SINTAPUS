import { useEffect, useState, useMemo } from "react";
import NavbarPublik from "../../components/navbarpublik";
import { fetchAccountDetail } from "../../api/publik.api";
import { Link } from "react-router-dom";

export default function DosenPublik() {
  const [dosens, setDosens] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({});

  const [q, setQ] = useState("");
  const [sort, setSort] = useState("");

  const loadPage = async (p = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAccountDetail(p);
      const items = res?.data?.data ?? res?.data ?? [];
      setDosens(items);
      setMeta(res?.data?.meta ?? {});
    } catch (err) {
      setError("Gagal memuat data dosen");
      setDosens([]);
      setMeta({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const filtered = useMemo(() => {
    let list = [...dosens];
    if (q.trim()) {
      const key = q.toLowerCase();
      list = list.filter((d) => {
        const name = (d.nama || d.name || d.fullname || "").toLowerCase();
        const aff = (d.afiliasi || d.affiliation || "").toLowerCase();
        return name.includes(key) || aff.includes(key);
      });
    }

    if (sort === "sinta3") {
      list.sort((a, b) => (b.sinta_score_3yr || b.sinta3 || 0) - (a.sinta_score_3yr || a.sinta3 || 0));
    } else if (sort === "sintaOverall") {
      list.sort((a, b) => (b.sinta_score_overall || b.sintaOverall || 0) - (a.sinta_score_overall || a.sintaOverall || 0));
    }

    return list;
  }, [dosens, q, sort]);

  const totalPages = meta.last_page || (meta.total && meta.per_page ? Math.ceil(meta.total / meta.per_page) : undefined);
  const totalRecords = meta.total;

  const handlePageClick = (p) => {
    if (p >= 1 && (!totalPages || p <= totalPages)) setPage(p);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (!totalPages || page < totalPages) setPage(page + 1);
  };



  return (
    <div>
      <NavbarPublik />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Dosen Publik</h1>

        <div className="bg-white p-4 rounded shadow mb-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1 md:flex md:items-center md:gap-4">
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-2 border rounded w-full md:w-64">
                <option value="">Urutkan</option>
                <option value="sinta3">Sinta Score 3Yr (desc)</option>
                <option value="sintaOverall">Sinta Score Overall (desc)</option>
              </select>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="mt-2 md:mt-0 w-full md:w-1/2 px-3 py-2 border rounded" />
            </div>
            <div className="text-sm text-gray-600">{totalRecords ? `Page ${page} of ${totalPages ?? '?'} | Total Records ${totalRecords}` : ''}</div>
          </div>
        </div>

        {loading && <div className="text-gray-600">Memuat...</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}

        {!loading && filtered.length === 0 && <p className="text-gray-700">Tidak ada data dosen.</p>}

        <div className="space-y-6">
          {filtered.map((d) => {
            // map API fields to UI
            const name = d.nama || d.name || d.fullname || "-";
            const affiliation = d.institusi || d.instansi || d.afiliasi || "-";
            const nidn = d.nidn || d.id_dosen || d._id || "";
            const avatar = d.foto_profil ? (d.foto_profil.startsWith('http') ? d.foto_profil : `data:image/jpeg;base64,${d.foto_profil}`) : `https://ui-avatars.com/api/?bold=true&size=128&name=${encodeURIComponent(name)}`;
            const totalPublikasi = d.total_publikasi ?? d.total_publikasi_count ?? 0;
            const idDosen = (d.id_dosen ?? d.id) || d._id || d.nidn || "";
            const country = d.negara || d.country || '';
            const subjects = (() => {
              if (!d.tag_nama) return [];
              if (Array.isArray(d.tag_nama)) return d.tag_nama;
              if (typeof d.tag_nama === 'string') return d.tag_nama.split(',').map(s => s.trim()).filter(Boolean);
              return [];
            })();

            return (
              <div key={nidn || name} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    <img src={avatar} alt={name} className="w-24 h-24 rounded-md object-cover border" />

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xl font-semibold text-blue-700">{name}</div>
                          <div className="text-sm text-gray-500 mt-1">{affiliation}</div>
                          <div className="text-sm text-gray-400 mt-1">NIDN: {nidn} {country ? <span className="ml-2">{country}</span> : null}</div>
                        </div>

                        <div className="text-right">
                          <div className="flex gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold">{totalPublikasi}</div>
                              <div className="text-xs text-gray-500">Total Publikasi</div>
                            </div>

                            <div className="text-center">
                              <div className="text-2xl font-bold">-</div>
                              <div className="text-xs text-gray-500">SINTA Score</div>
                            </div>
                          </div>
                        </div>
                      </div>



                      <div className="mt-4 text-sm text-gray-600">
                        <div className="flex gap-6">
                          <div>Total Publikasi : <span className="font-semibold">{totalPublikasi ?? '-'}</span></div>
                          <div>Dosen ID : <span className="font-semibold">{idDosen || '-'}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-3 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-gray-500 mr-2">Subjects:</span>
                    {subjects.length ? (
                      <span className="inline-flex gap-2">
                        {subjects.slice(0,3).map((s, i) => (
                          <span key={i} className="bg-blue-600 text-white text-xs px-2 py-1 rounded">{s}</span>
                        ))}
                      </span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Link to={`/detaildosen/${idDosen || nidn}`} className="px-3 py-1 rounded bg-blue-600 text-white">View</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button onClick={handlePrev} disabled={page === 1} className="px-3 py-1 bg-white border rounded disabled:opacity-50">Previous</button>

          {/* page numbers (show up to 5) */}
          {(() => {
            const pages = [];
            const maxButtons = 5;
            const current = page;
            let start = Math.max(1, current - Math.floor(maxButtons / 2));
            if (totalPages) {
              if (start + maxButtons - 1 > totalPages) start = Math.max(1, totalPages - maxButtons + 1);
            }
            for (let i = start; i < start + maxButtons && (!totalPages || i <= totalPages); i++) {
              pages.push(i);
            }

            return pages.map((p) => (
              <button key={p} onClick={() => handlePageClick(p)} className={`px-3 py-1 rounded ${p === page ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
                {p}
              </button>
            ));
          })()}

          <button onClick={handleNext} className="px-3 py-1 bg-white border rounded">Next</button>
        </div>

      </div>
    </div>
  );
}
