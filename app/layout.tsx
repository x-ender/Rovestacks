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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rovestacks.com"),
  title: {
    default: "Rovestacks \u2014 Building Africa's Connected Digital Ecosystem",
    template: "%s | Rovestacks",
  },
  description:
    "Rovestacks Technologies Limited is a Nigerian technology company building Africa's connected digital ecosystem. Rovenet, our flagship product, is a classified and digital marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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