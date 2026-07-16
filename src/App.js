


// import React, { useEffect, useRef, useState } from "react";
// import {
//   Store, MapPin, Gift, Briefcase, ShieldCheck, Zap, Globe2, Users2,
//   Menu, X, Download, ArrowRight, Mail,
//   TrendingUp, Star, Clock,
// } from "lucide-react";

// /* ------------------------------------------------------------------ */
// /*  Reveal-on-scroll wrapper                                          */
// /* ------------------------------------------------------------------ */
// function Reveal({ children, className = "", delay = 0 }) {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const io = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setVisible(true);
//             io.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.15 }
//     );
//     io.observe(el);
//     return () => io.disconnect();
//   }, []);

//   return (
//     <div
//       ref={ref}
//       className={className}
//       style={{
//         opacity: visible ? 1 : 0,
//         transform: visible ? "translateY(0)" : "translateY(24px)",
//         transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
//       }}
//     >
//       {children}
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  Nebula network canvas — threads connecting floating spheres        */
// /* ------------------------------------------------------------------ */
// function NebulaCanvas() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     let raf;
//     let width, height, dpr;
//     let nodes = [];

//     const SMALL_COUNT = 46;
//     const ORB_COUNT = 6;
//     const LINK_DIST = 150;

//     function resize() {
//       const parent = canvas.parentElement;
//       width = parent.clientWidth;
//       height = parent.clientHeight;
//       dpr = Math.min(window.devicePixelRatio || 1, 2);
//       canvas.width = width * dpr;
//       canvas.height = height * dpr;
//       canvas.style.width = width + "px";
//       canvas.style.height = height + "px";
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//     }

//     function makeNodes() {
//       nodes = [];
//       for (let i = 0; i < SMALL_COUNT; i++) {
//         nodes.push({
//           x: Math.random() * width,
//           y: Math.random() * height,
//           vx: (Math.random() - 0.5) * 0.25,
//           vy: (Math.random() - 0.5) * 0.25,
//           r: 1.4 + Math.random() * 1.4,
//           orb: false,
//         });
//       }
//       for (let i = 0; i < ORB_COUNT; i++) {
//         nodes.push({
//           x: Math.random() * width,
//           y: Math.random() * height,
//           vx: (Math.random() - 0.5) * 0.12,
//           vy: (Math.random() - 0.5) * 0.12,
//           r: 20 + Math.random() * 26,
//           orb: true,
//         });
//       }
//     }

//     function step() {
//       ctx.clearRect(0, 0, width, height);

//       // move
//       nodes.forEach((n) => {
//         n.x += n.vx;
//         n.y += n.vy;
//         if (n.x < -40) n.x = width + 40;
//         if (n.x > width + 40) n.x = -40;
//         if (n.y < -40) n.y = height + 40;
//         if (n.y > height + 40) n.y = -40;
//       });

//       // links (small nodes only, plus links to nearby orbs)
//       for (let i = 0; i < nodes.length; i++) {
//         for (let j = i + 1; j < nodes.length; j++) {
//           const a = nodes[i], b = nodes[j];
//           const dx = a.x - b.x, dy = a.y - b.y;
//           const dist = Math.sqrt(dx * dx + dy * dy);
//           const maxDist = a.orb || b.orb ? LINK_DIST * 1.6 : LINK_DIST;
//           if (dist < maxDist) {
//             const alpha = (1 - dist / maxDist) * 0.35;
//             ctx.strokeStyle = `rgba(120,170,255,${alpha})`;
//             ctx.lineWidth = 1;
//             ctx.beginPath();
//             ctx.moveTo(a.x, a.y);
//             ctx.lineTo(b.x, b.y);
//             ctx.stroke();
//           }
//         }
//       }

//       // orbs (glow spheres)
//       nodes.filter((n) => n.orb).forEach((n) => {
//         const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
//         grad.addColorStop(0, "rgba(135,181,255,0.45)");
//         grad.addColorStop(1, "rgba(135,181,255,0)");
//         ctx.fillStyle = grad;
//         ctx.beginPath();
//         ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
//         ctx.fill();
//       });

//       // small particles
//       nodes.filter((n) => !n.orb).forEach((n) => {
//         ctx.fillStyle = "rgba(224,236,255,0.85)";
//         ctx.beginPath();
//         ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
//         ctx.fill();
//       });

//       raf = requestAnimationFrame(step);
//     }

//     resize();
//     makeNodes();
//     step();

//     const onResize = () => {
//       resize();
//       makeNodes();
//     };
//     window.addEventListener("resize", onResize);
//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener("resize", onResize);
//     };
//   }, []);

//   return <canvas ref={canvasRef} className="nebula-canvas" aria-hidden="true" />;
// }

// /* ------------------------------------------------------------------ */
// /*  Rovenet phone mockup — tabbed UI showcase                          */
// /* ------------------------------------------------------------------ */
// function RovenetShowcase() {
//   const tabs = [
//     { key: "market", label: "Marketplace", icon: Store },
//     { key: "discover", label: "Discover", icon: MapPin },
//     { key: "rewards", label: "Rewards", icon: Gift },
//     { key: "business", label: "Business", icon: Briefcase },
//   ];
//   const [active, setActive] = useState("market");

//   return (
//     <div className="showcase-grid">
//       <div className="showcase-tabs">
//         {tabs.map((t) => {
//           const Icon = t.icon;
//           return (
//             <button
//               key={t.key}
//               className={`showcase-tab ${active === t.key ? "active" : ""}`}
//               onClick={() => setActive(t.key)}
//             >
//               <Icon size={17} strokeWidth={1.8} />
//               <span>{t.label}</span>
//             </button>
//           );
//         })}
//         <p className="showcase-copy">
//           Every tab in Rovenet lives on the same account, the same wallet, the
//           same trust layer — switching tools shouldn't mean switching apps.
//         </p>
//       </div>

//       <div className="phone-wrap">
//         <div className="phone">
//           <div className="phone-notch" />
//           <div className="phone-screen">
//             {active === "market" && (
//               <div className="screen-content">
//                 <div className="screen-title">Marketplace</div>
//                 {[
//                   { name: "Fresh Produce Box", price: "\u20a64,500", tag: "Food" },
//                   { name: "Ankara Fabric Bundle", price: "\u20a612,000", tag: "Fashion" },
//                   { name: "Refurbished Router", price: "\u20a68,200", tag: "Tech" },
//                 ].map((item, i) => (
//                   <div className="mock-card" key={i}>
//                     <div className={`mock-thumb thumb-${i % 3}`} />
//                     <div className="mock-info">
//                       <strong>{item.name}</strong>
//                       <span>{item.tag}</span>
//                     </div>
//                     <div className="mock-price">{item.price}</div>
//                   </div>
//                 ))}
//               </div>
//             )}
//             {active === "discover" && (
//               <div className="screen-content">
//                 <div className="screen-title">Nearby for you</div>
//                 {[
//                   { name: "Chicken Republic", meta: "Restaurant · 0.4km" },
//                   { name: "Computer Village Market", meta: "Electronics · 1.1km" },
//                   { name: "Roban Stores", meta: "Groceries · 1.8km" },
//                 ].map((p, i) => (
//                   <div className="mock-row" key={i}>
//                     <MapPin size={16} strokeWidth={1.8} />
//                     <div className="mock-info">
//                       <strong>{p.name}</strong>
//                       <span>{p.meta}</span>
//                     </div>
//                     <Star size={14} strokeWidth={1.8} className="mock-star" />
//                   </div>
//                 ))}
//               </div>
//             )}
//             {active === "rewards" && (
//               <div className="screen-content">
//                 <div className="screen-title">Your Rewards</div>
//                 <div className="mock-points">
//                   <span className="mock-points-num">2,140</span>
//                   <span className="mock-points-label">points balance</span>
//                 </div>
//                 <div className="mock-streak">
//                   <Clock size={16} strokeWidth={1.8} />
//                   <span>7-day streak — 1 point/day bonus active</span>
//                 </div>
//                 <button className="mock-redeem">Redeem points</button>
//               </div>
//             )}
//             {active === "business" && (
//               <div className="screen-content">
//                 <div className="screen-title">Storefront overview</div>
//                 <div className="mock-stats-row">
//                   <div className="mock-stat">
//                     <span className="mock-stat-num">18</span>
//                     <span>Orders today</span>
//                   </div>
//                   <div className="mock-stat">
//                     <span className="mock-stat-num">\u20a692k</span>
//                     <span>Revenue</span>
//                   </div>
//                 </div>
//                 <div className="mock-bars">
//                   {[40, 65, 30, 80, 55, 70, 45].map((h, i) => (
//                     <div className="mock-bar" key={i} style={{ height: `${h}%` }} />
//                   ))}
//                 </div>
//                 <div className="mock-trend">
//                   <TrendingUp size={15} strokeWidth={1.8} />
//                   <span>Up 12% from last week</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="phone-glow" />
//       </div>
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  Main App                                                          */
// /* ------------------------------------------------------------------ */
// export default function App() {
//   const [navOpen, setNavOpen] = useState(false);
//   const [email, setEmail] = useState("");
//   const [joined, setJoined] = useState(false);

//   const handleWaitlist = (e) => {
//     e.preventDefault();
//     if (email.trim()) setJoined(true);
//   };

