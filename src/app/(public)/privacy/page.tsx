import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Kigali Tech",
  description: "How we collect, use, and protect your data at Kigali Tech.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm border border-gray-100 sm:p-12">
        <div className="mb-8 flex items-center gap-4 border-b border-gray-100 pb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-[#F97316]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="text-sm text-gray-500">Last updated: August 2026</p>
          </div>
        </div>

        <div className="space-y-8 text-gray-600">
          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">1. Information We Collect</h2>
            <p className="mb-3">
              When you request a quote or contact us for services, we collect necessary personal information to fulfill your request, including:
            </p>
            <ul className="list-inside list-disc space-y-2 ml-2">
              <li>Full Name</li>
              <li>Phone Number (for contact and WhatsApp communication)</li>
              <li>Service Location (District and Sector in Kigali)</li>
              <li>Details regarding your property or technical requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">2. How We Use Your Data</h2>
            <p className="mb-3">We use your information strictly for business operations:</p>
            <ul className="list-inside list-disc space-y-2 ml-2">
              <li>To contact you regarding your requested quote.</li>
              <li>To dispatch technicians to your correct location.</li>
              <li>To maintain service history for warranty and support purposes in our secure CRM.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">3. Data Protection</h2>
            <p>
              Your personal data is encrypted and stored securely in our database. Access to this data is strictly limited to authorized administrative personnel and assigned technicians. We do not sell, rent, or trade your personal information to third-party marketing companies.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">4. Third-Party Services</h2>
            <p>
              We may use trusted third-party services (such as Google Cloud/Firebase) strictly for hosting our database and platform analytics. These providers are bound by strict data protection agreements.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to request the deletion of your data from our CRM, please contact our support team.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}