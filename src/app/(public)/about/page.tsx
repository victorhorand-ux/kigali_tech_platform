import type { Metadata } from "next";
import { Shield, Wrench, Users, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Kigali Tech",
  description: "Learn about our mission to provide the best tech installations in Rwanda.",
};

const values = [
  {
    icon: Shield,
    title: "Trust & Security",
    description: "We treat your property with respect, ensuring all installations are secure, discreet, and reliable."
  },
  {
    icon: Wrench,
    title: "Expert Engineering",
    description: "Clean cable management and optimal configurations are our baseline standard, never an afterthought."
  },
  {
    icon: Users,
    title: "Customer First",
    description: "We don't just install and leave. We ensure you know exactly how to use your new technology."
  }
];

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="bg-[#0B1B3D] px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Setting the Standard for Tech in <span className="text-[#F97316]">Kigali</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            We are a dedicated team of engineers and technicians committed to bringing modern, seamless, and professional technology setups to homes and businesses across Rwanda.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-12 md:flex-row">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-[#F97316]">
                <Target className="h-4 w-4" /> Our Mission
              </div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Bridging the gap between premium hardware and flawless execution.
              </h2>
              <p className="text-lg text-gray-600">
                Too often, great equipment is ruined by poor installation. Our mission is to ensure that every camera, television, and router we touch operates at its absolute peak performance while looking incredibly clean in your space.
              </p>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-square w-full max-w-md mx-auto rounded-3xl bg-gray-200 shadow-inner">
                {/* Image placeholder */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
            <p className="mt-4 text-gray-600">What you can expect when you hire Kigali Tech.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {values.map((value, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-50 text-[#F97316] transition-transform hover:scale-110">
                  <value.icon className="h-10 w-10" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}