//   const features = [
//     {
//       icon: Store,
//       title: "Marketplace",
//       copy: "Buy and sell within your own community, with listings built for how people actually trade locally.",
//     },
//     {
//       icon: MapPin,
//       title: "Local Discovery",
//       copy: "Find the shops, services, and spots worth knowing about — recommended by people near you.",
//     },
//     {
//       icon: Gift,
//       title: "Rewards & Games",
//       copy: "Earn points for everyday activity and redeem them, or just play — the network rewards you either way.",
//     },
//     {
//       icon: Briefcase,
//       title: "Business Tools",
//       copy: "Storefronts, orders, and simple analytics so sellers can run things without extra software.",
//     },
//   ];

//   const whyItems = [
//     { icon: ShieldCheck, tag: "Secure", copy: "Your data and transactions are encrypted end to end, every time you open the app." },
//     { icon: Zap, tag: "Fast", copy: "Built to feel instant on the connections people actually have, not the ones we wish they had." },
//     { icon: Globe2, tag: "Built for Nigeria & Africa", copy: "Designed around how people here shop, move, and connect — not adapted from somewhere else." },
//     { icon: Users2, tag: "Community-driven", copy: "Every feature we ship starts with feedback from the people already using Rovenet." },
//   ];

//   return (
//     <div className="rs-root">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

//         .rs-root{
//           --fb-blue:#1877F2;
//           --fb-blue-dark:#0A54C4;
//           --fb-blue-deep:#083E94;
//           --fb-blue-light:#EAF2FF;
//           --navy:#0A1730;
//           --navy-2:#0E1F45;
//           --white:#FFFFFF;
//           --ink:#0F1626;
//           --muted:#5B6B85;
//           --line: rgba(15,22,38,0.08);
//           --display:'Space Grotesk', sans-serif;
//           --body:'Inter', sans-serif;
//           --mono:'IBM Plex Mono', monospace;
//           font-family: var(--body);
//           color: var(--ink);
//           background: var(--white);
//           overflow-x: hidden;
//           -webkit-font-smoothing:antialiased;
//         }
//         .rs-root *{ box-sizing:border-box; }
//         .rs-root img, .rs-root svg{ display:block; }
//         .rs-root a{ color:inherit; text-decoration:none; }
//         .wrap{ max-width:1180px; margin:0 auto; padding:0 32px; }
//         .eyebrow{
//           font-family: var(--mono); font-size:12px; letter-spacing:0.14em; text-transform:uppercase;
//           display:inline-flex; align-items:center; gap:8px; color: var(--fb-blue);
//         }
//         .eyebrow::before{ content:''; width:16px; height:1.5px; background:currentColor; display:inline-block; }
//         h1,h2,h3{ font-family: var(--display); letter-spacing:-0.01em; margin:0; }

//         /* ---------- Logo lockup ---------- */
//         .logo{
//           display:flex; align-items:center; gap:9px; font-family:var(--display);
//           font-weight:700; font-size:21px; white-space:nowrap;
//         }
//         .logo-mark {
//           width: 38px;
//           height: 38px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .logo-image {
//           width: 100%;
//           height: 100%;
//           object-fit: contain;
//         }
//         // .logo-mark{
//         //   width:32px; height:32px; border-radius:9px;
//         //   // background: linear-gradient(135deg, var(--fb-blue), var(--fb-blue-deep));
//         //   display:flex; align-items:center; justify-content:center;
//         //   box-shadow: 0 4px 14px rgba(24,119,242,0.35);
//         // }
//         .logo-mark svg{ stroke:#fff; }
//         .logo-text{
//           background: linear-gradient(90deg, var(--fb-blue-dark), var(--fb-blue));
//           -webkit-background-clip:text; background-clip:text; color:transparent;
//         }

//         /* ---------- Header ---------- */
//         header{
//           position:fixed; top:0; left:0; right:0; z-index:50;
//           background:rgba(255,255,255,0.82); backdrop-filter:blur(10px);
//           border-bottom:1px solid var(--line);
//         }
//         .nav{ display:flex; align-items:center; justify-content:space-between; padding:14px 32px; max-width:1180px; margin:0 auto; }
//         .nav-links{ display:flex; align-items:center; gap:30px; list-style:none; margin:0; padding:0; }
//         .nav-links a{ font-size:14.5px; font-weight:500; color: var(--muted); transition:color .2s ease; }
//         .nav-links a:hover{ color: var(--ink); }
//         .nav-cta{
//           background: var(--fb-blue); color:#fff !important; padding:10px 20px; border-radius:100px;
//           font-weight:600; font-size:14px; transition:transform .2s ease, box-shadow .2s ease;
//         }
//         .nav-cta:hover{ transform:translateY(-1px); box-shadow:0 8px 20px rgba(24,119,242,0.35); }
//         .nav-toggle{ display:none; background:none; border:none; cursor:pointer; color:var(--ink); }
//         .mobile-links{ display:none; }
//         @media (max-width:880px){
//           .nav-links{ display:none; }
//           .nav-toggle{ display:block; }
//           .mobile-links.open{
//             display:flex; flex-direction:column; gap:16px; padding:20px 32px 26px;
//             background:#fff; border-bottom:1px solid var(--line);
//           }
//         }

//         /* ---------- Hero ---------- */
//         .hero{
//           position:relative; padding:172px 0 120px; overflow:hidden;
//           background: radial-gradient(1200px 600px at 20% -10%, var(--navy-2), var(--navy) 60%);
//           color:#fff;
//         }
//         .nebula-canvas{ position:absolute; inset:0; width:100%; height:100%; }
//         .hero-inner{ position:relative; z-index:2; max-width:700px; }
//         .hero h1{ font-size:clamp(2.5rem, 5.4vw, 4.2rem); line-height:1.08; color:#fff; margin-top:20px; }
//         .hero h1 span{
//           background: linear-gradient(90deg,#8FBBFF,#FFFFFF); -webkit-background-clip:text; background-clip:text; color:transparent;
//         }
//         .hero p.lede{ margin-top:22px; font-size:18px; color:rgba(255,255,255,0.72); max-width:520px; }
//         .hero-ctas{ display:flex; gap:16px; margin-top:38px; flex-wrap:wrap; }
//         .btn{
//           display:inline-flex; align-items:center; gap:9px; padding:15px 26px; border-radius:100px;
//           font-weight:600; font-size:15px; cursor:pointer; border:1px solid transparent; transition:transform .2s ease, box-shadow .2s ease, background .2s ease;
//         }
//         .btn-primary{ background:#fff; color: var(--fb-blue-deep); }
//         .btn-primary:hover{ transform:translateY(-2px); box-shadow:0 10px 26px rgba(255,255,255,0.18); }
//         .btn-blue{ background: var(--fb-blue); color:#fff; }
//         .btn-blue:hover{ transform:translateY(-2px); box-shadow:0 10px 26px rgba(24,119,242,0.35); }
//         .btn-ghost{ border-color:rgba(255,255,255,0.32); color:#fff; }
//         .btn-ghost:hover{ border-color:#fff; transform:translateY(-2px); }
//         .btn-ghost-dark{ border-color: rgba(15,22,38,0.18); color: var(--ink); }
//         .btn-ghost-dark:hover{ border-color: var(--ink); transform:translateY(-2px); }

//         /* ---------- Vision ---------- */
//         .vision{ padding:110px 0; background:#fff; }
//         .vision-grid{ display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
//         .vision h2{ font-size:clamp(1.8rem,3vw,2.5rem); margin-top:16px; line-height:1.16; }
//         .vision p{ margin-top:18px; color: var(--muted); font-size:16px; max-width:480px; }
//         .vision-orb-wrap{ position:relative; aspect-ratio:1/1; border-radius:24px; background: var(--fb-blue-light); overflow:hidden; }
//         @media (max-width:900px){ .vision-grid{ grid-template-columns:1fr; } .vision-orb-wrap{ max-width:420px; margin:0 auto; order:-1; } }

//         /* ---------- Rovenet features ---------- */
//         .rovenet{ padding:110px 0; background: var(--fb-blue-light); }
//         .section-head{ max-width:620px; }
//         .section-head h2{ font-size:clamp(1.8rem,3vw,2.5rem); margin-top:14px; }
//         .section-head p{ margin-top:16px; color: var(--muted); font-size:16px; }
//         .feature-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-top:52px; }
//         .feature-card{
//           background:#fff; border:1px solid var(--line); border-radius:18px; padding:28px 24px;
//           transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease;
//         }
//         .feature-card:hover{ transform:translateY(-6px); box-shadow:0 16px 34px rgba(24,119,242,0.16); border-color:rgba(24,119,242,0.3); }
//         .feature-icon{
//           width:44px; height:44px; border-radius:12px; background: var(--fb-blue-light);
//           display:flex; align-items:center; justify-content:center; margin-bottom:18px;
//           transition:background .25s ease;
//         }
//         .feature-card:hover .feature-icon{ background: var(--fb-blue); }
//         .feature-icon svg{ stroke: var(--fb-blue); transition:stroke .25s ease; }
//         .feature-card:hover .feature-icon svg{ stroke:#fff; }
//         .feature-card h3{ font-size:17px; font-weight:700; font-family:var(--body); }
//         .feature-card p{ margin-top:10px; font-size:14.5px; color: var(--muted); }
//         @media (max-width:980px){ .feature-grid{ grid-template-columns:repeat(2,1fr); } }
//         @media (max-width:560px){ .feature-grid{ grid-template-columns:1fr; } }

