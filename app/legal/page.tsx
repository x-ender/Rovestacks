import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ScrollText, RotateCcw, ChevronRight, type LucideIcon } from "lucide-react";
import NebulaCanvas from "../components/NebulaCanvas";
import HexScatter from "../components/HexScatter";
import Reveal from "../components/Reveal";
import Wordmark from "../components/Wordmark";

export const metadata: Metadata = {
  title: "Legal & Policies",
  description: "How Rovestacks operates, in plain terms \u2014 Privacy Policy, Terms & Conditions, and Refund Policy.",
};

const DOCS: { href: string; icon: LucideIcon; title: string; copy: string }[] = [
  {
    href: "/privacy-policy",
    icon: ShieldCheck,
    title: "Privacy Policy",
    copy: "How we collect, use, and protect your personal data across Rovestacks products, and the rights you have over it.",
  },
  {
    href: "/terms-and-conditions",
    icon: ScrollText,
    title: "Terms & Conditions",
    copy: "The agreement that governs your use of Rovenet, including listings, identity verification, payments, WhatsApp status ad campaigns, games, and earnings.",
  },
  {
    href: "/refund-policy",
    icon: RotateCcw,
    title: "Refund Policy",
    copy: "When payments for services, promotion packages, and WhatsApp status ad campaign deposits are refunded automatically, and when they are final.",
  },
];

export default function LegalHubPage() {
  return (
    <section className="legal-hub">
      <NebulaCanvas tint="blue" />
      <HexScatter opacity={0.3} />
      <div className="wrap">
        <Reveal className="section-head" style={{ textAlign: "center", margin: "0 auto" }}>
          <span className="eyebrow blue">Legal &amp; Policies</span>
          <h1 style={{ fontSize: "clamp(2rem,4vw,2.8rem)", marginTop: 14 }}>
            How <Wordmark /> operates, in plain terms.
          </h1>
          <p style={{ marginTop: 16, color: "var(--muted)", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            These documents govern your relationship with Rovestacks and the Rovenet application.
            We&apos;ve written them to be as clear as a legal document can be &mdash; read them in
            full below, or download a copy for your records.
          </p>
        </Reveal>
        <div className="legal-hub-grid">
          {DOCS.map((d, i) => {
            const Icon = d.icon;
            return (
              <Reveal key={d.href} delay={i * 90}>
                <Link href={d.href} className="legal-hub-card">
                  <div className="legal-hub-icon">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3>{d.title}</h3>
                  <p>{d.copy}</p>
                  <span className="legal-hub-link">
                    Read policy <ChevronRight size={15} />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}