// import { useLogout } from "../hooks/useLogout";
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import SidebarDosen from '../../components/SidebarDosen';
import { useLogout } from '../../hooks/userLogout';
import { getPublicationStats } from '../../api/dosen.api';
import { FiBookOpen, FiCheckCircle, FiXCircle, FiEyeOff, FiEye } from 'react-icons/fi';

function Dashboard() {
  const logout = useLogout();
  const [stats, setStats] = useState({
    total: 0,
    hidden: 0,
    public: 0,
    verified: 0,
    rejected: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Fetch user data from API instead of localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          setLoading(false);
          return;
        }

        // Fetch user profile to get id_dosen
        const userRes = await fetch('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!userRes.ok) {
          console.error('Failed to fetch user profile');
          setLoading(false);
          return;
        }

        const userData = await userRes.json();
        console.log('User data from API:', userData);

        const id_dosen = userData?.id_dosen;
        if (!id_dosen) {
          console.error('No id_dosen found in user data');
          setLoading(false);
          return;
        }

        console.log('Fetching stats for id_dosen:', id_dosen);
        const res = await getPublicationStats(id_dosen);
        console.log('Stats response:', res);

        if (res?.data?.data) {
          console.log('Stats data:', res.data.data);
          setStats({
            total: res.data.data.total || 0,
            hidden: res.data.data.hidden || 0,
            public: res.data.data.public || 0,
            verified: res.data.data.verified || 0,
            rejected: res.data.data.rejected || 0
          });
        }
      } catch (err) {
        console.error('Error loading stats:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="flex">
      <SidebarDosen logout={logout} />
      <div className="flex-1">
        <Navbar />
        <div className="p-6 bg-gray-50 min-h-screen">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

          {loading ? (
            <div className="text-gray-600">Memuat statistik...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">Total Publikasi</h2>
                    <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
                  </div>
                  <FiBookOpen className="text-blue-600 text-4xl" />
                </div>
                <div className="mt-4 text-sm text-gray-500">Semua publikasi Anda</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">Hidden</h2>
                    <p className="text-3xl font-bold text-gray-600">{stats.hidden}</p>
                  </div>
                  <FiEyeOff className="text-gray-600 text-4xl" />
                </div>
                <div className="mt-4 text-sm text-gray-500">Tidak dipublikasikan</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">Public</h2>
                    <p className="text-3xl font-bold text-purple-600">{stats.public}</p>
                  </div>
                  <FiEye className="text-purple-600 text-4xl" />
                </div>
                <div className="mt-4 text-sm text-gray-500">Dipublikasikan</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">Terverifikasi</h2>
                    <p className="text-3xl font-bold text-green-600">{stats.verified}</p>
                  </div>
                  <FiCheckCircle className="text-green-600 text-4xl" />
                </div>
                <div className="mt-4 text-sm text-gray-500">Sudah disetujui</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">Ditolak</h2>
                    <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
                  </div>
                  <FiXCircle className="text-red-600 text-4xl" />
                </div>
                <div className="mt-4 text-sm text-gray-500">Perlu revisi</div>
              </div>
            </div>
          )}

          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <FiCheckCircle className="text-green-500 mr-2" />
                Publikasi "AI in Education" telah diverifikasi
              </li>
              <li className="flex items-center text-gray-600">
                <FiBookOpen className="text-blue-500 mr-2" />
                Publikasi baru "Machine Learning Trends" ditambahkan
              </li>
              <li className="flex items-center text-gray-600">
                <FiXCircle className="text-red-500 mr-2" />
                Publikasi "Data Science Basics" memerlukan revisi
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
