"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";

export function Navbar() {
  // Pull state and actions from the Zustand store
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      {/* Top Utility Bar - Local SEO & Immediate Trust */}
      <div className="hidden w-full bg-[#0B1B3D] py-2 text-sm text-gray-300 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <p>Professional Installation & Maintenance in Kigali</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-semibold text-white">
              <Phone className="h-4 w-4 text-[#F97316]" /> +250 780 000 000
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link 
          href="/" 
          className="font-heading text-2xl font-bold tracking-tight text-[#0B1B3D]"
          onClick={closeMobileMenu}
        >
          Kigali<span className="text-[#F97316]">Tech</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 md:flex font-medium text-gray-600">
          <Link href="/" className="transition-colors hover:text-[#0B1B3D]">Home</Link>
          <Link href="/services" className="transition-colors hover:text-[#0B1B3D]">Services</Link>
          <Link href="/shop" className="transition-colors hover:text-[#0B1B3D]">Shop TVs</Link>
          <Link href="/projects" className="transition-colors hover:text-[#0B1B3D]">Projects</Link>
          <Link href="/about" className="transition-colors hover:text-[#0B1B3D]">About</Link>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link 
            href="/#quote-section" 
            className="rounded-lg bg-[#F97316] px-5 py-2.5 font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          onClick={toggleMobileMenu}
          className="p-2 text-gray-600 md:hidden transition-colors hover:bg-gray-100 rounded-md"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-full w-full border-b border-gray-100 bg-white shadow-lg md:hidden">
          <nav className="flex flex-col px-6 py-4 font-medium text-gray-600">
            <Link 
              href="/" 
              onClick={closeMobileMenu}
              className="block border-b border-gray-50 py-4 transition-colors hover:text-[#F97316]"
            >
              Home
            </Link>
            <Link 
              href="/services" 
              onClick={closeMobileMenu}
              className="block border-b border-gray-50 py-4 transition-colors hover:text-[#F97316]"
            >
              Services
            </Link>
            <Link 
              href="/shop" 
              onClick={closeMobileMenu}
              className="block border-b border-gray-50 py-4 transition-colors hover:text-[#F97316]"
            >
              Shop TVs
            </Link>
            <Link 
              href="/projects" 
              onClick={closeMobileMenu}
              className="block border-b border-gray-50 py-4 transition-colors hover:text-[#F97316]"
            >
              Projects
            </Link>
            <Link 
              href="/about" 
              onClick={closeMobileMenu}
              className="block py-4 transition-colors hover:text-[#F97316]"
            >
              About
            </Link>
            
            <Link 
              href="/#quote-section" 
              onClick={closeMobileMenu}
              className="mt-4 block rounded-lg bg-[#F97316] py-3 text-center font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}