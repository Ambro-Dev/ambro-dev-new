import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { baseURL, home, style } from "./resources";
import { fontClasses } from "@/lib/fonts";

// Statycznie zaimportowane komponenty krytyczne dla pierwszego renderowania
import Navigation from "@/components/navigation";
import { WebVitals } from "@/components/web-vitals";
import { AccessibilityProvider } from "@/components/accessibility/AccessibilityProvider";
import { SkipToContent } from "@/components/accessibility/SkipToContent";
import DefaultSeo from "@/components/default-seo";

// Komponent ładowania dla Suspense
const LoadingFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-50">
    <div className="bg-gray-800 rounded-md p-4 shadow-xl">
      <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto" />
      <p className="mt-2 text-sm text-gray-300">Ładowanie...</p>
    </div>
  </div>
);

// Dynamiczne importy z lazy-loading dla niekrytycznych komponentów
import dynamic from "next/dynamic";
import { AccessibilityWidget } from "@/components/accessibility/AccessibilityWidget";

const Footer = dynamic(() => import("@/components/footer"), {
  ssr: true, // Server-side rendering dla SEO
  loading: () => <div className="h-64 bg-black" />,
});

const ScrollProgress = dynamic(
  () =>
    import("@/components/ambro-ui/scroll-progress").then(
      (mod) => mod.ScrollProgress
    ),
  { ssr: true }
);

const FloatingBubbles = dynamic(
  () =>
    import("@/components/ambro-ui/floating-bubbles").then(
      (mod) => mod.FloatingBubbles
    ),
  { ssr: true, loading: () => <div className="absolute inset-0 z-0" /> }
);

const Analytics = dynamic(() => import("@/components/analytics"), {
  ssr: true,
});

// Rozszerzone metadane zgodne z Next.js 15
export const metadata: Metadata = {
  metadataBase: new URL(`https://${baseURL}`),
  title: {
    template: `%s | ${home.title}`,
    default: home.title,
  },
  description: home.description,
  applicationName: "Ambro-Dev",
  keywords: [
    "DevOps",
    "automatyzacja",
    "aplikacje webowe",
    "chmura",
    "AWS",
    "infrastruktura IT",
  ],
  authors: [{ name: "Ambro-Dev", url: `https://${baseURL}` }],
  creator: "Ambro-Dev",
  publisher: "Ambro-Dev",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: `https://${baseURL}`,
    languages: {
      "pl-PL": `https://${baseURL}`,
    },
  },
  openGraph: {
    title: `Ambro-Dev | ${home.title}`,
    description:
      "Automatyzacja procesów, chmurowe rozwiązania, administracja serwerami, tworzenie stron internetowych i aplikacji webowych",
    url: `https://${baseURL}`,
    siteName: "Ambro-Dev",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: `https://${baseURL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Ambro-Dev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Ambro-Dev | ${home.title}`,
    description: home.description,
    images: [`https://${baseURL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "twój-identyfikator-google-site-verification",
  },
  appleWebApp: {
    title: "Ambro-Dev",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  category: "technology",
};

// Viewport settings
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      data-neutral={style.neutral}
      data-brand={style.brand}
      data-accent={style.accent}
      data-solid={style.solid}
      data-solid-style={style.solidStyle}
      data-theme={style.theme}
      data-border={style.border}
      data-surface={style.surface}
      data-transition={style.transition}
      className={fontClasses}
      suppressHydrationWarning
    >
      <head>
        {/* Preload critical assets - funkcja Next.js */}
        <link
          rel="preload"
          as="image"
          href="/logo.webp"
          type="image/webp"
          fetchPriority="high"
        />

        {/* Preconnect do domen zewnętrznych */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className="flex flex-col min-h-screen">
        <AccessibilityProvider>
          <DefaultSeo />
          <WebVitals />
          {/* Skip to content dla dostępności */}
          <SkipToContent />
          {/* Analytics Component */}
          <Analytics />

          <ThemeProvider
            attribute="class"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            {/* Scroll Progress Indicator zoptymalizowany pod Next.js */}
            <Suspense
              fallback={
                <div className="h-1 w-full bg-transparent fixed top-0 z-50" />
              }
            >
              <ScrollProgress
                position="top"
                color="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                zIndex={60}
                height={3}
                borderRadius="rounded-none"
              />
            </Suspense>

            {/* Navigation - prerendered */}
            <Navigation />

            <div className="flex-grow relative overflow-hidden">
              {/* Floating bubbles - lazy loaded */}
              <Suspense fallback={<div className="absolute inset-0 z-0" />}>
                <div className="absolute inset-0 z-0">
                  <FloatingBubbles
                    count={10} // Zredukowana liczba dla lepszej wydajności
                    minSize={2}
                    maxSize={6}
                    color="rgba(99, 102, 241, 0.3)"
                    minSpeed={0.5}
                    maxSpeed={1}
                    fixed
                    className="h-full w-full opacity-50"
                  />
                </div>
              </Suspense>

              {/* Main content with ID for skip-to-content */}
              <main id="main-content" tabIndex={-1}>
                <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
              </main>
            </div>

            {/* Footer - lazy loaded */}
            <Suspense fallback={<div className="h-64 bg-black" />}>
              <Footer />
            </Suspense>

            {/* Widget dostępności */}
            <AccessibilityWidget />
          </ThemeProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
