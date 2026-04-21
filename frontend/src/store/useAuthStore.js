import { create } from 'zustand';

const API_BASE = "http://localhost:5000/api";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem("token") || "",
  loading: false,

  initializeAuth: async () => {
    const token = get().token;
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.user) set({ user: data.user });
    } catch {
      set({ token: "", user: null });
      localStorage.removeItem("token");
    }
  },

  register: async (formData) => {
    set({ loading: true });
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    set({ loading: false });
    return data;
  },

  login: async (email, password) => {
    set({ loading: true });
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    set({ loading: false });
    if (data.token) {
      set({ token: data.token, user: data.user });
      localStorage.setItem("token", data.token);
    }
    return data;
  },

  sendOtp: async (phoneNumber) => {
    const res = await fetch(`${API_BASE}/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber })
    });
    return res.json();
  },

  verifyPhone: async (phoneNumber, code) => {
    const res = await fetch(`${API_BASE}/auth/verify-phone`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber, code })
    });
    const data = await res.json();
    if (data.user) set({ user: data.user });
    return data;
  },

  logout: () => {
    set({ user: null, token: "" });
    localStorage.removeItem("token");
  }
}));
