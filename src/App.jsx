import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Helpdesk from "./pages/Helpdesk";
import Landing from "./pages/Landing";

function App() {
  const [stats, setStats] = useState({
    points: 1240,
    waste: 15,
    co2: 32.5,
  });

  const handleUpload = (weight) => {
    setStats((prev) => ({
      points: prev.points + Math.round(weight * 12),
      waste: prev.waste + 1,
      co2: prev.co2 + weight * 0.82,
    }));
  };

  // 🔐 AUTH CHECK
  const isAuth = !!localStorage.getItem("token");

  return (
    <Router>
      <div className="page-wrapper min-h-screen bg-[#030a06]">
        
        {/* ✅ Navbar stays global */}
        <Navbar />

        <Routes>

          {/* 🔐 LOGIN */}
          <Route
            path="/login"
            element={!isAuth ? <Login /> : <Navigate to="/" />}
          />

          <Route path="/register" element={<Register />} />

          {/* 🏠 LANDING */}
          <Route
            path="/"
            element={isAuth ? <Landing /> : <Navigate to="/login" />}
          />

          {/* ⬆️ UPLOAD */}
          <Route
            path="/upload"
            element={isAuth ? <Upload onUpload={handleUpload} /> : <Navigate to="/login" />}
          />

          {/* 📊 DASHBOARD */}
          <Route
            path="/dashboard"
            element={isAuth ? <Dashboard stats={stats} /> : <Navigate to="/login" />}
          />

          {/* 🏆 LEADERBOARD */}
          <Route
            path="/leaderboard"
            element={isAuth ? <Leaderboard userPoints={stats.points} /> : <Navigate to="/login" />}
          />

          {/* 👤 PROFILE */}
          <Route
            path="/profile"
            element={isAuth ? <Profile stats={stats} /> : <Navigate to="/login" />}
          />

          {/* ❓ HELPDESK */}
          <Route
            path="/helpdesk"
            element={isAuth ? <Helpdesk /> : <Navigate to="/login" />}
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;