//         /* ---------- Showcase ---------- */
//         .showcase{ padding:110px 0; background:#fff; }
//         .showcase-grid{ display:grid; grid-template-columns:0.85fr 1.15fr; gap:56px; align-items:center; margin-top:52px; }
//         .showcase-tabs{ display:flex; flex-direction:column; gap:12px; }
//         .showcase-tab{
//           display:flex; align-items:center; gap:12px; padding:15px 18px; border-radius:14px;
//           border:1px solid var(--line); background:#fff; font-family:var(--body); font-weight:600; font-size:14.5px;
//           color: var(--muted); cursor:pointer; text-align:left; transition:all .2s ease;
//         }
//         .showcase-tab svg{ stroke: var(--muted); transition:stroke .2s ease; }
//         .showcase-tab.active{ background: var(--fb-blue); color:#fff; border-color: var(--fb-blue); box-shadow:0 10px 24px rgba(24,119,242,0.28); }
//         .showcase-tab.active svg{ stroke:#fff; }
//         .showcase-copy{ margin-top:12px; color: var(--muted); font-size:14.5px; max-width:340px; }

//         .phone-wrap{ position:relative; display:flex; justify-content:center; }
//         .phone-glow{
//           position:absolute; width:280px; height:280px; border-radius:50%;
//           background: radial-gradient(circle, rgba(24,119,242,0.25), transparent 70%);
//           filter:blur(10px); z-index:0;
//         }
//         .phone{
//           position:relative; z-index:1; width:270px; border-radius:38px; padding:14px;
//           background: linear-gradient(160deg,#12172b,#080b16);
//           box-shadow:0 30px 60px rgba(10,23,48,0.35);
//           transition:transform .4s ease, box-shadow .4s ease;
//         }
//         .phone:hover{ transform:perspective(900px) rotateY(-6deg) rotateX(3deg) translateY(-4px); box-shadow:0 40px 70px rgba(10,23,48,0.45); }
//         .phone-notch{ width:70px; height:6px; border-radius:100px; background:rgba(255,255,255,0.18); margin:0 auto 10px; }
//         .phone-screen{ background:#fff; border-radius:26px; min-height:420px; padding:22px 18px; overflow:hidden; }
//         .screen-title{ font-family:var(--display); font-weight:700; font-size:16px; margin-bottom:16px; }
//         .mock-card{ display:flex; align-items:center; gap:12px; padding:10px; border-radius:12px; margin-bottom:10px; background: var(--fb-blue-light); }
//         .mock-thumb{ width:40px; height:40px; border-radius:9px; flex-shrink:0; }
//         .thumb-0{ background:linear-gradient(135deg,#1877F2,#8FBBFF); }
//         .thumb-1{ background:linear-gradient(135deg,#0A54C4,#1877F2); }
//         .thumb-2{ background:linear-gradient(135deg,#8FBBFF,#EAF2FF); }
//         .mock-info{ display:flex; flex-direction:column; flex:1; min-width:0; }
//         .mock-info strong{ font-size:13px; }
//         .mock-info span{ font-size:11.5px; color: var(--muted); }
//         .mock-price{ font-family:var(--mono); font-size:12px; font-weight:500; color: var(--fb-blue-deep); }
//         .mock-row{ display:flex; align-items:center; gap:10px; padding:10px 4px; border-bottom:1px solid var(--line); }
//         .mock-row svg{ stroke: var(--fb-blue); flex-shrink:0; }
//         .mock-star{ stroke:#F2A93B !important; fill:#F2A93B; margin-left:auto; }
//         .mock-points{ display:flex; flex-direction:column; align-items:center; padding:26px 0; background: var(--fb-blue-light); border-radius:16px; margin-bottom:14px; }
//         .mock-points-num{ font-family:var(--display); font-size:32px; font-weight:700; color: var(--fb-blue-deep); }
//         .mock-points-label{ font-size:12px; color: var(--muted); margin-top:4px; }
//         .mock-streak{ display:flex; align-items:center; gap:8px; font-size:12.5px; color: var(--muted); margin-bottom:16px; }
//         .mock-streak svg{ stroke: var(--fb-blue); flex-shrink:0; }
//         .mock-redeem{ width:100%; padding:13px; border:none; border-radius:100px; background: var(--fb-blue); color:#fff; font-weight:700; font-size:13.5px; cursor:pointer; }
//         .mock-stats-row{ display:flex; gap:10px; margin-bottom:16px; }
//         .mock-stat{ flex:1; background: var(--fb-blue-light); border-radius:12px; padding:14px; display:flex; flex-direction:column; }
//         .mock-stat-num{ font-family:var(--display); font-weight:700; font-size:20px; color: var(--fb-blue-deep); }
//         .mock-stat span:last-child{ font-size:11px; color: var(--muted); margin-top:2px; }
//         .mock-bars{ display:flex; align-items:flex-end; gap:6px; height:90px; margin-bottom:14px; }
//         .mock-bar{ flex:1; background: linear-gradient(180deg, var(--fb-blue), #8FBBFF); border-radius:4px 4px 0 0; }
//         .mock-trend{ display:flex; align-items:center; gap:8px; font-size:12.5px; color:#1a9c5b; }
//         @media (max-width:900px){ .showcase-grid{ grid-template-columns:1fr; } .showcase-tabs{ flex-direction:row; flex-wrap:wrap; } .showcase-copy{ max-width:none; } }

//         /* ---------- Coming soon ---------- */
//         .soon{ padding:100px 0; background: var(--navy); color:#fff; text-align:center; position:relative; overflow:hidden; }
//         .soon .eyebrow{ color:#8FBBFF; justify-content:center; }
//         .soon h2{ margin-top:16px; font-size:clamp(1.7rem,3vw,2.3rem); color:#fff; }
//         .soon p{ margin-top:16px; color:rgba(255,255,255,0.68); font-size:16px; max-width:560px; margin-left:auto; margin-right:auto; }
//         .soon-threads{ position:absolute; inset:0; opacity:0.5; }

//         /* ---------- Why ---------- */
//         .why{ padding:110px 0; background:#fff; }
//         .why-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-top:52px; }
//         .why-card{ padding:30px 24px; border-radius:18px; border:1px solid var(--line); transition:transform .25s ease, box-shadow .25s ease; }
//         .why-card:hover{ transform:translateY(-6px); box-shadow:0 16px 34px rgba(24,119,242,0.14); }
//         .why-icon{ width:42px; height:42px; border-radius:11px; background: var(--fb-blue); display:flex; align-items:center; justify-content:center; margin-bottom:16px; }
//         .why-icon svg{ stroke:#fff; }
//         .why-card h3{ font-size:16.5px; font-family:var(--body); font-weight:700; }
//         .why-card p{ margin-top:9px; font-size:14px; color: var(--muted); }
//         @media (max-width:980px){ .why-grid{ grid-template-columns:repeat(2,1fr); } }
//         @media (max-width:560px){ .why-grid{ grid-template-columns:1fr; } }

//         /* ---------- CTA band ---------- */
//         .cta-band{ background: linear-gradient(120deg, var(--fb-blue), var(--fb-blue-deep)); padding:70px 0; text-align:center; color:#fff; }
//         .cta-band h2{ font-size:clamp(1.6rem,3vw,2.1rem); color:#fff; }
//         .cta-band p{ margin-top:12px; color:rgba(255,255,255,0.8); font-size:15.5px; }
//         .cta-form{ margin-top:30px; display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
//         .cta-form input{
//           padding:14px 18px; border-radius:100px; border:1px solid rgba(255,255,255,0.4);
//           background:rgba(255,255,255,0.12); color:#fff; font-size:14.5px; min-width:280px;
//         }
//         .cta-form input::placeholder{ color:rgba(255,255,255,0.7); }
//         .cta-form button{ background:#fff; color: var(--fb-blue-deep); }
//         .cta-form button:hover{ transform:translateY(-2px); box-shadow:0 10px 24px rgba(0,0,0,0.18); }
//         .joined-msg{ margin-top:22px; font-size:14.5px; color:#fff; font-weight:600; }

//         /* ---------- Footer ---------- */
//         footer{ background: var(--navy); color:rgba(255,255,255,0.65); padding:64px 0 28px; }
//         .footer-top{ display:flex; justify-content:space-between; gap:40px; flex-wrap:wrap; padding-bottom:44px; border-bottom:1px solid rgba(255,255,255,0.1); }
//         .footer-brand p{ max-width:280px; font-size:13.5px; margin-top:14px; }
//         .footer-cols{ display:flex; gap:56px; flex-wrap:wrap; }
//         .footer-col h4{ font-family:var(--mono); font-size:11.5px; letter-spacing:0.08em; text-transform:uppercase; color:#fff; margin-bottom:14px; }
//         .footer-col ul{ list-style:none; display:flex; flex-direction:column; gap:9px; margin:0; padding:0; }
//         .footer-col a{ font-size:13.5px; transition:color .2s ease; }
//         .footer-col a:hover{ color: var(--fb-blue); }
//         .footer-bottom{ display:flex; justify-content:space-between; align-items:center; padding-top:22px; flex-wrap:wrap; gap:14px; font-size:12.5px; }
//         .social-row{ display:flex; gap:14px; }
//         .social-row a{
//           width:34px; height:34px; border:1px solid rgba(255,255,255,0.15); border-radius:50%;
//           display:flex; align-items:center; justify-content:center; transition:all .2s ease;
//         }
//         .social-row a:hover{ border-color: var(--fb-blue); background: var(--fb-blue); }
//         .social-row svg{ width:15px; height:15px; }
//       `}</style>

