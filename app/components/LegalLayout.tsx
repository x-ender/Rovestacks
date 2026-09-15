"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, ShieldCheck, ScrollText, RotateCcw, ChevronRight } from "lucide-react";
import type { LegalSection, LegalBlock } from "../lib/legalContent";
import { EFFECTIVE_DATE } from "../lib/legalContent";
import NebulaCanvas from "./NebulaCanvas";
import Reveal from "./Reveal";

const OTHER_DOCS = [
  { href: "/privacy-policy", label: "Privacy Policy", icon: ShieldCheck },
  { href: "/terms-and-conditions", label: "Terms & Conditions", icon: ScrollText },
  { href: "/refund-policy", label: "Refund Policy", icon: RotateCcw },
];

function renderBlock(block: LegalBlock, i: number) {
  if ("h" in block && block.h) {
    return (
      <h4 key={i} className="legal-subhead">
        {block.h}
      </h4>
    );
  }
  if ("p" in block && block.p) {
    return (
      <p key={i} className="legal-p">
        {block.p}
      </p>
    );
  }
  if ("ul" in block && block.ul) {
    return (
      <ul key={i} className="legal-ul">
        {block.ul.map((item, j) => (
          <li key={j}>{item}</li>
        ))}
      </ul>
    );
  }
  return null;
}

export default function LegalLayout({
  eyebrow,
  title,
  sections,
  downloadHref,
}: {
  eyebrow: string;
  title: string;
  sections: LegalSection[];
  downloadHref: string;
}) {
  const pathname = usePathname();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="legal-page">
      <NebulaCanvas tint="blue" />
      <div className="wrap legal-wrap">
        <div className="legal-breadcrumb">
          <Link href="/legal">Legal &amp; Policies</Link>
          <ChevronRight size={13} /> <span>{title}</span>
        </div>
        <div className="legal-grid">
          <aside className="legal-sidebar">
            <div className="legal-sidebar-block">
              <h4>Our Policies</h4>
              <ul>
                {OTHER_DOCS.map((d) => {
                  const Icon = d.icon;
                  return (
                    <li key={d.href}>
                      <Link href={d.href} className={pathname === d.href ? "active" : ""}>
                        <Icon size={15} strokeWidth={1.8} /> {d.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="legal-sidebar-block">
              <h4>On this page</h4>
              <ul className="legal-toc">
                {sections.map((s) => (
                  <li key={s.id}>
                    <button onClick={() => scrollTo(s.id)}>{s.title}</button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <div className="legal-content">
            <Reveal>
              <span className="eyebrow blue">{eyebrow}</span>
              <h1 className="legal-title">{title}</h1>
              <div className="legal-meta">
                <span>Effective date: {EFFECTIVE_DATE}</span>
                <a href={downloadHref} className="legal-download" download>
                  <Download size={14} strokeWidth={2} /> Download as Word document
                </a>
              </div>
            </Reveal>
            {sections.map((s, i) => (
              <Reveal key={s.id} delay={Math.min(i * 30, 200)}>
                <div id={s.id} className="legal-section">
                  <h2>{s.title}</h2>
                  {s.body.map((block, j) => renderBlock(block, j))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
