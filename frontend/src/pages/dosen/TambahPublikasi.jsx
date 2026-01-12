import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarDosen from '../../components/SidebarDosen';
import { useLogout } from '../../hooks/userLogout';
import { createManualPublication } from '../../api/dosen.api';

function TambahPublikasi() {
    const navigate = useNavigate();
    const logout = useLogout();
    const [loading, setLoading] = useState(false);
    const [journals, setJournals] = useState([]);
    const [formData, setFormData] = useState({
        judul: '',
        source: '',
        id_jurnal: '',
        doi: '',
        creator: '',
        tahun: new Date().getFullYear(),
        jenis: 'Journal Article',
        link_publikasi: '',
        citation_count: 0
    });

    useEffect(() => {
        // Fetch journals list
        const fetchJournals = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:5000/api/public/journals', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    setJournals(data.data);
                }
            } catch (err) {
                console.error('Error fetching journals:', err);
            }
        };
        fetchJournals();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.judul || !formData.id_jurnal) {
            alert('Judul dan Jurnal wajib diisi!');
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token');

            // Get user profile to get id_dosen
            const userRes = await fetch('http://localhost:5000/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userData = await userRes.json();
            const id_dosen = userData.id_dosen;

            // Prepare data (remove empty source)
            const submissionData = {
                ...formData,
                source: formData.source || null,
                citation_count: parseInt(formData.citation_count) || 0
            };

            const response = await createManualPublication(id_dosen, submissionData);

            if (response.data.success) {
                alert('Publikasi berhasil ditambahkan! Status: Draft (menunggu verifikasi admin)');
                navigate('/publikasi-ku');
            } else {
                alert(response.data.message || 'Gagal menambahkan publikasi');
            }
        } catch (err) {
            console.error('Error creating publication:', err);
            alert(err.response?.data?.message || 'Gagal menambahkan publikasi');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <SidebarDosen logout={logout} />

            <div className="flex-1 overflow-auto">
                <div className="p-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Tambah Publikasi Manual</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Judul */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Judul Publikasi <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="judul"
                                        value={formData.judul}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Masukkan judul publikasi"
                                        required
                                    />
                                </div>

                                {/* Source */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sumber Publikasi
                                    </label>
                                    <select
                                        name="source"
                                        value={formData.source}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Pilih Sumber (Opsional)</option>
                                        <option value="scopus">Scopus</option>
                                        <option value="rama">RAMA</option>
                                        <option value="garuda">Garuda</option>
                                        <option value="google_scholar">Google Scholar</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">Kosongkan jika tidak yakin</p>
                                </div>

                                {/* Jurnal */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Jurnal <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="id_jurnal"
                                        value={formData.id_jurnal}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Pilih Jurnal</option>
                                        {journals.map(journal => (
                                            <option key={journal.id_jurnal} value={journal.id_jurnal}>
                                                {journal.nama_jurnal} {journal.quartile ? `(Q${journal.quartile})` : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* DOI */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            DOI
                                        </label>
                                        <input
                                            type="text"
                                            name="doi"
                                            value={formData.doi}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="10.1234/example"
                                        />
                                    </div>

                                    {/* Tahun */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tahun
                                        </label>
                                        <input
                                            type="number"
                                            name="tahun"
                                            value={formData.tahun}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            min="1900"
                                            max={new Date().getFullYear() + 1}
                                        />
                                    </div>
                                </div>

                                {/* Creator/Authors */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Penulis (Authors)
                                    </label>
                                    <input
                                        type="text"
                                        name="creator"
                                        value={formData.creator}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Nama penulis (pisahkan dengan koma)"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Kosongkan untuk menggunakan nama Anda</p>
                                </div>

                                {/* Jenis */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Jenis Publikasi
                                    </label>
                                    <select
                                        name="jenis"
                                        value={formData.jenis}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="Journal Article">Journal Article</option>
                                        <option value="Conference Paper">Conference Paper</option>
                                        <option value="Book Chapter">Book Chapter</option>
                                        <option value="Review">Review</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* Link Publikasi */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Link Publikasi
                                    </label>
                                    <input
                                        type="url"
                                        name="link_publikasi"
                                        value={formData.link_publikasi}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="https://example.com/publication"
                                    />
                                </div>

                                {/* Citation Count */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Jumlah Sitasi
                                    </label>
                                    <input
                                        type="number"
                                        name="citation_count"
                                        value={formData.citation_count}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        min="0"
                                    />
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
                                    >
                                        {loading ? 'Menyimpan...' : 'Tambah Publikasi'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/publikasi-ku')}
                                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                                    >
                                        Batal
                                    </button>
                                </div>

                                <p className="text-sm text-gray-600 mt-4">
                                    <span className="text-red-500">*</span> Wajib diisi<br />
                                    <span className="text-yellow-600">ℹ️</span> Publikasi yang ditambahkan akan berstatus <strong>Draft</strong> dan perlu diverifikasi oleh admin
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TambahPublikasi;
