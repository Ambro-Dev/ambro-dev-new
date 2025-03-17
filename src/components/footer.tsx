"use client";

import { SectionDivider } from "@/components/ambro-ui/section-divider";
import { GradientText } from "@/components/ambro-ui/gradient-text";
import Link from "next/link";
import { memo, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  type LucideIcon,
} from "lucide-react";
import { baseURL } from "@/app/resources";
import { useAccessibility } from "@/components/accessibility/AccessibilityProvider";
import Script from "next/script";

// Tablice szybkich linków z ich ścieżkami - zdefiniowana poza komponentem dla lepszej wydajności
const quickLinks = [
  { name: "Strona główna", path: "/" },
  { name: "O mnie", path: "/o-mnie" },
  { name: "Usługi", path: "/uslugi" },
  { name: "Projekty", path: "/projekty" },
  { name: "Cennik", path: "/cennik" },
  { name: "Kontakt", path: "/kontakt" },
];

// Linki społecznościowe
const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/ambro-dev",
    ariaLabel: "Profil GitHub",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/company/ambro-dev",
    ariaLabel: "Profil LinkedIn",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/ambrodev",
    ariaLabel: "Profil Twitter",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/ambro_dev",
    ariaLabel: "Profil Instagram",
  },
];

// Memoizowane komponenty ikon dla lepszej wydajności
const MailIcon = memo(() => (
  <Mail
    className="h-4 w-4 text-indigo-400 mr-2 flex-shrink-0"
    aria-hidden="true"
  />
));

const PhoneIcon = memo(() => (
  <Phone
    className="h-4 w-4 text-indigo-400 mr-2 flex-shrink-0"
    aria-hidden="true"
  />
));

PhoneIcon.displayName = "PhoneIcon";
MailIcon.displayName = "MailIcon";

// Komponent do renderowania pojedynczego linku w stopce
const FooterLink = memo(
  ({
    href,
    label,
    isActive,
  }: {
    href: string;
    label: string;
    isActive?: boolean;
  }) => {
    return (
      <li>
        <Link
          href={href}
          className={`text-gray-400 hover:text-white transition-colors ${
            isActive ? "text-indigo-400" : ""
          }`}
          aria-label={`Przejdź do: ${label}`}
          aria-current={isActive ? "page" : undefined}
        >
          {label}
        </Link>
      </li>
    );
  }
);

FooterLink.displayName = "FooterLink";

// Komponent do renderowania ikony mediów społecznościowych
const SocialIcon = memo(
  ({
    icon: Icon,
    url,
    ariaLabel,
  }: {
    icon: LucideIcon;
    url: string;
    ariaLabel: string;
  }) => {
    return (
      <a
        href={url}
        className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-900/30 transition-colors"
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className="w-4 h-4 text-gray-300" />
      </a>
    );
  }
);

SocialIcon.displayName = "SocialIcon";

// Główny komponent stopki z memoizacją dla lepszej wydajności
const Footer = memo(() => {
  const currentYear = new Date().getFullYear();
  const email = "kontakt@ambro-dev.pl";
  const phone = "+48 123 456 789";
  const pathname = usePathname();
  const { reduceMotion } = useAccessibility();

  // Memoizowana funkcja sprawdzająca aktywny link
  const isLinkActive = useCallback(
    (path: string) => {
      if (path === "/" && pathname === "/") return true;
      if (path !== "/" && pathname.startsWith(path)) return true;
      return false;
    },
    [pathname]
  );

  return (
    <footer className="w-full py-12 px-6 bg-black border-t border-gray-800">
      {/* JSON-LD dla stopki */}
      <Script
        id="footer-schema"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Ambro-Dev",
            url: `https://${baseURL}`,
            logo: `https://${baseURL}/logo.webp`,
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+48123456789",
              contactType: "customer service",
              email: "kontakt@ambro-dev.pl",
              availableLanguage: "Polish",
            },
            sameAs: [
              "https://github.com/ambro-dev",
              "https://linkedin.com/company/ambro-dev",
              "https://twitter.com/ambrodev",
              "https://instagram.com/ambro_dev",
            ],
          }),
        }}
      />

      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo i opis */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4" id="footer-brand">
              <GradientText
                from="indigo-500"
                to="purple-600"
                animated={!reduceMotion}
              >
                Ambro-Dev
              </GradientText>
            </h2>
            <p className="text-gray-400 mb-6 max-w-md">
              Kompleksowe rozwiązania DevOps i aplikacje webowe dla nowoczesnego
              biznesu. Specjalizuję się w automatyzacji procesów, konfiguracji i
              administracji serwerami, CI/CD oraz tworzeniu aplikacji webowych.
            </p>

            {/* Ikony mediów społecznościowych */}
            <div className="flex space-x-3 mb-6">
              {socialLinks.map((social) => (
                <SocialIcon
                  key={social.name}
                  icon={social.icon}
                  url={social.url}
                  ariaLabel={social.ariaLabel}
                />
              ))}
            </div>
          </div>

          {/* Szybkie linki */}
          <div>
            <h3 className="text-lg font-bold mb-4" id="quick-links">
              Szybkie linki
            </h3>
            <nav aria-labelledby="quick-links">
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <FooterLink
                    key={link.name}
                    href={link.path}
                    label={link.name}
                    isActive={isLinkActive(link.path)}
                  />
                ))}
              </ul>
            </nav>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-lg font-bold mb-4" id="contact-info">
              Kontakt
            </h3>
            <address className="not-italic">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <MailIcon />
                  <a
                    href={`mailto:${email}`}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Email kontaktowy"
                  >
                    {email}
                  </a>
                </li>
                <li className="flex items-center">
                  <PhoneIcon />
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="text-gray-400 hover:text-white transition-colors truncate"
                    aria-label="Telefon kontaktowy"
                  >
                    {phone}
                  </a>
                </li>
                <li className="mt-4">
                  <Link
                    href="/kontakt"
                    className="inline-block px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors text-sm"
                  >
                    Formularz kontaktowy
                  </Link>
                </li>
              </ul>
            </address>

            {/* Dodatkowe informacje */}
            <div className="mt-6 text-sm text-gray-500">
              <p>Godziny pracy: Pon-Pt 9:00 - 17:00</p>
            </div>
          </div>
        </div>

        <SectionDivider
          variant="tech"
          lineColor="from-transparent via-gray-800 to-transparent"
          dotColor="bg-indigo-500"
        />

        {/* Stopka dolna z prawami autorskimi i linkami */}
        <div className="pt-8 flex flex-col md:flex-row md:justify-between items-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Ambro-Dev. Wszelkie prawa zastrzeżone.</p>

          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link
              href="/polityka-prywatnosci"
              className="hover:text-gray-300 transition-colors"
            >
              Polityka prywatności
            </Link>
            <Link
              href="/regulamin"
              className="hover:text-gray-300 transition-colors"
            >
              Regulamin
            </Link>
            <Link
              href="/mapa-strony"
              className="hover:text-gray-300 transition-colors"
            >
              Mapa strony
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
