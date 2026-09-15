import type { Metadata } from "next";
import LegalLayout from "../components/LegalLayout";
import { REFUND_SECTIONS } from "../lib/legalContent";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "When payments for promotion packages and WhatsApp status ad campaign deposits are, and are not, refundable.",
};

export default function RefundPolicyPage() {
  return (
    <LegalLayout
      eyebrow="Legal & Policies"
      title="Refund Policy"
      sections={REFUND_SECTIONS}
      downloadHref="/documents/rovenet-refund-policy.docx"
    />
  );
}