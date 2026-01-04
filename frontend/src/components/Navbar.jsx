import { useState, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';

function Navbar() {
  const [profile, setProfile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
          console.log('Profile data:', data);
          setProfile(data);
        } else {
          console.error('Failed to fetch profile:', res.status);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">DASHBOARD DOSEN SINTA</h1>
      <div className="flex items-center space-x-4">
        {profile ? (
          <div className="relative">
            <div className="flex items-center space-x-2">
              <img
                src={profile.foto_profil || '/default-avatar.png'}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <div className="text-left">
                <p className="text-sm font-medium">{profile.nama}</p>
                <p className="text-xs text-gray-400">{profile.negara}</p>
              </div>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hover:bg-gray-700 p-1 rounded"
              >
                <FiChevronDown size={16} />
              </button>
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <a href="/update-profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Update Profile
                </a>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;