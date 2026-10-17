"use client";

import { useState } from "react";
import { Store, MapPin, Share2, Gamepad2, type LucideIcon } from "lucide-react";
import PhoneShot from "./PhoneShot";
import Reveal from "./Reveal";

type Tab = {
  key: string;
  label: string;
  icon: LucideIcon;
  shot: string;
  copy: string;
};

const TABS: Tab[] = [
  {
    key: "home",
    label: "Home",
    icon: Store,
    shot: "/images/screenshot-home.png",
    copy: "One home for your wallet, featured promotions, Social Hunt, and games.",
  },
  {
    key: "market",
    label: "Marketplace",
    icon: MapPin,
    shot: "/images/screenshot-market.png",
    copy: "Shop Naira-priced classifieds across sixteen categories \u2014 products, services, and jobs. Browse or post in seconds.",
  },
  {
    key: "social",
    label: "WhatsApp Ads",
    icon: Share2,
    shot: "/images/screenshot-social.png",
    copy: "Verify your WhatsApp status audience and start getting paid to post sponsored campaigns.",
  },
  {
    key: "games",
    label: "Games",
    icon: Gamepad2,
    shot: "/images/screenshot-home-games.png",
    copy: "Chase rewards through Jump Jump, Trivia, and ranked Ludo \u2014 with more games on the way.",
  },
];

export default function RovenetShowcase() {
  const [activeTab, setActiveTab] = useState("home");
  const active = TABS.find((t) => t.key === activeTab) ?? TABS[0];

  return (
    <div className="showcase-grid">
      <Reveal className="showcase-tabs">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              className={`showcase-tab ${activeTab === t.key ? "active" : ""}`}
              onClick={() => setActiveTab(t.key)}
            >
              <Icon size={17} strokeWidth={1.8} />
              <span>{t.label}</span>
            </button>
          );
        })}
        <p className="showcase-copy">{active.copy}</p>
      </Reveal>
      <Reveal delay={100}>
        <PhoneShot src={active.shot} alt={`Rovenet ${active.label} screen`} />
      </Reveal>
    </div>
  );
}