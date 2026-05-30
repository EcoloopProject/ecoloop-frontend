import { useState } from "react";

export default function Login() {

  const [username, setUsername] = useState(""); // ✅ ADD THIS
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {

      const res = await fetch("https://ecoloop-backend-1.onrender.com/api/login/", {
        method: "POST", // ✅ comma fixed
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      if (data.access) {
        localStorage.setItem("token", data.access);
       

        console.log("TOKEN SAVED");

        window.location.href = "/";
      } else {
        alert("Invalid credentials");
      }

    } catch (err) {
      console.error("LOGIN ERROR:", err);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900 to-black text-white">
      
     

      {/* Centered Login Card */}
      <div className="flex items-center justify-center h-[80vh]">
        <div className="bg-black/30 backdrop-blur-lg border border-green-500/30 rounded-2xl p-10 w-[350px] shadow-lg shadow-green-500/20">

          {/* Title */}
          <h2 className="text-3xl font-bold text-center mb-6">
            <span className="text-white">Eco</span>
            <span className="text-green-400">Loop</span> Login
          </h2>

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 p-3 rounded-lg bg-black/40 border border-green-400/30 focus:outline-none focus:ring-2 focus:ring-green-400 text-center"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-3 rounded-lg bg-black/40 border border-green-400/30 focus:outline-none focus:ring-2 focus:ring-green-400 text-center"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-400 transition-all font-semibold shadow-md shadow-green-500/30"
          >
            Login
          </button>
          <p
  className="text-center mt-4 text-green-300 cursor-pointer"
  onClick={() => (window.location.href = "/register")}
>
  New User? Create Account
</p>
        </div>
      </div>
    </div>
  );
}