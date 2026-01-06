import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        nama: '',
        foto_profil: '',
        scopus_author_id: '',
        negara: '',
        afiliasi: ''
    });
    const [countries, setCountries] = useState([]);
    const [afiliasiList, setAfiliasiList] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                // Fetch profile
                const profileRes = await fetch('http://localhost:5000/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const profileData = await profileRes.json();
                setProfile({
                    nama: profileData.nama || '',
                    foto_profil: profileData.foto_profil || '',
                    scopus_author_id: profileData.scopus_author_id || '',
                    negara: profileData.negara_id || '',
                    afiliasi: profileData.afiliasi_id || ''
                });

                // Fetch countries and afiliasi
                const [countriesRes, afiliasiRes] = await Promise.all([
                    fetch('http://localhost:5000/api/public/countries'),
                    fetch('http://localhost:5000/api/public/afiliasi/all')
                ]);
                setCountries(await countriesRes.json().then(d => d.data));
                setAfiliasiList(await afiliasiRes.json().then(d => d.data));
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) return;

        const formData = new FormData();
        formData.append('scopus_author_id', profile.scopus_author_id);
        formData.append('afiliasi', profile.afiliasi);
        formData.append('citizenship', profile.negara);
        if (selectedFile) {
            formData.append('foto', selectedFile);
        }

        try {
            const res = await fetch('http://localhost:5000/api/auth/update-profile', {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });
            const data = await res.json();
            if (res.ok) {
                alert('Profile updated successfully');
                navigate('/dashboard/dosen');
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            alert('Update failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama (Read Only)</label>
                        <input
                            type="text"
                            value={profile.nama}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Scopus Author ID</label>
                        <input
                            type="text"
                            name="scopus_author_id"
                            value={profile.scopus_author_id}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Negara</label>
                        <select
                            name="negara"
                            value={profile.negara}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Negara</option>
                            {countries.map(country => (
                                <option key={country.id} value={country.id}>{country.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Afiliasi</label>
                        <select
                            name="afiliasi"
                            value={profile.afiliasi}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Afiliasi</option>
                            {afiliasiList.map(afiliasi => (
                                <option key={afiliasi.id_afiliasi} value={afiliasi.id_afiliasi}>{afiliasi.institusi}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Foto Profil</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {profile.foto_profil && (
                            <img src={profile.foto_profil} alt="Current" className="mt-2 w-20 h-20 rounded-full" />
                        )}
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