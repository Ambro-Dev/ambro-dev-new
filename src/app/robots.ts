// src/app/robots.ts
import type { MetadataRoute } from "next";
import { baseURL } from "@/app/resources";

export default function robots(): MetadataRoute.Robots {
	const isProduction = process.env.NODE_ENV === "production";

	return {
		rules: {
			userAgent: "*",
			allow: isProduction ? "/" : "", // W środowisku produkcyjnym zezwalaj na wszystko
			disallow: isProduction ? ["/admin/", "/api/", "/_next/"] : "/", // W środowisku deweloperskim blokuj wszystko
		},
		// Lokalizacja sitemap
		sitemap: `https://${baseURL}/sitemap.xml`,
		// Lokalizacja pliku host
		host: `https://${baseURL}`,
	};
}
