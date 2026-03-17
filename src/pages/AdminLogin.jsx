import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import NebulaBackground from "../components/NebulaBackground";

function AdminLogin() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") login();
  }

  return (
    <>
      <NebulaBackground />
      <div className="min-h-screen flex items-center justify-center px-6 relative z-10">

        <div className="backdrop-blur-md bg-white/5 border border-purple-500/30 rounded-2xl p-10 w-full max-w-md">

          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-purple-300 font-bold text-xl">MP</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Admin Login</h2>
            <p className="text-gray-400 text-sm mt-1">Enter your credentials to continue</p>
          </div>

          <div className="flex flex-col gap-4">

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-white/10 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-white/10 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition"
            />

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              onClick={login}
              disabled={loading}
              className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors mt-2"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <button
              onClick={() => navigate("/")}
              className="text-gray-400 hover:text-white text-sm text-center transition-colors"
            >
              ← Back to Portfolio
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default AdminLogin;