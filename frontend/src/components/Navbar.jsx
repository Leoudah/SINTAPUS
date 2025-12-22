import { useLogout } from "../hooks/userLogout";

function Navbar() {
  const logout = useLogout();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">SINTA</h1>
      <div className="flex space-x-4">
      </div>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
        <li>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
            Mahasiswa
          </a>
        </li>
        <li>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
            Mata Kuliah
          </a>
        </li>
        <li>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
            Nilai
          </a>
        </li>
        <li>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
            Profil
          </a>
        </li>
        <li>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}

export { Sidebar };