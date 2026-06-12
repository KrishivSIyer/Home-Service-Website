"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Homeowner, Oak Park",
    rating: 5,
    text: "Our basement flooded at 2 AM and AquaFix had a plumber at our door within 45 minutes. They fixed the burst pipe, helped with cleanup, and even followed up the next day. Absolutely above and beyond.",
    service: "Emergency Plumbing",
  },
  {
    name: "David Chen",
    role: "Property Manager",
    rating: 5,
    text: "Managing 12 rental units means I need reliable contractors. AquaFix handles all our plumbing and electrical needs. Their online booking saves me hours of phone tag every month.",
    service: "Plumbing & Electrical",
  },
  {
    name: "Maria Rodriguez",
    role: "Homeowner, Riverdale",
    rating: 5,
    text: "The quote calculator gave me a realistic estimate before I even called. When the tech arrived, the final price was actually lower than estimated. Transparent and honest — rare these days.",
    service: "HVAC Installation",
  },
  {
    name: "James Wilson",
    role: "Homeowner, Lakewood",
    rating: 5,
    text: "Had three companies quote our bathroom remodel. AquaFix wasn't the cheapest, but they were the only ones who explained every cost. The work quality speaks for itself — gorgeous result.",
    service: "Bathroom Remodel",
  },
  {
    name: "Linda Park",
    role: "Homeowner, Elm Grove",
    rating: 5,
    text: "The AI chatbot on their site answered my questions at 11 PM when I couldn't call. It even helped me book an appointment for the next morning. So convenient for busy people.",
    service: "Water Heater Repair",
  },
  {
    name: "Robert Thompson",
    role: "Restaurant Owner",
    rating: 5,
    text: "Commercial plumbing emergencies can shut down our business. AquaFix understands urgency. Their 24/7 dispatch has saved us thousands in lost revenue. Indispensable partner.",
    service: "Commercial Plumbing",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
            Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Over 10,000 satisfied homeowners trust AquaFix for honest, reliable
            service. Here's what they have to say.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              className="hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/20 mb-3" />
                <p className="text-sm text-foreground leading-relaxed mb-4">
                  {t.text}
                </p>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {t.service}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
