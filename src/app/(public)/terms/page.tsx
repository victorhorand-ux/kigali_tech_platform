import type { Metadata } from "next";
import { Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Kigali Tech",
  description: "Terms of service and installation agreements for Kigali Tech.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm border border-gray-100 sm:p-12">
        <div className="mb-8 flex items-center gap-4 border-b border-gray-100 pb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-[#F97316]">
            <Scale className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Terms & Conditions</h1>
            <p className="text-sm text-gray-500">Last updated: August 2026</p>
          </div>
        </div>

        <div className="space-y-8 text-gray-600">
          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">1. Acceptance of Terms</h2>
            <p>
              By requesting a quote, booking a service, or purchasing equipment through the Kigali Tech platform, you agree to be bound by these Terms and Conditions. These terms apply to all clients receiving services within Kigali and the surrounding areas.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">2. Service Quotes & Pricing</h2>
            <p className="mb-3">
              All initial quotes provided via our web platform are estimates based on the information provided. Final pricing is subject to a physical site inspection. 
            </p>
            <ul className="list-inside list-disc space-y-2 ml-2">
              <li>Prices are quoted in Rwandan Francs (RWF).</li>
              <li>Additional costs may apply if structural issues, hidden wiring complexities, or extra materials are required upon arrival.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">3. Installation & Liability</h2>
            <p className="mb-3">
              Our technicians exercise the utmost care during installations. However, Kigali Tech is not liable for:
            </p>
            <ul className="list-inside list-disc space-y-2 ml-2">
              <li>Pre-existing structural weaknesses in walls or ceilings.</li>
              <li>Failure of third-party internet service providers (ISPs) affecting smart home or networking setups.</li>
              <li>Data loss on existing hard drives during CCTV configuration.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">4. Warranties</h2>
            <p>
              Hardware purchased directly through us carries the standard manufacturer's warranty. We offer a 30-day workmanship guarantee on all physical installations (e.g., TV mounts, cable runs). This does not cover user error, power surges, or tampering by unauthorized third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900">5. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Republic of Rwanda. Any disputes shall be resolved within the jurisdiction of the courts of Kigali.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}