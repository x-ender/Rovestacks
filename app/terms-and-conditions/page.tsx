import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";
import { TERMS_SECTIONS } from "../lib/legalContent";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The agreement that governs your use of Rovenet.",
};

export default function TermsAndConditionsPage() {
  return (
    <LegalLayout
      eyebrow="Legal & Policies"
      title="Terms & Conditions"
      sections={TERMS_SECTIONS}
      downloadHref="/documents/rovenet-terms-and-conditions.docx"
    />
  );
}
