import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Public/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

// import ProtectedRoute from "./routes/ProtectedRoute";

import DashboardAdmin from "./pages/admin/admin";
import ManageAccount from "./pages/admin/manageAccount";

import DashboardDosen from "./pages/dosen/DashboardDosen";

function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Command Jangan Dihapus */}
        {/* <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}> */}
          <Route path="/dashboard/admin" element={<DashboardAdmin />} />
          <Route path="/dashboard/admin/manage" element={<ManageAccount />} />
        {/* </Route> */}

        {/* <Route element={<ProtectedRoute allowedRoles={["Dosen"]} />}> */}
          <Route path="/dashboard/dosen" element={<DashboardDosen />} />
        {/* </Route> */}
      </Routes>
  );
}

export default App; 