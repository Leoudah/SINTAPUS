import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";

import DashboardA from "./pages/admin/DashboardA";

import DashboardD from "./pages/dosen/DashboardD";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin/DashboardA" element={<DashboardA />} />

        <Route path="/dosen/DashboardD" element={<DashboardD />} />
      </Routes>
    </Router>
  );
}

export default App; 