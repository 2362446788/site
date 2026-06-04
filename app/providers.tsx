"use client";

import { createContext, useCallback, useContext, useMemo } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const toggleTheme = useCallback(() => {
    const nextTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";

    window.localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  }, []);

  const value = useMemo(
    () => ({
      toggleTheme,
    }),
    [toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useSiteTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useSiteTheme must be used inside Providers");
  }

  return context;
}
