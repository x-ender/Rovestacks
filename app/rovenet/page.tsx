import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download } from "lucide-react";
import NebulaCanvas from "../components/NebulaCanvas";
import HexScatter from "../components/HexScatter";
import PhoneShot from "../components/PhoneShot";
import Reveal from "../components/Reveal";
import RovenetShowcase from "../components/RovenetShowcase";

export const metadata: Metadata = {
  title: "Rovenet \u2014 Buy, Sell, Earn",
  description:
    "Rovenet is Nigeria's classified and digital marketplace app, built by Rovestacks. List anything for free, get paid to post sponsored ad campaigns to your WhatsApp status, and play games for rewards.",
};

const CATEGORIES = [
  "Vehicles",
  "Property",
  "Phones & Tablets",
  "Electronics",
  "Home & Furniture",
  "Beauty & Personal",
  "Services",
  "Repair & Construction",
  "Commercial Equipment",
  "Leisure & Activities",
  "Babies & Kids",
  "Food & Agriculture",
  "Animals & Pets",
  "Jobs",
  "Seeking Work \u2014 CVs",
  "Fashion",
];

export default function RovenetPage() {
  return (
    <>
      <section className="rn-hero" id="top">
        <NebulaCanvas tint="violet" />
        <HexScatter opacity={0.4} />
        <div className="wrap rn-hero-grid">
          <div>
            <Link href="/" className="back-link">
              <ArrowLeft size={15} /> Back to Rovestacks
            </Link>
            <div className="logo-rovenet">
              <Image src="/images/rovenet-circle.png" alt="Rovenet logo" width={26} height={26} />
              <span>
                <span className="rove">Rove</span>
                <span className="net">Net</span>
              </span>
            </div>
            <span className="eyebrow" style={{ marginTop: 16 }}>
              A Rovestacks product
            </span>
            <h1>Buy, sell, earn &mdash; all in one app.</h1>
            <p className="lede">
              Rovenet is Nigeria&apos;s classified and digital marketplace app, built by
              Rovestacks. List anything from cars to fashion for free, get paid to post sponsored
              ad campaigns to your WhatsApp status, and play games for extra rewards.
            </p>
            <div className="store-row">
              <a href="#waitlist" className="store-btn">
                <Download size={20} />
                <span className="lines">
                  <span>Get it on</span>
                  <span>Android</span>
                </span>
              </a>
              <a href="#waitlist" className="store-btn">
                <Download size={20} />
                <span className="lines">
                  <span>Coming soon on</span>
                  <span>iOS</span>
                </span>
              </a>
            </div>
          </div>
          <PhoneShot src="/images/screenshot-home.png" alt="Rovenet app home screen" />
        </div>
      </section>

      <section className="showcase" id="showcase">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">See it in action</span>
            <h2>What Rovenet looks like day to day.</h2>
          </Reveal>
          <RovenetShowcase />
        </div>
      </section>

      <section className="cat-section">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">MarketHub Categories</span>
            <h2>Sixteen categories, one classifieds board.</h2>
            <p>From vehicles and property to jobs and fashion &mdash; post what you have, find what you need.</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="cat-cloud">
              {CATEGORIES.map((c) => (
                <span className="cat-chip" key={c}>
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="earn">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Earn on Rovenet</span>
            <h2>Three ways to make money without leaving the app.</h2>
          </Reveal>
          <div className="earn-grid">
            <Reveal>
              <div className="earn-card">
                <Image
                  src="/images/screenshot-social.png"
                  alt="Verify your WhatsApp status audience to earn"
                  width={400}
                  height={220}
                  style={{ objectFit: "cover", objectPosition: "top", width: "100%", height: 220 }}
                />
                <div className="earn-body">
                  <h3>WhatsApp Status Ads</h3>
                  <p>
                    Verify your WhatsApp status audience, then earn by posting sponsored ad
                    campaigns from brands to your status.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="earn-card">
                <Image
                  src="/images/screenshot-home-games.png"
                  alt="Chase games section with Jump Jump and Trivia"
                  width={400}
                  height={220}
                  style={{ objectFit: "cover", objectPosition: "top", width: "100%", height: 220 }}
                />
                <div className="earn-body">
                  <h3>Games &amp; Chase</h3>
                  <p>
                    Play Jump Jump or Trivia for a shot at extra rewards &mdash; our way of
                    giving back to active users, with more games on the way.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="earn-card">
                <Image
                  src="/images/screenshot-listing.png"
                  alt="Marketplace listing detail page"
                  width={400}
                  height={220}
                  style={{ objectFit: "cover", objectPosition: "top", width: "100%", height: 220 }}
                />
                <div className="earn-body">
                  <h3>Promoted Listings</h3>
                  <p>Sellers can pay to feature a listing for more visibility &mdash; powered by Paystack and Opay.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="cat-section" id="coming-to-rovenet">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Coming to Rovenet</span>
            <h2>What we&apos;re building next.</h2>
            <p>
              Rovenet today is Classified Ads, WhatsApp Status Ad Marketing, and games (Jump Jump
              and Trivia, with more on the way). Here&apos;s what&apos;s on the way next &mdash;
              not yet available, but in active planning.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="future-row">
              <div className="future-card">
                <div className="dot" />
                <strong style={{ color: "var(--white)" }}>Digital Spaces</strong>
                <p style={{ marginTop: 6, fontSize: 13.5 }}>
                  A home for creators to share knowledge and digital products, where interested
                  users can join through a simple onboarding flow.
                </p>
              </div>
              <div className="future-card">
                <div className="dot" />
                <strong style={{ color: "var(--white)" }}>Digital Tasks &amp; Gigs</strong>
                <p style={{ marginTop: 6, fontSize: 13.5 }}>
                  A wider marketplace for digital work &mdash; opportunities for users to earn by
                  fulfilling tasks and services for others.
                </p>
              </div>
              <div className="future-card">
                <div className="dot" />
                <strong style={{ color: "var(--white)" }}>Bank Withdrawal</strong>
                <p style={{ marginTop: 6, fontSize: 13.5 }}>
                  Direct withdrawal to Nigerian bank accounts, once we&apos;ve completed the
                  required regulatory compliance.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}