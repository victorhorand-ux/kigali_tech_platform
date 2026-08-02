import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-gray-50 pt-16 pb-8 text-sm text-gray-600">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="font-heading text-2xl font-bold tracking-tight text-[#0B1B3D]">
              Kigali<span className="text-[#F97316]">Tech</span>
            </Link>
            <p className="max-w-xs">
              Transforming homes and businesses across Rwanda with premium security and electronics solutions.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-bold text-[#0B1B3D]">Our Services</h3>
            <ul className="space-y-3 font-medium">
              <li><Link href="/services/cctv-installation" className="hover:text-[#F97316]">CCTV Installation</Link></li>
              <li><Link href="/services/tv-wall-mounting" className="hover:text-[#F97316]">TV Wall Mounting</Link></li>
              <li><Link href="/services/smart-home" className="hover:text-[#F97316]">Smart Home Setup</Link></li>
              <li><Link href="/services/network-wifi" className="hover:text-[#F97316]">Network & Wi-Fi</Link></li>
            </ul>
          </div>

          {/* Service Areas (Local SEO) */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-bold text-[#0B1B3D]">Service Areas</h3>
            <ul className="space-y-3 font-medium">
              <li>Kigali City</li>
              <li>Gasabo District</li>
              <li>Nyarugenge District</li>
              <li>Kicukiro District</li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-bold text-[#0B1B3D]">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 text-[#F97316]" />
                <span>KN 4 Ave, UTC Building<br/>Kigali, Rwanda</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-[#F97316]" />
                <span>+250 780 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-[#F97316]" />
                <span>quotes@kigalitech.rw</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between border-t border-gray-200 pt-8 md:flex-row">
          <p>&copy; {currentYear} Kigali Tech Platform. All rights reserved.</p>
          <div className="mt-4 flex gap-6 md:mt-0 font-medium">
            {/* FIX: Changed href to /privacy to match the new route */}
            <Link href="/privacy" className="hover:text-[#0B1B3D]">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#0B1B3D]">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}