import { Shield, Tv, Wifi, Wrench, CheckCircle, MapPin, ArrowRight } from "lucide-react";
import { QuoteRequestForm } from "@/domains/quotes/components/QuoteRequestForm";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* 1. HERO BLOCK */}
      <section className="relative flex items-center justify-center bg-[#0B1B3D] px-6 py-24 text-white lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          {/* Placeholder for future Next.js <Image /> background */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] to-transparent" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <span className="mb-4 inline-block rounded-full bg-orange-500/20 px-4 py-1.5 text-sm font-semibold text-orange-400">
            Kigali's #1 Electronics & Security Platform
          </span>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Smart Solutions for a <span className="text-[#F97316]">Secure & Modern</span> Home
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300 sm:text-xl">
            Professional TV wall mounting, CCTV camera installation, and smart home networking across Kigali. Certified technicians, premium equipment, and guaranteed warranties.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link 
              href="#quote-section" 
              className="rounded-lg bg-[#F97316] px-8 py-4 font-bold text-white transition-all hover:bg-orange-600 hover:shadow-lg"
            >
              Request a Free Quote
            </Link>
            <Link 
              href="/services" 
              className="flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-8 py-4 font-bold text-white transition-all hover:bg-white/20"
            >
              Explore Services <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CORE SERVICES BLOCK */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Professional Services</h2>
            <p className="mt-4 text-gray-600">Delivering enterprise-grade solutions to homes and businesses in Rwanda.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { title: "CCTV Camera Systems", icon: Shield, desc: "High-definition security cameras with 24/7 mobile monitoring for homes and commercial properties." },
              { title: "TV Wall Mounting", icon: Tv, desc: "Clean, wire-free TV mounting on any wall type. Perfect viewing angles guaranteed." },
              { title: "Smart Home Networking", icon: Wifi, desc: "Seamless Wi-Fi coverage and smart device integration across your entire property." }
            ].map((service, idx) => (
              <div key={idx} className="group rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md border border-gray-100">
                <div className="mb-6 inline-flex rounded-xl bg-blue-50 p-4 text-[#0B1B3D] group-hover:bg-[#0B1B3D] group-hover:text-white transition-colors">
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.desc}</p>
                <Link href={`/services/${service.title.toLowerCase().replace(/ /g, '-')}`} className="font-semibold text-[#F97316] hover:text-orange-700">
                  Learn more &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CRM LEAD GENERATION BLOCK (The Quote Engine) */}
      <section id="quote-section" className="px-6 py-20 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            {/* Value Proposition Left Side */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
                Ready to upgrade your space?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Fill out the form to get a rapid estimate. Whether it's a single TV mount in Kicukiro or a 16-channel CCTV system for a warehouse in Gasabo, our team is ready to deploy.
              </p>
              
              <ul className="space-y-6">
                {[
                  { title: "Fast Response Time", desc: "We contact you within 2 hours during business days." },
                  { title: "Transparent Pricing", desc: "Detailed quotes with equipment and labor separated." },
                  { title: "Local Kigali Coverage", desc: "Free site surveys for large projects in Gasabo, Kicukiro, and Nyarugenge." }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0 text-[#10B981]">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-6">
                <Wrench className="h-10 w-10 text-[#0B1B3D]" />
                <div>
                  <p className="font-bold text-gray-900">Need immediate repair?</p>
                  <p className="text-gray-600">Call our emergency line: <span className="font-bold text-[#F97316]">078 000 0000</span></p>
                </div>
              </div>
            </div>

            {/* Quote Form Right Side */}
            <div className="relative">
              {/* Decorative background element */}
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-50 to-orange-50 opacity-50 blur-lg"></div>
              <div className="relative">
                <QuoteRequestForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LOCAL SEO FOOTER BANNER */}
      <section className="bg-[#0B1B3D] py-12 text-center text-white px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 sm:flex-row justify-center">
          <MapPin className="h-8 w-8 text-[#F97316]" />
          <p className="text-lg font-medium">
            Proudly serving <span className="font-bold text-orange-400">Kigali City</span> and surrounding provinces since 2024.
          </p>
        </div>
      </section>
    </main>
  );
}