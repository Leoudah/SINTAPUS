// import { useLogout } from "../hooks/useLogout";
import Navbar from '../../components/Navbar';
import SidebarDosen from '../../components/SidebarDosen';
function Dashboard() {
 // const logout = useLogout();

  return (
    <div className="flex">
      <SidebarDosen />
      <div className="flex-1">
        <Navbar />
        <div className="p-4">
          <h1 className="text-4xl font-bold">OVERVIEW</h1>
          <div className="grid grid-cols-1 gap-4 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Jumlah publikasi terverifikasi yang sudah diunggah</h2>
                <p className="text-3xl font-bold text-green-600">150</p>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Lihat Detail</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Jumlah publikasi belum terverifikasi</h2>
                <p className="text-3xl font-bold text-red-600">25</p>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Lihat Detail</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
