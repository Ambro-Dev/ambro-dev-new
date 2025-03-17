// src/lib/fonts.ts
import { Inter, Poppins } from "next/font/google";

// Fontbase primary (Inter)
export const inter = Inter({
	subsets: ["latin", "latin-ext"],
	display: "swap",
	preload: true,
	weight: ["400", "500", "600", "700"],
	variable: "--font-primary",
	fallback: ["system-ui", "sans-serif"],
	adjustFontFallback: true,
});

// Font secondary (Poppins)
export const poppins = Poppins({
	subsets: ["latin", "latin-ext"],
	display: "swap",
	preload: true,
	weight: ["400", "500", "600", "700"],
	variable: "--font-secondary",
	fallback: ["system-ui", "sans-serif"],
	adjustFontFallback: true,
});

// Klasy fontów do użycia w layoucie
export const fontClasses = `${inter.variable} ${poppins.variable}`;
