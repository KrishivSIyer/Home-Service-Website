"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Loader2,
  CalendarCheck,
  Phone,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Message {
  role: "user" | "assistant";
  content: string;
  options?: string[];
}

const qualifyingFlow: Record<string, { response: string; options?: string[]; capture?: string }> = {
  start: {
    response: "Hi there! I'm AquaBot, your home service assistant. I can help with scheduling, pricing, or answering questions about our services. What do you need help with?",
    options: ["Schedule a service", "Get a price estimate", "Emergency help", "Ask a question"],
  },
  schedule: {
    response: "Great choice! Our online booking makes scheduling easy. What type of service do you need?",
    options: ["Plumbing", "Electrical", "HVAC", "Other"],
  },
  schedule_plumbing: {
    response: "We have licensed plumbers available for same-day service. Would you like to:\n\n- Book a specific time slot\n- Get a callback to discuss your issue\n- Chat about your plumbing concern first",
    options: ["Book a time slot", "Get a callback", "Describe my issue"],
  },
  schedule_electrical: {
    response: "Our licensed electricians handle everything from outlets to panel upgrades. How would you like to proceed?",
    options: ["Book a time slot", "Get a callback", "Describe my issue"],
  },
  schedule_hvac: {
    response: "We offer 24/7 HVAC service including emergency repairs. What works best for you?",
    options: ["Book a time slot", "Get a callback", "Describe my issue"],
  },
  schedule_other: {
    response: "No problem! We handle a wide range of home services including duct cleaning, water heaters, and bathroom remodeling. Let's get you booked — would you like a callback or a specific time?",
    options: ["Book a time slot", "Get a callback"],
  },
  book_slot: {
    response: "You can use our booking form below to pick your preferred date and time. Just scroll down to the 'Schedule Your Service' section, or I can help collect your details right here. Would you like me to take your info now?",
    options: ["Take my info now", "I'll use the form"],
  },
  take_info: {
    response: "Please share your name, and I'll get started. You can also provide your phone number and email so we can confirm your appointment.",
  },
  callback: {
    response: "I'll have our team call you back right away. Can you share your name and phone number? We typically return calls within 15 minutes during business hours.",
  },
  describe_issue: {
    response: "Of course! Please describe the issue you're experiencing. The more detail you provide, the better we can prepare. Common details that help: when it started, any unusual sounds/smells, and whether it's affecting the whole house or one area.",
  },
  price: {
    response: "I can give you a ballpark estimate! Our Quote Calculator below provides instant pricing ranges. What service are you curious about?",
    options: ["Plumbing Repair", "Electrical Work", "HVAC Service", "Bathroom Remodel"],
  },
  price_plumbing: {
    response: "Plumbing repairs typically range from $125–$350. Installation projects run $350–$800+. Emergency same-day service has a small premium. Would you like a more specific estimate?",
    options: ["Get detailed estimate", "Schedule a service", "Talk to a plumber"],
  },
  price_electrical: {
    response: "Electrical repairs range from $150–$400. New installations or panel upgrades start at $400. All work is done by licensed electricians with permits as needed. Want a custom quote?",
    options: ["Get detailed estimate", "Schedule a service", "Talk to an electrician"],
  },
  price_hvac: {
    response: "HVAC repairs typically cost $175–$500. New system installation ranges from $2,500–$7,000 depending on size and efficiency. We offer free in-home estimates for installs. What's your situation?",
    options: ["Get detailed estimate", "Schedule a service", "Free in-home estimate"],
  },
  price_remodel: {
    response: "Bathroom remodels with AquaFix range from $5,000–$15,000 depending on scope. We handle everything from tile to fixtures. A free design consultation will give you an exact quote. Interested?",
    options: ["Free design consultation", "See our portfolio", "Get a rough estimate"],
  },
  emergency: {
    response: "For emergencies (burst pipes, electrical hazards, no AC in extreme heat), we dispatch technicians within 30–60 minutes, 24/7. Please call us NOW at (555) 123-4567 for fastest response. Can you describe the emergency so I can note it for the dispatcher?",
    options: ["Call now", "Describe the emergency"],
  },
  emergency_describe: {
    response: "Please describe what's happening. Our dispatch team will be alerted immediately. Also share your address if possible. If there's any safety risk (flooding, sparking, gas smell), please evacuate and call 911 first, then us at (555) 123-4567.",
  },
  question: {
    response: "I'd love to help! What would you like to know? Common topics include:\n\n- Service areas and coverage\n- Warranty and guarantees\n- Financing options\n- Licensing and insurance\n- Maintenance plans",
    options: ["Service areas", "Warranty info", "Financing options", "Maintenance plans"],
  },
  service_areas: {
    response: "We serve the greater metro area including Oak Park, Riverdale, Lakewood, Elm Grove, and surrounding communities within a 30-mile radius. Not sure if you're in our area? Share your zip code and I'll check!",
  },
  warranty: {
    response: "All our work comes with a 1-year labor warranty and we honor all manufacturer warranties on parts and equipment (typically 5–10 years). If something we installed fails due to workmanship, we fix it free. Period.",
    options: ["Schedule a service", "Ask another question"],
  },
  financing: {
    response: "We offer flexible financing for projects over $1,000 with approved credit. Options include 0% APR for 12 months and extended plans up to 60 months. Ask your technician for details during the estimate.",
    options: ["Schedule a service", "Ask another question"],
  },
  maintenance: {
    response: "Our Home Protection Plan includes bi-annual inspections, priority scheduling, and 15% off all repairs. Plans start at $19/month. It's the smartest way to prevent costly emergencies. Want to learn more?",
    options: ["Sign me up", "Schedule a service", "Ask another question"],
  },
  fallback: {
    response: "Thanks for that info! Let me connect you with the right resource. You can:\n\n- Scroll down to use our Quote Calculator or Booking form\n- Call us directly at (555) 123-4567\n- Ask me another question",
    options: ["Get a quote", "Book a service", "Ask another question"],
  },
};

