function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-500 to-indigo-600 text-white">
      <div className="text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Selamat Datang di SINTA
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto">
          Platform untuk publikasi, penelitian, dan kolaborasi akademik.
        </p>
        <a
          href="/login"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition-colors"
        >
          Masuk ke Akun
        </a>
      </div>
    </div>
  );
}

export default LandingPage;
