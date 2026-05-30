import React, { useEffect, useState } from "react";

export default function Leaderboard({ userPoints }) {
  const [players, setPlayers] = useState([]);

useEffect(() => {
  async function fetchLeaderboard() {

    const token = localStorage.getItem("token"); // ✅ FIX

    console.log("TOKEN:", token);

    const res = await fetch("https://ecoloop-backend-1.onrender.com/api/leaderboard/", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // ✅ now valid
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    setPlayers(data);
  }

  fetchLeaderboard();
}, []);
  // 🔥 SORT AFTER FETCH
  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);

  const maxPoints = sortedPlayers[0]?.points || 1;
  const top3 = sortedPlayers.slice(0, 3);
  const rest = sortedPlayers.slice(3);

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>
        Leader<span style={{ color: "#22c55e" }}>Board</span>
      </h1>

      {/* 🏆 TOP 3 */}
      <div style={top3Wrapper}>
        
        {top3[1] && (
          <div style={cardStyle(1, top3[1].self)}>
            <div style={rankBadgeStyle(2)}>2</div>
            <div style={avatarStyle(top3[1].self)}>👤</div>
            <h3>{top3[1].name}</h3>
            <XPBar points={top3[1].points} max={maxPoints} />
          </div>
        )}

        {top3[0] && (
          <div style={cardStyle(0, top3[0].self)}>
            <div style={rankBadgeStyle(1)}>1</div>
            <div style={{ ...avatarStyle(top3[0].self), fontSize: "50px" }}>👤</div>
            <h2>{top3[0].name}</h2>
            <XPBar points={top3[0].points} max={maxPoints} />
          </div>
        )}

        {top3[2] && (
          <div style={cardStyle(2, top3[2].self)}>
            <div style={rankBadgeStyle(3)}>3</div>
            <div style={avatarStyle(top3[2].self)}>👤</div>
            <h3>{top3[2].name}</h3>
            <XPBar points={top3[2].points} max={maxPoints} />
          </div>
        )}
      </div>

      {/* 📊 OTHER PLAYERS */}
      <div style={{ maxWidth: "650px", margin: "auto" }}>
        {rest.map((p, i) => (
          <div key={i} style={listItemStyle(p.self)}>
            
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ color: "#22c55e" }}>#{i + 4}</span>
              <div style={smallAvatar(p.self)}>👤</div>
              <span>{p.name}</span>
            </div>

            <div style={{ width: "40%" }}>
              <XPBar points={p.points} max={maxPoints} small />
            </div>

            <span style={pointsText}>{p.points} points</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 🎮 XP BAR */
function XPBar({ points, max, small }) {
  const width = (points / max) * 100;

  return (
    <div style={{ width: "100%", marginTop: "8px" }}>
      <div style={xpBg}>
        <div style={{ ...xpFill, width: `${width}%` }} />
      </div>
      {!small && (
        <p style={{ fontSize: "12px", marginTop: "4px", color: "#94a3b8" }}>
          {points} points
        </p>
      )}
    </div>
  );
}

/* 🎨 STYLES (UNCHANGED) */
const containerStyle = {
  minHeight: "100vh",
  padding: "40px 20px",
  background: "linear-gradient(135deg, #020617, #022c22, #064e3b)",
  color: "#e2e8f0",
  fontFamily: "sans-serif",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "2.6rem",
  marginBottom: "50px",
  color: "#e2e8f0",
};

const top3Wrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  gap: "30px",
  marginBottom: "60px",
};

const cardStyle = (position, isSelf) => {
  const scale =
    position === 0 ? 1.25 :
    position === 1 ? 1 :
    0.9;

  return {
    transform: `scale(${scale})`,
    textAlign: "center",
    padding: "22px",
    borderRadius: "18px",
    width: "140px",
    position: "relative",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    border: isSelf ? "1px solid #22c55e" : "1px solid rgba(255,255,255,0.08)",
    boxShadow: isSelf
      ? "0 0 20px rgba(34,197,94,0.4)"
      : "0 0 10px rgba(0,0,0,0.3)",
  };
};

const rankBadgeStyle = (rank) => ({
  position: "absolute",
  top: "-12px",
  left: "50%",
  transform: "translateX(-50%)",
  background:
    rank === 1
      ? "#22c55e"
      : rank === 2
      ? "#64748b"
      : "#16a34a",
  color: "white",
  fontWeight: "bold",
  borderRadius: "50%",
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const avatarStyle = (isSelf) => ({
  fontSize: "45px",
  marginTop: "10px",
  color: isSelf ? "#22c55e" : "#94a3b8",
});

const smallAvatar = (isSelf) => ({
  fontSize: "20px",
  color: isSelf ? "#22c55e" : "#94a3b8",
});

const listItemStyle = (isSelf) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  marginBottom: "12px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(12px)",
  border: isSelf ? "1px solid #22c55e" : "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
});

const xpBg = {
  height: "6px",
  background: "#064e3b",
  borderRadius: "10px",
  overflow: "hidden",
};

const xpFill = {
  height: "100%",
  background: "linear-gradient(90deg, #22c55e, #4ade80)",
  boxShadow: "0 0 10px #22c55e",
  transition: "width 0.6s ease",
};

const pointsText = {
  color: "#22c55e",
  fontWeight: "bold",
};