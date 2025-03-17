// src/components/accessibility/AccessibilityWidget.tsx
"use client";

import { useState } from "react";
import { useAccessibility } from "./AccessibilityProvider";
import { Sun, Moon, Type, ZoomIn, Sparkles } from "lucide-react";

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    fontSize,
    setFontSize,
    theme,
    setTheme,
    reduceMotion,
    setReduceMotion,
  } = useAccessibility();

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Przycisk otwierający panel */}
      <button
        type="button"
        onClick={toggleOpen}
        className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        aria-label={
          isOpen ? "Zamknij opcje dostępności" : "Otwórz opcje dostępności"
        }
        aria-expanded={isOpen}
      >
        <Sparkles size={24} />
      </button>

      {/* Panel opcji dostępności */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-gray-900 text-white p-4 rounded-lg shadow-xl w-64 border border-gray-700">
          <h2 className="text-lg font-bold mb-4">Opcje dostępności</h2>

          {/* Rozmiar tekstu */}
          <div className="mb-4">
            <h3 className="text-sm text-gray-400 mb-2">Rozmiar tekstu</h3>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setFontSize("normal")}
                className={`p-2 rounded ${
                  fontSize === "normal"
                    ? "bg-indigo-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                aria-label="Normalny rozmiar tekstu"
                aria-pressed={fontSize === "normal"}
              >
                <Type size={16} />
              </button>
              <button
                type="button"
                onClick={() => setFontSize("large")}
                className={`p-2 rounded ${
                  fontSize === "large"
                    ? "bg-indigo-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                aria-label="Duży rozmiar tekstu"
                aria-pressed={fontSize === "large"}
              >
                <ZoomIn size={16} />
              </button>
              <button
                type="button"
                onClick={() => setFontSize("x-large")}
                className={`p-2 rounded ${
                  fontSize === "x-large"
                    ? "bg-indigo-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                aria-label="Bardzo duży rozmiar tekstu"
                aria-pressed={fontSize === "x-large"}
              >
                <ZoomIn size={20} />
              </button>
            </div>
          </div>

          {/* Motyw */}
          <div className="mb-4">
            <h3 className="text-sm text-gray-400 mb-2">Motyw</h3>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setTheme("default")}
                className={`p-2 rounded ${
                  theme === "default"
                    ? "bg-indigo-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                aria-label="Domyślny motyw"
                aria-pressed={theme === "default"}
              >
                Domyślny
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`p-2 rounded ${
                  theme === "dark"
                    ? "bg-indigo-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                aria-label="Ciemny motyw"
                aria-pressed={theme === "dark"}
              >
                <Moon size={16} />
              </button>
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`p-2 rounded ${
                  theme === "light"
                    ? "bg-indigo-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                aria-label="Jasny motyw"
                aria-pressed={theme === "light"}
              >
                <Sun size={16} />
              </button>
            </div>
          </div>

          {/* Redukcja ruchu */}
          <div className="mb-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={reduceMotion}
                onChange={(e) => setReduceMotion(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Redukuj animacje</span>
            </label>
          </div>

          {/* Kontrast */}
          <div className="mb-4">
            <button
              onClick={() =>
                setTheme(
                  theme === "high-contrast" ? "default" : "high-contrast"
                )
              }
              type="button"
              className={`w-full p-2 rounded ${
                theme === "high-contrast"
                  ? "bg-indigo-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              aria-pressed={theme === "high-contrast"}
            >
              Wysoki kontrast {theme === "high-contrast" ? "✓" : ""}
            </button>
          </div>

          {/* Zamknij panel */}
          <button
            type="button"
            onClick={toggleOpen}
            className="w-full p-2 rounded bg-gray-700 hover:bg-gray-600 mt-2"
          >
            Zamknij panel
          </button>
        </div>
      )}
    </div>
  );
}
