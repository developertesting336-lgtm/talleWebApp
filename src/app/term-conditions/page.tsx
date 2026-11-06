import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Term & Conditions",
  description: "The terms and conditions that govern your use of the Tallee app, website, and related services.",
  alternates: { canonical: "/term-conditions" },
};

export default function TermsPage() {
  return (
    <LegalPage titleSize="sm" name="Terms & Conditions" path="/term-conditions">
      <h1>Tallee – Terms and Conditions</h1>
      <p>
        Welcome to Tallee (“Tallee,” “we,” “us,” or “our”). These Terms and Conditions (“Terms”) govern your access to
        and use of the Tallee mobile application, website, and related services (collectively, the “Service”).
      </p>
      <p>By accessing or using Tallee, you agree to be bound by these Terms. If you do not agree, do not use the Service.</p>

      <h3>1. About Tallee</h3>
      <p>
        Tallee is an AI-powered discovery platform that provides curated recommendations for bars, restaurants, lounges,
        and social venues based on user preferences, location, and occasion. Tallee does not own, operate, manage, or
        control any venues listed on the Service.
      </p>

      <h3>2. Eligibility</h3>
      <p>
        You must be at least 18 years old to use Tallee. By using the Service, you represent and warrant that you meet
        this requirement.
      </p>

      <h3>3. Account Registration</h3>
      <p>Certain features require creating an account. You agree to:</p>
      <ul>
        <li>Provide accurate, current, and complete information</li>
        <li>Maintain the confidentiality of your login credentials</li>
        <li>Accept responsibility for all activity under your account</li>
      </ul>
      <p>Tallee reserves the right to suspend or terminate accounts that violate these Terms.</p>

      <h3>4. Use of the Service</h3>
      <p>
        You agree to use Tallee only for lawful, personal, and non-commercial purposes unless expressly authorized by
        Tallee.
      </p>
      <p>You may not:</p>
      <ul>
        <li>Copy, scrape, reverse engineer, or reproduce content</li>
        <li>Use the Service to harass, mislead, or harm others</li>
        <li>Interfere with the operation or security of the Service</li>
        <li>Use Tallee for unauthorized commercial or promotional purposes</li>
      </ul>

      <h3>5. Recommendations Disclaimer</h3>
      <p>
        Tallee provides recommendations, not guarantees. Venue details including hours, pricing, dress codes,
        availability, and ambiance may change at any time.
      </p>
      <p>
        Tallee does not guarantee the accuracy or suitability of any venue. Users are responsible for verifying details
        directly with venues.
      </p>

      <h3>6. Premium Subscription &amp; Payments</h3>
      <p>
        Tallee offers a premium subscription that provides access to enhanced features, personalized recommendations, and
        exclusive content.
      </p>
      <ul>
        <li>Subscription pricing and features will be disclosed prior to purchase</li>
        <li>Subscriptions may renew automatically unless canceled</li>
        <li>Payments are non-refundable except where required by law</li>
        <li>Tallee may modify subscription features or pricing with notice</li>
      </ul>

      <h3>7. Intellectual Property</h3>
      <p>
        All content, trademarks, branding, algorithms, software, and design elements associated with Tallee are the
        exclusive property of Tallee or its licensors and are protected by intellectual property laws.
      </p>
      <p>You may not use Tallee’s name, logo, or proprietary materials without prior written consent.</p>

      {/* NOTE: the live Wix page has no section 8 — numbering kept as-is until the client confirms. */}
      <h3>9. Third-Party Services</h3>
      <p>
        Tallee may integrate or link to third-party services, including mapping, reservation, or payment platforms.
        Tallee is not responsible for third-party content, policies, or actions.
      </p>

      <h3>10. Limitation of Liability</h3>
      <p>To the maximum extent permitted by law:</p>
      <ul>
        <li>Tallee is not liable for indirect or consequential damages</li>
        <li>Tallee is not responsible for venue-related incidents or losses</li>
        <li>Use of the Service is at your own discretion and risk</li>
      </ul>

      <h3>11. Indemnification</h3>
      <p>
        You agree to indemnify and hold harmless Tallee from claims, damages, or expenses arising from your use of the
        Service or violation of these Terms.
      </p>

      <h3>12. Termination</h3>
      <p>Tallee may suspend or terminate your access to the Service at any time if you violate these Terms or misuse the platform.</p>

      <h3>13. Changes to These Terms</h3>
      <p>Tallee may update these Terms from time to time. Continued use of the Service constitutes acceptance of the updated Terms.</p>

      <h3>14. Governing Law</h3>
      <p>These Terms are governed by the laws of the State of Maryland, without regard to conflict-of-law principles.</p>

      <h3>15. Contact Us</h3>
      <p>Questions about these Terms?</p>
      {/* TODO(client): live site uses a personal Gmail address here — confirm whether to switch to contact@talleeknows.com */}
      <p>
        Reach out to: <a href="mailto:stylelynn@gmail.com">stylelynn@gmail.com</a>
      </p>
    </LegalPage>
  );
}
