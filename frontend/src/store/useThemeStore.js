import { create } from 'zustand';

export const useThemeStore = create((set) => {
  const getInitialTheme = () => {
    let isDark = false;
    const saved = localStorage.getItem("theme");
    
    if (saved) {
      isDark = saved === "dark";
    } else if (typeof window !== "undefined") {
      isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    
    // Immediately apply theme to prevent Flash of Unstyled Content (FOUC)
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    }
    
    return isDark;
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
