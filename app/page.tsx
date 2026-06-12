import Header from "@/components/header";
import Hero from "@/components/hero";
import Services from "@/components/services";
import HowItWorks from "@/components/how-it-works";
import Testimonials from "@/components/testimonials";
import QuoteCalculator from "@/components/quote-calculator";
import BookingWidget from "@/components/booking-widget";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <HowItWorks />
      <Testimonials />
      <QuoteCalculator />
      <BookingWidget />
      <FAQ />
      <Footer />
      <Chatbot />
    </div>
  );
}
