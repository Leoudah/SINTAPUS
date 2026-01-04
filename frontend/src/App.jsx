import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Public/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

// import ProtectedRoute from "./routes/ProtectedRoute";

import DashboardAdmin from "./pages/admin/admin";
import ManageAccount from "./pages/admin/manageAccount";
import Testing from "./pages/Public/Testings";
import DosenPublik from "./pages/Public/dosenpublik";
import Afiliasi from "./pages/Public/afiliasi";
import DetailDosen from "./pages/Public/detaildosen";

import DashboardDosen from "./pages/dosen/DashboardDosen";
import UpdateProfile from "./pages/UpdateProfile";
import PublikasiKu from "./pages/dosen/PublikasiKu";
import SinkronisasiPublikasi from "./pages/dosen/SinkronisasiPublikasi";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/Testing" element={<Testing />} />
      <Route path="/dosenpublik" element={<DosenPublik />} />
      <Route path="/afiliasi" element={<Afiliasi />} />
      <Route path="/detaildosen/:id" element={<DetailDosen />} />

      {/* Command Jangan Dihapus */}
      {/* <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}> */}
      <Route path="/dashboard/admin" element={<DashboardAdmin />} />
      <Route path="/dashboard/admin/manage" element={<ManageAccount />} />
      {/* </Route> */}

      {/* <Route element={<ProtectedRoute allowedRoles={["Dosen"]} />}> */}
      <Route path="/dashboard/dosen" element={<DashboardDosen />} />
      <Route path="/update-profile" element={<UpdateProfile />} />
      <Route path="/publikasi-ku" element={<PublikasiKu />} />
      <Route path="/sinkronisasi-publikasi" element={<SinkronisasiPublikasi />} />
      {/* </Route> */}
    </Routes>
  );
}

export default App; 