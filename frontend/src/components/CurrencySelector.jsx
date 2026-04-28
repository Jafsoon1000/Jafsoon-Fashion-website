import { useEffect } from "react";
import { useCurrencyStore } from "../store/useCurrencyStore";

export default function CurrencySelector() {
  const { currency, setCurrency, fetchRates, loading } = useCurrencyStore();

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  return (
    <select 
      value={currency} 
      onChange={(e) => setCurrency(e.target.value)}
      disabled={loading}
      className="btn-outline"
      style={{ padding: "0.25rem 0.5rem", height: "auto", border: "1px solid var(--border-color)", borderRadius: "4px", backgroundColor: "var(--bg-card)", color: "var(--text-main)" }}
    >
      <option value="USD">USD ($)</option>
      <option value="EUR">EUR (€)</option>
      <option value="GBP">GBP (£)</option>
      <option value="JPY">JPY (¥)</option>
      <option value="AUD">AUD (A$)</option>
      <option value="CAD">CAD (C$)</option>
    </select>
  );
}
