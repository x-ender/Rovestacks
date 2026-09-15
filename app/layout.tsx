import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Inter, IBM_Plex_Mono, Michroma } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WaitlistCTA from "./components/WaitlistCTA";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-michroma",
  display: "swap",
});

const SITE_URL = "https://www.rovestacks.com";
const SITE_TITLE = "Rovestacks \u2014 Building Africa's Connected Digital Ecosystem";
const SITE_DESCRIPTION =
  "Rovestacks Technologies Limited is a Nigerian technology company building Africa's connected digital ecosystem. Rovenet, our flagship product, is a classified and digital marketplace.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Rovestacks",
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Rovestacks",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rovestacks \u2014 Building Africa's Connected Digital Ecosystem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} ${michroma.variable}`}
        style={{
          // Map next/font CSS variables onto the plain custom-property names
          // used throughout globals.css, so no class-name plumbing is needed
          // in every component.
          ["--font-display" as string]: "var(--font-space-grotesk)",
          ["--font-body" as string]: "var(--font-inter)",
          ["--font-mono" as string]: "var(--font-plex-mono)",
          ["--font-wordmark" as string]: "var(--font-michroma)",
        }}
      >
        <Header />
        {children}
        <WaitlistCTA />
        <Footer />
      </body>
    </html>
  );
}