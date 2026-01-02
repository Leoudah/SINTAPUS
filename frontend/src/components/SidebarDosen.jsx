function SidebarDosen() {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Quick Menu</h2>
      <ul className="space-y-2">
        <li className="rounded bg-blue-600">
          <a href="#" className="block py-2 px-4 rounded hover:bg-blue-700 flex items-center">
            <span className="mr-2 text-xl">+</span> Tambah Publikasi
          </a>
        </li>
        <li className="border border-white/20 rounded">
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
            Beranda
          </a>
        </li>
        <li className="border border-white/20 rounded">
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
            Profil
          </a>
        </li>
        <li className="border border-white/20 rounded">
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
            Kelola Publikasi
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SidebarDosen ;