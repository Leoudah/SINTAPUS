import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaInstagram, FaLinkedin, FaYoutube, FaRegCopyright } from "react-icons/fa";
import bg1 from "../../assets/unudrektorat.png";
import bg2 from "../../assets/unudpimpinan.png";
import bg3 from "../../assets/unudtanda.png";
import LogoFMIPA from "../../assets/FMIPA.png";

const images = [bg1, bg2, bg3];

function LandingPage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // ganti tiap 5 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 overflow-hidden">
        {/* Background slideshow */}
        <img
          src={images[current]}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30 transition-opacity duration-1000"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/60 to-indigo-700/60"></div>

        {/* Konten */}
        <div className="relative">
          <img src={LogoFMIPA} alt="Logo FMIPA UNUD" className="w-24 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeUp">
            Selamat Datang di Sistem Data Dosen Berbasis SINTA
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto animate-fadeUp">
            Platform untuk publikasi, penelitian, dan kolaborasi akademik.
          </p>
          <a
            href="/login"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition-colors animate-fadeUp"
          >
            Masuk ke Akun
          </a>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white text-gray-800 py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Sistem Data Dosen Berbasis SINTA</h2>
        <div className="max-w-xl mx-auto space-y-4">
          <p className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-blue-600" /> Jl. Raya Kampus, Unud, Bukit Jimbaran, Bali
          </p>
          <p className="flex items-center gap-3">
            <FaPhoneAlt className="text-blue-600" /> +62-813-1194-2116
          </p>
          <p className="flex items-center gap-3">
            <FaEnvelope className="text-blue-600" /> sistemdatadosensinta@gmail.com
          </p>
        </div>

        {/* Media Sosial */}
        <div className="flex justify-center gap-6 mt-8">
          <a href="#" className="text-pink-500 hover:text-pink-600"><FaInstagram size={28} /></a>
          <a href="#" className="text-blue-700 hover:text-blue-800"><FaLinkedin size={28} /></a>
          <a href="#" className="text-red-600 hover:text-red-700"><FaYoutube size={28} /></a>
        </div>

        {/* Copyright */}
        <div className="flex items-center justify-center gap-2 mt-10 text-gray-600">
          <FaRegCopyright /> 2026 Sistem Data Dosen Berbasis SINTA
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
