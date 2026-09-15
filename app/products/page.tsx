import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import NebulaCanvas from "../components/NebulaCanvas";
import HexScatter from "../components/HexScatter";
import PhoneShot from "../components/PhoneShot";
import Reveal from "../components/Reveal";
import Wordmark from "../components/Wordmark";

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "Rovestacks is built to house more than one product. Rovenet is our flagship and the only product live today.",
};

export default function ProductsPage() {
  return (
    <section className="products-page">
      <NebulaCanvas tint="blue" />
      <HexScatter opacity={0.3} />
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <Reveal className="section-head">
          <span className="eyebrow blue">Our Products</span>
          <h1 style={{ fontSize: "clamp(2rem,4vw,2.8rem)", marginTop: 14 }}>
            One roadmap, an orbit of products.
          </h1>
          <p style={{ marginTop: 16, color: "var(--muted)", fontSize: 16, lineHeight: 1.7 }}>
            <Wordmark /> is built to house more than one product. Rovenet is our flagship and the
            only product live today &mdash; the ones below it are the spheres of everyday life we
            intend to build into next.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="product-grid">
            <div className="product-copy">
              <span className="product-badge">&#9679; Live now</span>
              <div className="logo-rovenet" style={{ marginTop: 18 }}>
                <Image src="/images/rovenet-circle.png" alt="Rovenet logo" width={26} height={26} />
                <span>
                  <span className="rove">Rove</span>
                  <span className="net">Net</span>
                </span>
              </div>
              <h3>Nigeria&apos;s classified and digital marketplace app.</h3>
              <p>
                List anything from vehicles to fashion for free, get paid to post sponsored ad
                campaigns to your WhatsApp status, play in-app games, and redeem your earnings as
                VTU.
              </p>
              <Link href="/rovenet" className="btn btn-violet" style={{ marginTop: 20, width: "fit-content" }}>
                Explore Rovenet <ArrowRight size={16} />
              </Link>
            </div>
            <div className="product-shot">
              <PhoneShot src="/images/screenshot-market.png" alt="Rovenet marketplace categories" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <h3 style={{ marginTop: 64, fontSize: 20 }}>What&apos;s next in the orbit</h3>
          <div className="future-row">
            <div className="future-card">
              <div className="dot" />
              <strong style={{ color: "var(--white)" }}>Games</strong>
              <p style={{ marginTop: 6, fontSize: 13.5 }}>In active development</p>
            </div>
            <div className="future-card">
              <div className="dot" />
              <strong style={{ color: "var(--white)" }}>Transport &amp; Logistics</strong>
              <p style={{ marginTop: 6, fontSize: 13.5 }}>On our roadmap</p>
            </div>
            <div className="future-card">
              <div className="dot" />
              <strong style={{ color: "var(--white)" }}>Security</strong>
              <p style={{ marginTop: 6, fontSize: 13.5 }}>On our roadmap</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}