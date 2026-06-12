"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  ArrowRight,
  Star,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-react";

const trustBadges = [
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Clock, label: "24/7 Availability" },
  { icon: CheckCircle, label: "Satisfaction Guaranteed" },
];

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "10K+", label: "Jobs Completed" },
  { value: "4.9", label: "Star Rating" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-orange-50/20">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-fade-up">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              <Star className="h-3 w-3 mr-1 fill-primary" />
              Trusted by 10,000+ homeowners
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Expert Home Services{" "}
              <span className="text-primary">When You Need Them Most</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              From emergency plumbing to routine maintenance, our licensed
              professionals deliver reliable, same-day service with upfront
              pricing. No hidden fees, no surprises.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#booking">
                <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8 h-12">
                  Schedule Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="tel:+15551234567">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 h-12">
                  <Phone className="mr-2 h-4 w-4" />
                  (555) 123-4567
                </Button>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <badge.icon className="h-4 w-4 text-primary" />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-foreground">
                    Quick Estimate Calculator
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get an instant ballpark estimate for your project
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center p-4 rounded-xl bg-primary/5">
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-100">
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
                    <span className="text-sm text-green-800">Free in-home estimates available</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                    <CheckCircle className="h-5 w-5 text-blue-600 shrink-0" />
                    <span className="text-sm text-blue-800">Same-day emergency dispatch</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100">
                    <CheckCircle className="h-5 w-5 text-amber-600 shrink-0" />
                    <span className="text-sm text-amber-800">Financing options available</span>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-full px-4 py-2 text-sm font-bold shadow-lg">
                FREE ESTIMATES
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
