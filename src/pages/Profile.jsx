import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const res = await fetch("https://ecoloop-backend-1.onrender.com/api/auth/profile/",
        {
          method: "GET",

          headers: {
             "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        console.error("API failed:", res.status);
        return;
      }

      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  fetchProfile();

  // ✅ KEEP STYLE INSIDE useEffect
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes pulseGlow {
      0% { box-shadow: 0 0 5px #22c55e; }
      50% { box-shadow: 0 0 20px #22c55e; }
      100% { box-shadow: 0 0 5px #22c55e; }
    }

    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: 200px 0; }
    }
  `;
  document.head.appendChild(style);

}, []);

  if (!user) {
    return <div style={container}>Loading...</div>;
  }

  return (
    <div style={container}>
      
      <h1 style={title}>My Profile</h1>

      <div style={grid}>

        <div style={card}>
          <div style={{ textAlign: "center", position: "relative" }}>
            
            <div style={avatarGlow}></div>
            <div style={avatar}>👤</div>

            {/* ✅ DYNAMIC */}
            <h2>{user.username}</h2>
            <p style={muted}>{user.email}</p>

            <button style={editBtn}>Edit Profile</button>
          </div>

          <div style={divider}></div>

          <div style={info}>
            <p><b>Phone:</b> {user.phone || "N/A"}</p>
            <p><b>Member Since:</b> {user.date_joined ? user.date_joined.slice(0,10) : "N/A"}</p>
            <p><b>Status:</b> <span style={green}>Active 🌱</span></p>
          </div>
        </div>

        <div style={card}>
          <h3>Eco Impact</h3>

          <div style={statRow}>
            <span>Total Points</span>
            <span style={green}>{user.points || 0}</span>
          </div>

          <div style={statRow}>
            <span>CO₂ Saved</span>
            <span style={green}>{user.co2 || 0} KG</span>
          </div>

          <div style={statRow}>
            <span>Waste Logged</span>
            <span style={green}>{user.waste || 0}</span>
          </div>

          <div style={progressBg}>
            <div
              style={{
                ...progressFill,
                width: `${(user.points || 0) / 20}%`,
              }}
            />
          </div>
        </div>

        <div style={cardWide}>
          <h3>🌱 Sustainability Insights</h3>

          <p style={muted}>
            You’ve reduced approx <b>{user.co2 || 0} kg</b> of CO₂ emissions.
          </p>

          <div style={badges}>
            <span style={badge}>♻️ Recycler</span>
            <span style={badge}>🌍 Eco Warrior</span>
            <span style={badge}>⚡ Active User</span>
          </div>
        </div>

        <div style={card}>
          <h3>Settings</h3>

          <button style={btn}>Change Password</button>
          <button style={btn}>Notification Settings</button>
          <button style={dangerBtn}>Logout</button>
        </div>

      </div>
    </div>
  );
}

/* 🎨 DARK ECO GLASS THEME */

const container = {
  minHeight: "100vh",
  padding: "40px",
  background: "linear-gradient(135deg, #020617, #022c22, #064e3b)",
  color: "#e2e8f0",
  fontFamily: "sans-serif",
};

const title = {
  fontSize: "32px",
  marginBottom: "30px",
  color: "#e2e8f0",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "20px",
};

const card = {
  padding: "20px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const cardWide = {
  ...card,
  gridColumn: "span 2",
};

const avatar = {
  fontSize: "60px",
  color: "#22c55e",
};

const avatarGlow = {
  position: "absolute",
  width: "100px",
  height: "100px",
  background: "radial-gradient(circle, rgba(34,197,94,0.3), transparent)",
  filter: "blur(20px)",
  top: "-10px",
  left: "50%",
  transform: "translateX(-50%)",
};

const editBtn = {
  marginTop: "10px",
  padding: "10px 15px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #22c55e, #16a34a)",
  color: "white",
  boxShadow: "0 0 15px rgba(34,197,94,0.4)",
};

const btn = {
  display: "block",
  width: "100%",
  marginTop: "10px",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "transparent",
  color: "#e2e8f0",
};

const dangerBtn = {
  ...btn,
  border: "1px solid #ef4444",
  color: "#ef4444",
  boxShadow: "0 0 12px rgba(239,68,68,0.4)",
};

const muted = { opacity: 0.7, color: "#94a3b8" };

const info = { marginTop: "15px", lineHeight: "1.8" };

const divider = {
  height: "1px",
  background: "rgba(255,255,255,0.08)",
  margin: "15px 0",
};

const statRow = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
};

const green = {
  color: "#22c55e",
  fontWeight: "bold",
};

const progressBg = {
  height: "8px",
  background: "#064e3b",
  borderRadius: "10px",
  marginTop: "15px",
};

const progressFill = {
  height: "100%",
  background: "linear-gradient(90deg, #22c55e, #4ade80)",
  borderRadius: "10px",
  animation: "pulseGlow 2s infinite",
};

const badges = {
  marginTop: "15px",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const badge = {
  padding: "6px 12px",
  borderRadius: "20px",
  border: "1px solid #22c55e",
  color: "#22c55e",
  background: "rgba(34,197,94,0.1)",
};