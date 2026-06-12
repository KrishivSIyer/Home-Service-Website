"use client";

import {
  PhoneCall,
  CalendarCheck,
  Wrench,
  PartyPopper,
} from "lucide-react";

const steps = [
  {
    icon: PhoneCall,
    step: "01",
    title: "Call or Book Online",
    description:
      "Reach us 24/7 by phone or use our online scheduling tool. We respond within minutes, not hours.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Get a Confirmed Appointment",
    description:
      "Choose a time that works for you. We offer same-day slots for emergencies and flexible scheduling.",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Professional Service",
    description:
      "A licensed, background-checked technician arrives on time with all necessary equipment and parts.",
  },
  {
    icon: PartyPopper,
    step: "04",
    title: "Job Done Right",
    description:
      "We complete the work with upfront pricing and a satisfaction guarantee. You only pay when you're happy.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Getting expert home service is as easy as 1-2-3-4. No runaround, no
            hassle, just reliable work from licensed professionals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, i) => (
            <div key={item.step} className="relative text-center group">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-primary/20" />
              )}
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/5 border-2 border-primary/10 group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-300">
                <item.icon className="h-10 w-10 text-primary" />
                <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  {item.step}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