//       {/* ---------- Header ---------- */}
//       <header>
//         <nav className="nav">
//           <a href="#top" className="logo">
//             {/* <span className="logo-mark"><Network size={17} strokeWidth={2} /></span> */}
//             <span className="logo-mark">
//               <img src="/rovestacks_logo.png" alt="Rovestacks Logo" className="logo-image" />
//             </span>
//             <span className="logo-text">ROVESTΛCKS</span>
//           </a>
//           <ul className="nav-links">
//             <li><a href="#vision">Vision</a></li>
//             <li><a href="#rovenet">Rovenet</a></li>
//             <li><a href="#showcase">Showcase</a></li>
//             <li><a href="#why">Why Us</a></li>
//             <li><a href="#waitlist" className="nav-cta">Join Waitlist</a></li>
//           </ul>
//           <button className="nav-toggle" onClick={() => setNavOpen(!navOpen)} aria-label="Toggle menu">
//             {navOpen ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </nav>
//         <div className={`mobile-links ${navOpen ? "open" : ""}`}>
//           <a href="#vision" onClick={() => setNavOpen(false)}>Vision</a>
//           <a href="#rovenet" onClick={() => setNavOpen(false)}>Rovenet</a>
//           <a href="#showcase" onClick={() => setNavOpen(false)}>Showcase</a>
//           <a href="#why" onClick={() => setNavOpen(false)}>Why Us</a>
//           <a href="#waitlist" className="nav-cta" style={{ width: "fit-content" }} onClick={() => setNavOpen(false)}>Join Waitlist</a>
//         </div>
//       </header>

//       {/* ---------- Hero ---------- */}
//       <section className="hero" id="top">
//         <NebulaCanvas />
//         <div className="wrap hero-inner">
//           <span className="eyebrow" style={{ color: "#8FBBFF" }}>Rovestacks</span>
//           <h1>Building Africa's <span>Connected</span> Digital Ecosystem</h1>
//           <p className="lede">
//             One identity, one network. Rovestacks starts with Rovenet — the app
//             that brings how you shop, discover, and earn into a single connected home.
//           </p>
//           <div className="hero-ctas">
//             <a href="https://google.com" className="btn btn-primary"><Download size={18} strokeWidth={2} /> Download Rovenet</a>
//             <a href="#waitlist" className="btn btn-ghost">Join Waitlist <ArrowRight size={17} strokeWidth={2} /></a>
//           </div>
//         </div>
//       </section>

//       {/* ---------- Vision ---------- */}
//       <section className="vision" id="vision">
//         <div className="wrap vision-grid">
//           <Reveal>
//             <span className="eyebrow">What is Rovestacks?</span>
//             <h2>A network of digital products, built to work as one.</h2>
//             <p>
//               Rovestacks exists to build interconnected digital products for
//               Africa — tools that share one account, one trust layer, and one
//               community, instead of each starting from zero.
//             </p>
//             <p>
//               Rovenet is where that vision begins: a single app that already
//               connects the everyday things people need to shop, discover, and earn.
//             </p>
//           </Reveal>
//           <Reveal delay={120}>
//             <div className="vision-orb-wrap">
//               <svg viewBox="0 0 400 400" width="100%" height="100%">
//                 <defs>
//                   <linearGradient id="visionGrad" x1="0" y1="0" x2="1" y2="1">
//                     <stop offset="0" stopColor="#1877F2" />
//                     <stop offset="1" stopColor="#0A54C4" />
//                   </linearGradient>
//                 </defs>
//                 <g fill="none" stroke="url(#visionGrad)" strokeWidth="2" opacity="0.85">
//                   <path d="M30,90 C 150,30 250,150 370,90" />
//                   <path d="M30,180 C 150,120 250,240 370,180" opacity="0.6" />
//                   <path d="M30,270 C 150,210 250,330 370,270" opacity="0.4" />
//                 </g>
//                 <circle cx="200" cy="130" r="7" fill="#1877F2" />
//                 <circle cx="260" cy="200" r="5" fill="#0A54C4" />
//                 <circle cx="150" cy="270" r="5" fill="#8FBBFF" />
//               </svg>
//             </div>
//           </Reveal>
//         </div>
//       </section>

//       {/* ---------- Meet Rovenet ---------- */}
//       <section className="rovenet" id="rovenet">
//         <div className="wrap">
//           <Reveal className="section-head">
//             <span className="eyebrow">Meet Rovenet</span>
//             <h2>The first door into the Rovestacks network.</h2>
//             <p>Four everyday needs, one app — so you're not switching between separate downloads to get things done.</p>
//           </Reveal>
//           <div className="feature-grid">
//             {features.map((f, i) => {
//               const Icon = f.icon;
//               return (
//                 <Reveal key={f.title} delay={i * 80}>
//                   <div className="feature-card">
//                     <div className="feature-icon"><Icon size={21} strokeWidth={1.8} /></div>
//                     <h3>{f.title}</h3>
//                     <p>{f.copy}</p>
//                   </div>
//                 </Reveal>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ---------- Showcase ---------- */}
//       <section className="showcase" id="showcase">
//         <div className="wrap">
//           <Reveal className="section-head">
//             <span className="eyebrow">See it in action</span>
//             <h2>What Rovenet looks like day to day.</h2>
//           </Reveal>
//           <Reveal delay={100}>
//             <RovenetShowcase />
//           </Reveal>
//         </div>
//       </section>

//       {/* ---------- Coming Soon ---------- */}
//       <section className="soon">
//         <div className="soon-threads"><NebulaCanvas /></div>
//         <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
//           <Reveal>
//             <span className="eyebrow">Coming Soon</span>
//             <h2>More is on the way.</h2>
//             <p>
//               Rovenet is the first thread in the Rovestacks network. We're
//               already building what comes next, on the same foundation of trust
//               and community.
//             </p>
//           </Reveal>
//         </div>
//       </section>

//       {/* ---------- Why ---------- */}
//       <section className="why" id="why">
//         <div className="wrap">
//           <Reveal className="section-head">
//             <span className="eyebrow">Why Choose Rovestacks?</span>
//             <h2>Built to earn trust, one interaction at a time.</h2>
//           </Reveal>
//           <div className="why-grid">
//             {whyItems.map((w, i) => {
//               const Icon = w.icon;
//               return (
//                 <Reveal key={w.tag} delay={i * 80}>
//                   <div className="why-card">
//                     <div className="why-icon"><Icon size={20} strokeWidth={1.8} /></div>
//                     <h3>{w.tag}</h3>
//                     <p>{w.copy}</p>
//                   </div>
//                 </Reveal>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ---------- CTA / Waitlist ---------- */}
//       <section className="cta-band" id="waitlist">
//         <div className="wrap">
//           <h2>Be first through the next door.</h2>
//           <p>Join the waitlist and we'll let you know the moment there's more to try.</p>
//           {!joined ? (
//             <form className="cta-form" onSubmit={handleWaitlist}>
//               <input
//                 type="email"
//                 required
//                 placeholder="you@email.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <button type="submit" className="btn btn-primary">Join Waitlist</button>
//             </form>
//           ) : (
//             <p className="joined-msg">You're on the list — thanks for joining us early.</p>
//           )}
//         </div>
//       </section>

//       {/* ---------- Footer ---------- */}
//       <footer id="download">
//         <div className="wrap">
//           <div className="footer-top">
//             <div className="footer-brand">
//               <a href="#top" className="logo">
//                 {/* <span className="logo-mark"><Network size={17} strokeWidth={2} /></span> */}
//                 <span className="logo-mark">
//                   <img src="/rovestacks_logo.png" alt="Rovestacks Logo" className="logo-image" />
//                 </span>
//                 <span className="logo-text">Rovestacks</span>
//               </a>
//               <p>Building Africa's connected digital ecosystem, starting with Rovenet.</p>
//             </div>
//             <div className="footer-cols">
//               <div className="footer-col">
//                 <h4>Company</h4>
//                 <ul>
//                   <li><a href="#vision">About</a></li>
//                   <li><a href="#rovenet">Rovenet</a></li>
//                   <li><a href="#showcase">Showcase</a></li>
//                 </ul>
//               </div>
//               <div className="footer-col">
//                 <h4>Support</h4>
//                 <ul>
//                   <li><a href="#contact"><Mail size={13} strokeWidth={2} style={{ display: "inline", marginRight: 6, verticalAlign: "-2px" }} />Contact</a></li>
//                   <li><a href="#privacy">Privacy Policy</a></li>
//                   <li><a href="#terms">Terms</a></li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//           <div className="footer-bottom">
//             <span>© 2026 Rovestacks. All rights reserved.</span>
//             <div className="social-row">
//               <a href="https://x.com/rovestacks" aria-label="Twitter / X"><X size={15} strokeWidth={1.8} /></a>
//               <a href="https://instagram.com/rovestacks" aria-label="Instagram"><Mail size={15} strokeWidth={1.8} /></a>
//               {/* <a href="https://linkedin.com/company/rovestacks" aria-label="LinkedIn"><Mail size={15} strokeWidth={1.8} /></a> */}
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }


