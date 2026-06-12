"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Menu,
  X,
  Wrench,
  Clock,
  Shield,
} from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9 text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              24/7 Emergency Service
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" />
              Licensed & Insured
            </span>
          </div>
          <a href="tel:+15551234567" className="flex items-center gap-1.5 font-medium hover:underline">
            <Phone className="h-3.5 w-3.5" />
            (555) 123-4567
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b"
            : "bg-white border-b"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2.5">
            <div className="bg-primary rounded-lg p-2">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-foreground leading-none">AquaFix</span>
              <span className="block text-xs text-muted-foreground leading-none mt-0.5">Home Services</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="#booking">
              <Button variant="outline" size="sm">
                Schedule Service
              </Button>
            </a>
            <a href="#contact">
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Get Free Quote
              </Button>
            </a>
          </div>

          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t bg-white animate-fade-in">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <a href="#booking">
                  <Button variant="outline" className="w-full">
                    Schedule Service
                  </Button>
                </a>
                <a href="#contact">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Get Free Quote
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
