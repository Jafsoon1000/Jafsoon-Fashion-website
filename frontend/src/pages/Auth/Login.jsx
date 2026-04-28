import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { signInWithGoogle } from "../../firebase";

export default function Login() {
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(email, password);
    if (data.error) {
      setMessage(data.error);
      return;
    }
    if (data.user?.isPhoneVerified) navigate("/profile");
    else navigate("/verify-phone");
  };

  const handleGoogleLogin = async () => {
    try {
      const fbUser = await signInWithGoogle();
      const res = await fetch("http://localhost:5000/api/auth/social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: fbUser.email, name: fbUser.displayName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      localStorage.setItem("token", data.token);
      useAuthStore.setState({ user: data.user });
      navigate("/profile");
    } catch (err) {
      setMessage("Social login failed. Please check your config.");
    }
  };

  return (
    <section className="card auth-box">
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button className="btn-primary" type="submit">
          Login
        </button>
      </form>
      
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <p style={{ margin: "0.5rem 0", color: "gray", fontSize: "0.9rem" }}>Or</p>
        <button type="button" onClick={handleGoogleLogin} className="btn-outline" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>
      </div>

      {message && <p className="msg">{message}</p>}
      <p>
        New account? <Link to="/register">Register here</Link>
      </p>
    </section>
  );
}
