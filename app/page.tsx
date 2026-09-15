import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Store, Share2, Gamepad2, Wallet, Lock, Zap, Globe2, Users2, Download, ArrowRight, ChevronRight, type LucideIcon } from "lucide-react";
import NebulaCanvas from "./components/NebulaCanvas";
import HexScatter from "./components/HexScatter";
import PhoneShot from "./components/PhoneShot";
import Reveal from "./components/Reveal";
import Wordmark from "./components/Wordmark";

export const metadata: Metadata = {
  title: "Rovestacks \u2014 Building Africa's Connected Digital Ecosystem",
  description:
    "Rovestacks Technologies Limited is a Nigerian technology company building Africa's connected digital ecosystem. Rovenet, our flagship product, is a classified and digital marketplace.",
};

type Feature = { icon: LucideIcon; title: string; copy: string };

const ROVENET_FEATURES: Feature[] = [
  {
    icon: Store,
    title: "Marketplace",
    copy: "Post and browse Vehicles, Property, Electronics, Fashion, Services, and Jobs \u2014 free to list, with no commission taken on sales between users.",
  },
  {
    icon: Share2,
    title: "WhatsApp Status Ads",
    copy: "Post sponsored ad campaigns to your WhatsApp status and get paid directly by the brands behind them.",
  },
  {
    icon: Gamepad2,
    title: "Games & Rewards",
    copy: "Play built-in games, currently Jump Jump and Trivia, for a chance to earn additional in-app rewards \u2014 with more on the way.",
  },
  {
    icon: Wallet,
    title: "Earnings & Rewards",
    copy: "Redeem your in-app earnings instantly as airtime and data through our VTU integration.",
  },
];

const WHY_ITEMS: { icon: LucideIcon; tag: string; copy: string; shot?: string }[] = [
  {
    icon: Lock,
    tag: "Secure",
    copy: "Passcode-protected access and encrypted transactions safeguard your account and wallet at every step.",
    shot: "/images/screenshot-passcode.png",
  },
  {
    icon: Zap,
    tag: "Fast",
    copy: "Engineered to remain responsive even on average Nigerian mobile network conditions.",
  },
  {
    icon: Globe2,
    tag: "Built for Nigeria & Africa",
    copy: "Naira-denominated pricing, local categories, and pickup-based workflows designed around how people actually trade here.",
  },
  {
    icon: Users2,
    tag: "Community-driven",
    copy: "Product decisions are shaped directly by feedback from the people already buying, selling, and earning on Rovenet.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero" id="top">
        <NebulaCanvas tint="blue" />
        <HexScatter opacity={0.35} />
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow blue">The company behind Rovenet</span>
            <h1>
              Building Africa&apos;s <span>Connected</span> Digital Ecosystem
            </h1>
            <p className="lede">
              <Wordmark /> is a Nigerian technology innovation company building digital products
              across commerce, media, and everyday life. We design each product to stand on its
              own, while sharing one foundation of trust, security, and community underneath. Our
              first product, Rovenet, is live today &mdash; a classified and digital marketplace
              app already helping thousands of Nigerians buy, sell, and earn.
            </p>
            <div className="hero-ctas">
              <a href="#waitlist" className="btn btn-blue">
                <Download size={18} strokeWidth={2} /> Download Rovenet
              </a>
              <Link href="/products" className="btn btn-ghost">
                Our Products <ArrowRight size={17} strokeWidth={2} />
              </Link>
            </div>
          </div>
          <div className="hero-phone-col">
            <PhoneShot
              src="/images/screenshot-home.png"
              alt="Rovenet home screen showing wallet balance and Social Hunt tasks"
            />
          </div>
        </div>
      </section>

      <section className="vision" id="vision">
        <div className="wrap vision-grid">
          <Reveal className="vision-mark">
            <Image src="/images/rovestacks-logo.png" alt="Rovestacks orbit mark" width={360} height={360} />
          </Reveal>
          <Reveal delay={100}>
            <span className="eyebrow blue">What is Rovestacks?</span>
            <h2>One company, an orbit of connected products.</h2>
            <p>
              <Wordmark /> is the trading name of Rovestacks Technologies Limited (RC 9619939),
              registered with the Corporate Affairs Commission of Nigeria to develop software,
              mobile applications, and digital platforms, and to operate and manage online
              ecosystems more broadly. That mandate is intentionally wide: we exist to build
              technology for every sphere of everyday life, not to remain a single-product
              company.
            </p>
            <p>
              Our long-term roadmap spans gaming, marketplaces, transport and logistics, and
              security &mdash; each conceived as its own product, sharing one account, one trust
              layer, and one community wherever it makes sense to. Rovenet is the first of these
              products to launch, and the one we are entirely focused on today.
            </p>
            <div className="vision-spheres">
              <span className="sphere-chip">Games</span>
              <span className="sphere-chip">Marketplace</span>
              <span className="sphere-chip">Transport &amp; Logistics</span>
              <span className="sphere-chip">Security</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="rovenet-teaser" id="rovenet-teaser">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Meet Rovenet</span>
            <h2>Nigeria&apos;s classified and digital marketplace, in your pocket.</h2>
            <p>
              Post listings, earn by posting sponsored ad campaigns to your WhatsApp status, play
              games for rewards, and redeem your earnings &mdash; all from one app.
            </p>
          </Reveal>
          <div className="feature-grid">
            {ROVENET_FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={i * 80}>
                  <div className="feature-card">
                    <div className="feature-icon">
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <h3>{f.title}</h3>
                    <p>{f.copy}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={120}>
            <div className="teaser-strip">
              <Image src="/images/screenshot-home.png" alt="Rovenet home screen" width={260} height={550} />
              <Image src="/images/screenshot-market.png" alt="Rovenet MarketHub categories" width={260} height={550} />
              <Image src="/images/screenshot-social.png" alt="Rovenet social earning screen" width={260} height={550} />
            </div>
            <Link href="/rovenet" className="explore-link">
              See everything Rovenet can do <ChevronRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="why" id="why">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Why Choose Rovestacks?</span>
            <h2>Built to earn trust, one interaction at a time.</h2>
          </Reveal>
          <div className="why-grid">
            {WHY_ITEMS.map((w, i) => {
              const Icon = w.icon;
              return (
                <Reveal key={w.tag} delay={i * 80}>
                  <div className="why-card">
                    <div className="why-icon">
                      <Icon size={19} strokeWidth={1.8} />
                    </div>
                    <h3>{w.tag}</h3>
                    <p>{w.copy}</p>
                    {w.shot && (
                      <Image
                        className="why-shot"
                        src={w.shot}
                        alt="Rovenet passcode security screen"
                        width={260}
                        height={550}
                      />
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="soon">
        <div className="soon-threads">
          <NebulaCanvas tint="violet" />
        </div>
        <div className="wrap inner">
          <Reveal>
            <span className="eyebrow">Coming Soon</span>
            <h2>More is on the way.</h2>
            <p>
              Rovenet is the first thread in the Rovestacks network. We&apos;re already building
              what comes next, on the same foundation of trust and community.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}