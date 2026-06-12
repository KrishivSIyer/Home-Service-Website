"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Droplets,
  Zap,
  Flame,
  Wind,
  Thermometer,
  ShowerHead,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Droplets,
    title: "Plumbing",
    description:
      "Leak repairs, pipe installation, drain cleaning, water heater service, and full bathroom remodeling.",
    features: ["Same-day service", "Emergency repairs", "Camera inspection"],
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: Zap,
    title: "Electrical",
    description:
      "Panel upgrades, outlet installation, lighting, generator hookup, and code compliance repairs.",
    features: ["Licensed electricians", "Code upgrades", "Safety inspections"],
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    icon: Flame,
    title: "HVAC",
    description:
      "AC repair, furnace service, ductwork, thermostat installation, and seasonal maintenance plans.",
    features: ["24/7 emergency", "Maintenance plans", "Air quality"],
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  {
    icon: Wind,
    title: "Duct Cleaning",
    description:
      "Air duct cleaning, dryer vent service, and indoor air quality improvement for healthier homes.",
    features: ["Allergy relief", "Energy savings", "Certified techs"],
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
  },
  {
    icon: Thermometer,
    title: "Water Heaters",
    description:
      "Tank and tankless water heater installation, repair, and maintenance for reliable hot water.",
    features: ["Tankless options", "Energy efficient", "Same-day install"],
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    icon: ShowerHead,
    title: "Bathroom Remodel",
    description:
      "Full bathroom renovations including tile, fixtures, vanities, and walk-in shower conversions.",
    features: ["Design consultation", "Custom tile work", "Fixture upgrades"],
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
            Our Services
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Everything Your Home Needs
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Comprehensive home services from licensed professionals. One call
            handles it all, with guaranteed workmanship and upfront pricing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group hover:shadow-lg transition-all duration-300 border hover:-translate-y-1 cursor-pointer"
            >
              <CardContent className="p-6">
                <div
                  className={`inline-flex p-3 rounded-xl ${service.bg} ${service.border} border mb-4`}
                >
                  <service.icon className={`h-6 w-6 ${service.color}`} />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">
                  {service.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className={`text-xs px-2 py-1 rounded-full ${service.bg} ${service.color} font-medium`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <a href="#contact">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary p-0 h-auto font-medium"
                  >
                    Get Quote
                    <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
