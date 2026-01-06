import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import SidebarDosen from '../../components/SidebarDosen';
import { useLogout } from '../../hooks/userLogout';
import {
    FiExternalLink,
    FiCalendar,
    FiBook,
    FiFileText,
    FiToggleLeft,
    FiToggleRight,
    FiAlertCircle,
    FiCheckCircle,
    FiXCircle
} from 'react-icons/fi';

function PublikasiKu() {
    const logout = useLogout();
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

        fetchPublications();
    }, []);

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
                                        <div className="flex justify-between items-center text-sm text-gray-600">
                                            <span>ID Publikasi: {pub.id_publikasi}</span>
                                            <span>
                                                Citation Count: {pub.citation_count || 0}
                                            </span>
                                        </div>
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

export default PublikasiKu;
