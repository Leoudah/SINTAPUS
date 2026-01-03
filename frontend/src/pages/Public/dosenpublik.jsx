import NavbarPublik from "../../components/navbarpublik";

export default function DosenPublik() {
  return (
    <div>
      <NavbarPublik />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Dosen Publik</h1>
        <p className="text-gray-700">Halaman daftar dosen publik akan menampilkan daftar dosen yang dapat dipublikasikan.</p>
        {/* TODO: tambahkan daftar / pencarian dosen */}
      </div>
    </div>
  );
}
