"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How quickly can you respond to an emergency?",
    a: "We dispatch technicians within 30–60 minutes for emergencies, 24 hours a day, 7 days a week. For plumbing emergencies like burst pipes or gas leaks, we prioritize immediate dispatch. Call (555) 123-4567 anytime.",
  },
  {
    q: "Do you charge for estimates?",
    a: "All estimates are free, whether in-home or over the phone. Our Quote Calculator on this page gives you an instant ballpark range. For a precise quote, a technician will visit your home at no cost and no obligation.",
  },
  {
    q: "Are your technicians licensed and insured?",
    a: "Absolutely. Every technician is state-licensed in their trade, fully insured, and background-checked. We carry general liability and workers' comp insurance, and we're happy to provide proof before starting any job.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve the greater metro area including Oak Park, Riverdale, Lakewood, Elm Grove, and all communities within a 30-mile radius. If you're unsure whether we cover your area, just ask — we'll let you know right away.",
  },
  {
    q: "Do you offer financing?",
    a: "Yes! We offer flexible financing for projects over $1,000 with approved credit, including 0% APR for 12 months and extended plans up to 60 months. Your technician can walk you through options during the estimate.",
  },
  {
    q: "What warranty do you provide?",
    a: "All labor comes with a 1-year warranty. Equipment and parts carry manufacturer warranties (typically 5–10 years). If something fails due to our workmanship within the warranty period, we fix it at no charge.",
  },
  {
    q: "Can I book same-day service?",
    a: "Yes, same-day service is available for most plumbing and HVAC issues. Emergency electrical service is also available 24/7. For non-urgent work, we typically schedule within 1–3 business days.",
  },
  {
    q: "How does the AI chatbot work?",
    a: "AquaBot (our chat assistant) answers common questions, helps you get pricing estimates, and can guide you through booking an appointment — all in real time, 24/7. It collects qualifying info so our team is prepared when they follow up. No bots replace our technicians; AquaBot just makes getting help faster.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
            <HelpCircle className="h-3 w-3 mr-1" />
            FAQ
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-muted-foreground">
            Quick answers to common questions. Need more? Chat with AquaBot or
            call us.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-slate-50/50 border rounded-lg px-4 data-[state=open]:bg-primary/5 data-[state=open]:border-primary/20 transition-colors"
            >
              <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