function getNextStep(userMsg: string, currentPath: string): string {
  const lower = userMsg.toLowerCase();

  if (currentPath === "take_info" || currentPath === "callback" || currentPath === "emergency_describe" || currentPath === "describe_issue" || currentPath === "service_areas") {
    return "fallback";
  }

  if (lower.includes("schedule") || lower.includes("book") || lower.includes("appointment")) {
    if (lower.includes("plumb")) return "schedule_plumbing";
    if (lower.includes("electric")) return "schedule_electrical";
    if (lower.includes("hvac") || lower.includes("ac") || lower.includes("heat") || lower.includes("furnace")) return "schedule_hvac";
    return "schedule";
  }
  if (lower.includes("price") || lower.includes("cost") || lower.includes("estimate") || lower.includes("quote") || lower.includes("how much")) {
    if (lower.includes("plumb")) return "price_plumbing";
    if (lower.includes("electric")) return "price_electrical";
    if (lower.includes("hvac") || lower.includes("ac") || lower.includes("heat")) return "price_hvac";
    if (lower.includes("remodel") || lower.includes("bathroom")) return "price_remodel";
    return "price";
  }
  if (lower.includes("emergency") || lower.includes("urgent") || lower.includes("burst") || lower.includes("flood") || lower.includes("sparking")) {
    return "emergency";
  }
  if (lower.includes("book") && lower.includes("slot") || lower.includes("specific time")) return "book_slot";
  if (lower.includes("take") && lower.includes("info") || lower.includes("my info")) return "take_info";
  if (lower.includes("callback") || lower.includes("call me")) return "callback";
  if (lower.includes("describe") || lower.includes("my issue")) return "describe_issue";
  if (lower.includes("question") || lower.includes("wondering") || lower.includes("curious")) return "question";
  if (lower.includes("warranty") || lower.includes("guarantee")) return "warranty";
  if (lower.includes("financ") || lower.includes("payment plan")) return "financing";
  if (lower.includes("maintenance") || lower.includes("protection plan") || lower.includes("service plan")) return "maintenance";
  if (lower.includes("area") || lower.includes("location") || lower.includes("zip")) return "service_areas";
  if (lower.includes("call") && lower.includes("now")) return "emergency";
  if (lower.includes("detailed estimate") || lower.includes("custom quote") || lower.includes("rough estimate")) return "price";
  if (lower.includes("sign") && lower.includes("up")) return "schedule";
  if (lower.includes("portfolio")) return "fallback";
  if (lower.includes("design consultation") || lower.includes("in-home")) return "schedule";
  if (lower.includes("talk") || lower.includes("speak")) return "callback";
  if (lower.includes("form")) return "fallback";

  if (lower.includes("plumb")) return "schedule_plumbing";
  if (lower.includes("electric")) return "schedule_electrical";
  if (lower.includes("hvac") || lower.includes("ac")) return "schedule_hvac";

  return "fallback";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: qualifyingFlow.start.response,
      options: qualifyingFlow.start.options,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const initConversation = async () => {
    try {
      const { data } = await supabase
        .from("chat_conversations")
        .insert({})
        .select("id")
        .single();
      if (data) setConversationId(data.id);
    } catch {
      // conversation tracking is optional
    }
  };

  const saveMessage = async (role: string, content: string) => {
    if (!conversationId) return;
    try {
      await supabase.from("chat_messages").insert({
        conversation_id: conversationId,
        role,
        content,
      });
    } catch {
      // message saving is optional
    }
  };

  const handleSend = async (text?: string) => {
    const userMsg = (text || input).trim();
    if (!userMsg) return;

    if (!conversationId) await initConversation();

    const userMessage: Message = { role: "user", content: userMsg };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    saveMessage("user", userMsg);

    await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));

    const nextStep = getNextStep(userMsg, "");
    const flowEntry = qualifyingFlow[nextStep] || qualifyingFlow.fallback;

    const botMessage: Message = {
      role: "assistant",
      content: flowEntry.response,
      options: flowEntry.options,
    };

    setMessages((prev) => [...prev, botMessage]);
    setTyping(false);
    saveMessage("assistant", flowEntry.response);
  };

  const handleOption = async (option: string) => {
    if (!conversationId) await initConversation();

    const userMessage: Message = { role: "user", content: option };
    setMessages((prev) => [...prev, userMessage]);
    setTyping(true);

    saveMessage("user", option);

    await new Promise((r) => setTimeout(r, 600 + Math.random() * 500));

    const nextStep = getNextStep(option, "");
    const flowEntry = qualifyingFlow[nextStep] || qualifyingFlow.fallback;

    const botMessage: Message = {
      role: "assistant",
      content: flowEntry.response,
      options: flowEntry.options,
    };

    setMessages((prev) => [...prev, botMessage]);
    setTyping(false);
    saveMessage("assistant", flowEntry.response);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-primary text-white rounded-full p-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="absolute bottom-full right-0 mb-2 bg-foreground text-background text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with AquaBot
          </span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] animate-fade-up">
          <Card className="shadow-2xl border overflow-hidden">
            <CardHeader className="bg-primary text-white p-4 flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 rounded-full p-1.5">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">
                    AquaBot
                  </CardTitle>
                  <p className="text-xs text-white/70">
                    Always online to help
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </CardHeader>

            <CardContent className="p-0">
              <div className="h-80 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 animate-fade-in ${
                      msg.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                        msg.role === "assistant"
                          ? "bg-primary text-white"
                          : "bg-accent text-accent-foreground"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <Bot className="h-3.5 w-3.5" />
                      ) : (
                        <User className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <div
                      className={`max-w-[75%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                        msg.role === "assistant"
                          ? "bg-white border text-foreground shadow-sm"
                          : "bg-primary text-white"
                      }`}
                    >
                      {msg.content.split("\n").map((line, j) => (
                        <span key={j}>
                          {line}
                          {j < msg.content.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                {messages.length > 0 && messages[messages.length - 1].options && (
                  <div className="flex flex-wrap gap-1.5 pl-9 animate-fade-in">
                    {messages[messages.length - 1].options!.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOption(opt)}
                        className="text-xs px-3 py-1.5 rounded-full bg-white border border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors shadow-sm"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {typing && (
                  <div className="flex gap-2 animate-fade-in">
                    <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-primary text-white">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <div className="bg-white border rounded-xl px-3 py-2 shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 border-t bg-white">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 text-sm h-9"
                    disabled={typing}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={typing || !input.trim()}
                    className="bg-primary hover:bg-primary/90 shrink-0 h-9"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </form>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground justify-center">
                  <span className="flex items-center gap-1">
                    <CalendarCheck className="h-3 w-3" />
                    Book Online
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    (555) 123-4567
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
