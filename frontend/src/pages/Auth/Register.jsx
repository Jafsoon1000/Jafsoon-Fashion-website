import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: ""
  });
  const [message, setMessage] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await register(form);
    if (data.error) {
      setMessage(data.error);
      return;
    }
    setMessage("Registration successful. Verify your phone number.");
    navigate("/verify-phone", { state: { phoneNumber: form.phoneNumber } });
  };

  return (
    <section className="card auth-box">
      <h2>Create Account</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={onChange} placeholder="Full Name" required />
        <input name="email" value={form.email} onChange={onChange} type="email" placeholder="Email" required />
        <input
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={onChange}
          placeholder="Phone (+15551234567)"
          required
        />
        <input
          name="password"
          value={form.password}
          onChange={onChange}
          type="password"
          placeholder="Password"
          required
        />
        <button className="btn-primary" type="submit">
          Register
        </button>
      </form>
      {message && <p className="msg">{message}</p>}
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}
