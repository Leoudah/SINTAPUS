import { useState, useEffect } from 'react';

function UpdateProfile() {
    const [profile, setProfile] = useState({
        nama: '',
        foto_profil: '',
        negara: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const res = await fetch('http://localhost:5000/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setProfile(data);
            } catch (err) {
                console.error('Error fetching profile:', err);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: Implement update logic
        alert('Update profile functionality to be implemented');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                        <input
                            type="text"
                            name="nama"
                            value={profile.nama}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Foto Profil URL</label>
                        <input
                            type="text"
                            name="foto_profil"
                            value={profile.foto_profil}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Negara</label>
                        <input
                            type="text"
                            name="negara"
                            value={profile.negara}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateProfile;