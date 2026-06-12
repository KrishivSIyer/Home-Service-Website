"use client";

import {
  Wrench,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Get a Quote", href: "#contact" },
  { label: "Book Service", href: "#booking" },
];

const serviceLinks = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Water Heaters",
  "Bathroom Remodel",
  "Duct Cleaning",
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="bg-primary rounded-lg p-2">
                <Wrench className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg text-white leading-none">
                  AquaFix
                </span>
                <span className="block text-xs text-white/60 leading-none mt-0.5">
                  Home Services
                </span>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Licensed, insured, and committed to your satisfaction. Serving
              homeowners with honest, reliable service since 2009.
            </p>
            <div className="flex gap-3 mt-5">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Icon className="h-4 w-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <a
                    href="tel:+15551234567"
                    className="text-sm text-white hover:text-primary transition-colors"
                  >
                    (555) 123-4567
                  </a>
                  <p className="text-xs text-white/40">24/7 Emergency Line</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <a
                  href="mailto:info@aquafix.com"
                  className="text-sm text-white hover:text-primary transition-colors"
                >
                  info@aquafix.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-white/60">
                  123 Service Drive, Oak Park, IL 60302
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-white/60">
                    Mon–Fri: 7 AM – 7 PM
                  </p>
                  <p className="text-xs text-white/40">
                    Emergency: 24/7
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} AquaFix Home Services. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white/70 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white/70 transition-colors">
              Licenses
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
