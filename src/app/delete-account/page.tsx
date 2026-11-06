import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Delete account",
  description: "How to delete your Tallee account and associated data, from the app or by email.",
  alternates: { canonical: "/delete-account" },
};

// TODO(client): the live page uses a personal Gmail address and mentions
// "saved properties, listings" (template leftovers). Text kept identical until
// the client approves updated wording.
const deletionEmail = "stylelynn@gmail.com";

export default function DeleteAccountPage() {
  return (
    <LegalPage name="Delete Account" path="/delete-account">
      <h1>Tallee – Account Deletion Request</h1>
      <p>
        At Tallee, we respect your privacy and give you full control over your data. If you would like to delete your
        account and associated information, please follow the instructions below.
      </p>

      <h2>How to Delete Your Account</h2>

      <h3>Option 1: Delete from the App</h3>
      <ol>
        <li>Open the Tallee app</li>
        <li>Go to Profile → Settings</li>
        <li>Tap on “Delete Account”</li>
        <li>Confirm your request</li>
      </ol>

      <h3>Option 2: Request via Email</h3>
      <p>If you are unable to access the app, you can request account deletion by contacting us:</p>
      <p>
        Email:{" "}
        <a href={`mailto:${deletionEmail}?subject=${encodeURIComponent("Account Deletion Request")}`}>{deletionEmail}</a>
      </p>
      <p>Please include:</p>
      <ul>
        <li>Your registered email address</li>
        <li>Your account details (if available)</li>
        <li>Subject: Account Deletion Request</li>
      </ul>

      <h2>What Happens When You Delete Your Account</h2>
      <p>When you request account deletion:</p>
      <ul>
        <li>Your profile information will be removed</li>
        <li>Your account credentials will be deleted</li>
        <li>Your associated data (such as saved properties, listings, or preferences) will be deleted</li>
      </ul>

      <h2>Data Retention Policy</h2>
      <ul>
        <li>Some data may be retained for up to 30 days for legal, security, and fraud prevention purposes</li>
        <li>After this period, your data will be permanently deleted from our systems</li>
      </ul>

      <h2>Important Notes</h2>
      <ul>
        <li>Account deletion is permanent and cannot be undone</li>
        <li>Once deleted, you will not be able to recover your account or data</li>
        <li>If you have active transactions or services, we recommend resolving them before requesting deletion</li>
      </ul>

      <h2>Need Help?</h2>
      <p>If you have any questions or need assistance, feel free to contact us:</p>
      <p>
        📧 <a href={`mailto:${deletionEmail}`}>{deletionEmail}</a>
      </p>
    </LegalPage>
  );
}
