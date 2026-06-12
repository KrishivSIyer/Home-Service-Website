"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const servicePricing: Record<string, { base: number; label: string }> = {
  plumbing_repair: { base: 150, label: "Plumbing Repair" },
  plumbing_install: { base: 350, label: "Plumbing Installation" },
  electrical_repair: { base: 175, label: "Electrical Repair" },
  electrical_install: { base: 400, label: "Electrical Installation" },
  hvac_repair: { base: 200, label: "HVAC Repair" },
  hvac_install: { base: 2500, label: "HVAC Installation" },
  water_heater: { base: 800, label: "Water Heater" },
  bathroom_remodel: { base: 5000, label: "Bathroom Remodel" },
  duct_cleaning: { base: 350, label: "Duct Cleaning" },
};

const urgencyMultiplier: Record<string, number> = {
  flexible: 1.0,
  this_week: 1.0,
  tomorrow: 1.15,
  today: 1.3,
  emergency: 1.5,
};

export default function QuoteCalculator() {
  const [service, setService] = useState("");
  const [urgency, setUrgency] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [estimate, setEstimate] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const calculateEstimate = () => {
    if (!service || !urgency) return;
    const base = servicePricing[service]?.base ?? 0;
    const multiplier = urgencyMultiplier[urgency] ?? 1;
    const low = Math.round(base * multiplier * 0.85);
    const high = Math.round(base * multiplier * 1.2);
    setEstimate(high);
    return { low, high };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service || !urgency) return;
    setLoading(true);
    const range = calculateEstimate();

    try {
      await supabase.from("leads").insert({
        name,
        email,
        phone: phone || null,
        service: servicePricing[service]?.label ?? service,
        message: message || null,
        estimated_cost: range?.high ?? null,
        source: "quote_calculator",
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-lg mx-auto text-center">
            <CardContent className="p-10">
              <div className="inline-flex p-4 rounded-full bg-green-50 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Quote Request Sent!
              </h3>
              <p className="mt-2 text-muted-foreground">
                We'll contact you within 1 hour during business hours. For
                emergencies, call us directly at (555) 123-4567.
              </p>
              {estimate && (
                <div className="mt-4 p-4 rounded-lg bg-primary/5">
                  <p className="text-sm text-muted-foreground">
                    Estimated range
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    ${Math.round(estimate * 0.85).toLocaleString()} – $
                    {estimate.toLocaleString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge className="mb-3 bg-accent/10 text-accent border-accent/20">
            <Calculator className="h-3 w-3 mr-1" />
            Free Quote
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Get Your Instant Estimate
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Tell us about your project and get a ballpark estimate instantly.
            No commitment, no spam — just honest pricing.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-lg border">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calculator className="h-5 w-5 text-primary" />
              Quote Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Service Needed</Label>
                  <Select
                    value={service}
                    onValueChange={(v) => {
                      setService(v);
                      if (urgency) {
                        const base = servicePricing[v]?.base ?? 0;
                        const mult = urgencyMultiplier[urgency] ?? 1;
                        setEstimate(Math.round(base * mult * 1.2));
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(servicePricing).map(([key, val]) => (
                        <SelectItem key={key} value={key}>
                          {val.label} (from ${val.base})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>How Soon?</Label>
                  <Select
                    value={urgency}
                    onValueChange={(v) => {
                      setUrgency(v);
                      if (service) {
                        const base = servicePricing[service]?.base ?? 0;
                        const mult = urgencyMultiplier[v] ?? 1;
                        setEstimate(Math.round(base * mult * 1.2));
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flexible">Flexible (2+ weeks)</SelectItem>
                      <SelectItem value="this_week">This Week</SelectItem>
                      <SelectItem value="tomorrow">Tomorrow</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="emergency">Emergency (ASAP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {estimate && (
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 animate-fade-in">
                  <p className="text-sm text-muted-foreground mb-1">
                    Estimated range
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    ${Math.round(estimate * 0.85 / 10) * 10} – ${Math.round(estimate / 10) * 10}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Final pricing after on-site inspection
                  </p>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="q-name">Name</Label>
                  <Input
                    id="q-name"
                    placeholder="John Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="q-email">Email</Label>
                  <Input
                    id="q-email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="q-phone">Phone (optional)</Label>
                <Input
                  id="q-phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="q-message">Project Details</Label>
                <Textarea
                  id="q-message"
                  placeholder="Describe your issue or project..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={loading || !service || !urgency}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="mr-2 h-4 w-4" />
                )}
                {loading ? "Submitting..." : "Get My Free Quote"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
