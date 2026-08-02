import type { Metadata } from "next";
import { CheckCircle2, Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Work & Projects | Kigali Tech",
  description: "View our recent installations and tech setups across Kigali.",
};

// Static fallback data - ready to be replaced with a Firestore Repository later
const projects = [
  { id: 1, title: "Kigali Heights Office Setup", category: "Commercial Networking", date: "August 2025" },
  { id: 2, title: "Nyarutarama Villa", category: "Smart Home & Security", date: "November 2025" },
  { id: 3, title: "Kimironko Supermarket", category: "16-Channel CCTV", date: "January 2026" },
  { id: 4, title: "Gacuriro Apartment Complex", category: "WiFi Mesh Network", date: "March 2026" },
];

export default function ProjectsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      {/* Header Banner */}
      <section className="bg-[#0B1B3D] px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Recent <span className="text-[#F97316]">Projects</span>
          </h1>
          <p className="text-lg text-gray-300">
            Take a look at the quality installations we have delivered across Rwanda.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg hover:border-[#0B1B3D]/30"
              >
                <div className="relative flex h-64 w-full items-center justify-center overflow-hidden bg-gray-100">
                  {/* Placeholder for actual project images */}
                  <ImageIcon className="h-12 w-12 text-gray-300 transition-transform duration-300 group-hover:scale-110" />
                </div>
                
                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#F97316]">
                    {project.category}
                  </span>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    {project.title}
                  </h3>
                  
                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-sm font-medium text-gray-500">
                      {project.date}
                    </span>
                    <div className="flex items-center gap-1 text-sm font-bold text-green-600">
                      <CheckCircle2 className="h-4 w-4" /> Completed
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}