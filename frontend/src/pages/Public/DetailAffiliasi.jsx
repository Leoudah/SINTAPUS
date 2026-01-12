import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavbarPublik from "../../components/navbarpublik";
import { fetchAfiliasiDetail } from "../../api/publik.api";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function DetailAffiliasi() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sourceFilter, setSourceFilter] = useState('');

    useEffect(() => {
        const loadData = async () => {
            if (!id) return;

            setLoading(true);
            setError(null);
            try {
                const res = await fetchAfiliasiDetail(id, sourceFilter || null);
                setData(res?.data?.data || null);
            } catch (err) {
                setError("Gagal memuat detail afiliasi");
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id, sourceFilter]);

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

    if (!data) return (
        <div>
            <NavbarPublik />
            <div className="max-w-7xl mx-auto p-6">Tidak ada data.</div>
        </div>
    );

    // Prepare data for pie chart (last 5 years)
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
    const publicationStats = data.publicationStats || [];
    const chartData = publicationStats.map((stat, index) => ({
        name: stat.tahun?.toString() || 'Unknown',
        value: parseInt(stat.count) || 0,
        fill: COLORS[index % COLORS.length]
    }));

    return (
        <div>
            <NavbarPublik />
            <div className="max-w-7xl mx-auto p-6">
                {/* Header Info */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-blue-700">{data.institusi}</h1>
                            {data.singkatan && (
                                <div className="text-lg text-gray-600 mt-1">({data.singkatan})</div>
                            )}
                            {data.alamat && (
                                <div className="text-sm text-gray-500 mt-2">{data.alamat}</div>
                            )}

                            <div className="mt-4 flex gap-8">
                                <div>
                                    <div className="text-3xl font-bold text-blue-600">{data.total_dosen ?? 0}</div>
                                    <div className="text-sm text-gray-500">Total Dosen</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-green-600">{data.total_publikasi ?? 0}</div>
                                    <div className="text-sm text-gray-500">Total Publikasi</div>
                                </div>
                            </div>
                        </div>

                        <Link to="/afiliasi" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                            Kembali
                        </Link>
                    </div>
                </div>

                {/* Publication Statistics Chart */}
                {chartData.length > 0 && (
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Statistik Publikasi 5 Tahun Terakhir</h2>
                        <div className="flex justify-center">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, value }) => `${name}: ${value}`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Dosen Section */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Dosen ({data.dosens?.length ?? 0})</h2>

                    {!data.dosens || data.dosens.length === 0 ? (
                        <p className="text-gray-600">Belum ada dosen terdaftar.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data.dosens.map((dosen) => {
                                const avatar = dosen.foto_profil
                                    ? (dosen.foto_profil.startsWith('http')
                                        ? dosen.foto_profil
                                        : `data:image/jpeg;base64,${dosen.foto_profil}`)
                                    : `https://ui-avatars.com/api/?bold=true&size=128&name=${encodeURIComponent(dosen.nama)}`;

                                return (
                                    <Link
                                        key={dosen.id_dosen}
                                        to={`/detaildosen/${dosen.id_dosen}`}
                                        className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={avatar}
                                                alt={dosen.nama}
                                                className="w-16 h-16 rounded-full object-cover border"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-blue-700 hover:text-blue-800">
                                                    {dosen.nama}
                                                </h3>
                                                <div className="text-sm text-gray-500">{dosen.nidn || "-"}</div>
                                                {dosen.negara && (
                                                    <div className="text-xs text-gray-400">{dosen.negara}</div>
                                                )}
                                                <div className="text-xs text-gray-600 mt-1">
                                                    {dosen.total_publikasi ?? 0} publikasi
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Publikasi Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Publikasi ({data.publikasi?.length ?? 0})</h2>

                        {/* Source Filter */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600">Filter by Source:</label>
                            <select
                                value={sourceFilter}
                                onChange={(e) => setSourceFilter(e.target.value)}
                                className="px-3 py-1 border rounded text-sm"
                            >
                                <option value="">All Sources</option>
                                <option value="scopus">Scopus</option>
                                <option value="garuda">Garuda</option>
                                <option value="rama">Rama</option>
                                <option value="google_scholar">Google Scholar</option>
                            </select>
                        </div>
                    </div>

                    {!data.publikasi || data.publikasi.length === 0 ? (
                        <p className="text-gray-600">Belum ada publikasi.</p>
                    ) : (
                        <div className="space-y-4">
                            {data.publikasi.map((pub) => (
                                <div
                                    key={pub.id_publikasi}
                                    className="border-b border-gray-200 pb-4 last:border-b-0"
                                >
                                    <h3 className="text-lg font-medium text-blue-700 hover:text-blue-800">
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
                                        {pub.source && (
                                            <span className="ml-2">• <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">{pub.source}</span></span>
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
