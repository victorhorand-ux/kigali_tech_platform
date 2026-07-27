// src/app/(public)/services/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { FirestoreServiceRepository } from "@/repositories/implementations/implementations/firebase/FirestoreServiceRepository";

const DEFAULT_TENANT_ID = 'rw-hq-main';

export const metadata: Metadata = {
  title: "Professional Tech Services | Kigali Tech",
  description: "Expert installation and configuration for CCTV, Smart Home, and Networking.",
};

export default async function ServicesIndexPage() {
  const repository = new FirestoreServiceRepository();
  const services = await repository.findActiveServices(DEFAULT_TENANT_ID);

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      {/* Header Banner */}
      <section className="bg-[#0B1B3D] px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Our <span className="text-[#F97316]">Services</span>
          </h1>
          <p className="text-lg text-gray-300">
            Professional tech installations and configurations by verified experts.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link 
                href={`/services/${service.slug}`} 
                key={service.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg hover:border-[#0B1B3D]/30"
              >
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={service.coverImageUrl || "https://placehold.co/600x400/png?text=Service"} 
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#F97316]">
                    {service.title}
                  </h3>
                  <p className="mb-6 text-sm text-gray-600 line-clamp-2">
                    {service.shortDescription}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                    {/* FIX: Safely check if basePriceRWF exists before formatting */}
                    <span className="font-semibold text-gray-900">
                      {service.basePriceRWF 
                        ? `From RWF ${service.basePriceRWF.toLocaleString()}`
                        : 'Price upon request'}
                    </span>
                    <div className="flex items-center gap-1 text-sm font-bold text-[#F97316]">
                      View Details <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {services.length === 0 && (
            <div className="py-20 text-center">
              <Wrench className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900">No services available</h3>
              <p className="mt-2 text-gray-500">Please check back later.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}