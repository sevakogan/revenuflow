import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Privacy Policy | RevenuFlow",
  description:
    "RevenuFlow privacy policy covering data collection, SMS messaging consent, and information protection for short-term rental property managers.",
  alternates: {
    canonical: "https://revenuflow.vercel.app/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Logo />
          </Link>
          <Link
            href="/"
            className="text-slate-400 text-sm hover:text-white transition-colors"
          >
            &larr; Back
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-400 mb-8">Last updated: February 2026</p>

        <div className="space-y-8 text-sm text-slate-400 leading-relaxed">
          <section>
            <p className="mb-4">
              TheLevelTeam LLC, doing business as RevenuFlow (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;),
              operates the website revenuflow.vercel.app. This Privacy Policy describes how we collect,
              use, and protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">Information We Collect</h2>
            <p>
              When you submit our contact or lead capture forms, we collect your name, email address, phone number,
              company/property name, and message. We may also collect information about your rental portfolio such
              as property type, number of properties, and current revenue. This information is used solely to respond
              to your inquiry and provide our revenue management services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">SMS Messaging &amp; Consent</h2>
            <p className="mb-3">
              By checking the SMS consent box on our forms, you agree to receive text messages
              from RevenuFlow. These messages may include:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Appointment confirmations and reminders</li>
              <li>Follow-up messages regarding your inquiry</li>
              <li>Service updates about your revenue management</li>
            </ul>
            <p className="mt-3">
              Message frequency varies. Message and data rates may apply. You can opt out at any
              time by replying <strong className="text-white">STOP</strong> to any message. Reply{" "}
              <strong className="text-white">HELP</strong> for assistance.
            </p>
            <p className="mt-3">
              By opting in, you confirm that you are the owner or authorized user of the mobile
              number provided and that you consent to receive SMS messages at that number.
            </p>
            <p className="mt-3">
              We do not sell, rent, or share your phone number or any personal information with
              third parties for marketing purposes. Your consent to receive SMS messages is not a
              condition of purchasing any goods or services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>To respond to your inquiries and schedule consultations</li>
              <li>To send appointment confirmations and reminders via SMS</li>
              <li>To provide revenue management services for your properties</li>
              <li>To follow up on your interest in our services</li>
              <li>To improve our website and services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">Data Protection</h2>
            <p>
              We take reasonable measures to protect your personal information. Your data is stored
              securely and access is limited to authorized personnel who need it to provide our
              services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">Third-Party Services</h2>
            <p>
              We use trusted third-party services to manage our communications and store contact
              information. These services are bound by their own privacy policies and maintain
              industry-standard security practices.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">Cookies &amp; Tracking Technologies</h2>
            <p className="mb-3">
              Our website may use cookies and similar tracking technologies to improve your
              browsing experience and analyze site traffic. These may include:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <strong className="text-white">Essential cookies:</strong> Required for basic
                site functionality
              </li>
              <li>
                <strong className="text-white">Analytics cookies:</strong> Help us understand how
                visitors interact with our website (e.g., page views, traffic sources)
              </li>
              <li>
                <strong className="text-white">Third-party tracking:</strong> We use GoHighLevel
                for form handling and calendar booking, which may set its own cookies to process
                your submissions
              </li>
            </ul>
            <p className="mt-3">
              You can control cookies through your browser settings. Disabling cookies may affect
              some website functionality. We do not use cookies to collect personal information
              for sale to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">Your Rights</h2>
            <p>
              You may request to view, update, or delete your personal information at any time by
              contacting us. To stop receiving SMS messages, reply <strong className="text-white">STOP</strong> to
              any text message.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, contact us at{" "}
              <a href="tel:+18669966382" className="text-brand-blue hover:underline">
                (866) 996-6382
              </a>,{" "}
              email{" "}
              <a href="mailto:support@revenuflow.com" className="text-brand-blue hover:underline">
                support@revenuflow.com
              </a>,{" "}
              or visit our{" "}
              <Link href="/contact" className="text-brand-blue hover:underline">
                contact page
              </Link>.
            </p>
            <p className="mt-3">
              For our full Terms of Service including SMS messaging terms, please visit our{" "}
              <Link href="/terms" className="text-brand-blue hover:underline">
                Terms of Service
              </Link>{" "}
              page.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.06] text-center text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} TheLevelTeam LLC, DBA RevenuFlow. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
