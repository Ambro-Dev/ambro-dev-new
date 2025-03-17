// src/components/DefaultSeo.tsx
"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { baseURL } from "@/app/resources";

// Dodaj ten import w src/app/layout.tsx
// import DefaultSeo from "@/components/DefaultSeo";
// I umieść <DefaultSeo /> wewnątrz <body> przed <WebVitals />

export default function DefaultSeo() {
  const pathname = usePathname();
  const currentUrl = `https://${baseURL}${pathname}`;

  // Podstawowe dane organizacji
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ambro-Dev",
    url: `https://${baseURL}`,
    logo: `https://${baseURL}/logo.webp`,
    description:
      "Kompleksowe usługi DevOps, automatyzacja procesów IT, administracja serwerami, tworzenie aplikacji webowych i optymalizacja infrastruktury.",
    email: "kontakt@ambro-dev.pl",
    telephone: "+48123456789",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PL",
    },
    sameAs: [
      "https://github.com/ambro-dev",
      "https://linkedin.com/company/ambro-dev",
    ],
  };

  // Dane dla breadcrumbs
  const breadcrumbItems = pathname
    .split("/")
    .filter(Boolean)
    .map((path, index, array) => {
      const url = `/${array.slice(0, index + 1).join("/")}`;
      return {
        "@type": "ListItem",
        position: index + 1,
        name: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " "),
        item: `https://${baseURL}${url}`,
      };
    });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Strona główna",
        item: `https://${baseURL}`,
      },
      ...breadcrumbItems,
    ],
  };

  return (
    <>
      <Script
        id="schema-organization"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        strategy="afterInteractive"
      />
      {pathname !== "/" && (
        <Script
          id="schema-breadcrumbs"
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          strategy="afterInteractive"
        />
      )}
      <link rel="canonical" href={currentUrl} />
    </>
  );
}
