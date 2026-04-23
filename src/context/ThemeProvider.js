"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_THEME_ID,
  getThemeById,
  THEME_SCHEMES,
} from "./themeStore";

const THEME_STORAGE_KEY = "portfolio-theme-id";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(DEFAULT_THEME_ID);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme && THEME_SCHEMES.some((theme) => theme.id === storedTheme)) {
      setThemeId(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", themeId);
    window.localStorage.setItem(THEME_STORAGE_KEY, themeId);
  }, [themeId]);

  const activeTheme = useMemo(() => getThemeById(themeId), [themeId]);

  const toggleTheme = useCallback(() => {
    setThemeId((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({
      themes: THEME_SCHEMES,
      themeId,
      activeTheme,
      setThemeId,
      toggleTheme,
      isDark: themeId === "dark",
    }),
    [activeTheme, themeId, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
