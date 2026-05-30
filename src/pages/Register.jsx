import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
  try {
    const res = await fetch(
      "http://ecoloop-backend-1.onrender.com/api/auth/register/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      }
    );

    const data = await res.json();

    console.log(data);

    if (res.ok) {
      alert("User created successfully!");
    } else {
      alert(JSON.stringify(data));
    }
  } catch (err) {
    console.error(err);
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900 to-black text-white">

      <div className="flex items-center justify-center h-screen">
        <div className="bg-black/30 backdrop-blur-lg border border-green-500/30 rounded-2xl p-10 w-[350px]">

          <h2 className="text-3xl font-bold text-center mb-6">
            Create Account
          </h2>

          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 p-3 rounded-lg bg-black/40 border border-green-400/30"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-3 rounded-lg bg-black/40 border border-green-400/30"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-3 rounded-lg bg-black/40 border border-green-400/30"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleRegister}
            className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-400"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}