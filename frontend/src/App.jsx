import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Public/LandingPage";
import Login from "./pages/Login";

import ProtectedRoute from "./routes/ProtectedRoute";

import DashboardAdmin from "./pages/admin/DashboardAdmin";

import DashboardDosen from "./pages/dosen/DashboardDosen";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* Command Jangan Dihapus */}
        {/* <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}> */}
          <Route path="/dashboard/admin" element={<DashboardAdmin />} />
        {/* </Route> */}

        {/* <Route element={<ProtectedRoute allowedRoles={["Dosen"]} />}> */}
          <Route path="/dashboard/dosen" element={<DashboardDosen />} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App; 