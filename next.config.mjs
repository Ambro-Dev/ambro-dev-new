import createMDX from "@next/mdx";

// Konfiguracja bazowa Next.js
const baseConfig = {
	// Zachowujemy PageExtensions, aby nadal obsługiwać pliki MDX
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

	// Optymalizacja obrazów
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ambro-dev.pl",
			},
		],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
		imageSizes: [16, 32, 48, 64, 96, 128, 256],
		minimumCacheTTL: 60 * 60 * 24, // 24 godziny
		dangerouslyAllowSVG: true,
		contentDispositionType: "attachment",
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},

	// Optymalizacje kompilacji i renderowania
	compiler: {
		// Usuwanie console.log w produkcji
		removeConsole:
			process.env.NODE_ENV === "production"
				? {
						exclude: ["error", "warn"],
					}
				: false,
	},

	// Funkcje eksperymentalne dostępne w Next.js 14
	experimental: {
		// Usunięto opcje specyficzne dla Next.js 15
		mdxRs: true, // Dostępne w Next.js 14
		serverActions: {
			bodySizeLimit: "2mb", // Limit rozmiaru dla Server Actions
		},
		// Usunięto serverMinification (Next.js 15)
		optimizePackageImports: ["framer-motion", "lodash", "lucide-react"],
	},

	// Konfiguracja HTTP Headers
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=(self)",
					},
				],
			},
			{
				// Cache statycznych assetów na dłuższy czas
				source: "/(fonts|images)/(.*)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
		];
	},

	// Przekierowania
	async redirects() {
		return [
			// Przykład przekierowania
			// {
			//   source: '/stara-strona',
			//   destination: '/nowa-strona',
			//   permanent: true,
			// },
		];
	},

	// Konfiguracja środowiska
	env: {
		NEXT_PUBLIC_SITE_URL: "https://ambro.dev",
	},

	// Usunięto sekcję logging specyficzną dla Next.js 15

	poweredByHeader: false, // Usuń nagłówek X-Powered-By
};

// Konfiguracja MDX
const withMDX = createMDX({
	// Opcje MDX
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
		// Możesz dodać więcej pluginów MDX tutaj
	},
});

// Eksportujemy konfigurację z obsługą MDX
export default withMDX(baseConfig);
