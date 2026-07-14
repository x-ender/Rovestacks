// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useRef, useState } from "react";
import {
  Store, MapPin, Gift, Briefcase, ShieldCheck, Zap, Globe2, Users2,
  Menu, X, Download, ArrowRight, Mail,
  TrendingUp, Star, Clock,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Reveal-on-scroll wrapper                                          */
/* ------------------------------------------------------------------ */
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Nebula network canvas — threads connecting floating spheres        */
/* ------------------------------------------------------------------ */
function NebulaCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let width, height, dpr;
    let nodes = [];

    const SMALL_COUNT = 46;
    const ORB_COUNT = 6;
    const LINK_DIST = 150;

    function resize() {
      const parent = canvas.parentElement;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeNodes() {
      nodes = [];
      for (let i = 0; i < SMALL_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: 1.4 + Math.random() * 1.4,
          orb: false,
        });
      }
      for (let i = 0; i < ORB_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: 20 + Math.random() * 26,
          orb: true,
        });
      }
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      // move
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -40) n.x = width + 40;
        if (n.x > width + 40) n.x = -40;
        if (n.y < -40) n.y = height + 40;
        if (n.y > height + 40) n.y = -40;
      });

      // links (small nodes only, plus links to nearby orbs)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = a.orb || b.orb ? LINK_DIST * 1.6 : LINK_DIST;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            ctx.strokeStyle = `rgba(120,170,255,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // orbs (glow spheres)
      nodes.filter((n) => n.orb).forEach((n) => {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        grad.addColorStop(0, "rgba(135,181,255,0.45)");
        grad.addColorStop(1, "rgba(135,181,255,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // small particles
      nodes.filter((n) => !n.orb).forEach((n) => {
        ctx.fillStyle = "rgba(224,236,255,0.85)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(step);
    }

    resize();
    makeNodes();
    step();

    const onResize = () => {
      resize();
      makeNodes();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="nebula-canvas" aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/*  Rovenet phone mockup — tabbed UI showcase                          */
/* ------------------------------------------------------------------ */
function RovenetShowcase() {
  const tabs = [
    { key: "market", label: "Marketplace", icon: Store },
    { key: "discover", label: "Discover", icon: MapPin },
    { key: "rewards", label: "Rewards", icon: Gift },
    { key: "business", label: "Business", icon: Briefcase },
  ];
  const [active, setActive] = useState("market");

  return (
    <div className="showcase-grid">
      <div className="showcase-tabs">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              className={`showcase-tab ${active === t.key ? "active" : ""}`}
              onClick={() => setActive(t.key)}
            >
              <Icon size={17} strokeWidth={1.8} />
              <span>{t.label}</span>
            </button>
          );
        })}
        <p className="showcase-copy">
          Every tab in Rovenet lives on the same account, the same wallet, the
          same trust layer — switching tools shouldn't mean switching apps.
        </p>
      </div>

      <div className="phone-wrap">
        <div className="phone">
          <div className="phone-notch" />
          <div className="phone-screen">
            {active === "market" && (
              <div className="screen-content">
                <div className="screen-title">Marketplace</div>
                {[
                  { name: "Fresh Produce Box", price: "\u20a64,500", tag: "Food" },
                  { name: "Ankara Fabric Bundle", price: "\u20a612,000", tag: "Fashion" },
                  { name: "Refurbished Router", price: "\u20a68,200", tag: "Tech" },
                ].map((item, i) => (
                  <div className="mock-card" key={i}>
                    <div className={`mock-thumb thumb-${i % 3}`} />
                    <div className="mock-info">
                      <strong>{item.name}</strong>
                      <span>{item.tag}</span>
                    </div>
                    <div className="mock-price">{item.price}</div>
                  </div>
                ))}
              </div>
            )}
            {active === "discover" && (
              <div className="screen-content">
                <div className="screen-title">Nearby for you</div>
                {[
                  { name: "Chicken Republic", meta: "Restaurant · 0.4km" },
                  { name: "Computer Village Market", meta: "Electronics · 1.1km" },
                  { name: "Roban Stores", meta: "Groceries · 1.8km" },
                ].map((p, i) => (
                  <div className="mock-row" key={i}>
                    <MapPin size={16} strokeWidth={1.8} />
                    <div className="mock-info">
                      <strong>{p.name}</strong>
                      <span>{p.meta}</span>
                    </div>
                    <Star size={14} strokeWidth={1.8} className="mock-star" />
                  </div>
                ))}
              </div>
            )}
            {active === "rewards" && (
              <div className="screen-content">
                <div className="screen-title">Your Rewards</div>
                <div className="mock-points">
                  <span className="mock-points-num">2,140</span>
                  <span className="mock-points-label">points balance</span>
                </div>
                <div className="mock-streak">
                  <Clock size={16} strokeWidth={1.8} />
                  <span>7-day streak — 1 point/day bonus active</span>
                </div>
                <button className="mock-redeem">Redeem points</button>
              </div>
            )}
            {active === "business" && (
              <div className="screen-content">
                <div className="screen-title">Storefront overview</div>
                <div className="mock-stats-row">
                  <div className="mock-stat">
                    <span className="mock-stat-num">18</span>
                    <span>Orders today</span>
                  </div>
                  <div className="mock-stat">
                    <span className="mock-stat-num">\u20a692k</span>
                    <span>Revenue</span>
                  </div>
                </div>
                <div className="mock-bars">
                  {[40, 65, 30, 80, 55, 70, 45].map((h, i) => (
                    <div className="mock-bar" key={i} style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="mock-trend">
                  <TrendingUp size={15} strokeWidth={1.8} />
                  <span>Up 12% from last week</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="phone-glow" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main App                                                          */
/* ------------------------------------------------------------------ */
export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleWaitlist = (e) => {
    e.preventDefault();
    if (email.trim()) setJoined(true);
  };

  const features = [
    {
      icon: Store,
      title: "Marketplace",
      copy: "Buy and sell within your own community, with listings built for how people actually trade locally.",
    },
    {
      icon: MapPin,
      title: "Local Discovery",
      copy: "Find the shops, services, and spots worth knowing about — recommended by people near you.",
    },
    {
      icon: Gift,
      title: "Rewards & Games",
      copy: "Earn points for everyday activity and redeem them, or just play — the network rewards you either way.",
    },
    {
      icon: Briefcase,
      title: "Business Tools",
      copy: "Storefronts, orders, and simple analytics so sellers can run things without extra software.",
    },
  ];

  const whyItems = [
    { icon: ShieldCheck, tag: "Secure", copy: "Your data and transactions are encrypted end to end, every time you open the app." },
    { icon: Zap, tag: "Fast", copy: "Built to feel instant on the connections people actually have, not the ones we wish they had." },
    { icon: Globe2, tag: "Built for Nigeria & Africa", copy: "Designed around how people here shop, move, and connect — not adapted from somewhere else." },
    { icon: Users2, tag: "Community-driven", copy: "Every feature we ship starts with feedback from the people already using Rovenet." },
  ];

  return (
    <div className="rs-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .rs-root{
          --fb-blue:#1877F2;
          --fb-blue-dark:#0A54C4;
          --fb-blue-deep:#083E94;
          --fb-blue-light:#EAF2FF;
          --navy:#0A1730;
          --navy-2:#0E1F45;
          --white:#FFFFFF;
          --ink:#0F1626;
          --muted:#5B6B85;
          --line: rgba(15,22,38,0.08);
          --display:'Space Grotesk', sans-serif;
          --body:'Inter', sans-serif;
          --mono:'IBM Plex Mono', monospace;
          font-family: var(--body);
          color: var(--ink);
          background: var(--white);
          overflow-x: hidden;
          -webkit-font-smoothing:antialiased;
        }
        .rs-root *{ box-sizing:border-box; }
        .rs-root img, .rs-root svg{ display:block; }
        .rs-root a{ color:inherit; text-decoration:none; }
        .wrap{ max-width:1180px; margin:0 auto; padding:0 32px; }
        .eyebrow{
          font-family: var(--mono); font-size:12px; letter-spacing:0.14em; text-transform:uppercase;
          display:inline-flex; align-items:center; gap:8px; color: var(--fb-blue);
        }
        .eyebrow::before{ content:''; width:16px; height:1.5px; background:currentColor; display:inline-block; }
        h1,h2,h3{ font-family: var(--display); letter-spacing:-0.01em; margin:0; }

        /* ---------- Logo lockup ---------- */
        .logo{
          display:flex; align-items:center; gap:9px; font-family:var(--display);
          font-weight:700; font-size:21px; white-space:nowrap;
        }
        .logo-mark {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        // .logo-mark{
        //   width:32px; height:32px; border-radius:9px;
        //   // background: linear-gradient(135deg, var(--fb-blue), var(--fb-blue-deep));
        //   display:flex; align-items:center; justify-content:center;
        //   box-shadow: 0 4px 14px rgba(24,119,242,0.35);
        // }
        .logo-mark svg{ stroke:#fff; }
        .logo-text{
          background: linear-gradient(90deg, var(--fb-blue-dark), var(--fb-blue));
          -webkit-background-clip:text; background-clip:text; color:transparent;
        }

        /* ---------- Header ---------- */
        header{
          position:fixed; top:0; left:0; right:0; z-index:50;
          background:rgba(255,255,255,0.82); backdrop-filter:blur(10px);
          border-bottom:1px solid var(--line);
        }
        .nav{ display:flex; align-items:center; justify-content:space-between; padding:14px 32px; max-width:1180px; margin:0 auto; }
        .nav-links{ display:flex; align-items:center; gap:30px; list-style:none; margin:0; padding:0; }
        .nav-links a{ font-size:14.5px; font-weight:500; color: var(--muted); transition:color .2s ease; }
        .nav-links a:hover{ color: var(--ink); }
        .nav-cta{
          background: var(--fb-blue); color:#fff !important; padding:10px 20px; border-radius:100px;
          font-weight:600; font-size:14px; transition:transform .2s ease, box-shadow .2s ease;
        }
        .nav-cta:hover{ transform:translateY(-1px); box-shadow:0 8px 20px rgba(24,119,242,0.35); }
        .nav-toggle{ display:none; background:none; border:none; cursor:pointer; color:var(--ink); }
        .mobile-links{ display:none; }
        @media (max-width:880px){
          .nav-links{ display:none; }
          .nav-toggle{ display:block; }
          .mobile-links.open{
            display:flex; flex-direction:column; gap:16px; padding:20px 32px 26px;
            background:#fff; border-bottom:1px solid var(--line);
          }
        }

        /* ---------- Hero ---------- */
        .hero{
          position:relative; padding:172px 0 120px; overflow:hidden;
          background: radial-gradient(1200px 600px at 20% -10%, var(--navy-2), var(--navy) 60%);
          color:#fff;
        }
        .nebula-canvas{ position:absolute; inset:0; width:100%; height:100%; }
        .hero-inner{ position:relative; z-index:2; max-width:700px; }
        .hero h1{ font-size:clamp(2.5rem, 5.4vw, 4.2rem); line-height:1.08; color:#fff; margin-top:20px; }
        .hero h1 span{
          background: linear-gradient(90deg,#8FBBFF,#FFFFFF); -webkit-background-clip:text; background-clip:text; color:transparent;
        }
        .hero p.lede{ margin-top:22px; font-size:18px; color:rgba(255,255,255,0.72); max-width:520px; }
        .hero-ctas{ display:flex; gap:16px; margin-top:38px; flex-wrap:wrap; }
        .btn{
          display:inline-flex; align-items:center; gap:9px; padding:15px 26px; border-radius:100px;
          font-weight:600; font-size:15px; cursor:pointer; border:1px solid transparent; transition:transform .2s ease, box-shadow .2s ease, background .2s ease;
        }
        .btn-primary{ background:#fff; color: var(--fb-blue-deep); }
        .btn-primary:hover{ transform:translateY(-2px); box-shadow:0 10px 26px rgba(255,255,255,0.18); }
        .btn-blue{ background: var(--fb-blue); color:#fff; }
        .btn-blue:hover{ transform:translateY(-2px); box-shadow:0 10px 26px rgba(24,119,242,0.35); }
        .btn-ghost{ border-color:rgba(255,255,255,0.32); color:#fff; }
        .btn-ghost:hover{ border-color:#fff; transform:translateY(-2px); }
        .btn-ghost-dark{ border-color: rgba(15,22,38,0.18); color: var(--ink); }
        .btn-ghost-dark:hover{ border-color: var(--ink); transform:translateY(-2px); }

        /* ---------- Vision ---------- */
        .vision{ padding:110px 0; background:#fff; }
        .vision-grid{ display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .vision h2{ font-size:clamp(1.8rem,3vw,2.5rem); margin-top:16px; line-height:1.16; }
        .vision p{ margin-top:18px; color: var(--muted); font-size:16px; max-width:480px; }
        .vision-orb-wrap{ position:relative; aspect-ratio:1/1; border-radius:24px; background: var(--fb-blue-light); overflow:hidden; }
        @media (max-width:900px){ .vision-grid{ grid-template-columns:1fr; } .vision-orb-wrap{ max-width:420px; margin:0 auto; order:-1; } }

        /* ---------- Rovenet features ---------- */
        .rovenet{ padding:110px 0; background: var(--fb-blue-light); }
        .section-head{ max-width:620px; }
        .section-head h2{ font-size:clamp(1.8rem,3vw,2.5rem); margin-top:14px; }
        .section-head p{ margin-top:16px; color: var(--muted); font-size:16px; }
        .feature-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-top:52px; }
        .feature-card{
          background:#fff; border:1px solid var(--line); border-radius:18px; padding:28px 24px;
          transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .feature-card:hover{ transform:translateY(-6px); box-shadow:0 16px 34px rgba(24,119,242,0.16); border-color:rgba(24,119,242,0.3); }
        .feature-icon{
          width:44px; height:44px; border-radius:12px; background: var(--fb-blue-light);
          display:flex; align-items:center; justify-content:center; margin-bottom:18px;
          transition:background .25s ease;
        }
        .feature-card:hover .feature-icon{ background: var(--fb-blue); }
        .feature-icon svg{ stroke: var(--fb-blue); transition:stroke .25s ease; }
        .feature-card:hover .feature-icon svg{ stroke:#fff; }
        .feature-card h3{ font-size:17px; font-weight:700; font-family:var(--body); }
        .feature-card p{ margin-top:10px; font-size:14.5px; color: var(--muted); }
        @media (max-width:980px){ .feature-grid{ grid-template-columns:repeat(2,1fr); } }
        @media (max-width:560px){ .feature-grid{ grid-template-columns:1fr; } }

        /* ---------- Showcase ---------- */
        .showcase{ padding:110px 0; background:#fff; }
        .showcase-grid{ display:grid; grid-template-columns:0.85fr 1.15fr; gap:56px; align-items:center; margin-top:52px; }
        .showcase-tabs{ display:flex; flex-direction:column; gap:12px; }
        .showcase-tab{
          display:flex; align-items:center; gap:12px; padding:15px 18px; border-radius:14px;
          border:1px solid var(--line); background:#fff; font-family:var(--body); font-weight:600; font-size:14.5px;
          color: var(--muted); cursor:pointer; text-align:left; transition:all .2s ease;
        }
        .showcase-tab svg{ stroke: var(--muted); transition:stroke .2s ease; }
        .showcase-tab.active{ background: var(--fb-blue); color:#fff; border-color: var(--fb-blue); box-shadow:0 10px 24px rgba(24,119,242,0.28); }
        .showcase-tab.active svg{ stroke:#fff; }
        .showcase-copy{ margin-top:12px; color: var(--muted); font-size:14.5px; max-width:340px; }

        .phone-wrap{ position:relative; display:flex; justify-content:center; }
        .phone-glow{
          position:absolute; width:280px; height:280px; border-radius:50%;
          background: radial-gradient(circle, rgba(24,119,242,0.25), transparent 70%);
          filter:blur(10px); z-index:0;
        }
        .phone{
          position:relative; z-index:1; width:270px; border-radius:38px; padding:14px;
          background: linear-gradient(160deg,#12172b,#080b16);
          box-shadow:0 30px 60px rgba(10,23,48,0.35);
          transition:transform .4s ease, box-shadow .4s ease;
        }
        .phone:hover{ transform:perspective(900px) rotateY(-6deg) rotateX(3deg) translateY(-4px); box-shadow:0 40px 70px rgba(10,23,48,0.45); }
        .phone-notch{ width:70px; height:6px; border-radius:100px; background:rgba(255,255,255,0.18); margin:0 auto 10px; }
        .phone-screen{ background:#fff; border-radius:26px; min-height:420px; padding:22px 18px; overflow:hidden; }
        .screen-title{ font-family:var(--display); font-weight:700; font-size:16px; margin-bottom:16px; }
        .mock-card{ display:flex; align-items:center; gap:12px; padding:10px; border-radius:12px; margin-bottom:10px; background: var(--fb-blue-light); }
        .mock-thumb{ width:40px; height:40px; border-radius:9px; flex-shrink:0; }
        .thumb-0{ background:linear-gradient(135deg,#1877F2,#8FBBFF); }
        .thumb-1{ background:linear-gradient(135deg,#0A54C4,#1877F2); }
        .thumb-2{ background:linear-gradient(135deg,#8FBBFF,#EAF2FF); }
        .mock-info{ display:flex; flex-direction:column; flex:1; min-width:0; }
        .mock-info strong{ font-size:13px; }
        .mock-info span{ font-size:11.5px; color: var(--muted); }
        .mock-price{ font-family:var(--mono); font-size:12px; font-weight:500; color: var(--fb-blue-deep); }
        .mock-row{ display:flex; align-items:center; gap:10px; padding:10px 4px; border-bottom:1px solid var(--line); }
        .mock-row svg{ stroke: var(--fb-blue); flex-shrink:0; }
        .mock-star{ stroke:#F2A93B !important; fill:#F2A93B; margin-left:auto; }
        .mock-points{ display:flex; flex-direction:column; align-items:center; padding:26px 0; background: var(--fb-blue-light); border-radius:16px; margin-bottom:14px; }
        .mock-points-num{ font-family:var(--display); font-size:32px; font-weight:700; color: var(--fb-blue-deep); }
        .mock-points-label{ font-size:12px; color: var(--muted); margin-top:4px; }
        .mock-streak{ display:flex; align-items:center; gap:8px; font-size:12.5px; color: var(--muted); margin-bottom:16px; }
        .mock-streak svg{ stroke: var(--fb-blue); flex-shrink:0; }
        .mock-redeem{ width:100%; padding:13px; border:none; border-radius:100px; background: var(--fb-blue); color:#fff; font-weight:700; font-size:13.5px; cursor:pointer; }
        .mock-stats-row{ display:flex; gap:10px; margin-bottom:16px; }
        .mock-stat{ flex:1; background: var(--fb-blue-light); border-radius:12px; padding:14px; display:flex; flex-direction:column; }
        .mock-stat-num{ font-family:var(--display); font-weight:700; font-size:20px; color: var(--fb-blue-deep); }
        .mock-stat span:last-child{ font-size:11px; color: var(--muted); margin-top:2px; }
        .mock-bars{ display:flex; align-items:flex-end; gap:6px; height:90px; margin-bottom:14px; }
        .mock-bar{ flex:1; background: linear-gradient(180deg, var(--fb-blue), #8FBBFF); border-radius:4px 4px 0 0; }
        .mock-trend{ display:flex; align-items:center; gap:8px; font-size:12.5px; color:#1a9c5b; }
        @media (max-width:900px){ .showcase-grid{ grid-template-columns:1fr; } .showcase-tabs{ flex-direction:row; flex-wrap:wrap; } .showcase-copy{ max-width:none; } }

        /* ---------- Coming soon ---------- */
        .soon{ padding:100px 0; background: var(--navy); color:#fff; text-align:center; position:relative; overflow:hidden; }
        .soon .eyebrow{ color:#8FBBFF; justify-content:center; }
        .soon h2{ margin-top:16px; font-size:clamp(1.7rem,3vw,2.3rem); color:#fff; }
        .soon p{ margin-top:16px; color:rgba(255,255,255,0.68); font-size:16px; max-width:560px; margin-left:auto; margin-right:auto; }
        .soon-threads{ position:absolute; inset:0; opacity:0.5; }

        /* ---------- Why ---------- */
        .why{ padding:110px 0; background:#fff; }
        .why-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-top:52px; }
        .why-card{ padding:30px 24px; border-radius:18px; border:1px solid var(--line); transition:transform .25s ease, box-shadow .25s ease; }
        .why-card:hover{ transform:translateY(-6px); box-shadow:0 16px 34px rgba(24,119,242,0.14); }
        .why-icon{ width:42px; height:42px; border-radius:11px; background: var(--fb-blue); display:flex; align-items:center; justify-content:center; margin-bottom:16px; }
        .why-icon svg{ stroke:#fff; }
        .why-card h3{ font-size:16.5px; font-family:var(--body); font-weight:700; }
        .why-card p{ margin-top:9px; font-size:14px; color: var(--muted); }
        @media (max-width:980px){ .why-grid{ grid-template-columns:repeat(2,1fr); } }
        @media (max-width:560px){ .why-grid{ grid-template-columns:1fr; } }

        /* ---------- CTA band ---------- */
        .cta-band{ background: linear-gradient(120deg, var(--fb-blue), var(--fb-blue-deep)); padding:70px 0; text-align:center; color:#fff; }
        .cta-band h2{ font-size:clamp(1.6rem,3vw,2.1rem); color:#fff; }
        .cta-band p{ margin-top:12px; color:rgba(255,255,255,0.8); font-size:15.5px; }
        .cta-form{ margin-top:30px; display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
        .cta-form input{
          padding:14px 18px; border-radius:100px; border:1px solid rgba(255,255,255,0.4);
          background:rgba(255,255,255,0.12); color:#fff; font-size:14.5px; min-width:280px;
        }
        .cta-form input::placeholder{ color:rgba(255,255,255,0.7); }
        .cta-form button{ background:#fff; color: var(--fb-blue-deep); }
        .cta-form button:hover{ transform:translateY(-2px); box-shadow:0 10px 24px rgba(0,0,0,0.18); }
        .joined-msg{ margin-top:22px; font-size:14.5px; color:#fff; font-weight:600; }

        /* ---------- Footer ---------- */
        footer{ background: var(--navy); color:rgba(255,255,255,0.65); padding:64px 0 28px; }
        .footer-top{ display:flex; justify-content:space-between; gap:40px; flex-wrap:wrap; padding-bottom:44px; border-bottom:1px solid rgba(255,255,255,0.1); }
        .footer-brand p{ max-width:280px; font-size:13.5px; margin-top:14px; }
        .footer-cols{ display:flex; gap:56px; flex-wrap:wrap; }
        .footer-col h4{ font-family:var(--mono); font-size:11.5px; letter-spacing:0.08em; text-transform:uppercase; color:#fff; margin-bottom:14px; }
        .footer-col ul{ list-style:none; display:flex; flex-direction:column; gap:9px; margin:0; padding:0; }
        .footer-col a{ font-size:13.5px; transition:color .2s ease; }
        .footer-col a:hover{ color: var(--fb-blue); }
        .footer-bottom{ display:flex; justify-content:space-between; align-items:center; padding-top:22px; flex-wrap:wrap; gap:14px; font-size:12.5px; }
        .social-row{ display:flex; gap:14px; }
        .social-row a{
          width:34px; height:34px; border:1px solid rgba(255,255,255,0.15); border-radius:50%;
          display:flex; align-items:center; justify-content:center; transition:all .2s ease;
        }
        .social-row a:hover{ border-color: var(--fb-blue); background: var(--fb-blue); }
        .social-row svg{ width:15px; height:15px; }
      `}</style>

      {/* ---------- Header ---------- */}
      <header>
        <nav className="nav">
          <a href="#top" className="logo">
            {/* <span className="logo-mark"><Network size={17} strokeWidth={2} /></span> */}
            <span className="logo-mark">
              <img src="/rovestacks_logo.png" alt="Rovestacks Logo" className="logo-image" />
            </span>
            <span className="logo-text">ROVESTΛCKS</span>
          </a>
          <ul className="nav-links">
            <li><a href="#vision">Vision</a></li>
            <li><a href="#rovenet">Rovenet</a></li>
            <li><a href="#showcase">Showcase</a></li>
            <li><a href="#why">Why Us</a></li>
            <li><a href="#waitlist" className="nav-cta">Join Waitlist</a></li>
          </ul>
          <button className="nav-toggle" onClick={() => setNavOpen(!navOpen)} aria-label="Toggle menu">
            {navOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
        <div className={`mobile-links ${navOpen ? "open" : ""}`}>
          <a href="#vision" onClick={() => setNavOpen(false)}>Vision</a>
          <a href="#rovenet" onClick={() => setNavOpen(false)}>Rovenet</a>
          <a href="#showcase" onClick={() => setNavOpen(false)}>Showcase</a>
          <a href="#why" onClick={() => setNavOpen(false)}>Why Us</a>
          <a href="#waitlist" className="nav-cta" style={{ width: "fit-content" }} onClick={() => setNavOpen(false)}>Join Waitlist</a>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="hero" id="top">
        <NebulaCanvas />
        <div className="wrap hero-inner">
          <span className="eyebrow" style={{ color: "#8FBBFF" }}>Rovestacks</span>
          <h1>Building Africa's <span>Connected</span> Digital Ecosystem</h1>
          <p className="lede">
            One identity, one network. Rovestacks starts with Rovenet — the app
            that brings how you shop, discover, and earn into a single connected home.
          </p>
          <div className="hero-ctas">
            <a href="https://google.com" className="btn btn-primary"><Download size={18} strokeWidth={2} /> Download Rovenet</a>
            <a href="#waitlist" className="btn btn-ghost">Join Waitlist <ArrowRight size={17} strokeWidth={2} /></a>
          </div>
        </div>
      </section>

      {/* ---------- Vision ---------- */}
      <section className="vision" id="vision">
        <div className="wrap vision-grid">
          <Reveal>
            <span className="eyebrow">What is Rovestacks?</span>
            <h2>A network of digital products, built to work as one.</h2>
            <p>
              Rovestacks exists to build interconnected digital products for
              Africa — tools that share one account, one trust layer, and one
              community, instead of each starting from zero.
            </p>
            <p>
              Rovenet is where that vision begins: a single app that already
              connects the everyday things people need to shop, discover, and earn.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="vision-orb-wrap">
              <svg viewBox="0 0 400 400" width="100%" height="100%">
                <defs>
                  <linearGradient id="visionGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#1877F2" />
                    <stop offset="1" stopColor="#0A54C4" />
                  </linearGradient>
                </defs>
                <g fill="none" stroke="url(#visionGrad)" strokeWidth="2" opacity="0.85">
                  <path d="M30,90 C 150,30 250,150 370,90" />
                  <path d="M30,180 C 150,120 250,240 370,180" opacity="0.6" />
                  <path d="M30,270 C 150,210 250,330 370,270" opacity="0.4" />
                </g>
                <circle cx="200" cy="130" r="7" fill="#1877F2" />
                <circle cx="260" cy="200" r="5" fill="#0A54C4" />
                <circle cx="150" cy="270" r="5" fill="#8FBBFF" />
              </svg>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Meet Rovenet ---------- */}
      <section className="rovenet" id="rovenet">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Meet Rovenet</span>
            <h2>The first door into the Rovestacks network.</h2>
            <p>Four everyday needs, one app — so you're not switching between separate downloads to get things done.</p>
          </Reveal>
          <div className="feature-grid">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={i * 80}>
                  <div className="feature-card">
                    <div className="feature-icon"><Icon size={21} strokeWidth={1.8} /></div>
                    <h3>{f.title}</h3>
                    <p>{f.copy}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Showcase ---------- */}
      <section className="showcase" id="showcase">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">See it in action</span>
            <h2>What Rovenet looks like day to day.</h2>
          </Reveal>
          <Reveal delay={100}>
            <RovenetShowcase />
          </Reveal>
        </div>
      </section>

      {/* ---------- Coming Soon ---------- */}
      <section className="soon">
        <div className="soon-threads"><NebulaCanvas /></div>
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <span className="eyebrow">Coming Soon</span>
            <h2>More is on the way.</h2>
            <p>
              Rovenet is the first thread in the Rovestacks network. We're
              already building what comes next, on the same foundation of trust
              and community.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Why ---------- */}
      <section className="why" id="why">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Why Choose Rovestacks?</span>
            <h2>Built to earn trust, one interaction at a time.</h2>
          </Reveal>
          <div className="why-grid">
            {whyItems.map((w, i) => {
              const Icon = w.icon;
              return (
                <Reveal key={w.tag} delay={i * 80}>
                  <div className="why-card">
                    <div className="why-icon"><Icon size={20} strokeWidth={1.8} /></div>
                    <h3>{w.tag}</h3>
                    <p>{w.copy}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- CTA / Waitlist ---------- */}
      <section className="cta-band" id="waitlist">
        <div className="wrap">
          <h2>Be first through the next door.</h2>
          <p>Join the waitlist and we'll let you know the moment there's more to try.</p>
          {!joined ? (
            <form className="cta-form" onSubmit={handleWaitlist}>
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Join Waitlist</button>
            </form>
          ) : (
            <p className="joined-msg">You're on the list — thanks for joining us early.</p>
          )}
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer id="download">
        <div className="wrap">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#top" className="logo">
                {/* <span className="logo-mark"><Network size={17} strokeWidth={2} /></span> */}
                <span className="logo-mark">
                  <img src="/rovestacks_logo.png" alt="Rovestacks Logo" className="logo-image" />
                </span>
                <span className="logo-text">Rovestacks</span>
              </a>
              <p>Building Africa's connected digital ecosystem, starting with Rovenet.</p>
            </div>
            <div className="footer-cols">
              <div className="footer-col">
                <h4>Company</h4>
                <ul>
                  <li><a href="#vision">About</a></li>
                  <li><a href="#rovenet">Rovenet</a></li>
                  <li><a href="#showcase">Showcase</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Support</h4>
                <ul>
                  <li><a href="#contact"><Mail size={13} strokeWidth={2} style={{ display: "inline", marginRight: 6, verticalAlign: "-2px" }} />Contact</a></li>
                  <li><a href="#privacy">Privacy Policy</a></li>
                  <li><a href="#terms">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Rovestacks. All rights reserved.</span>
            <div className="social-row">
              <a href="https://x.com/rovestacks" aria-label="Twitter / X"><X size={15} strokeWidth={1.8} /></a>
              <a href="https://instagram.com/rovestacks" aria-label="Instagram"><Mail size={15} strokeWidth={1.8} /></a>
              {/* <a href="https://linkedin.com/company/rovestacks" aria-label="LinkedIn"><Mail size={15} strokeWidth={1.8} /></a> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
