function SidebarDosen() {
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

export default SidebarDosen ;