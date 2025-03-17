"use client";

import Link from "next/link";
import { useState } from "react";

// Komponent do pomijania nawigacji i przechodzenia bezpośrednio do głównej treści
// Ważny element dostępności dla użytkowników korzystających z czytników ekranowych
export function SkipToContent() {
  const [isVisible, setIsVisible] = useState(false);

  const handleFocus = () => setIsVisible(true);
  const handleBlur = () => setIsVisible(false);
  const handleClick = () => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  };

  return (
    <Link
      href="#main-content"
      className={`
        fixed top-0 left-0 p-3 bg-indigo-600 text-white z-50 transform transition-transform 
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
        focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2
      `}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
    >
      Przejdź do treści
    </Link>
  );
}