import React, { useEffect, useRef, useState } from "react";
import {
  Store, MapPin, Zap, Globe2, Users2,
  Menu, X, Download, ArrowRight, Mail,
  ChevronRight, Lock, Gamepad2, Wallet, Share2,
  FileText, ArrowLeft
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Assets                                                            */
/* ------------------------------------------------------------------ */
const ASSET = {
  rovestacksLogo: "/rovestacks_logo.png",
  rovenetCircle: "/rovenet_circle.png",
  shotHome: "/screenshot5.png",
  shotHomeGames: "/screenshot4.png",
  shotPasscode: "/screenshot6.png",
  shotSocial: "/screenshot3.png",
  shotMarket: "/screenshot2.png",
  shotListing: "/screenshot1.png",
};

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
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { setVisible(true); io.unobserve(e.target); }
      }),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
      }}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Nebula network canvas — threads connecting floating spheres        */
/* ------------------------------------------------------------------ */
function NebulaCanvas({ tint = "violet" }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf, width, height, dpr, nodes = [];
    const SMALL_COUNT = 42, ORB_COUNT = 5, LINK_DIST = 150;
    const line = tint === "blue" ? "120,170,255" : "170,140,255";
    const orb = tint === "blue" ? "135,181,255" : "180,130,255";
    const dot = tint === "blue" ? "224,236,255" : "232,222,255";

    function resize() {
      const parent = canvas.parentElement;
      width = parent.clientWidth; height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr; canvas.height = height * dpr;
      canvas.style.width = width + "px"; canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function makeNodes() {
      nodes = [];
      for (let i = 0; i < SMALL_COUNT; i++) {
        nodes.push({ x: Math.random() * width, y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
          r: 1.4 + Math.random() * 1.4, orb: false });
      }
      for (let i = 0; i < ORB_COUNT; i++) {
        nodes.push({ x: Math.random() * width, y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12,
          r: 20 + Math.random() * 26, orb: true });
      }
    }
    function step() {
      ctx.clearRect(0, 0, width, height);
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < -40) n.x = width + 40; if (n.x > width + 40) n.x = -40;
        if (n.y < -40) n.y = height + 40; if (n.y > height + 40) n.y = -40;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = a.orb || b.orb ? LINK_DIST * 1.6 : LINK_DIST;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            ctx.strokeStyle = `rgba(${line},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      nodes.filter((n) => n.orb).forEach((n) => {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        grad.addColorStop(0, `rgba(${orb},0.45)`); grad.addColorStop(1, `rgba(${orb},0)`);
        ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      });
      nodes.filter((n) => !n.orb).forEach((n) => {
        ctx.fillStyle = `rgba(${dot},0.85)`;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      });
      raf = requestAnimationFrame(step);
    }
    resize(); makeNodes(); step();
    const onResize = () => { resize(); makeNodes(); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [tint]);
  return <canvas ref={canvasRef} className="nebula-canvas" aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/*  Hexagon scatter — echoes the in-app background pattern             */
/* ------------------------------------------------------------------ */
function HexScatter({ opacity = 0.5 }) {
  const hexes = [
    { x: 40, y: 60, s: 26 }, { x: 90, y: 40, s: 16 }, { x: 340, y: 90, s: 22 },
    { x: 380, y: 200, s: 14 }, { x: 60, y: 260, s: 18 }, { x: 300, y: 30, s: 12 },
    { x: 200, y: 250, s: 20 }, { x: 250, y: 150, s: 10 },
  ];
  function hexPoints(cx, cy, r) {
    return Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(" ");
  }
  return (
    <svg className="hex-scatter" viewBox="0 0 420 300" preserveAspectRatio="xMidYMid slice" style={{ opacity }} aria-hidden="true">
      {hexes.map((h, i) => (
        <polygon key={i} points={hexPoints(h.x, h.y, h.s)} fill="none" stroke="currentColor" strokeWidth="1.2" />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Phone frame wrapping a real screenshot                             */
/* ------------------------------------------------------------------ */
function PhoneShot({ src, alt, className = "" }) {
  return (
    <div className={`phone-wrap ${className}`}>
      <div className="phone-glow" />
      <div className="phone">
        <div className="phone-notch" />
        <div className="phone-screen">
          <img src={src} alt={alt} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main App                                                           */
/* ------------------------------------------------------------------ */
export default function App() {
  const [page, setPage] = useState("home");
  const [navOpen, setNavOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const goto = (p) => { setPage(p); setNavOpen(false); };

  const handleWaitlist = (e) => {
    e.preventDefault();
    if (email.trim()) setJoined(true);
  };

  const rovenetFeatures = [
    { icon: Store, title: "Marketplace", copy: "Post and browse Vehicles, Property, Electronics, Fashion, Services, Jobs and more — free to list, no commission on sales." },
    { icon: Share2, title: "Social Tasks", copy: "Connect Facebook, Instagram, YouTube, Twitter or WhatsApp and get paid to like, follow, comment, or share for advertisers." },
    { icon: Gamepad2, title: "Games & Rewards", copy: "Play built-in games like Treasure Maze and Trivia for a chance to earn while you're on the app." },
    { icon: Wallet, title: "Withdraw Your Earnings", copy: "Cash out to your bank account (minimum \u20a620,000) or redeem instantly as airtime and data via VTU." },
  ];

  const whyItems = [
    { icon: Lock, tag: "Secure", copy: "Passcode-protected access and encrypted transactions keep your account and wallet safe.", shot: ASSET.shotPasscode },
    { icon: Zap, tag: "Fast", copy: "A lightweight app built to feel instant even on average Nigerian mobile networks." },
    { icon: Globe2, tag: "Built for Nigeria & Africa", copy: "Categories, pricing in Naira, and local pickup workflows designed around how people actually trade here." },
    { icon: Users2, tag: "Community-driven", copy: "Every feature ships based on feedback from the people already buying, selling, and earning on Rovenet." },
  ];

  const categories = [
    "Vehicles", "Property", "Phones & Tablets", "Electronics", "Home & Furniture",
    "Beauty & Personal", "Services", "Repair & Construction", "Commercial Equipment",
    "Leisure & Activities", "Babies & Kids", "Food & Agriculture", "Animals & Pets",
    "Jobs", "Seeking Work \u2014 CVs", "Fashion",
  ];

  const showcaseTabs = [
    { key: "home", label: "Home", icon: Store, shot: ASSET.shotHome, copy: "Your feed of local promos, ongoing social tasks, and games — all from one home screen." },
    { key: "market", label: "Marketplace", icon: MapPin, shot: ASSET.shotMarket, copy: "Sixteen categories covering products, services, and jobs — browse or post in seconds." },
    { key: "social", label: "Earn", icon: Share2, shot: ASSET.shotSocial, copy: "Verify a social account with 1,000+ followers and start getting paid for genuine engagement." },
    { key: "games", label: "Games", icon: Gamepad2, shot: ASSET.shotHomeGames, copy: "Chase rewards through Treasure Maze and Trivia — a fun bonus way to earn." },
  ];
  const activeShowcase = showcaseTabs.find((t) => t.key === activeTab) || showcaseTabs[0];

  return (
    <div className="rs-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .rs-root{
          --violet:#8B5CF6; --violet-deep:#5B21B6; --violet-light:#C4B0FF;
          --pink:#EC4899; --blue:#3B82F6; --blue-deep:#1D4ED8;
          --bg:#0A0A12; --panel:#14141F; --panel-2:#1C1C2B;
          --white:#F5F3FF; --muted:#9A94AE; --line: rgba(245,243,255,0.09);
          --display:'Space Grotesk', sans-serif; --body:'Inter', sans-serif; --mono:'IBM Plex Mono', monospace;
          font-family: var(--body); color: var(--white); background: var(--bg);
          overflow-x:hidden; -webkit-font-smoothing:antialiased;
        }
        .rs-root *{ box-sizing:border-box; }
        .rs-root img, .rs-root svg{ display:block; }
        .rs-root a{ color:inherit; text-decoration:none; }
        .rs-root button{ font-family:var(--body); }
        .wrap{ max-width:1180px; margin:0 auto; padding:0 32px; }
        .eyebrow{ font-family:var(--mono); font-size:12px; letter-spacing:0.14em; text-transform:uppercase;
          display:inline-flex; align-items:center; gap:8px; color: var(--violet-light); }
        .eyebrow.blue{ color:#9DBBFF; }
        .eyebrow::before{ content:''; width:16px; height:1.5px; background:currentColor; display:inline-block; }
        h1,h2,h3{ font-family: var(--display); letter-spacing:-0.01em; margin:0; color:var(--white); }
        section{ position:relative; }

        /* ---------- Logo lockups ---------- */
        .logo{ display:flex; align-items:center; gap:9px; font-family:var(--display); font-weight:700; font-size:20px; white-space:nowrap; cursor:pointer; }
        .logo img{ width:30px; height:30px; border-radius:8px; object-fit:contain; }
        .logo-text-blue{ background:linear-gradient(90deg,#7CA6FF,#3B82F6); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .logo-rovenet{ display:flex; align-items:center; gap:8px; font-family:var(--display); font-weight:700; font-size:19px; }
        .logo-rovenet img{ width:26px; height:26px; border-radius:50%; }
        .logo-rovenet .rove{ color:var(--white); } .logo-rovenet .net{ color:var(--violet-light); }

        /* ---------- Header ---------- */
        header{ position:fixed; top:0; left:0; right:0; z-index:50; background:rgba(10,10,18,0.78); backdrop-filter:blur(10px); border-bottom:1px solid var(--line); }
        .nav{ display:flex; align-items:center; justify-content:space-between; padding:14px 32px; max-width:1180px; margin:0 auto; }
        .nav-links{ display:flex; align-items:center; gap:28px; list-style:none; margin:0; padding:0; }
        .nav-links button.link{ background:none; border:none; font-size:14.5px; font-weight:500; color: var(--muted); cursor:pointer; transition:color .2s ease; }
        .nav-links button.link:hover, .nav-links button.link.active{ color: var(--white); }
        .nav-cta{ background: linear-gradient(120deg,var(--violet),var(--violet-deep)); color:#fff !important; padding:10px 20px; border-radius:100px; font-weight:600; font-size:14px; border:none; cursor:pointer; display:inline-flex; align-items:center; gap:8px; transition:transform .2s ease, box-shadow .2s ease; }
        .nav-cta:hover{ transform:translateY(-1px); box-shadow:0 8px 20px rgba(139,92,246,0.4); }
        .nav-toggle{ display:none; background:none; border:none; cursor:pointer; color:var(--white); }
        .mobile-links{ display:none; }
        @media (max-width:900px){ .nav-links{ display:none; } .nav-toggle{ display:block; }
          .mobile-links.open{ display:flex; flex-direction:column; gap:16px; padding:20px 32px 26px; background:var(--bg); border-bottom:1px solid var(--line); } }

        .btn{ display:inline-flex; align-items:center; gap:9px; padding:15px 26px; border-radius:100px; font-weight:600; font-size:15px; cursor:pointer; border:1px solid transparent; transition:transform .2s ease, box-shadow .2s ease, background .2s ease; }
        .btn-violet{ background: linear-gradient(120deg,var(--violet),var(--violet-deep)); color:#fff; }
        .btn-violet:hover{ transform:translateY(-2px); box-shadow:0 12px 28px rgba(139,92,246,0.4); }
        .btn-ghost{ border-color:rgba(245,243,255,0.28); color:var(--white); }
        .btn-ghost:hover{ border-color:#fff; transform:translateY(-2px); }
        .btn-blue{ background: linear-gradient(120deg,var(--blue),var(--blue-deep)); color:#fff; }
        .btn-blue:hover{ transform:translateY(-2px); box-shadow:0 12px 28px rgba(59,130,246,0.4); }

        /* ---------- Hero ---------- */
        .hero{ position:relative; padding:168px 0 110px; overflow:hidden;
          background: radial-gradient(1100px 620px at 15% -10%, #1E1035, var(--bg) 62%); }
        .nebula-canvas{ position:absolute; inset:0; width:100%; height:100%; }
        .hex-scatter{ position:absolute; width:100%; height:100%; color:rgba(245,243,255,0.5); pointer-events:none; }
        .hero-grid{ position:relative; z-index:2; display:grid; grid-template-columns:1.15fr 0.85fr; gap:40px; align-items:center; }
        .hero h1{ font-size:clamp(2.3rem, 4.6vw, 3.6rem); line-height:1.1; margin-top:18px; }
        .hero h1 span{ background:linear-gradient(90deg,#C4B0FF,#EC4899); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .hero p.lede{ margin-top:20px; font-size:17.5px; color: var(--muted); max-width:520px; }
        .hero-ctas{ display:flex; gap:14px; margin-top:34px; flex-wrap:wrap; }
        @media (max-width:920px){ .hero-grid{ grid-template-columns:1fr; } .hero-phone-col{ order:-1; max-width:260px; margin:0 auto; } }

        /* ---------- Vision ---------- */
        .vision{ padding:100px 0; background: var(--panel); }
        .vision-grid{ display:grid; grid-template-columns:0.9fr 1.1fr; gap:56px; align-items:center; }
        .vision h2{ font-size:clamp(1.8rem,3vw,2.4rem); margin-top:14px; line-height:1.16; }
        .vision p{ margin-top:16px; color: var(--muted); font-size:15.5px; max-width:480px; }
        .vision-mark{ display:flex; align-items:center; justify-content:center; position:relative; aspect-ratio:1/1; }
        .vision-mark img{ width:78%; filter:drop-shadow(0 30px 60px rgba(59,130,246,0.25)); }
        .vision-spheres{ display:flex; gap:12px; flex-wrap:wrap; margin-top:24px; }
        .sphere-chip{ font-family:var(--mono); font-size:12px; padding:8px 14px; border-radius:100px; border:1px solid var(--line); color: var(--muted); }
        @media (max-width:900px){ .vision-grid{ grid-template-columns:1fr; } .vision-mark{ max-width:280px; margin:0 auto; order:-1; } }

        /* ---------- Meet Rovenet teaser (landing) ---------- */
        .rovenet-teaser{ padding:100px 0; background: var(--bg); }
        .section-head{ max-width:640px; }
        .section-head h2{ font-size:clamp(1.8rem,3vw,2.4rem); margin-top:14px; }
        .section-head p{ margin-top:14px; color: var(--muted); font-size:15.5px; }
        .feature-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:18px; margin-top:48px; }
        .feature-card{ background: var(--panel); border:1px solid var(--line); border-radius:18px; padding:26px 22px; transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
        .feature-card:hover{ transform:translateY(-6px); box-shadow:0 18px 36px rgba(139,92,246,0.18); border-color:rgba(139,92,246,0.4); }
        .feature-icon{ width:42px; height:42px; border-radius:11px; background: rgba(139,92,246,0.14); display:flex; align-items:center; justify-content:center; margin-bottom:16px; }
        .feature-icon svg{ stroke: var(--violet-light); }
        .feature-card h3{ font-size:16.5px; font-weight:700; font-family:var(--body); }
        .feature-card p{ margin-top:9px; font-size:13.8px; color: var(--muted); }
        @media (max-width:980px){ .feature-grid{ grid-template-columns:repeat(2,1fr); } }
        @media (max-width:560px){ .feature-grid{ grid-template-columns:1fr; } }
        .teaser-strip{ display:flex; gap:20px; margin-top:56px; overflow-x:auto; padding-bottom:8px; }
        .teaser-strip img{ height:340px; border-radius:22px; border:1px solid var(--line); flex-shrink:0; }
        .explore-link{ display:inline-flex; align-items:center; gap:8px; margin-top:34px; color: var(--violet-light); font-weight:600; font-size:14.5px; background:none; border:none; cursor:pointer; }
        .explore-link:hover{ gap:12px; }

        /* ---------- Why ---------- */
        .why{ padding:100px 0; background: var(--panel); }
        .why-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:18px; margin-top:48px; }
        .why-card{ padding:26px 22px; border-radius:18px; border:1px solid var(--line); background: var(--bg); transition:transform .25s ease, box-shadow .25s ease; overflow:hidden; }
        .why-card:hover{ transform:translateY(-6px); box-shadow:0 18px 36px rgba(139,92,246,0.15); }
        .why-icon{ width:40px; height:40px; border-radius:11px; background: linear-gradient(120deg,var(--violet),var(--violet-deep)); display:flex; align-items:center; justify-content:center; margin-bottom:14px; }
        .why-icon svg{ stroke:#fff; }
        .why-card h3{ font-size:15.5px; font-family:var(--body); font-weight:700; }
        .why-card p{ margin-top:8px; font-size:13.3px; color: var(--muted); }
        .why-shot{ margin-top:14px; border-radius:12px; width:100%; border:1px solid var(--line); }
        @media (max-width:980px){ .why-grid{ grid-template-columns:repeat(2,1fr); } }
        @media (max-width:560px){ .why-grid{ grid-template-columns:1fr; } }

        /* ---------- Coming soon ---------- */
        .soon{ padding:90px 0; background: var(--bg); text-align:center; position:relative; overflow:hidden; }
        .soon-threads{ position:absolute; inset:0; opacity:0.5; }
        .soon .inner{ position:relative; z-index:2; }
        .soon h2{ margin-top:14px; font-size:clamp(1.6rem,3vw,2.2rem); }
        .soon p{ margin-top:14px; color: var(--muted); font-size:15.5px; max-width:540px; margin-left:auto; margin-right:auto; }

        /* ---------- CTA band ---------- */
        .cta-band{ background: linear-gradient(120deg,var(--violet),var(--violet-deep)); padding:64px 0; text-align:center; }
        .cta-band h2{ font-size:clamp(1.5rem,3vw,2rem); }
        .cta-band p{ margin-top:12px; color:rgba(255,255,255,0.82); font-size:15px; }
        .cta-form{ margin-top:28px; display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
        .cta-form input{ padding:14px 18px; border-radius:100px; border:1px solid rgba(255,255,255,0.4); background:rgba(255,255,255,0.12); color:#fff; font-size:14.5px; min-width:270px; }
        .cta-form input::placeholder{ color:rgba(255,255,255,0.7); }
        .cta-form button{ background:#fff; color: var(--violet-deep); }
        .joined-msg{ margin-top:20px; font-size:14.5px; font-weight:600; }

        /* ---------- Footer ---------- */
        footer{ background: var(--bg); color: var(--muted); padding:60px 0 26px; border-top:1px solid var(--line); }
        .footer-top{ display:flex; justify-content:space-between; gap:40px; flex-wrap:wrap; padding-bottom:40px; border-bottom:1px solid var(--line); }
        .footer-brand p{ max-width:280px; font-size:13.3px; margin-top:12px; }
        .footer-cols{ display:flex; gap:52px; flex-wrap:wrap; }
        .footer-col h4{ font-family:var(--mono); font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color: var(--white); margin-bottom:13px; }
        .footer-col ul{ list-style:none; display:flex; flex-direction:column; gap:9px; margin:0; padding:0; }
        .footer-col a, .footer-col button{ font-size:13.3px; background:none; border:none; color:var(--muted); cursor:pointer; padding:0; text-align:left; display:flex; align-items:center; gap:6px; transition:color .2s ease; }
        .footer-col a:hover, .footer-col button:hover{ color: var(--violet-light); }
        .footer-bottom{ display:flex; justify-content:space-between; align-items:center; padding-top:20px; flex-wrap:wrap; gap:14px; font-size:12.3px; }
        .social-row{ display:flex; gap:14px; }
        .social-row a{ width:34px; height:34px; border:1px solid var(--line); border-radius:50%; display:flex; align-items:center; justify-content:center; transition:all .2s ease; }
        .social-row a:hover{ border-color: var(--violet); background: var(--violet); }
        .social-row svg{ width:15px; height:15px; }

        /* ---------- Phone mockup (shared) ---------- */
        .phone-wrap{ position:relative; display:flex; justify-content:center; }
        .phone-glow{ position:absolute; width:260px; height:260px; border-radius:50%; background: radial-gradient(circle, rgba(139,92,246,0.35), transparent 70%); filter:blur(8px); z-index:0; }
        .phone{ position:relative; z-index:1; width:230px; border-radius:34px; padding:10px; background: linear-gradient(160deg,#22203a,#0c0b16); box-shadow:0 30px 60px rgba(0,0,0,0.5); transition:transform .4s ease, box-shadow .4s ease; }
        .phone:hover{ transform:perspective(900px) rotateY(-6deg) rotateX(3deg) translateY(-4px); box-shadow:0 40px 70px rgba(0,0,0,0.6); }
        .phone-notch{ width:60px; height:5px; border-radius:100px; background:rgba(255,255,255,0.18); margin:0 auto 8px; }
        .phone-screen{ border-radius:24px; overflow:hidden; background:#000; }
        .phone-screen img{ width:100%; display:block; }

        /* ---------- Rovenet page: showcase ---------- */
        .showcase{ padding:100px 0; background: var(--panel); }
        .showcase-grid{ display:grid; grid-template-columns:0.8fr 1.2fr; gap:50px; align-items:center; margin-top:48px; }
        .showcase-tabs{ display:flex; flex-direction:column; gap:10px; }
        .showcase-tab{ display:flex; align-items:center; gap:12px; padding:14px 16px; border-radius:14px; border:1px solid var(--line); background: var(--bg); font-weight:600; font-size:14px; color: var(--muted); cursor:pointer; text-align:left; transition:all .2s ease; }
        .showcase-tab svg{ stroke: var(--muted); transition:stroke .2s ease; flex-shrink:0; }
        .showcase-tab.active{ background: linear-gradient(120deg,var(--violet),var(--violet-deep)); color:#fff; border-color:transparent; box-shadow:0 10px 24px rgba(139,92,246,0.32); }
        .showcase-tab.active svg{ stroke:#fff; }
        .showcase-copy{ margin-top:8px; color: var(--muted); font-size:14px; max-width:320px; }
        @media (max-width:900px){ .showcase-grid{ grid-template-columns:1fr; } .showcase-tabs{ flex-direction:row; flex-wrap:wrap; } }

        /* ---------- Category chips ---------- */
        .cat-section{ padding:90px 0; background: var(--bg); }
        .cat-cloud{ display:flex; flex-wrap:wrap; gap:12px; margin-top:40px; }
        .cat-chip{ padding:11px 18px; border-radius:100px; border:1px solid var(--line); font-size:13.5px; color: var(--white); background: var(--panel); transition:all .2s ease; }
        .cat-chip:hover{ border-color: var(--violet); background: rgba(139,92,246,0.12); transform:translateY(-2px); }

        /* ---------- Rovenet hero ---------- */
        .rn-hero{ position:relative; padding:168px 0 100px; overflow:hidden;
          background: radial-gradient(1100px 620px at 85% -10%, #2A1245, var(--bg) 62%); }
        .rn-hero-grid{ position:relative; z-index:2; display:grid; grid-template-columns:1.1fr 0.9fr; gap:40px; align-items:center; }
        .rn-hero h1{ font-size:clamp(2.2rem,4.4vw,3.4rem); line-height:1.1; margin-top:16px; }
        .rn-hero p.lede{ margin-top:18px; color: var(--muted); font-size:17px; max-width:480px; }
        .back-link{ display:inline-flex; align-items:center; gap:8px; font-size:13.5px; color: var(--muted); background:none; border:none; cursor:pointer; margin-bottom:18px; }
        .back-link:hover{ color: var(--white); }
        @media (max-width:920px){ .rn-hero-grid{ grid-template-columns:1fr; } .rn-hero .phone-wrap{ max-width:260px; margin:0 auto; order:-1; } }

        /* ---------- Earn breakdown ---------- */
        .earn{ padding:100px 0; background: var(--panel); }
        .earn-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:48px; }
        .earn-card{ background: var(--bg); border:1px solid var(--line); border-radius:20px; overflow:hidden; transition:transform .25s ease, box-shadow .25s ease; }
        .earn-card:hover{ transform:translateY(-6px); box-shadow:0 18px 36px rgba(139,92,246,0.18); }
        .earn-card img{ width:100%; height:220px; object-fit:cover; object-position:top; border-bottom:1px solid var(--line); }
        .earn-card .earn-body{ padding:22px; }
        .earn-card h3{ font-size:16px; font-family:var(--body); font-weight:700; }
        .earn-card p{ margin-top:8px; font-size:13.5px; color: var(--muted); }
        @media (max-width:900px){ .earn-grid{ grid-template-columns:1fr; } }

        .store-row{ display:flex; gap:14px; flex-wrap:wrap; margin-top:34px; }
        .store-btn{ display:flex; align-items:center; gap:10px; padding:12px 20px; border-radius:14px; border:1px solid var(--line); background: var(--panel); }
        .store-btn svg{ stroke: var(--violet-light); }
        .store-btn .lines{ display:flex; flex-direction:column; }
        .store-btn .lines span:first-child{ font-size:10.5px; color: var(--muted); }
        .store-btn .lines span:last-child{ font-size:14px; font-weight:700; }
      `}</style>

      {/* ================= HEADER ================= */}
      <header>
        <nav className="nav">
          <div className="logo" onClick={() => goto("home")}>
            <img src={ASSET.rovestacksLogo} alt="Rovestacks logo" />
            <span className="logo-text-blue">Rovestacks</span>
          </div>
          <ul className="nav-links">
            <li><button className={`link ${page === "home" ? "active" : ""}`} onClick={() => goto("home")}>Home</button></li>
            <li><button className={`link ${page === "rovenet" ? "active" : ""}`} onClick={() => goto("rovenet")}>Rovenet</button></li>
            <li><a href="#why" className="link" style={{ display: "inline-block" }}>Why Us</a></li>
            <li><a href="#legal" className="link" style={{ display: "inline-block" }}>Legal</a></li>
            <li><a href="#waitlist" className="nav-cta">Join Waitlist</a></li>
          </ul>
          <button className="nav-toggle" onClick={() => setNavOpen(!navOpen)} aria-label="Toggle menu">
            {navOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
        <div className={`mobile-links ${navOpen ? "open" : ""}`}>
          <button className="link" onClick={() => goto("home")}>Home</button>
          <button className="link" onClick={() => goto("rovenet")}>Rovenet</button>
          <a href="#why" className="link" onClick={() => setNavOpen(false)}>Why Us</a>
          <a href="#legal" className="link" onClick={() => setNavOpen(false)}>Legal</a>
          <a href="#waitlist" className="nav-cta" style={{ width: "fit-content" }} onClick={() => setNavOpen(false)}>Join Waitlist</a>
        </div>
      </header>

      {page === "home" && (
        <>
          {/* ================= HERO ================= */}
          <section className="hero" id="top">
            <NebulaCanvas tint="blue" />
            <HexScatter opacity={0.35} />
            <div className="wrap hero-grid">
              <div>
                <span className="eyebrow blue">Rovestacks</span>
                <h1>Building Africa's <span>Connected</span> Digital Ecosystem</h1>
                <p className="lede">
                  Rovestacks is a Nigerian tech innovation company building digital products across
                  every sphere of life. It starts with Rovenet — a classifieds, marketplace and
                  earning app connecting buyers, sellers, and everyday hustle.
                </p>
                <div className="hero-ctas">
                  <a href="#waitlist" className="btn btn-blue"><Download size={18} strokeWidth={2} /> Download Rovenet</a>
                  <button className="btn btn-ghost" onClick={() => goto("rovenet")}>Explore Rovenet <ArrowRight size={17} strokeWidth={2} /></button>
                </div>
              </div>
              <div className="hero-phone-col">
                <PhoneShot src={ASSET.shotHome} alt="Rovenet home screen showing wallet balance and Social Hunt tasks" />
              </div>
            </div>
          </section>

          {/* ================= VISION ================= */}
          <section className="vision" id="vision">
            <div className="wrap vision-grid">
              <Reveal className="vision-mark">
                <img src={ASSET.rovestacksLogo} alt="Rovestacks orbit mark" />
              </Reveal>
              <Reveal delay={100}>
                <span className="eyebrow blue">What is Rovestacks?</span>
                <h2>A tech innovation company building across every sphere of life.</h2>
                <p>
                  Rovestacks is registered in Nigeria to develop software, mobile apps, and digital
                  platforms — with a vision that spans far beyond one product. Our long-term focus
                  touches games, marketplaces, transport and logistics, and security, building an
                  ecosystem of tools that Africans can trust and rely on daily.
                </p>
                <p>Rovenet is where that vision begins.</p>
                <div className="vision-spheres">
                  <span className="sphere-chip">Games</span>
                  <span className="sphere-chip">Marketplace</span>
                  <span className="sphere-chip">Transport &amp; Logistics</span>
                  <span className="sphere-chip">Security</span>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ================= ROVENET TEASER ================= */}
          <section className="rovenet-teaser" id="rovenet-teaser">
            <div className="wrap">
              <Reveal className="section-head">
                <span className="eyebrow">Meet Rovenet</span>
                <h2>Nigeria's classifieds &amp; earning app, in your pocket.</h2>
                <p>Post listings, connect your socials to earn, play games for rewards, and cash out — all from one app.</p>
              </Reveal>
              <div className="feature-grid">
                {rovenetFeatures.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <Reveal key={f.title} delay={i * 80}>
                      <div className="feature-card">
                        <div className="feature-icon"><Icon size={20} strokeWidth={1.8} /></div>
                        <h3>{f.title}</h3>
                        <p>{f.copy}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
              <Reveal delay={120}>
                <div className="teaser-strip">
                  <img src={ASSET.shotHome} alt="Rovenet home screen" />
                  <img src={ASSET.shotMarket} alt="Rovenet MarketHub categories" />
                  <img src={ASSET.shotSocial} alt="Rovenet social earning screen" />
                </div>
                <button className="explore-link" onClick={() => goto("rovenet")}>
                  See everything Rovenet can do <ChevronRight size={16} />
                </button>
              </Reveal>
            </div>
          </section>

          {/* ================= WHY ================= */}
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
                        <div className="why-icon"><Icon size={19} strokeWidth={1.8} /></div>
                        <h3>{w.tag}</h3>
                        <p>{w.copy}</p>
                        {w.shot && <img className="why-shot" src={w.shot} alt="Rovenet passcode security screen" />}
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ================= COMING SOON ================= */}
          <section className="soon">
            <div className="soon-threads"><NebulaCanvas tint="violet" /></div>
            <div className="wrap inner">
              <Reveal>
                <span className="eyebrow">Coming Soon</span>
                <h2>More is on the way.</h2>
                <p>Rovenet is the first thread in the Rovestacks network. We're already building what
                  comes next, on the same foundation of trust and community.</p>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {page === "rovenet" && (
        <>
          {/* ================= ROVENET HERO ================= */}
          <section className="rn-hero" id="top">
            <NebulaCanvas tint="violet" />
            <HexScatter opacity={0.4} />
            <div className="wrap rn-hero-grid">
              <div>
                <button className="back-link" onClick={() => goto("home")}><ArrowLeft size={15} /> Back to Rovestacks</button>
                <div className="logo-rovenet">
                  <img src={ASSET.rovenetCircle} alt="Rovenet logo" />
                  <span><span className="rove">Rove</span><span className="net">Net</span></span>
                </div>
                <h1>Buy, sell, earn — all in one app.</h1>
                <p className="lede">
                  Rovenet is Nigeria's local classifieds and social-earning app. List anything from
                  cars to fashion for free, get paid for simple social media tasks, and play games for
                  extra rewards.
                </p>
                <div className="store-row">
                  <a href="#waitlist" className="store-btn"><Download size={20} /><span className="lines"><span>Get it on</span><span>Android</span></span></a>
                  <a href="#waitlist" className="store-btn"><Download size={20} /><span className="lines"><span>Coming soon on</span><span>iOS</span></span></a>
                </div>
              </div>
              <PhoneShot src={ASSET.shotHome} alt="Rovenet app home screen" />
            </div>
          </section>

          {/* ================= SHOWCASE ================= */}
          <section className="showcase" id="showcase">
            <div className="wrap">
              <Reveal className="section-head">
                <span className="eyebrow">See it in action</span>
                <h2>What Rovenet looks like day to day.</h2>
              </Reveal>
              <div className="showcase-grid">
                <Reveal className="showcase-tabs">
                  {showcaseTabs.map((t) => {
                    const Icon = t.icon;
                    return (
                      <button key={t.key} className={`showcase-tab ${activeTab === t.key ? "active" : ""}`} onClick={() => setActiveTab(t.key)}>
                        <Icon size={17} strokeWidth={1.8} /><span>{t.label}</span>
                      </button>
                    );
                  })}
                  <p className="showcase-copy">{activeShowcase.copy}</p>
                </Reveal>
                <Reveal delay={100}>
                  <PhoneShot src={activeShowcase.shot} alt={`Rovenet ${activeShowcase.label} screen`} />
                </Reveal>
              </div>
            </div>
          </section>

          {/* ================= CATEGORIES ================= */}
          <section className="cat-section">
            <div className="wrap">
              <Reveal className="section-head">
                <span className="eyebrow">MarketHub Categories</span>
                <h2>Sixteen categories, one classifieds board.</h2>
                <p>From vehicles and property to jobs and fashion — post what you have, find what you need.</p>
              </Reveal>
              <Reveal delay={100}>
                <div className="cat-cloud">
                  {categories.map((c) => <span className="cat-chip" key={c}>{c}</span>)}
                </div>
              </Reveal>
            </div>
          </section>

          {/* ================= EARN BREAKDOWN ================= */}
          <section className="earn">
            <div className="wrap">
              <Reveal className="section-head">
                <span className="eyebrow">Earn on Rovenet</span>
                <h2>Three ways to make money without leaving the app.</h2>
              </Reveal>
              <div className="earn-grid">
                <Reveal>
                  <div className="earn-card">
                    <img src={ASSET.shotSocial} alt="Verify social accounts to earn" />
                    <div className="earn-body">
                      <h3>Social Tasks</h3>
                      <p>Verify a social account with 1,000+ followers, then earn by liking, following, commenting, or posting adverts for brands.</p>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <div className="earn-card">
                    <img src={ASSET.shotHomeGames} alt="Chase games section with Treasure Maze and Trivia" />
                    <div className="earn-body">
                      <h3>Games &amp; Chase</h3>
                      <p>Play Treasure Maze or Trivia for a shot at extra rewards — our way of giving back to active users.</p>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={160}>
                  <div className="earn-card">
                    <img src={ASSET.shotListing} alt="Marketplace listing detail page" />
                    <div className="earn-body">
                      <h3>Promoted Listings</h3>
                      <p>Sellers can pay to feature a listing for more visibility — powered by Paystack and Opay.</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ================= WAITLIST CTA ================= */}
      <section className="cta-band" id="waitlist">
        <div className="wrap">
          <h2>Be first through the next door.</h2>
          <p>Join the waitlist and we'll let you know the moment there's more to try.</p>
          {!joined ? (
            <form className="cta-form" onSubmit={handleWaitlist}>
              <input type="email" required placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button type="submit" className="btn btn-violet" style={{ background: "#fff", color: "#5B21B6" }}>Join Waitlist</button>
            </form>
          ) : (
            <p className="joined-msg">You're on the list — thanks for joining us early.</p>
          )}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer id="legal">
        <div className="wrap">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="logo" onClick={() => goto("home")}>
                <img src={ASSET.rovestacksLogo} alt="Rovestacks logo" />
                <span className="logo-text-blue">Rovestacks</span>
              </div>
              <p>Building Africa's connected digital ecosystem, starting with Rovenet.</p>
            </div>
            <div className="footer-cols">
              <div className="footer-col">
                <h4>Company</h4>
                <ul>
                  <li><button onClick={() => goto("home")}>About</button></li>
                  <li><button onClick={() => goto("rovenet")}>Rovenet</button></li>
                  <li><a href="#waitlist">Waitlist</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Legal &amp; Support</h4>
                <ul>
                  <li><a href="mailto:contact@rovestacks.com"><Mail size={13} strokeWidth={2} />Contact</a></li>
                  <li><a href="/rovenet-privacy-policy.docx"><FileText size={13} strokeWidth={2} />Privacy Policy</a></li>
                  <li><a href="/rovenet-terms-and-conditions.docx"><FileText size={13} strokeWidth={2} />Terms &amp; Conditions</a></li>
                  <li><a href="/rovenet-refund-policy.docx"><FileText size={13} strokeWidth={2} />Refund Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>/u00a9 2026 Rovestacks. All rights reserved.</span>
            <div className="social-row">
              <a href="https://x.com/rovestacks" aria-label="Twitter / X"><X size={15} strokeWidth={1.8} /></a>
              <a href="https://instagram.com/rovestacks" aria-label="Instagram"><Mail size={15} strokeWidth={1.8} /></a>
              <a href="https://linkedin.com/company/rovestacks" aria-label="LinkedIn"><Mail size={15} strokeWidth={1.8} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}