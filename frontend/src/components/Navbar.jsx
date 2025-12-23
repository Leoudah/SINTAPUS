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