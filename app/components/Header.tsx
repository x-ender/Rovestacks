"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Wordmark from "./Wordmark";

const LEGAL_PATHS = ["/legal", "/privacy-policy", "/terms-and-conditions", "/refund-policy"];

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    if (path === "/legal") return LEGAL_PATHS.includes(pathname);
    return pathname === path;
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/rovenet", label: "Rovenet" },
    { href: "/legal", label: "Legal" },
  ];

  return (
    <header>
      <nav className="nav">
        <Link href="/" className="logo">
          <Image src="/images/rovestacks-logo.png" alt="Rovestacks logo" width={28} height={28} />
          <Wordmark />
        </Link>
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={`link ${isActive(l.href) ? "active" : ""}`}>
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a href="#waitlist" className="nav-cta">
              Join Waitlist
            </a>
          </li>
        </ul>
        <button className="nav-toggle" onClick={() => setNavOpen(!navOpen)} aria-label="Toggle menu">
          {navOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      <div className={`mobile-links ${navOpen ? "open" : ""}`}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="link" onClick={() => setNavOpen(false)}>
            {l.label}
          </Link>
        ))}
        <a href="#waitlist" className="nav-cta" style={{ width: "fit-content" }} onClick={() => setNavOpen(false)}>
          Join Waitlist
        </a>
      </div>
    </header>
  );
}
