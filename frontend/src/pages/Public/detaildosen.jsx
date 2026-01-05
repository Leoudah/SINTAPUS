import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavbarPublik from "../../components/navbarpublik";
import { fetchPublicDosenById, fetchPublicDosenPublications } from "../../api/publik.api";

export default function DetailDosen() {
  const { id } = useParams();
  const [dosen, setDosen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [publications, setPublications] = useState([]);
  const [pubLoading, setPubLoading] = useState(false);
  const [pubError, setPubError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchPublicDosenById(id);
        const data = res?.data?.data ?? res?.data ?? res?.data?.dosen ?? null;
        setDosen(data);
      } catch (err) {
        setError('Gagal memuat detail dosen');
      } finally {
        setLoading(false);
      }
    };

    if (id) load();
  }, [id]);

  useEffect(() => {
    const loadPublications = async () => {
      if (!dosen) return;

      setPubLoading(true);
      setPubError(null);
      try {
        const res = await fetchPublicDosenPublications(id);
        const data = res?.data?.data ?? [];
        setPublications(data);
      } catch (err) {
        setPubError('Gagal memuat publikasi dosen');
      } finally {
        setPubLoading(false);
      }
    };

    loadPublications();
  }, [dosen, id]);

  if (loading) return (
    <div>
      <NavbarPublik />
      <div className="max-w-7xl mx-auto p-6">Memuat...</div>
    </div>
  );

  if (error) return (
    <div>
      <NavbarPublik />
      <div className="max-w-7xl mx-auto p-6 text-red-600">{error}</div>
    </div>
  );

  if (!dosen) return (
    <div>
      <NavbarPublik />
      <div className="max-w-7xl mx-auto p-6">Tidak ada data.</div>
    </div>
  );

  const name = dosen.nama || dosen.name || dosen.fullname || "-";
  const institusi = dosen.institusi || dosen.instansi || dosen.afiliasi || "-";
  const nidn = dosen.nidn || dosen.id_dosen || dosen._id || "-";
  const country = dosen.negara || dosen.country || '';
  const avatar = dosen.foto_profil ? (dosen.foto_profil.startsWith('http') ? dosen.foto_profil : `data:image/jpeg;base64,${dosen.foto_profil}`) : `https://ui-avatars.com/api/?bold=true&size=256&name=${encodeURIComponent(name)}`;
  const totalPublikasi = dosen.total_publikasi ?? 0;
  const subjects = (() => {
    if (!dosen.tag_nama) return [];
    if (Array.isArray(dosen.tag_nama)) return dosen.tag_nama;
    if (typeof dosen.tag_nama === 'string') return dosen.tag_nama.split(',').map(s => s.trim()).filter(Boolean);
    return [];
  })();

  // Filter publications to only include those that are verified and public
  const filteredPublications = publications;


  return (
    <div>
      <NavbarPublik />
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex gap-6 items-start">
            <img src={avatar} alt={name} className="w-36 h-36 rounded-md object-cover border" />
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-blue-700">{name}</h1>
              <div className="text-sm text-gray-500 mt-1">{institusi}</div>
              <div className="text-sm text-gray-400 mt-1">NIDN: {nidn} {country ? <span className="ml-2">{country}</span> : null}</div>

              <div className="mt-4 flex gap-6">
                <div>
                  <div className="text-2xl font-bold">{totalPublikasi}</div>
                  <div className="text-xs text-gray-500">Total Publikasi</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">-</div>
                  <div className="text-xs text-gray-500">SINTA Score</div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-sm text-gray-600">Subjects</h3>
                <div className="flex gap-2 mt-2">
                  {subjects.length ? subjects.map((s, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{s}</span>
                  )) : <div className="text-gray-500">-</div>}
                </div>
              </div>

              <div className="mt-6">
                <Link to="/dosenpublik" className="px-3 py-2 bg-gray-200 rounded">Kembali</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Publications List */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-3">Publikasi</h2>

          {pubLoading ? (
            <p className="text-gray-600">Memuat publikasi...</p>
          ) : pubError ? (
            <p className="text-red-600">{pubError}</p>
          ) : filteredPublications.length === 0 ? (
            <p className="text-gray-600">Belum ada publikasi yang tersedia.</p>
          ) : (
            <div className="space-y-4">
              {filteredPublications.map((pub) => (
                <div key={pub.id_publikasi} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <h3 className="text-md font-medium text-blue-700 hover:text-blue-800">
                    {pub.link_publikasi ? (
                      <a href={pub.link_publikasi} target="_blank" rel="noopener noreferrer">
                        {pub.judul}
                      </a>
                    ) : (
                      pub.judul
                    )}
                  </h3>
                  {pub.creator && (
                    <div className="text-sm text-gray-500 mt-1">
                      Oleh: {pub.creator}
                    </div>
                  )}
                  <div className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">{pub.jurnal}</span>
                    {pub.tahun && <span className="ml-2">• {pub.tahun}</span>}
                    {pub.citation_count !== null && pub.citation_count !== undefined && (
                      <span className="ml-2">• {pub.citation_count} sitasi</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
