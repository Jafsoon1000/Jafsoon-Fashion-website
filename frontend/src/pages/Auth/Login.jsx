import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

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
      {message && <p className="msg">{message}</p>}
      <p>
        New account? <Link to="/register">Register here</Link>
      </p>
    </section>
  );
}
