"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

type FontSize = "normal" | "large" | "x-large";
type Theme = "default" | "high-contrast" | "dark" | "light";

interface AccessibilityContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  reduceMotion: boolean;
  setReduceMotion: (reduce: boolean) => void;
}

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Pobierz zapisane preferencje lub użyj domyślnych
  const [fontSize, setFontSize] = useState<FontSize>("normal");
  const [theme, setTheme] = useState<Theme>("default");
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);

  useEffect(() => {
    // Sprawdź preferencje systemu
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Sprawdź zapisane preferencje
    const savedFontSize = localStorage.getItem(
      "accessibility-font-size"
    ) as FontSize | null;
    const savedTheme = localStorage.getItem(
      "accessibility-theme"
    ) as Theme | null;
    const savedReduceMotion = localStorage.getItem(
      "accessibility-reduce-motion"
    );

    // Ustaw preferencje
    if (savedFontSize) setFontSize(savedFontSize);
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDarkMode) {
      setTheme("dark");
    }

    if (savedReduceMotion !== null) {
      setReduceMotion(savedReduceMotion === "true");
    } else if (prefersReducedMotion) {
      setReduceMotion(true);
    }
  }, []);

  // Zastosuj preferencje do dokumentu
  useEffect(() => {
    document.documentElement.dataset.fontSize = fontSize;
    localStorage.setItem("accessibility-font-size", fontSize);

    // Dodaj klasy CSS dla rozmiaru czcionki
    document.documentElement.classList.remove(
      "text-normal",
      "text-large",
      "text-x-large"
    );
    document.documentElement.classList.add(`text-${fontSize}`);
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("accessibility-theme", theme);

    // Dodaj klasy dla motywu
    document.documentElement.classList.remove(
      "theme-default",
      "theme-high-contrast",
      "theme-dark",
      "theme-light"
    );
    document.documentElement.classList.add(`theme-${theme}`);

    if (theme === "dark" || theme === "default") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.reduceMotion = reduceMotion
      ? "true"
      : "false";
    localStorage.setItem("accessibility-reduce-motion", String(reduceMotion));

    if (reduceMotion) {
      document.documentElement.classList.add("reduce-motion");
    } else {
      document.documentElement.classList.remove("reduce-motion");
    }
  }, [reduceMotion]);

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        theme,
        setTheme,
        reduceMotion,
        setReduceMotion,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider"
    );
  }
  return context;
}
