import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import SidebarDosen from '../../components/SidebarDosen';
import { useLogout } from '../../hooks/userLogout';
import { updatePublication, deletePublication } from '../../api/dosen.api';
import {
    FiExternalLink,
    FiCalendar,
    FiBook,
    FiFileText,
    FiToggleLeft,
    FiToggleRight,
    FiAlertCircle,
    FiCheckCircle,
    FiXCircle,
    FiEdit2,
    FiTrash2,
    FiX
} from 'react-icons/fi';

function PublikasiKu() {
    const logout = useLogout();
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingPub, setEditingPub] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [journals, setJournals] = useState([]);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchPublications();
        fetchJournals();
    }, []);

    const fetchPublications = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await fetch(
                'http://localhost:5000/api/auth/my-publications',
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.ok) {
                const data = await res.json();
                setPublications(data.publications || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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

    const togglePublicationStatus = async (id, currentStatus) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await fetch(
                `http://localhost:5000/api/auth/publications/${id}/toggle-status`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ is_public: currentStatus === 1 ? 0 : 1 })
                }
            );

            if (res.ok) {
                const updatedPublication = await res.json();
                setPublications((prev) =>
                    prev.map((pub) =>
                        pub.id_publikasi === id
                            ? { ...pub, is_public: updatedPublication.is_public }
                            : pub
                    )
                );
            } else {
                console.error('Failed to toggle publication status');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (pub) => {
        setEditingPub(pub);
        setFormData({
            judul: pub.judul,
            source: pub.source || '',
            id_jurnal: pub.id_jurnal,
            doi: pub.doi || '',
            creator: pub.creator || '',
            tahun: pub.tahun,
            jenis: pub.jenis || 'Journal Article',
            link_publikasi: pub.link_publikasi || '',
            citation_count: pub.citation_count || 0
        });
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const userRes = await fetch('http://localhost:5000/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userData = await userRes.json();
            const id_dosen = userData.id_dosen;

            const submissionData = {
                judul: formData.judul?.trim() || '',
                source: formData.source || null,
                id_jurnal: parseInt(formData.id_jurnal) || null,
                doi: formData.doi?.trim() || null,
                creator: formData.creator?.trim() || null,
                tahun: parseInt(formData.tahun) || null,
                jenis: formData.jenis || 'Other',
                link_publikasi: formData.link_publikasi?.trim() || null,
                citation_count: parseInt(formData.citation_count) || 0
            };

            // Validate before sending
            if (!submissionData.judul) {
                alert('Judul wajib diisi!');
                return;
            }
            if (!submissionData.id_jurnal) {
                alert('Jurnal wajib dipilih!');
                return;
            }

            const response = await updatePublication(id_dosen, editingPub.id_publikasi, submissionData);

            if (response.data.success) {
                alert('Publikasi berhasil diupdate! Status berubah menjadi Draft untuk diverifikasi ulang.');
                setEditingPub(null);
                fetchPublications();
            }
        } catch (err) {
            console.error('Error updating publication:', err);
            alert(err.response?.data?.message || 'Gagal mengupdate publikasi');
        }
    };

    const handleDelete = async (pub) => {
        try {
            const token = localStorage.getItem('token');
            const userRes = await fetch('http://localhost:5000/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userData = await userRes.json();
            const id_dosen = userData.id_dosen;

            const response = await deletePublication(id_dosen, pub.id_publikasi);

            if (response.data.success) {
                alert('Publikasi berhasil dihapus!');
                setDeleteConfirm(null);
                fetchPublications();
            }
        } catch (err) {
            console.error('Error deleting publication:', err);
            alert(err.response?.data?.message || 'Gagal menghapus publikasi');
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* SIDEBAR (FIXED AREA) */}
            <SidebarDosen logout={logout} />

            {/* MAIN AREA */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* NAVBAR (FIXED AREA) */}
                <div className="flex-shrink-0">
                    <Navbar />
                </div>

                {/* CONTENT (SCROLL DI SINI SAJA) */}
                <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">
                            PublikasiKu
                        </h1>
                        <p className="text-gray-600">
                            Daftar semua publikasi yang telah Anda unggah
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
                        </div>
                    ) : publications.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <FiFileText className="mx-auto text-gray-400 text-6xl mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                Belum ada publikasi
                            </h3>
                            <p className="text-gray-500">
                                Anda belum memiliki publikasi yang terdaftar.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {publications.map((pub, index) => (
                                <div
                                    key={pub.id_publikasi || index}
                                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2 leading-tight">
                                                {pub.judul}
                                            </h3>

                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <FiCalendar className="text-gray-400" />
                                                    <span>{pub.tahun}</span>
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    <FiBook className="text-gray-400" />
                                                    <span>{pub.nama_jurnal}</span>
                                                </div>
                                            </div>

                                            <p className="text-gray-700 mb-3">
                                                {pub.creator}
                                            </p>

                                            {pub.doi && (
                                                <p className="text-sm text-blue-600 mb-2">
                                                    <strong>DOI:</strong> {pub.doi}
                                                </p>
                                            )}
                                        </div>

                                        {pub.link_publikasi && (
                                            <a
                                                href={pub.link_publikasi}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors ml-4"
                                            >
                                                <FiExternalLink size={16} />
                                                Lihat Publikasi
                                            </a>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4 mb-3">
                                        <span>Status: {pub.is_public === 1 ? 'Public' : 'Private'}</span>
                                        <button
                                            onClick={() => togglePublicationStatus(pub.id_publikasi, pub.is_public)}
                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                                        >
                                            {pub.is_public === 1 ? <FiToggleRight size={20} /> : <FiToggleLeft size={20} />} Toggle
                                        </button>
                                    </div>

                                    {/* Verification Status & Note */}
                                    {pub.status && (
                                        <div className={`mb-3 p-3 rounded-lg flex items-start gap-2 ${pub.status === 'verified' ? 'bg-green-50 border border-green-200' :
                                            pub.status === 'rejected' ? 'bg-red-50 border border-red-200' :
                                                'bg-yellow-50 border border-yellow-200'
                                            }`}>
                                            {pub.status === 'verified' && <FiCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={18} />}
                                            {pub.status === 'rejected' && <FiXCircle className="text-red-600 mt-0.5 flex-shrink-0" size={18} />}
                                            {(pub.status === 'draft' || pub.status === 'submitted') && <FiAlertCircle className="text-yellow-600 mt-0.5 flex-shrink-0" size={18} />}

                                            <div className="flex-1">
                                                <p className={`font-semibold text-sm mb-1 ${pub.status === 'verified' ? 'text-green-800' :
                                                    pub.status === 'rejected' ? 'text-red-800' :
                                                        'text-yellow-800'
                                                    }`}>
                                                    Status Verifikasi: {
                                                        pub.status === 'verified' ? 'Terverifikasi' :
                                                            pub.status === 'rejected' ? 'Ditolak' :
                                                                pub.status === 'submitted' ? 'Menunggu Verifikasi' :
                                                                    'Draft'
                                                    }
                                                </p>
                                                {pub.verification_note && (
                                                    <p className={`text-sm ${pub.status === 'verified' ? 'text-green-700' :
                                                        pub.status === 'rejected' ? 'text-red-700' :
                                                            'text-yellow-700'
                                                        }`}>
                                                        <strong>Catatan:</strong> {pub.verification_note}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <div className="border-t pt-4">
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-2 text-sm text-gray-600">
                                                <span>ID: {pub.id_publikasi}</span>
                                                <span>•</span>
                                                <span>Sitasi: {pub.citation_count || 0}</span>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(pub)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                                                >
                                                    <FiEdit2 size={16} />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirm(pub)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                                >
                                                    <FiTrash2 size={16} />
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            {editingPub && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">Edit Publikasi</h2>
                                <button
                                    onClick={() => setEditingPub(null)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Judul <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.judul}
                                        onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Sumber</label>
                                    <select
                                        value={formData.source}
                                        onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Pilih Sumber (Opsional)</option>
                                        <option value="scopus">Scopus</option>
                                        <option value="rama">RAMA</option>
                                        <option value="garuda">Garuda</option>
                                        <option value="google_scholar">Google Scholar</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Jurnal <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.id_jurnal}
                                        onChange={(e) => setFormData({ ...formData, id_jurnal: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Pilih Jurnal</option>
                                        {journals.map(journal => (
                                            <option key={journal.id_jurnal} value={journal.id_jurnal}>
                                                {journal.nama_jurnal} {journal.quartile ? `(Q${journal.quartile})` : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">DOI</label>
                                        <input
                                            type="text"
                                            value={formData.doi}
                                            onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Tahun</label>
                                        <input
                                            type="number"
                                            value={formData.tahun}
                                            onChange={(e) => setFormData({ ...formData, tahun: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Penulis</label>
                                    <input
                                        type="text"
                                        value={formData.creator}
                                        onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Jenis</label>
                                    <select
                                        value={formData.jenis}
                                        onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Journal Article">Journal Article</option>
                                        <option value="Conference Paper">Conference Paper</option>
                                        <option value="Book Chapter">Book Chapter</option>
                                        <option value="Review">Review</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Link Publikasi</label>
                                    <input
                                        type="url"
                                        value={formData.link_publikasi}
                                        onChange={(e) => setFormData({ ...formData, link_publikasi: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Sitasi</label>
                                    <input
                                        type="number"
                                        value={formData.citation_count}
                                        onChange={(e) => setFormData({ ...formData, citation_count: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={handleUpdate}
                                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
                                    >
                                        Update Publikasi
                                    </button>
                                    <button
                                        onClick={() => setEditingPub(null)}
                                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <FiAlertCircle className="text-red-600" size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Konfirmasi Hapus</h3>
                                <p className="text-gray-600 text-sm">Tindakan ini tidak dapat dibatalkan</p>
                            </div>
                        </div>

                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <p className="text-red-800 font-medium mb-2">
                                Apakah Anda yakin ingin menghapus publikasi ini?
                            </p>
                            <p className="text-red-700 text-sm">
                                <strong>"{deleteConfirm.judul}"</strong>
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium transition-colors"
                            >
                                Ya, Hapus
                            </button>
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PublikasiKu;
