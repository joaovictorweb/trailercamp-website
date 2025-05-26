import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ModelsSection from "@/components/models-section";
import TestimonialsSection from "@/components/testimonials-section";
import AboutSection from "@/components/about-section";
import FAQSection from "@/components/faq-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <HeroSection />
      <ModelsSection />
      <TestimonialsSection />
      <AboutSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
