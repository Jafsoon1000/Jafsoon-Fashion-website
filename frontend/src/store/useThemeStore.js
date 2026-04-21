import { create } from 'zustand';

export const useThemeStore = create((set) => {
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  };

  return {
    isDarkMode: getInitialTheme(),
    toggleTheme: () => set((state) => {
      const newTheme = !state.isDarkMode;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      document.documentElement.setAttribute("data-theme", newTheme ? "dark" : "light");
      return { isDarkMode: newTheme };
    })
  };
});
