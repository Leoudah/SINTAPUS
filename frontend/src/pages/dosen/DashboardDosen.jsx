// import { useLogout } from "../hooks/useLogout";
import Navbar from '../../components/Navbar';
import SidebarDosen from '../../components/SidebarDosen';
import { useLogout } from '../../hooks/userLogout';
import { FiBookOpen, FiCheckCircle, FiXCircle, FiTrendingUp } from 'react-icons/fi';
function Dashboard() {
  const logout = useLogout();

  return (
    <div className="flex">
      <SidebarDosen logout={logout} />
      <div className="flex-1">
        <Navbar />
        <div className="p-6 bg-gray-50 min-h-screen">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Total Publikasi</h2>
                  <p className="text-3xl font-bold text-blue-600">175</p>
                </div>
                <FiBookOpen className="text-blue-600 text-4xl" />
              </div>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Lihat Detail</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Terverifikasi</h2>
                  <p className="text-3xl font-bold text-green-600">150</p>
                </div>
                <FiCheckCircle className="text-green-600 text-4xl" />
              </div>
              <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">Lihat Detail</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Belum Terverifikasi</h2>
                  <p className="text-3xl font-bold text-red-600">25</p>
                </div>
                <FiXCircle className="text-red-600 text-4xl" />
              </div>
              <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">Lihat Detail</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">H-Index</h2>
                  <p className="text-3xl font-bold text-purple-600">12</p>
                </div>
                <FiTrendingUp className="text-purple-600 text-4xl" />
              </div>
              <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors">Lihat Detail</button>
            </div>
          </div>
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
