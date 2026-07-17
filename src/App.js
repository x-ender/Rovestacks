


import React, { useEffect, useRef, useState } from "react";
import {
  Store, MapPin, ShieldCheck, Zap, Globe2, Users2,
  Menu, X, Download, ArrowRight, Mail,
  ChevronRight, Lock, Gamepad2, Wallet, Share2,
  ArrowLeft, ScrollText, RotateCcw, ChevronRight as CaretRight
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
const DOCX = {
  privacy: "/rovenet-privacy-policy.docx",
  terms: "/rovenet-terms-and-conditions.docx",
  refund: "/rovenet-refund-policy.docx",
};
const EFFECTIVE_DATE = "July 15, 2026";
const COMPANY_FULL = "Rovestacks Technologies Limited";
const RC_NUMBER = "9619939";
 
/* ------------------------------------------------------------------ */
/*  Small helpers                                                      */
/* ------------------------------------------------------------------ */
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setVisible(true); io.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}
 
function Wordmark({ className = "" }) {
  return <span className={`wordmark ${className}`}>ROVEST<span className="lambda">A</span>CKS</span>;
}
 
/* ------------------------------------------------------------------ */
/*  Nebula network canvas                                              */
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
      for (let i = 0; i < SMALL_COUNT; i++) nodes.push({ x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: 1.4 + Math.random() * 1.4, orb: false });
      for (let i = 0; i < ORB_COUNT; i++) nodes.push({ x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12, r: 20 + Math.random() * 26, orb: true });
    }
    function step() {
      ctx.clearRect(0, 0, width, height);
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < -40) n.x = width + 40; if (n.x > width + 40) n.x = -40;
        if (n.y < -40) n.y = height + 40; if (n.y > height + 40) n.y = -40;
      });
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y, dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = a.orb || b.orb ? LINK_DIST * 1.6 : LINK_DIST;
        if (dist < maxDist) {
          ctx.strokeStyle = `rgba(${line},${(1 - dist / maxDist) * 0.35})`;
          ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      nodes.filter((n) => n.orb).forEach((n) => {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        grad.addColorStop(0, `rgba(${orb},0.45)`); grad.addColorStop(1, `rgba(${orb},0)`);
        ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      });
      nodes.filter((n) => !n.orb).forEach((n) => {
        ctx.fillStyle = `rgba(${dot},0.85)`; ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
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
 
function HexScatter({ opacity = 0.5 }) {
  const hexes = [{ x: 40, y: 60, s: 26 }, { x: 90, y: 40, s: 16 }, { x: 340, y: 90, s: 22 },
    { x: 380, y: 200, s: 14 }, { x: 60, y: 260, s: 18 }, { x: 300, y: 30, s: 12 },
    { x: 200, y: 250, s: 20 }, { x: 250, y: 150, s: 10 }];
  function hexPoints(cx, cy, r) {
    return Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(" ");
  }
  return (
    <svg className="hex-scatter" viewBox="0 0 420 300" preserveAspectRatio="xMidYMid slice" style={{ opacity }} aria-hidden="true">
      {hexes.map((h, i) => <polygon key={i} points={hexPoints(h.x, h.y, h.s)} fill="none" stroke="currentColor" strokeWidth="1.2" />)}
    </svg>
  );
}
 
function PhoneShot({ src, alt, className = "" }) {
  return (
    <div className={`phone-wrap ${className}`}>
      <div className="phone-glow" />
      <div className="phone"><div className="phone-notch" /><div className="phone-screen"><img src={src} alt={alt} /></div></div>
    </div>
  );
}
 
/* ------------------------------------------------------------------ */
/*  Legal content                                                      */
/* ------------------------------------------------------------------ */
const PRIVACY_SECTIONS = [
  { id: "scope", title: "1. Introduction & Scope", body: [
    { p: `This Privacy Policy is issued by ${COMPANY_FULL} (\u201cRovestacks,\u201d \u201cthe Company,\u201d \u201cwe,\u201d \u201cour,\u201d or \u201cus\u201d), a company duly incorporated under the Companies and Allied Matters Act and registered with the Corporate Affairs Commission (CAC) of Nigeria under RC ${RC_NUMBER}. It describes how we collect, use, disclose, and safeguard information in connection with Rovenet, our classifieds, marketplace, and social-earning mobile application, and any other digital product or service we may operate under the Rovestacks name (each, a \u201cService\u201d).` },
    { p: "By creating an account, browsing listings, or otherwise using a Service, you acknowledge that you have read and understood this Policy. If you do not agree with our practices, please discontinue use of the Service." },
  ]},
  { id: "collect", title: "2. Information We Collect", body: [
    { h: "2.1 Information you provide directly" },
    { ul: [
      "Account details, including full name, phone number, email address, and password.",
      "Profile information, such as a display photo, city or local area, and optional business or seller details.",
      "Listing content, including photographs, descriptions, prices, and category information you submit for products, services, or job posts.",
      "VTU redemption details supplied when requesting to redeem your earnings.",
      "Identity verification information, such as a government-issued identification document, where required by us or by our payment or regulatory partners.",
      "Correspondence you send us, including support tickets and dispute reports.",
    ]},
    { h: "2.2 Information collected automatically" },
    { ul: [
      "Device information, including device type, operating system, unique device identifiers, and application version.",
      "Usage data, including listings viewed, tasks completed, game activity, session duration, and general interaction patterns.",
      "Approximate location, where permitted, used to surface relevant local listings.",
      "Log data, including IP address, access timestamps, and diagnostic or crash reports.",
    ]},
    { h: "2.3 Information from third parties" },
    { ul: [
      "Confirmation of successful or failed payments from our payment service providers, currently Paystack and Opay.",
      "Confirmation of VTU purchases or transfers from our VTU service provider, currently VTPass, where you elect to withdraw earnings in that form.",
    ]},
  ]},
  { id: "basis", title: "3. Legal Basis for Processing", body: [
    { p: "We process personal data on one or more of the following bases, consistent with the Nigeria Data Protection Act, 2023: performance of the contract formed by our Terms & Conditions when you register and use a Service; compliance with a legal obligation, including obligations imposed by our payment and VTU partners or by financial regulation; our legitimate interests in operating, securing, and improving our Services, provided those interests do not override your rights; and, where required, your explicit consent, such as for optional location access or marketing communications." },
  ]},
  { id: "use", title: "4. How We Use Your Information", body: [
    { ul: [
      "To create, verify, and administer your account.",
      "To publish your listings and enable other users to search for and respond to them.",
      "To process payments for promotion packages, process task deposits, and process withdrawal requests.",
      "To operate the in-app game and social task features, including verifying genuine completion of tasks before releasing payment.",
      "To detect, investigate, and prevent fraud, fake engagement, abuse of the rewards system, and other violations of our Terms & Conditions.",
      "To communicate with you regarding your account, transactions, and support requests.",
      "To maintain, secure, and improve the performance and safety of our Services.",
      "To comply with applicable law, regulation, and lawful requests from competent authorities.",
    ]},
  ]},
  { id: "share", title: "5. How We Share Your Information", body: [
    { p: "We do not sell personal data. We disclose information only in the following circumstances:" },
    { ul: [
      "With other users, limited to what you choose to include in a public listing or profile.",
      "With our payment service providers (Paystack, Opay), solely to process promotion-package payments and task deposits.",
      "With our VTU provider (VTPass), solely to fulfil a VTU withdrawal you request.",
      "With service providers supporting hosting, analytics, or customer support, bound by confidentiality obligations.",
      "Where required by law, regulation, court order, or to protect the rights, safety, or property of Rovestacks, our users, or the public.",
      "In connection with a merger, acquisition, financing, or sale of assets, subject to continued protection consistent with this Policy.",
    ]},
  ]},
  { id: "transfers", title: "6. International Data Transfers", body: [
    { p: "As Rovestacks extends its Services beyond Nigeria, personal data may be processed in, or transferred to, other African jurisdictions or to service providers located outside Nigeria. Where this occurs, we take reasonable steps to ensure such transfers are subject to adequate safeguards consistent with the Nigeria Data Protection Act and applicable regulations." },
  ]},
  { id: "retention", title: "7. Data Retention", body: [
    { p: "We retain account and transaction information for as long as your account remains active and for a reasonable period thereafter to satisfy legal, accounting, fraud-prevention, and payment-partner recordkeeping requirements. Listing content may be archived or removed once a listing is closed, expired, or withdrawn." },
  ]},
  { id: "rights", title: "8. Your Rights", body: [
    { p: "Subject to applicable law, you have the right to:" },
    { ul: [
      "Access the personal data we hold about you and request a copy of it.",
      "Request correction of inaccurate or incomplete personal data.",
      "Request deletion of your account and associated personal data, subject to information we are legally required to retain.",
      "Object to, or request restriction of, certain processing activities.",
      "Request portability of certain personal data, where technically feasible.",
      "Withdraw consent at any time where processing is based on consent, such as location access.",
      "Lodge a complaint with the Nigeria Data Protection Commission (NDPC) or another competent supervisory authority.",
    ]},
    { p: "Requests may be submitted using the contact details in Section 12. We will respond within the timeframes required by applicable law." },
  ]},
  { id: "cookies", title: "9. Cookies and Similar Technologies", body: [
    { p: "Our website and related digital properties may use cookies and similar technologies to remember preferences, understand aggregate usage, and keep you signed in. You can control cookies through your browser settings; disabling certain cookies may affect site functionality." },
  ]},
  { id: "security", title: "10. Data Security", body: [
    { p: "We maintain administrative, technical, and physical safeguards designed to protect personal data, including encrypted transmission of payment-related information, passcode-protected app access, and restricted internal access to sensitive records. No method of transmission or storage is completely secure, and we cannot guarantee absolute security." },
  ]},
  { id: "children", title: "11. Children's Privacy", body: [
    { p: "Our Services are not directed at, and are not intended for use by, individuals under the age of 18. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us so that we may take appropriate action." },
  ]},
  { id: "automated", title: "12. Automated Verification", body: [
    { p: "Certain features, such as eligibility checks for the social task program, may involve automated verification of criteria such as follower count. Where a decision materially affects your access to earnings, you may request human review by contacting support." },
  ]},
  { id: "contact-privacy", title: "13. Contact Us", body: [
    { ul: ["Email: privacy@rovestacks.com", `Company: ${COMPANY_FULL} (RC ${RC_NUMBER}), registered with the Corporate Affairs Commission, Nigeria`] },
  ]},
  { id: "changes-privacy", title: "14. Changes to This Policy", body: [
    { p: "We may update this Policy from time to time. Material changes will be communicated in-app or by email prior to becoming effective. Continued use of a Service after an update constitutes acceptance of the revised Policy." },
  ]},
];
 
const TERMS_SECTIONS = [
  { id: "intro", title: "1. Introduction & Acceptance", body: [
    { p: `These Terms & Conditions (\u201cTerms\u201d) constitute a binding agreement between you and ${COMPANY_FULL} (\u201cRovestacks,\u201d \u201cthe Company\u201d), a company duly incorporated under the Companies and Allied Matters Act and registered with the Corporate Affairs Commission (CAC) of Nigeria under RC ${RC_NUMBER}, governing your access to and use of Rovenet and any other product or service Rovestacks may operate (each, a \u201cService\u201d). By creating an account or otherwise using a Service, you agree to be bound by these Terms. If you do not agree, you must not access or use the Service.` },
  ]},
  { id: "definitions", title: "2. Definitions", body: [
    { ul: [
      "\u201cRovestacks\u201d means the company operating the Service.",
      "\u201cRovenet\u201d means the classifieds, marketplace, and social-earning mobile application.",
      "\u201cUser,\u201d \u201cyou,\u201d or \u201cyour\u201d means any individual or entity that registers for or uses the Service.",
      "\u201cListing\u201d means any product, service, or job posting submitted by a User.",
      "\u201cTask\u201d means a social media engagement activity made available through the Social Tasks feature.",
    ]},
  ]},
  { id: "eligibility", title: "3. Eligibility", body: [
    { p: "You must be at least 18 years old and capable of forming a binding contract under applicable law to register for or use the Service. By using the Service, you represent and warrant that you meet these requirements." },
  ]},
  { id: "description", title: "4. Description of Service", body: [
    { p: "Rovenet is an online classifieds and marketplace platform connecting buyers and sellers of products, services, and jobs across Nigeria, with the intention of eventual expansion across Africa. Rovenet functions as a communication channel: it allows Users to post Listings and allows other Users to view, respond to, and negotiate directly with Listing owners." },
    { ul: [
      "Rovenet does not process checkout, hold inventory, or facilitate delivery of goods or services listed on the platform.",
      "All negotiation, payment between buyers and sellers, and arrangement of pickup or delivery occurs directly between the parties, outside of Rovenet.",
      "Rovestacks is not a party to, and assumes no responsibility for, any transaction concluded between a buyer and a seller as a result of a Listing.",
    ]},
  ]},
  { id: "account", title: "5. Account Registration and Security", body: [
    { p: "You are responsible for maintaining the confidentiality of your account credentials, including any passcode used to secure the application, and for all activity that occurs under your account. You agree to notify us promptly of any unauthorized use of your account." },
  ]},
  { id: "listings", title: "6. Listings and Content Standards", body: [
    { p: "Categories include, without limitation, Vehicles, Property, Phones & Tablets, Electronics, Home & Furniture, Beauty & Personal, Services, Repair & Construction, Commercial Equipment, Leisure & Activities, Babies & Kids, Food & Agriculture, Animals & Pets, Jobs, and Fashion." },
    { ul: [
      "You are solely responsible for the accuracy, legality, and quality of any Listing you submit.",
      "Rovestacks may remove any Listing that violates these Terms, applicable law, or that we reasonably believe is fraudulent, misleading, or unsafe.",
      "Posting a Listing is free of charge. Sellers may optionally purchase promotion packages to increase a Listing's visibility.",
    ]},
  ]},
  { id: "promotion", title: "7. Promotion Packages and Payment", body: [
    { p: "Sellers may purchase promotion packages through a supported payment gateway (currently Paystack and Opay) to feature or boost a Listing for a defined period. Prices are displayed prior to payment. Payments for promotion packages are non-refundable once processed, as further described in our Refund Policy." },
  ]},
  { id: "social-tasks", title: "8. Social Tasks & Advertising", body: [
    { p: "Rovenet includes a social commerce feature connecting advertisers (\u201cTask Posters\u201d) with Users who complete simple social media engagement activities (\u201cTask Performers\u201d), such as liking, sharing, commenting on, or following specified content." },
    { ul: [
      "A Task Poster must fund a task by depositing the task amount through a supported payment gateway before the task is published to Task Performers.",
      "Once approved and funded, task payments are non-refundable, as further described in our Refund Policy.",
      "Task Performers must genuinely complete tasks as instructed. Rovestacks may withhold payment, suspend accounts, or reverse credited earnings where a task is reasonably determined to have been completed fraudulently, including through automation, fake engagement, or multiple accounts controlled by one person.",
      "Rovestacks reserves the right to review, moderate, or reject any task or advertising content, including content that is unlawful, misleading, or violates the policies of the relevant social media platform.",
    ]},
  ]},
  { id: "games", title: "9. In-App Games and Rewards", body: [
    { p: "Rovenet offers in-app games, such as Treasure Maze and Trivia, as loyalty and engagement features. Points, credits, or rewards earned may be redeemable subject to the rules displayed within the relevant feature. Rovestacks may adjust game mechanics, rewards, or availability at its discretion." },
  ]},
  { id: "earnings", title: "10. Earnings and Redemption", body: [
    { ul: [
      "Users may accumulate earnings through eligible activities, such as completed social tasks or in-app rewards.",
      "Earnings may be redeemed as airtime, data, or other VTU products through our VTU partner, currently VTPass.",
      "Redemption requests are subject to identity and account verification and may be delayed or declined where Rovestacks reasonably suspects fraud or a violation of these Terms.",
    ]},
  ]},
  { id: "third-party", title: "11. Third-Party Payment and VTU Services", body: [
    { p: "All payments are processed through licensed third-party payment service providers, currently Paystack and Opay; VTU redemptions are processed through VTPass. Rovestacks does not store your full card or bank login credentials. Rovestacks is not responsible for delays, errors, or service interruptions caused by these third parties once an instruction has been correctly submitted to them." },
  ]},
  { id: "ip", title: "12. Intellectual Property", body: [
    { p: "The Rovestacks and Rovenet names, logos, and all associated trademarks, together with the design, software, and content of the Service (excluding User-submitted content), are the property of Rovestacks or its licensors. By submitting a Listing or other content, you grant Rovestacks a non-exclusive, worldwide, royalty-free licence to host, display, and distribute that content solely for the purpose of operating and promoting the Service." },
  ]},
  { id: "prohibited", title: "13. Prohibited Conduct", body: [
    { ul: [
      "Posting counterfeit, stolen, illegal, or prohibited goods or services.",
      "Creating multiple accounts to manipulate tasks, rewards, referrals, or Listing visibility.",
      "Using bots, scripts, or automated tools to complete social tasks or interact with the Service.",
      "Harassing, defrauding, or misrepresenting yourself to another User.",
      "Circumventing, disabling, or interfering with security features of the Service.",
    ]},
  ]},
  { id: "suspension", title: "14. Account Suspension and Termination", body: [
    { p: "Rovestacks may suspend or terminate any account, at its discretion, where it reasonably believes these Terms, applicable law, or the policies of our payment or VTU partners have been violated. Where appropriate, Rovestacks will attempt to notify the affected User of the reason for suspension or termination." },
  ]},
  { id: "liability", title: "15. Disclaimers and Limitation of Liability", body: [
    { p: "The Service is provided on an \u201cas is\u201d and \u201cas available\u201d basis, without warranties of any kind, whether express or implied. To the fullest extent permitted by law, Rovestacks is not liable for any dispute, loss, or damage arising from a transaction between a buyer and seller, from content posted by Users, or from the acts or omissions of third-party payment or VTU partners. Rovestacks' aggregate liability for any claim arising from your use of the Service shall not exceed the total fees you paid to Rovestacks in the three months preceding the claim." },
  ]},
  { id: "indemnity", title: "16. Indemnification", body: [
    { p: "You agree to indemnify and hold Rovestacks harmless from any claim, liability, or expense, including reasonable legal fees, arising from your breach of these Terms, your Listings, or your use of the Service." },
  ]},
  { id: "dispute", title: "17. Dispute Resolution and Governing Law", body: [
    { p: "These Terms are governed by the laws of the Federal Republic of Nigeria. Parties shall first attempt to resolve any dispute through good-faith negotiation. Where a dispute cannot be resolved amicably within thirty (30) days, it shall be subject to the exclusive jurisdiction of the courts of Nigeria." },
  ]},
  { id: "general", title: "18. General Provisions", body: [
    { ul: [
      "Severability: if any provision of these Terms is held unenforceable, the remaining provisions remain in full force.",
      "Force majeure: Rovestacks is not liable for delays or failures resulting from causes beyond its reasonable control.",
      "Assignment: Rovestacks may assign these Terms in connection with a merger, acquisition, or sale of assets.",
      "Entire agreement: these Terms, together with our Privacy Policy and Refund Policy, constitute the entire agreement between you and Rovestacks regarding the Service.",
    ]},
  ]},
  { id: "changes-terms", title: "19. Changes to These Terms", body: [
    { p: "We may update these Terms from time to time. Material changes will be communicated in-app or by email prior to becoming effective. Continued use of the Service after an update constitutes acceptance of the revised Terms." },
  ]},
  { id: "contact-terms", title: "20. Contact Us", body: [
    { ul: ["Email: legal@rovestacks.com", `Company: ${COMPANY_FULL} (RC ${RC_NUMBER}), registered with the Corporate Affairs Commission, Nigeria`] },
  ]},
];
 
const REFUND_SECTIONS = [
  { id: "overview", title: "1. Overview", body: [
    { p: `This Refund Policy explains when payments made on Rovenet are, and are not, eligible for a refund. It is issued by ${COMPANY_FULL} (RC ${RC_NUMBER}), registered with the Corporate Affairs Commission of Nigeria, and forms part of, and should be read together with, our Terms & Conditions.` },
  ]},
  { id: "promo-nonrefundable", title: "2. Promotion Package Payments \u2014 Non-Refundable", body: [
    { p: "Payments made by sellers to purchase a promotion package are final and non-refundable once processed, including where:" },
    { ul: [
      "The promoted Listing is sold, removed, or expires before the promotion period ends.",
      "The seller changes their mind after purchasing the promotion.",
      "The seller is dissatisfied with the visibility or results generated by the promotion.",
    ]},
  ]},
  { id: "task-nonrefundable", title: "3. Task Deposit / Approval Payments \u2014 Non-Refundable", body: [
    { p: "Payments made by Task Posters to fund and approve a social task are final and non-refundable once the task has been approved and made available to Task Performers, including where:" },
    { ul: [
      "The Task Poster is dissatisfied with the volume, quality, or nature of engagement received.",
      "The Task Poster wishes to cancel the campaign after it has gone live.",
      "The task was completed by Task Performers in a manner that technically satisfied the stated requirements.",
    ]},
    { p: "Where Rovestacks determines a task was fraudulently completed, Rovestacks may withhold payment to the Task Performer and, at its discretion, permit the Task Poster to reallocate the affected portion of their deposit to a replacement task in place of a cash refund." },
  ]},
  { id: "errors", title: "4. Erroneous or Duplicate Charges", body: [
    { p: "If you are charged in error, such as a duplicate charge caused by a technical fault, contact us within 14 days of the charge with your transaction reference. We will investigate and, where a genuine processing error is confirmed, reverse the duplicate or erroneous charge. This exception does not extend to the non-refundable categories described in Sections 2 and 3 where the payment was correctly processed for the service requested." },
  ]},
  { id: "chargebacks", title: "5. Chargebacks", body: [
    { p: "We ask that you contact us to resolve any payment concern before initiating a chargeback with your bank or card issuer. Initiating a chargeback for a payment that falls within the non-refundable categories in this Policy, without first raising the issue with us, may result in suspension of your account pending investigation." },
  ]},
  { id: "earnings-refund", title: "6. Earnings and Redemption", body: [
    { p: "This Refund Policy governs payments made by sellers and Task Posters to Rovenet. It does not affect a User's ability to redeem earnings validly credited to their account, which is governed separately by the Earnings and Redemption provisions of our Terms & Conditions." },
  ]},
  { id: "statutory", title: "7. Statutory Rights", body: [
    { p: "Nothing in this Policy limits any right you may have under applicable Nigerian consumer protection law that cannot lawfully be excluded or limited by agreement." },
  ]},
  { id: "raise-dispute", title: "8. How to Raise a Payment Dispute", body: [
    { ul: [
      "Email billing@rovestacks.com with your registered phone number or email, transaction reference, and a description of the issue.",
      "We aim to acknowledge disputes within 3 business days and resolve them within 14 business days.",
      "Resolution timelines may also depend on information made available to us by Paystack or Opay.",
    ]},
  ]},
  { id: "changes-refund", title: "9. Changes to This Policy", body: [
    { p: "We may update this Policy from time to time. Material changes will be communicated in-app or by email prior to becoming effective." },
  ]},
];
 
function renderBody(body) {
  return body.map((block, i) => {
    if (block.h) return <h4 key={i} className="legal-subhead">{block.h}</h4>;
    if (block.p) return <p key={i} className="legal-p">{block.p}</p>;
    if (block.ul) return <ul key={i} className="legal-ul">{block.ul.map((item, j) => <li key={j}>{item}</li>)}</ul>;
    return null;
  });
}
 
function LegalLayout({ eyebrow, title, sections, downloadHref, onNavigate, docKey }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const otherDocs = [
    { key: "privacy", label: "Privacy Policy", icon: ShieldCheck },
    { key: "terms", label: "Terms & Conditions", icon: ScrollText },
    { key: "refund", label: "Refund Policy", icon: RotateCcw },
  ];
  return (
    <section className="legal-page">
      <NebulaCanvas tint="blue" />
      <div className="wrap legal-wrap">
        <div className="legal-breadcrumb">
          <button onClick={() => onNavigate("legal")}>Legal &amp; Policies</button>
          <CaretRight size={13} /> <span>{title}</span>
        </div>
        <div className="legal-grid">
          <aside className="legal-sidebar">
            <div className="legal-sidebar-block">
              <h4>Our Policies</h4>
              <ul>
                {otherDocs.map((d) => {
                  const Icon = d.icon;
                  return (
                    <li key={d.key}>
                      <button className={docKey === d.key ? "active" : ""} onClick={() => onNavigate(d.key)}>
                        <Icon size={15} strokeWidth={1.8} /> {d.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="legal-sidebar-block">
              <h4>On this page</h4>
              <ul className="legal-toc">
                {sections.map((s) => (
                  <li key={s.id}><button onClick={() => scrollTo(s.id)}>{s.title}</button></li>
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
                <a href={downloadHref} className="legal-download"><Download size={14} strokeWidth={2} /> Download as Word document</a>
              </div>
            </Reveal>
            {sections.map((s, i) => (
              <Reveal key={s.id} delay={Math.min(i * 30, 200)}>
                <div id={s.id} className="legal-section">
                  <h2>{s.title}</h2>
                  {renderBody(s.body)}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
 
/* ------------------------------------------------------------------ */
/*  Legal hub page                                                     */
/* ------------------------------------------------------------------ */
function LegalHub({ onNavigate }) {
  const docs = [
    { key: "privacy", icon: ShieldCheck, title: "Privacy Policy", copy: "How we collect, use, and protect your personal data across Rovestacks products, and the rights you have over it." },
    { key: "terms", icon: ScrollText, title: "Terms & Conditions", copy: "The agreement that governs your use of Rovenet, including listings, payments, social tasks, games, and withdrawals." },
    { key: "refund", icon: RotateCcw, title: "Refund Policy", copy: "When payments for promotion packages and social task deposits are, and are not, refundable." },
  ];
  return (
    <section className="legal-hub">
      <NebulaCanvas tint="blue" />
      <HexScatter opacity={0.3} />
      <div className="wrap">
        <Reveal className="section-head" style={{ textAlign: "center", margin: "0 auto" }}>
          <span className="eyebrow blue">Legal &amp; Policies</span>
          <h1 style={{ fontSize: "clamp(2rem,4vw,2.8rem)", marginTop: 14 }}>How <Wordmark /> operates, in plain terms.</h1>
          <p style={{ marginTop: 16, color: "var(--muted)", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            These documents govern your relationship with Rovestacks and the Rovenet application. We've written them to be as clear as a legal document can be &mdash; read them in full below, or download a copy for your records.
          </p>
        </Reveal>
        <div className="legal-hub-grid">
          {docs.map((d, i) => {
            const Icon = d.icon;
            return (
              <Reveal key={d.key} delay={i * 90}>
                <button className="legal-hub-card" onClick={() => onNavigate(d.key)}>
                  <div className="legal-hub-icon"><Icon size={22} strokeWidth={1.8} /></div>
                  <h3>{d.title}</h3>
                  <p>{d.copy}</p>
                  <span className="legal-hub-link">Read policy <ChevronRight size={15} /></span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
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
  const handleWaitlist = (e) => { e.preventDefault(); if (email.trim()) setJoined(true); };
 
  const rovenetFeatures = [
    { icon: Store, title: "Marketplace", copy: "Post and browse Vehicles, Property, Electronics, Fashion, Services, and Jobs \u2014 free to list, with no commission taken on sales between users." },
    { icon: Share2, title: "Social Tasks", copy: "Connect a verified social account and get paid to like, follow, comment, or share content on behalf of advertisers." },
    { icon: Gamepad2, title: "Games & Rewards", copy: "Play built-in games such as Treasure Maze and Trivia for a chance to earn additional in-app rewards." },
    { icon: Wallet, title: "Earnings & Rewards", copy: "Redeem your in-app earnings instantly as airtime and data through our VTU integration." },
  ];
  const whyItems = [
    { icon: Lock, tag: "Secure", copy: "Passcode-protected access and encrypted transactions safeguard your account and wallet at every step.", shot: ASSET.shotPasscode },
    { icon: Zap, tag: "Fast", copy: "Engineered to remain responsive even on average Nigerian mobile network conditions." },
    { icon: Globe2, tag: "Built for Nigeria & Africa", copy: "Naira-denominated pricing, local categories, and pickup-based workflows designed around how people actually trade here." },
    { icon: Users2, tag: "Community-driven", copy: "Product decisions are shaped directly by feedback from the people already buying, selling, and earning on Rovenet." },
  ];
  const categories = ["Vehicles", "Property", "Phones & Tablets", "Electronics", "Home & Furniture", "Beauty & Personal", "Services", "Repair & Construction", "Commercial Equipment", "Leisure & Activities", "Babies & Kids", "Food & Agriculture", "Animals & Pets", "Jobs", "Seeking Work \u2014 CVs", "Fashion"];
  const showcaseTabs = [
    { key: "home", label: "Home", icon: Store, shot: ASSET.shotHome, copy: "A single feed for local promotions, ongoing social tasks, and games." },
    { key: "market", label: "Marketplace", icon: MapPin, shot: ASSET.shotMarket, copy: "Sixteen categories covering products, services, and jobs \u2014 browse or post in seconds." },
    { key: "social", label: "Earn", icon: Share2, shot: ASSET.shotSocial, copy: "Verify a social account with 1,000+ followers and start getting paid for genuine engagement." },
    { key: "games", label: "Games", icon: Gamepad2, shot: ASSET.shotHomeGames, copy: "Chase rewards through Treasure Maze and Trivia \u2014 a fun, secondary way to earn." },
  ];
  const activeShowcase = showcaseTabs.find((t) => t.key === activeTab) || showcaseTabs[0];
 
  return (
    <div className="rs-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Michroma&family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
 
        .rs-root{
          --violet:#8B5CF6; --violet-deep:#5B21B6; --violet-light:#C4B0FF;
          --pink:#EC4899; --blue:#3B82F6; --blue-deep:#1D4ED8; --blue-light:#9DBBFF;
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
        .eyebrow{ font-family:var(--mono); font-size:12px; letter-spacing:0.14em; text-transform:uppercase; display:inline-flex; align-items:center; gap:8px; color: var(--violet-light); }
        .eyebrow.blue{ color: var(--blue-light); }
        .eyebrow::before{ content:''; width:16px; height:1.5px; background:currentColor; display:inline-block; }
        h1,h2,h3{ font-family: var(--display); letter-spacing:-0.01em; margin:0; color:var(--white); }
        section{ position:relative; }
 
        .wordmark{ font-family:'Michroma', sans-serif; letter-spacing:0.03em; font-weight:400;
          background: linear-gradient(90deg,#8FBBFF,var(--blue)); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .wordmark .lambda{ display:inline-block; }
 
        .logo{ display:flex; align-items:center; gap:10px; font-size:16px; white-space:nowrap; cursor:pointer; }
        .logo img{ width:28px; height:28px; border-radius:8px; object-fit:contain; }
        .logo-rovenet{ display:flex; align-items:center; gap:8px; font-family:var(--display); font-weight:700; font-size:19px; }
        .logo-rovenet img{ width:26px; height:26px; border-radius:50%; }
        .logo-rovenet .rove{ color:var(--white); } .logo-rovenet .net{ color:var(--violet-light); }
 
        header{ position:fixed; top:0; left:0; right:0; z-index:50; background:rgba(10,10,18,0.82); backdrop-filter:blur(10px); border-bottom:1px solid var(--line); }
        .nav{ display:flex; align-items:center; justify-content:space-between; padding:14px 32px; max-width:1180px; margin:0 auto; }
        .nav-links{ display:flex; align-items:center; gap:26px; list-style:none; margin:0; padding:0; }
        .nav-links button.link, .nav-links a.link{ background:none; border:none; font-size:14px; font-weight:500; color: var(--muted); cursor:pointer; transition:color .2s ease; }
        .nav-links button.link:hover, .nav-links a.link:hover, .nav-links button.link.active{ color: var(--white); }
        .nav-cta{ background: linear-gradient(120deg,var(--violet),var(--violet-deep)); color:#fff !important; padding:10px 20px; border-radius:100px; font-weight:600; font-size:13.5px; border:none; cursor:pointer; display:inline-flex; align-items:center; gap:8px; transition:transform .2s ease, box-shadow .2s ease; }
        .nav-cta:hover{ transform:translateY(-1px); box-shadow:0 8px 20px rgba(139,92,246,0.4); }
        .nav-toggle{ display:none; background:none; border:none; cursor:pointer; color:var(--white); }
        .mobile-links{ display:none; }
        @media (max-width:960px){ .nav-links{ display:none; } .nav-toggle{ display:block; }
          .mobile-links.open{ display:flex; flex-direction:column; gap:16px; padding:20px 32px 26px; background:var(--bg); border-bottom:1px solid var(--line); } }
 
        .btn{ display:inline-flex; align-items:center; gap:9px; padding:15px 26px; border-radius:100px; font-weight:600; font-size:15px; cursor:pointer; border:1px solid transparent; transition:transform .2s ease, box-shadow .2s ease, background .2s ease; }
        .btn-violet{ background: linear-gradient(120deg,var(--violet),var(--violet-deep)); color:#fff; }
        .btn-violet:hover{ transform:translateY(-2px); box-shadow:0 12px 28px rgba(139,92,246,0.4); }
        .btn-ghost{ border-color:rgba(245,243,255,0.28); color:var(--white); }
        .btn-ghost:hover{ border-color:#fff; transform:translateY(-2px); }
        .btn-blue{ background: linear-gradient(120deg,var(--blue),var(--blue-deep)); color:#fff; }
        .btn-blue:hover{ transform:translateY(-2px); box-shadow:0 12px 28px rgba(59,130,246,0.4); }
 
        .hero{ position:relative; padding:168px 0 110px; overflow:hidden; background: radial-gradient(1100px 620px at 15% -10%, #1E1035, var(--bg) 62%); }
        .nebula-canvas{ position:absolute; inset:0; width:100%; height:100%; }
        .hex-scatter{ position:absolute; width:100%; height:100%; color:rgba(245,243,255,0.5); pointer-events:none; }
        .hero-grid{ position:relative; z-index:2; display:grid; grid-template-columns:1.15fr 0.85fr; gap:40px; align-items:center; }
        .hero h1{ font-size:clamp(2.2rem, 4.4vw, 3.5rem); line-height:1.1; margin-top:18px; }
        .hero h1 span{ background:linear-gradient(90deg,#C4B0FF,#EC4899); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .hero p.lede{ margin-top:20px; font-size:17px; color: var(--muted); max-width:540px; line-height:1.6; }
        .hero-ctas{ display:flex; gap:14px; margin-top:34px; flex-wrap:wrap; }
        @media (max-width:920px){ .hero-grid{ grid-template-columns:1fr; } .hero-phone-col{ order:-1; max-width:260px; margin:0 auto; } }
 
        .vision{ padding:100px 0; background: var(--panel); }
        .vision-grid{ display:grid; grid-template-columns:0.9fr 1.1fr; gap:56px; align-items:center; }
        .vision h2{ font-size:clamp(1.8rem,3vw,2.4rem); margin-top:14px; line-height:1.2; }
        .vision p{ margin-top:16px; color: var(--muted); font-size:15.5px; max-width:500px; line-height:1.7; }
        .vision-mark{ display:flex; align-items:center; justify-content:center; position:relative; aspect-ratio:1/1; }
        .vision-mark img{ width:78%; filter:drop-shadow(0 30px 60px rgba(59,130,246,0.25)); }
        .vision-spheres{ display:flex; gap:12px; flex-wrap:wrap; margin-top:22px; }
        .sphere-chip{ font-family:var(--mono); font-size:12px; padding:8px 14px; border-radius:100px; border:1px solid var(--line); color: var(--muted); }
        @media (max-width:900px){ .vision-grid{ grid-template-columns:1fr; } .vision-mark{ max-width:280px; margin:0 auto; order:-1; } }
 
        /* ---------- Products page ---------- */
        .products-page{ padding:168px 0 100px; background: var(--bg); position:relative; overflow:hidden; }
        .product-grid{ display:grid; grid-template-columns:1.1fr 0.9fr; gap:0; margin-top:56px; border:1px solid var(--line); border-radius:24px; overflow:hidden; background: var(--panel); }
        .product-copy{ padding:44px; display:flex; flex-direction:column; justify-content:center; }
        .product-badge{ display:inline-flex; align-items:center; gap:7px; font-family:var(--mono); font-size:11.5px; letter-spacing:0.08em; text-transform:uppercase; color:#7CE7A8; background:rgba(58,196,120,0.12); border:1px solid rgba(58,196,120,0.3); padding:6px 12px; border-radius:100px; width:fit-content; }
        .product-copy h3{ font-size:26px; margin-top:16px; }
        .product-copy p{ margin-top:12px; color: var(--muted); font-size:15px; line-height:1.7; }
        .product-shot{ position:relative; background: radial-gradient(circle at 50% 30%, #2A1245, var(--panel-2)); display:flex; align-items:center; justify-content:center; padding:40px 0; }
        .future-row{ display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:24px; }
        .future-card{ border:1px dashed var(--line); border-radius:16px; padding:26px 22px; text-align:center; color: var(--muted); }
        .future-card .dot{ width:8px; height:8px; border-radius:50%; background: var(--blue-light); margin:0 auto 14px; }
        @media (max-width:860px){ .product-grid{ grid-template-columns:1fr; } .future-row{ grid-template-columns:1fr; } }
 
        .rovenet-teaser{ padding:100px 0; background: var(--bg); }
        .section-head{ max-width:640px; }
        .section-head h2{ font-size:clamp(1.8rem,3vw,2.4rem); margin-top:14px; }
        .section-head p{ margin-top:14px; color: var(--muted); font-size:15.5px; line-height:1.7; }
        .feature-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:18px; margin-top:48px; }
        .feature-card{ background: var(--panel); border:1px solid var(--line); border-radius:18px; padding:26px 22px; transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
        .feature-card:hover{ transform:translateY(-6px); box-shadow:0 18px 36px rgba(139,92,246,0.18); border-color:rgba(139,92,246,0.4); }
        .feature-icon{ width:42px; height:42px; border-radius:11px; background: rgba(139,92,246,0.14); display:flex; align-items:center; justify-content:center; margin-bottom:16px; }
        .feature-icon svg{ stroke: var(--violet-light); }
        .feature-card h3{ font-size:16.5px; font-weight:700; font-family:var(--body); }
        .feature-card p{ margin-top:9px; font-size:13.8px; color: var(--muted); line-height:1.6; }
        @media (max-width:980px){ .feature-grid{ grid-template-columns:repeat(2,1fr); } }
        @media (max-width:560px){ .feature-grid{ grid-template-columns:1fr; } }
        .teaser-strip{ display:flex; gap:20px; margin-top:56px; overflow-x:auto; padding-bottom:8px; }
        .teaser-strip img{ height:340px; border-radius:22px; border:1px solid var(--line); flex-shrink:0; }
        .explore-link{ display:inline-flex; align-items:center; gap:8px; margin-top:34px; color: var(--violet-light); font-weight:600; font-size:14.5px; background:none; border:none; cursor:pointer; }
        .explore-link:hover{ gap:12px; }
 
        .why{ padding:100px 0; background: var(--panel); }
        .why-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:18px; margin-top:48px; }
        .why-card{ padding:26px 22px; border-radius:18px; border:1px solid var(--line); background: var(--bg); transition:transform .25s ease, box-shadow .25s ease; overflow:hidden; }
        .why-card:hover{ transform:translateY(-6px); box-shadow:0 18px 36px rgba(139,92,246,0.15); }
        .why-icon{ width:40px; height:40px; border-radius:11px; background: linear-gradient(120deg,var(--violet),var(--violet-deep)); display:flex; align-items:center; justify-content:center; margin-bottom:14px; }
        .why-icon svg{ stroke:#fff; }
        .why-card h3{ font-size:15.5px; font-family:var(--body); font-weight:700; }
        .why-card p{ margin-top:8px; font-size:13.3px; color: var(--muted); line-height:1.6; }
        .why-shot{ margin-top:14px; border-radius:12px; width:100%; border:1px solid var(--line); }
        @media (max-width:980px){ .why-grid{ grid-template-columns:repeat(2,1fr); } }
        @media (max-width:560px){ .why-grid{ grid-template-columns:1fr; } }
 
        .soon{ padding:90px 0; background: var(--bg); text-align:center; position:relative; overflow:hidden; }
        .soon-threads{ position:absolute; inset:0; opacity:0.5; }
        .soon .inner{ position:relative; z-index:2; }
        .soon h2{ margin-top:14px; font-size:clamp(1.6rem,3vw,2.2rem); }
        .soon p{ margin-top:14px; color: var(--muted); font-size:15.5px; max-width:560px; margin-left:auto; margin-right:auto; line-height:1.7; }
 
        .cta-band{ background: linear-gradient(120deg,var(--violet),var(--violet-deep)); padding:64px 0; text-align:center; }
        .cta-band h2{ font-size:clamp(1.5rem,3vw,2rem); }
        .cta-band p{ margin-top:12px; color:rgba(255,255,255,0.82); font-size:15px; }
        .cta-form{ margin-top:28px; display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
        .cta-form input{ padding:14px 18px; border-radius:100px; border:1px solid rgba(255,255,255,0.4); background:rgba(255,255,255,0.12); color:#fff; font-size:14.5px; min-width:270px; }
        .cta-form input::placeholder{ color:rgba(255,255,255,0.7); }
        .cta-form button{ background:#fff; color: var(--violet-deep); }
        .joined-msg{ margin-top:20px; font-size:14.5px; font-weight:600; }
 
        footer{ background: var(--bg); color: var(--muted); padding:60px 0 26px; border-top:1px solid var(--line); }
        .footer-top{ display:flex; justify-content:space-between; gap:40px; flex-wrap:wrap; padding-bottom:40px; border-bottom:1px solid var(--line); }
        .footer-brand p{ max-width:290px; font-size:13.3px; margin-top:12px; line-height:1.7; }
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
 
        .phone-wrap{ position:relative; display:flex; justify-content:center; }
        .phone-glow{ position:absolute; width:260px; height:260px; border-radius:50%; background: radial-gradient(circle, rgba(139,92,246,0.35), transparent 70%); filter:blur(8px); z-index:0; }
        .phone{ position:relative; z-index:1; width:230px; border-radius:34px; padding:10px; background: linear-gradient(160deg,#22203a,#0c0b16); box-shadow:0 30px 60px rgba(0,0,0,0.5); transition:transform .4s ease, box-shadow .4s ease; }
        .phone:hover{ transform:perspective(900px) rotateY(-6deg) rotateX(3deg) translateY(-4px); box-shadow:0 40px 70px rgba(0,0,0,0.6); }
        .phone-notch{ width:60px; height:5px; border-radius:100px; background:rgba(255,255,255,0.18); margin:0 auto 8px; }
        .phone-screen{ border-radius:24px; overflow:hidden; background:#000; }
        .phone-screen img{ width:100%; display:block; }
 
        .showcase{ padding:100px 0; background: var(--panel); }
        .showcase-grid{ display:grid; grid-template-columns:0.8fr 1.2fr; gap:50px; align-items:center; margin-top:48px; }
        .showcase-tabs{ display:flex; flex-direction:column; gap:10px; }
        .showcase-tab{ display:flex; align-items:center; gap:12px; padding:14px 16px; border-radius:14px; border:1px solid var(--line); background: var(--bg); font-weight:600; font-size:14px; color: var(--muted); cursor:pointer; text-align:left; transition:all .2s ease; }
        .showcase-tab svg{ stroke: var(--muted); transition:stroke .2s ease; flex-shrink:0; }
        .showcase-tab.active{ background: linear-gradient(120deg,var(--violet),var(--violet-deep)); color:#fff; border-color:transparent; box-shadow:0 10px 24px rgba(139,92,246,0.32); }
        .showcase-tab.active svg{ stroke:#fff; }
        .showcase-copy{ margin-top:8px; color: var(--muted); font-size:14px; max-width:320px; line-height:1.6; }
        @media (max-width:900px){ .showcase-grid{ grid-template-columns:1fr; } .showcase-tabs{ flex-direction:row; flex-wrap:wrap; } }
 
        .cat-section{ padding:90px 0; background: var(--bg); }
        .cat-cloud{ display:flex; flex-wrap:wrap; gap:12px; margin-top:40px; }
        .cat-chip{ padding:11px 18px; border-radius:100px; border:1px solid var(--line); font-size:13.5px; color: var(--white); background: var(--panel); transition:all .2s ease; }
        .cat-chip:hover{ border-color: var(--violet); background: rgba(139,92,246,0.12); transform:translateY(-2px); }
 
        .rn-hero{ position:relative; padding:168px 0 100px; overflow:hidden; background: radial-gradient(1100px 620px at 85% -10%, #2A1245, var(--bg) 62%); }
        .rn-hero-grid{ position:relative; z-index:2; display:grid; grid-template-columns:1.1fr 0.9fr; gap:40px; align-items:center; }
        .rn-hero h1{ font-size:clamp(2.1rem,4.2vw,3.3rem); line-height:1.1; margin-top:16px; }
        .rn-hero p.lede{ margin-top:18px; color: var(--muted); font-size:16.5px; max-width:490px; line-height:1.7; }
        .back-link{ display:inline-flex; align-items:center; gap:8px; font-size:13.5px; color: var(--muted); background:none; border:none; cursor:pointer; margin-bottom:18px; }
        .back-link:hover{ color: var(--white); }
        @media (max-width:920px){ .rn-hero-grid{ grid-template-columns:1fr; } .rn-hero .phone-wrap{ max-width:260px; margin:0 auto; order:-1; } }
 
        .earn{ padding:100px 0; background: var(--panel); }
        .earn-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:48px; }
        .earn-card{ background: var(--bg); border:1px solid var(--line); border-radius:20px; overflow:hidden; transition:transform .25s ease, box-shadow .25s ease; }
        .earn-card:hover{ transform:translateY(-6px); box-shadow:0 18px 36px rgba(139,92,246,0.18); }
        .earn-card img{ width:100%; height:220px; object-fit:cover; object-position:top; border-bottom:1px solid var(--line); }
        .earn-card .earn-body{ padding:22px; }
        .earn-card h3{ font-size:16px; font-family:var(--body); font-weight:700; }
        .earn-card p{ margin-top:8px; font-size:13.5px; color: var(--muted); line-height:1.6; }
        @media (max-width:900px){ .earn-grid{ grid-template-columns:1fr; } }
 
        .store-row{ display:flex; gap:14px; flex-wrap:wrap; margin-top:34px; }
        .store-btn{ display:flex; align-items:center; gap:10px; padding:12px 20px; border-radius:14px; border:1px solid var(--line); background: var(--panel); }
        .store-btn svg{ stroke: var(--violet-light); }
        .store-btn .lines{ display:flex; flex-direction:column; }
        .store-btn .lines span:first-child{ font-size:10.5px; color: var(--muted); }
        .store-btn .lines span:last-child{ font-size:14px; font-weight:700; }
 
        /* ---------- Legal hub + pages (Facebook-style, re-themed) ---------- */
        .legal-hub{ padding:168px 0 110px; position:relative; overflow:hidden; }
        .legal-hub-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:56px; position:relative; z-index:2; }
        .legal-hub-card{ text-align:left; background: var(--panel); border:1px solid var(--line); border-radius:18px; padding:30px 26px; cursor:pointer; transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
        .legal-hub-card:hover{ transform:translateY(-6px); box-shadow:0 18px 36px rgba(59,130,246,0.18); border-color: rgba(59,130,246,0.4); }
        .legal-hub-icon{ width:44px; height:44px; border-radius:12px; background: rgba(59,130,246,0.14); display:flex; align-items:center; justify-content:center; margin-bottom:18px; }
        .legal-hub-icon svg{ stroke: var(--blue-light); }
        .legal-hub-card h3{ font-size:18px; font-family:var(--body); font-weight:700; }
        .legal-hub-card p{ margin-top:10px; font-size:13.8px; color: var(--muted); line-height:1.6; }
        .legal-hub-link{ display:inline-flex; align-items:center; gap:6px; margin-top:18px; color: var(--blue-light); font-weight:600; font-size:13.5px; }
        @media (max-width:900px){ .legal-hub-grid{ grid-template-columns:1fr; } }
 
        .legal-page{ padding:150px 0 100px; background: var(--bg); position:relative; overflow:hidden; }
        .legal-wrap{ position:relative; z-index:2; }
        .legal-breadcrumb{ display:flex; align-items:center; gap:6px; font-size:12.5px; color: var(--muted); margin-bottom:30px; }
        .legal-breadcrumb button{ background:none; border:none; color: var(--muted); cursor:pointer; padding:0; }
        .legal-breadcrumb button:hover{ color: var(--blue-light); }
        .legal-breadcrumb span{ color: var(--white); }
        .legal-grid{ display:grid; grid-template-columns:260px 1fr; gap:56px; align-items:start; }
        .legal-sidebar{ position:sticky; top:100px; display:flex; flex-direction:column; gap:28px; }
        .legal-sidebar-block h4{ font-family:var(--mono); font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color: var(--muted); margin-bottom:12px; }
        .legal-sidebar-block ul{ list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:4px; }
        .legal-sidebar-block button{ width:100%; text-align:left; background:none; border:none; padding:9px 12px; border-radius:10px; font-size:13px; color: var(--muted); cursor:pointer; display:flex; align-items:center; gap:8px; transition:all .2s ease; }
        .legal-sidebar-block button:hover{ background: var(--panel); color: var(--white); }
        .legal-sidebar-block button.active{ background: rgba(59,130,246,0.14); color: var(--blue-light); font-weight:600; }
        .legal-toc button{ font-size:12.5px; line-height:1.4; }
        .legal-content{ background: var(--panel); border:1px solid var(--line); border-radius:22px; padding:48px 52px; }
        .legal-title{ font-size:clamp(1.8rem,3.2vw,2.4rem); margin-top:14px; }
        .legal-meta{ display:flex; align-items:center; gap:20px; flex-wrap:wrap; margin:18px 0 40px; padding-bottom:24px; border-bottom:1px solid var(--line); font-size:13px; color: var(--muted); }
        .legal-download{ display:inline-flex; align-items:center; gap:7px; color: var(--blue-light); font-weight:600; }
        .legal-download:hover{ text-decoration:underline; }
        .legal-section{ margin-bottom:38px; }
        .legal-section h2{ font-size:19px; color: var(--violet-light); margin-bottom:14px; scroll-margin-top:100px; }
        .legal-subhead{ font-family:var(--body); font-size:14.5px; font-weight:700; color: var(--white); margin:18px 0 8px; }
        .legal-p{ font-size:14.5px; color:#D8D5E8; line-height:1.75; margin-bottom:12px; }
        .legal-ul{ margin:0 0 12px; padding-left:20px; display:flex; flex-direction:column; gap:8px; }
        .legal-ul li{ font-size:14.5px; color:#D8D5E8; line-height:1.65; }
        @media (max-width:900px){ .legal-grid{ grid-template-columns:1fr; } .legal-sidebar{ position:static; flex-direction:row; flex-wrap:wrap; } .legal-content{ padding:32px 24px; } }
      `}</style>
 
      {/* ================= HEADER ================= */}
      <header>
        <nav className="nav">
          <div className="logo" onClick={() => goto("home")}>
            <img src={ASSET.rovestacksLogo} alt="Rovestacks logo" />
            <Wordmark />
          </div>
          <ul className="nav-links">
            <li><button className={`link ${page === "home" ? "active" : ""}`} onClick={() => goto("home")}>Home</button></li>
            <li><button className={`link ${page === "products" ? "active" : ""}`} onClick={() => goto("products")}>Products</button></li>
            <li><button className={`link ${page === "rovenet" ? "active" : ""}`} onClick={() => goto("rovenet")}>Rovenet</button></li>
            <li><button className={`link ${["legal","privacy","terms","refund"].includes(page) ? "active" : ""}`} onClick={() => goto("legal")}>Legal</button></li>
            <li><a href="#waitlist" className="nav-cta">Join Waitlist</a></li>
          </ul>
          <button className="nav-toggle" onClick={() => setNavOpen(!navOpen)} aria-label="Toggle menu">
            {navOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
        <div className={`mobile-links ${navOpen ? "open" : ""}`}>
          <button className="link" onClick={() => goto("home")}>Home</button>
          <button className="link" onClick={() => goto("products")}>Products</button>
          <button className="link" onClick={() => goto("rovenet")}>Rovenet</button>
          <button className="link" onClick={() => goto("legal")}>Legal</button>
          <a href="#waitlist" className="nav-cta" style={{ width: "fit-content" }} onClick={() => setNavOpen(false)}>Join Waitlist</a>
        </div>
      </header>
 
      {page === "home" && (
        <>
          <section className="hero" id="top">
            <NebulaCanvas tint="blue" />
            <HexScatter opacity={0.35} />
            <div className="wrap hero-grid">
              <div>
                <span className="eyebrow blue">The company behind Rovenet</span>
                <h1>Building Africa's <span>Connected</span> Digital Ecosystem</h1>
                <p className="lede">
                  <Wordmark /> is a Nigerian technology innovation company building digital products across
                  commerce, media, and everyday life. We design each product to stand on its own, while
                  sharing one foundation of trust, security, and community underneath. Our first product,
                  Rovenet, is live today &mdash; a classifieds, marketplace, and social-earning app already
                  helping thousands of Nigerians buy, sell, and earn.
                </p>
                <div className="hero-ctas">
                  <a href="#waitlist" className="btn btn-blue"><Download size={18} strokeWidth={2} /> Download Rovenet</a>
                  <button className="btn btn-ghost" onClick={() => goto("products")}>Our Products <ArrowRight size={17} strokeWidth={2} /></button>
                </div>
              </div>
              <div className="hero-phone-col">
                <PhoneShot src={ASSET.shotHome} alt="Rovenet home screen showing wallet balance and Social Hunt tasks" />
              </div>
            </div>
          </section>
 
          <section className="vision" id="vision">
            <div className="wrap vision-grid">
              <Reveal className="vision-mark"><img src={ASSET.rovestacksLogo} alt="Rovestacks orbit mark" /></Reveal>
              <Reveal delay={100}>
                <span className="eyebrow blue">What is Rovestacks?</span>
                <h2>One company, an orbit of connected products.</h2>
                <p>
                  <Wordmark /> is the trading name of Rovestacks Technologies Limited (RC 9619939), registered
                  with the Corporate Affairs Commission of Nigeria to develop software, mobile applications,
                  and digital platforms, and to operate and manage online ecosystems more broadly. That mandate
                  is intentionally wide: we exist to build technology for every sphere of everyday life, not to
                  remain a single-product company.
                </p>
                <p>
                  Our long-term roadmap spans gaming, marketplaces, transport and logistics, and security &mdash;
                  each conceived as its own product, sharing one account, one trust layer, and one community
                  wherever it makes sense to. Rovenet is the first of these products to launch, and the one
                  we are entirely focused on today.
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
                <h2>Nigeria's classifieds &amp; earning app, in your pocket.</h2>
                <p>Post listings, connect your social accounts to earn, play games for rewards, and cash out &mdash; all from one app.</p>
              </Reveal>
              <div className="feature-grid">
                {rovenetFeatures.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <Reveal key={f.title} delay={i * 80}>
                      <div className="feature-card">
                        <div className="feature-icon"><Icon size={20} strokeWidth={1.8} /></div>
                        <h3>{f.title}</h3><p>{f.copy}</p>
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
                <button className="explore-link" onClick={() => goto("rovenet")}>See everything Rovenet can do <ChevronRight size={16} /></button>
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
                {whyItems.map((w, i) => {
                  const Icon = w.icon;
                  return (
                    <Reveal key={w.tag} delay={i * 80}>
                      <div className="why-card">
                        <div className="why-icon"><Icon size={19} strokeWidth={1.8} /></div>
                        <h3>{w.tag}</h3><p>{w.copy}</p>
                        {w.shot && <img className="why-shot" src={w.shot} alt="Rovenet passcode security screen" />}
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
 
          <section className="soon">
            <div className="soon-threads"><NebulaCanvas tint="violet" /></div>
            <div className="wrap inner">
              <Reveal>
                <span className="eyebrow">Coming Soon</span>
                <h2>More is on the way.</h2>
                <p>Rovenet is the first thread in the Rovestacks network. We're already building what comes next, on the same foundation of trust and community.</p>
              </Reveal>
            </div>
          </section>
        </>
      )}
 
      {page === "products" && (
        <section className="products-page">
          <NebulaCanvas tint="blue" />
          <HexScatter opacity={0.3} />
          <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
            <Reveal className="section-head">
              <span className="eyebrow blue">Our Products</span>
              <h1 style={{ fontSize: "clamp(2rem,4vw,2.8rem)", marginTop: 14 }}>One roadmap, an orbit of products.</h1>
              <p style={{ marginTop: 16, color: "var(--muted)", fontSize: 16, lineHeight: 1.7 }}>
                <Wordmark /> is built to house more than one product. Rovenet is our flagship and the only
                product live today &mdash; the ones below it are the spheres of everyday life we intend to
                build into next.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div className="product-grid">
                <div className="product-copy">
                  <span className="product-badge">&#9679; Live now</span>
                  <div className="logo-rovenet" style={{ marginTop: 18 }}>
                    <img src={ASSET.rovenetCircle} alt="Rovenet logo" />
                    <span><span className="rove">Rove</span><span className="net">Net</span></span>
                  </div>
                  <h3>Nigeria's classifieds, marketplace &amp; earning app.</h3>
                  <p>List anything from vehicles to fashion for free, get paid for social media tasks, play in-app games, and redeem your earnings as VTU.</p>
                  <button className="btn btn-violet" style={{ marginTop: 20, width: "fit-content" }} onClick={() => goto("rovenet")}>Explore Rovenet <ArrowRight size={16} /></button>
                </div>
                <div className="product-shot"><PhoneShot src={ASSET.shotMarket} alt="Rovenet marketplace categories" /></div>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <h3 style={{ marginTop: 64, fontSize: 20 }}>What's next in the orbit</h3>
              <div className="future-row">
                <div className="future-card"><div className="dot" /><strong style={{ color: "var(--white)" }}>Games</strong><p style={{ marginTop: 6, fontSize: 13.5 }}>In active development</p></div>
                <div className="future-card"><div className="dot" /><strong style={{ color: "var(--white)" }}>Transport &amp; Logistics</strong><p style={{ marginTop: 6, fontSize: 13.5 }}>On our roadmap</p></div>
                <div className="future-card"><div className="dot" /><strong style={{ color: "var(--white)" }}>Security</strong><p style={{ marginTop: 6, fontSize: 13.5 }}>On our roadmap</p></div>
              </div>
            </Reveal>
          </div>
        </section>
      )}
 
      {page === "rovenet" && (
        <>
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
                <span className="eyebrow" style={{ marginTop: 16 }}>A Rovestacks product</span>
                <h1>Buy, sell, earn &mdash; all in one app.</h1>
                <p className="lede">
                  Rovenet is Nigeria's local classifieds and social-earning app, built by Rovestacks. List
                  anything from cars to fashion for free, get paid for simple social media tasks, and play
                  games for extra rewards.
                </p>
                <div className="store-row">
                  <a href="#waitlist" className="store-btn"><Download size={20} /><span className="lines"><span>Get it on</span><span>Android</span></span></a>
                  <a href="#waitlist" className="store-btn"><Download size={20} /><span className="lines"><span>Coming soon on</span><span>iOS</span></span></a>
                </div>
              </div>
              <PhoneShot src={ASSET.shotHome} alt="Rovenet app home screen" />
            </div>
          </section>
 
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
                <Reveal delay={100}><PhoneShot src={activeShowcase.shot} alt={`Rovenet ${activeShowcase.label} screen`} /></Reveal>
              </div>
            </div>
          </section>
 
          <section className="cat-section">
            <div className="wrap">
              <Reveal className="section-head">
                <span className="eyebrow">MarketHub Categories</span>
                <h2>Sixteen categories, one classifieds board.</h2>
                <p>From vehicles and property to jobs and fashion &mdash; post what you have, find what you need.</p>
              </Reveal>
              <Reveal delay={100}><div className="cat-cloud">{categories.map((c) => <span className="cat-chip" key={c}>{c}</span>)}</div></Reveal>
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
                    <img src={ASSET.shotSocial} alt="Verify social accounts to earn" />
                    <div className="earn-body"><h3>Social Tasks</h3><p>Verify a social account with 1,000+ followers, then earn by liking, following, commenting, or posting adverts for brands.</p></div>
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <div className="earn-card">
                    <img src={ASSET.shotHomeGames} alt="Chase games section with Treasure Maze and Trivia" />
                    <div className="earn-body"><h3>Games &amp; Chase</h3><p>Play Treasure Maze or Trivia for a shot at extra rewards &mdash; our way of giving back to active users.</p></div>
                  </div>
                </Reveal>
                <Reveal delay={160}>
                  <div className="earn-card">
                    <img src={ASSET.shotListing} alt="Marketplace listing detail page" />
                    <div className="earn-body"><h3>Promoted Listings</h3><p>Sellers can pay to feature a listing for more visibility &mdash; powered by Paystack and Opay.</p></div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        </>
      )}
 
      {page === "legal" && <LegalHub onNavigate={goto} />}
      {page === "privacy" && <LegalLayout eyebrow="Legal & Policies" title="Privacy Policy" sections={PRIVACY_SECTIONS} downloadHref={DOCX.privacy} onNavigate={goto} docKey="privacy" />}
      {page === "terms" && <LegalLayout eyebrow="Legal & Policies" title="Terms & Conditions" sections={TERMS_SECTIONS} downloadHref={DOCX.terms} onNavigate={goto} docKey="terms" />}
      {page === "refund" && <LegalLayout eyebrow="Legal & Policies" title="Refund Policy" sections={REFUND_SECTIONS} downloadHref={DOCX.refund} onNavigate={goto} docKey="refund" />}
 
      <section className="cta-band" id="waitlist">
        <div className="wrap">
          <h2>Be first through the next door.</h2>
          <p>Join the waitlist and we'll let you know the moment there's more to try.</p>
          {!joined ? (
            <form className="cta-form" onSubmit={handleWaitlist}>
              <input type="email" required placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button type="submit" className="btn" style={{ background: "#fff", color: "#5B21B6" }}>Join Waitlist</button>
            </form>
          ) : (<p className="joined-msg">You're on the list &mdash; thanks for joining us early.</p>)}
        </div>
      </section>
 
      <footer>
        <div className="wrap">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="logo" onClick={() => goto("home")}><img src={ASSET.rovestacksLogo} alt="Rovestacks logo" /><Wordmark /></div>
              <p>A Nigerian technology innovation company building Africa's connected digital ecosystem, starting with Rovenet.</p>
            </div>
            <div className="footer-cols">
              <div className="footer-col">
                <h4>Company</h4>
                <ul>
                  <li><button onClick={() => goto("home")}>About</button></li>
                  <li><button onClick={() => goto("products")}>Products</button></li>
                  <li><button onClick={() => goto("rovenet")}>Rovenet</button></li>
                  <li><a href="#waitlist">Waitlist</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Legal &amp; Support</h4>
                <ul>
                  <li><a href="mailto:contact@rovestacks.com"><Mail size={13} strokeWidth={2} />Contact</a></li>
                  <li><button onClick={() => goto("privacy")}><ShieldCheck size={13} strokeWidth={2} />Privacy Policy</button></li>
                  <li><button onClick={() => goto("terms")}><ScrollText size={13} strokeWidth={2} />Terms &amp; Conditions</button></li>
                  <li><button onClick={() => goto("refund")}><RotateCcw size={13} strokeWidth={2} />Refund Policy</button></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2026 Rovestacks. All rights reserved.</span>
            <div className="social-row">
              <a href="https://x.com/rovestacks" aria-label="Twitter / X"><X size={15} strokeWidth={1.8} /></a>
              <a href="https://instagram.com/rovestacks" aria-label="Instagram"><Mail size={15} strokeWidth={1.8} /></a>
              {/* <a href="https://linkedin.com/company/rovestacks" aria-label="LinkedIn"><Linkedin size={15} strokeWidth={1.8} /></a> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}