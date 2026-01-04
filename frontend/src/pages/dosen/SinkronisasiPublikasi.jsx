import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import SidebarDosen from '../../components/SidebarDosen';
import { useLogout } from '../../hooks/userLogout';
import { FiRefreshCw, FiCheckCircle, FiXCircle, FiClock, FiAlertTriangle } from 'react-icons/fi';

function SinkronisasiPublikasi() {
    const logout = useLogout();
    const [isLoading, setIsLoading] = useState(false);
    const [syncResult, setSyncResult] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const res = await fetch('http://localhost:5000/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data);
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
            }
        };
        fetchProfile();
    }, []);

    const handleSync = async () => {
        if (!profile?.scopus_author_id) {
            alert('Scopus Author ID tidak ditemukan. Silakan update profile Anda terlebih dahulu.');
            return;
        }

        setIsLoading(true);
        setSyncResult(null);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/sync/author', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    scopus_author_id: profile.scopus_author_id
                })
            });

            const data = await res.json();

            if (res.ok) {
                setSyncResult({
                    success: true,
                    message: 'Sinkronisasi berhasil!',
                    stats: data.data
                });
            } else {
                setSyncResult({
                    success: false,
                    message: data.message || 'Sinkronisasi gagal'
                });
            }
        } catch (err) {
            console.error('Error syncing publications:', err);
            setSyncResult({
                success: false,
                message: 'Terjadi kesalahan saat sinkronisasi'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen">
            <SidebarDosen logout={logout} />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="flex-1 overflow-y-auto bg-gray-50">
                    <div className="p-6">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">Sinkronisasi Publikasi</h1>
                            <p className="text-gray-600">Sinkronkan publikasi Anda dari Scopus</p>
                        </div>

                        <div className="max-w-2xl mx-auto pt-10">
                            {/* Status Card */}
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800">Status Sinkronisasi</h2>
                                    <div className="flex items-center gap-2">
                                        {profile?.scopus_author_id ? (
                                            <FiCheckCircle className="text-green-500" size={20} />
                                        ) : (
                                            <FiXCircle className="text-red-500" size={20} />
                                        )}
                                        <span className={`text-sm ${profile?.scopus_author_id ? 'text-green-600' : 'text-red-600'}`}>
                                            {profile?.scopus_author_id ? 'Siap Sinkron' : 'Scopus ID Diperlukan'}
                                        </span>
                                    </div>
                                </div>

                                {profile?.scopus_author_id && (
                                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                        <div className="text-sm text-gray-600 mb-1">Scopus Author ID</div>
                                        <div className="font-mono text-gray-800">{profile.scopus_author_id}</div>
                                    </div>
                                )}

                                <button
                                    onClick={handleSync}
                                    disabled={isLoading || !profile?.scopus_author_id}
                                    className={`w-full flex items-center justify-center gap-3 py-3 px-6 rounded-lg font-medium transition-colors ${isLoading || !profile?.scopus_author_id
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <FiRefreshCw className="animate-spin" size={20} />
                                            Sedang Sinkronisasi...
                                        </>
                                    ) : (
                                        <>
                                            <FiRefreshCw size={20} />
                                            Mulai Sinkronisasi
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Result Card */}
                            {syncResult && (
                                <div className={`rounded-lg shadow-md p-6 ${syncResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                                    }`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        {syncResult.success ? (
                                            <FiCheckCircle className="text-green-600" size={24} />
                                        ) : (
                                            <FiXCircle className="text-red-600" size={24} />
                                        )}
                                        <h3 className={`text-lg font-semibold ${syncResult.success ? 'text-green-800' : 'text-red-800'
                                            }`}>
                                            {syncResult.message}
                                        </h3>
                                    </div>

                                    {syncResult.success && syncResult.stats && (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="bg-white rounded-lg p-4 text-center">
                                                <div className="text-2xl font-bold text-blue-600">{syncResult.stats.total || 0}</div>
                                                <div className="text-sm text-gray-600">Diproses</div>
                                            </div>
                                            <div className="bg-white rounded-lg p-4 text-center">
                                                <div className="text-2xl font-bold text-green-600">{syncResult.stats.new || 0}</div>
                                                <div className="text-sm text-gray-600">Ditambahkan</div>
                                            </div>
                                            <div className="bg-white rounded-lg p-4 text-center">
                                                <div className="text-2xl font-bold text-yellow-600">{syncResult.stats.updated || 0}</div>
                                                <div className="text-sm text-gray-600">Diupdate</div>
                                            </div>
                                            <div className="bg-white rounded-lg p-4 text-center">
                                                <div className="text-2xl font-bold text-red-600">{syncResult.stats.errors || 0}</div>
                                                <div className="text-sm text-gray-600">Error</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Info Card */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
                                <div className="flex items-start gap-3">
                                    <FiAlertTriangle className="text-blue-600 mt-1" size={20} />
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Informasi Sinkronisasi</h3>
                                        <ul className="text-blue-700 space-y-1 text-sm">
                                            <li>• Pastikan Scopus Author ID Anda sudah benar di halaman Update Profile</li>
                                            <li>• Proses sinkronisasi akan mengambil data publikasi dari Scopus API</li>
                                            <li>• Publikasi baru akan ditambahkan, yang sudah ada akan diupdate</li>
                                            <li>• Proses ini mungkin memakan waktu beberapa menit tergantung jumlah publikasi</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SinkronisasiPublikasi;