import { useState } from "react";
import { DEFAULT_PORTAL_PASSWORD } from "@/lib/adminPortalPassword";

const ALLOWED_ADMINS = ["rajkumarmanna0004@gmail.com", "nithyathummapudi@gmail.com"];

// Portal password stored in localStorage so it persists if changed
function getStoredPortalPassword() {
  return localStorage.getItem("admin_portal_password") || DEFAULT_PORTAL_PASSWORD;
}

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [portalPassword, setPortalPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const cleanEmail = email.toLowerCase().trim();

    if (!ALLOWED_ADMINS.includes(cleanEmail)) {
      setError("Access denied. You are not authorized to access the admin portal.");
      setLoading(false);
      return;
    }

    const correctPassword = getStoredPortalPassword();
    if (portalPassword !== correctPassword) {
      setError("Incorrect portal password. Access denied.");
      setLoading(false);
      return;
    }

    // Store session
    sessionStorage.setItem("admin_logged_in", "true");
    sessionStorage.setItem("admin_email", cleanEmail);
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #4A0E06 0%, #7A1A0A 50%, #4A0E06 100%)" }}>
      {/* Mandala watermark */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
        <svg viewBox="0 0 500 500" className="w-full h-full">
          {[...Array(20)].map((_, i) => (
            <g key={i} transform={`rotate(${i * 18} 250 250)`}>
              <ellipse cx="250" cy="60" rx="12" ry="28" fill="#F5C100" />
            </g>
          ))}
          <circle cx="250" cy="250" r="120" fill="none" stroke="#F47420" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-2" style={{ borderColor: "#F47420" }}>
            <img
              src="https://media.base44.com/images/public/6a3f721c39cb0235b5cf3bac/b1780d871_Logo.png"
              alt="Aishwarya Events"
              className="w-16 h-16 object-contain rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Admin Portal
          </h1>
          <p className="text-sm mt-1" style={{ color: "#F5C100" }}>Aishwarya Events — Restricted Access</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-6 p-3 rounded-xl" style={{ background: "#FFF5E4" }}>
            <span className="text-xl">🔒</span>
            <p className="text-xs font-semibold" style={{ color: "#4A0E06" }}>
              This portal is restricted to authorized administrators only.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#F47420" }}>
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-all focus:border-orange-400"
                style={{ borderColor: "#F0D9C0", color: "#4A0E06", background: "#FFFDF7" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#F47420" }}>
                Portal Password
              </label>
              <input
                type="password"
                required
                value={portalPassword}
                onChange={(e) => setPortalPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-all focus:border-orange-400"
                style={{ borderColor: "#F0D9C0", color: "#4A0E06", background: "#FFFDF7" }}
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl text-sm font-semibold" style={{ background: "#FEE2E2", color: "#B91C1C" }}>
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full brand-gradient shimmer-btn text-white font-semibold py-4 rounded-full text-sm uppercase tracking-widest transition-all hover:shadow-xl hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "🔐 Sign In to Admin"}
            </button>
          </form>

          <p className="text-center text-xs mt-6" style={{ color: "#9B8B8B" }}>
            Unauthorized access attempts are logged and monitored.
          </p>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-sm" style={{ color: "#F5C100" }}>← Back to Website</a>
        </div>
      </div>
    </div>
  );
}