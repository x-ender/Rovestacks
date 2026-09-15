import Link from "next/link";
import Image from "next/image";
import { Mail, ShieldCheck, ScrollText, RotateCcw, Twitter, Instagram, Linkedin } from "lucide-react";
import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <Image src="/images/rovestacks-logo.png" alt="Rovestacks logo" width={28} height={28} />
              <Wordmark />
            </Link>
            <p>
              A Nigerian technology innovation company building Africa&apos;s connected digital
              ecosystem, starting with Rovenet.
            </p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li>
                  <Link href="/">About</Link>
                </li>
                <li>
                  <Link href="/products">Products</Link>
                </li>
                <li>
                  <Link href="/rovenet">Rovenet</Link>
                </li>
                <li>
                  <a href="#waitlist">Waitlist</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal &amp; Support</h4>
              <ul>
                <li>
                  <a href="mailto:contact@rovestacks.com">
                    <Mail size={13} strokeWidth={2} />
                    Contact
                  </a>
                </li>
                <li>
                  <Link href="/privacy-policy">
                    <ShieldCheck size={13} strokeWidth={2} />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-and-conditions">
                    <ScrollText size={13} strokeWidth={2} />
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/refund-policy">
                    <RotateCcw size={13} strokeWidth={2} />
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Rovestacks Technologies Limited. All rights reserved.</span>
          <div className="social-row">
            <a href="#" aria-label="Twitter / X">
              <Twitter size={15} strokeWidth={1.8} />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram size={15} strokeWidth={1.8} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Linkedin size={15} strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
