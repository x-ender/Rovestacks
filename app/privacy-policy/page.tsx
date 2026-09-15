import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";
import { PRIVACY_SECTIONS } from "../lib/legalContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Rovestacks collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      eyebrow="Legal & Policies"
      title="Privacy Policy"
      sections={PRIVACY_SECTIONS}
      downloadHref="/documents/rovenet-privacy-policy.docx"
    />
  );
}
