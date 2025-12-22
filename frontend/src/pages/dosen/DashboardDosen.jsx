// import { useLogout } from "../hooks/useLogout";
import Navbar, { Sidebar } from '../../components/Navbar';
function Dashboard() {
  // const logout = useLogout();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-4">
          <h1 className="text-4xl font-bold">SELAMAT DATANG DOSEN SINTA</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">Total Mahasiswa</h2>
              <p className="text-3xl font-bold text-blue-600">150</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">Total Mata Kuliah</h2>
              <p className="text-3xl font-bold text-green-600">25</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">Total Nilai</h2>
              <p className="text-3xl font-bold text-red-600">500</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
