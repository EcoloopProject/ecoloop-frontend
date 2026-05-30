import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Upload,
  Trophy,
  User,
  Phone,
  LogOut
} from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  // 🔓 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

   

  return (
    <div style={navContainer}>

      {/* 🔹 LOGO */}
      <h1 style={logo}>
        EcoLoop 🌱
      </h1>

      {/* 🔹 NAV ITEMS */}
      <div style={navItems}>
        
        <NavItem to="/" label="Home" Icon={Home} active={location.pathname === "/"} />
        <NavItem to="/dashboard" label="Dashboard" Icon={LayoutDashboard} active={location.pathname === "/dashboard"} />
        <NavItem to="/upload" label="Upload" Icon={Upload} active={location.pathname === "/upload"} />
        <NavItem to="/leaderboard" label="Leaderboard" Icon={Trophy} active={location.pathname === "/leaderboard"} />
        <NavItem to="/profile" label="Profile" Icon={User} active={location.pathname === "/profile"} />
        <NavItem to="/helpdesk" label="Help" Icon={Phone} active={location.pathname === "/helpdesk"} />

        {/* 🔥 LOGOUT BUTTON */}
        <div onClick={handleLogout} style={logoutItem}>
          <LogOut size={20} strokeWidth={2} style={{ color: "#ef4444" }} />
          <span style={logoutLabel}>Logout</span>
        </div>

      </div>
    </div>
  );
}

/* 🔹 NAV ITEM */
function NavItem({ to, label, Icon, active }) {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <div style={navItem(active)}>

        <Icon
          size={20}
          strokeWidth={2}
          style={{
            color: active ? "#22c55e" : "#94a3b8",
            transition: "0.3s"
          }}
        />

        <span style={labelStyle(active)}>{label}</span>
      </div>
    </Link>
  );
}

/* 🎨 STYLES */

const navContainer = {
  position: "sticky",
  top: 0,
  zIndex: 100,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 40px",
  background: "rgba(2,6,23,0.7)",
  backdropFilter: "blur(16px)",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
};

const logo = {
  fontSize: "30px",
  fontWeight: "800",
  color: "#22c55e",
  letterSpacing: "1px",
};

const navItems = {
  display: "flex",
  gap: "28px",
};

/* NORMAL ITEM */
const navItem = (active) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
  padding: "8px 10px",
  borderRadius: "12px",
  cursor: "pointer",
  background: active ? "rgba(34,197,94,0.1)" : "transparent",
  boxShadow: active ? "0 0 15px rgba(34,197,94,0.3)" : "none",
  transition: "0.3s",
});

const labelStyle = (active) => ({
  fontSize: "11px",
  color: active ? "#22c55e" : "#94a3b8",
  fontWeight: active ? "600" : "400",
});

/* 🔥 LOGOUT STYLE */
const logoutItem = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
  padding: "8px 10px",
  borderRadius: "12px",
  cursor: "pointer",
  transition: "0.3s",
};

const logoutLabel = {
  fontSize: "11px",
  color: "#ef4444",
  fontWeight: "600",
};