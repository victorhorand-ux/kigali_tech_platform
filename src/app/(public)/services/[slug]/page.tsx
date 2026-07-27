// src/app/(public)/services/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckCircle, HelpCircle } from "lucide-react";
import { FirestoreServiceRepository } from "@/repositories/implementations/FirestoreServiceRepository";
import { QuoteRequestForm } from "@/domains/quotes/components/QuoteRequestForm";

const DEFAULT_TENANT_ID = 'rw-hq-main';

// FIX: Explicitly type params as a Promise
type Props = {
  params: Promise<{ slug: string }>;
};

// 1. DYNAMIC SEO METADATA GENERATOR
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // FIX: Await the params Promise
  const { slug } = await params;
  
  const repository = new FirestoreServiceRepository();
  const service = await repository.findBySlug(DEFAULT_TENANT_ID, slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: service.seoMeta.title,
    description: service.seoMeta.description,
    keywords: service.seoMeta.keywords,
    openGraph: {
      title: service.seoMeta.title,
      description: service.seoMeta.description,
      type: "website",
    },
  };
}

// 2. SERVER COMPONENT RENDERER
export default async function ServiceDetailsPage({ params }: Props) {
  // FIX: Await the params Promise
  const { slug } = await params;
  
  const repository = new FirestoreServiceRepository();
  const service = await repository.findBySlug(DEFAULT_TENANT_ID, slug);

  // Automatically trigger a 404 page if the slug isn't in Firestore
  if (!service || !service.isActive) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Dynamic Hero Section */}
      <section className="bg-[#0B1B3D] px-6 py-20 text-white lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {service.title}
          </h1>
          <p className="text-lg text-gray-300 sm:text-xl">
            {service.shortDescription}
          </p>
          {service.basePriceRWF && (
            <div className="mt-8 inline-block rounded-full bg-white/10 px-6 py-2 border border-white/20">
              <span className="font-medium">Starting from: </span>
              <span className="font-bold text-[#F97316]">
                RWF {service.basePriceRWF.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Content & Features */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-16 lg:grid-cols-2">
          
          {/* Left Column: Details & FAQs */}
          <div className="space-y-12">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Service Overview</h2>
              <div className="prose text-gray-600 leading-relaxed">
                {/* In a full CMS, this would parse Rich Text or Markdown */}
                <p>{service.longDescription}</p>
              </div>
            </div>

            {/* Features List */}
            {service.features.length > 0 && (
              <div>
                <h3 className="mb-6 text-xl font-bold text-gray-900">What's Included</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#10B981]" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Service Specific FAQs */}
            {service.faqs.length > 0 && (
              <div>
                <h3 className="mb-6 text-xl font-bold text-gray-900 flex items-center gap-2">
                  <HelpCircle className="h-6 w-6 text-[#F97316]" />
                  Frequently Asked Questions
                </h3>
                <div className="space-y-6">
                  {service.faqs.map((faq: { question: string; answer: string }, idx: number) => (
                    <div key={idx} className="rounded-lg bg-gray-50 p-6 border border-gray-100">
                      <h4 className="font-bold text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Quote Form */}
          <div className="lg:relative">
            <div className="lg:sticky lg:top-28">
              <div className="mb-6 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-gray-900">Book this Service</h3>
                <p className="text-gray-600 mt-2">Get a verified technician assigned to your property.</p>
              </div>
              <QuoteRequestForm />
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}