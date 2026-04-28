import { create } from "zustand";

export const useCurrencyStore = create((set) => ({
  currency: "USD",
  rates: { USD: 1 },
  loading: false,

  setCurrency: (currency) => set({ currency }),

  fetchRates: async () => {
    set({ loading: true });
    try {
      // Using Frankfurter API which is free and requires no key
      // Base is EUR by default for this API, but we can query specific symbols
      const response = await fetch("https://api.frankfurter.app/latest?from=USD");
      const data = await response.json();
      set({ 
        rates: { USD: 1, ...data.rates },
        loading: false 
      });
    } catch (error) {
      console.error("Failed to fetch exchange rates", error);
      set({ loading: false });
    }
  }
}));
