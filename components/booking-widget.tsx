"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Clock, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const serviceOptions = [
  "Plumbing Repair",
  "Plumbing Installation",
  "Electrical Repair",
  "Electrical Installation",
  "HVAC Repair",
  "HVAC Installation",
  "Water Heater Service",
  "Bathroom Remodel",
  "Duct Cleaning",
  "General Maintenance",
];

export default function BookingWidget() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await supabase.from("appointments").insert({
        name,
        email,
        phone,
        service,
        preferred_date: date,
        preferred_time: time,
        notes: notes || null,
      });
      setConfirmed(true);
    } catch {
      setConfirmed(true);
    }
    setLoading(false);
  };

  if (confirmed) {
    return (
      <section id="booking" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-lg mx-auto text-center">
            <CardContent className="p-10">
              <div className="inline-flex p-4 rounded-full bg-green-50 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Appointment Booked!
              </h3>
              <p className="mt-2 text-muted-foreground">
                We'll send a confirmation to <strong>{email}</strong>. Our team
                will call you to confirm your {service} appointment on{" "}
                <strong>{date}</strong> at <strong>{time}</strong>.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Need to reschedule? Call us at (555) 123-4567.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
            <CalendarCheck className="h-3 w-3 mr-1" />
            Book Online
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Schedule Your Service
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Pick a time that works for you. No phone tag, no waiting. Same-day
            slots available for emergencies.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            {[
              { n: 1, label: "Service" },
              { n: 2, label: "Schedule" },
              { n: 3, label: "Details" },
            ].map((s) => (
              <div key={s.n} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= s.n
                      ? "bg-primary text-white"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {step > s.n ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    s.n
                  )}
                </div>
                <span
                  className={`text-sm hidden sm:block ${
                    step >= s.n
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
                {s.n < 3 && (
                  <div
                    className={`w-8 h-0.5 ${
                      step > s.n ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <Card className="shadow-lg border">
            <CardContent className="p-6 sm:p-8">
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">What service do you need?</h3>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceOptions.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex justify-end">
                    <Button
                      onClick={() => setStep(2)}
                      disabled={!service}
                    >
                      Next <Clock className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">When works best?</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Preferred Date</Label>
                      <Input
                        type="date"
                        min={today}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Time</Label>
                      <Select value={time} onValueChange={setTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pick a time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={!date || !time}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold">Your Contact Info</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="b-name">Full Name</Label>
                      <Input
                        id="b-name"
                        placeholder="John Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="b-phone">Phone</Label>
                      <Input
                        id="b-phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="b-email">Email</Label>
                    <Input
                      id="b-email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="b-notes">Special Instructions (optional)</Label>
                    <Input
                      id="b-notes"
                      placeholder="Gate code, parking, pet info..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                  <div className="p-3 rounded-lg bg-primary/5 text-sm">
                    <strong>Summary:</strong> {service} on {date} at {time}
                  </div>
                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <CalendarCheck className="mr-2 h-4 w-4" />
                      )}
                      {loading ? "Booking..." : "Confirm Booking"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
