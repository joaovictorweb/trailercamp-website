import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const openWhatsApp = () => {
    const whatsappNumber = "5511999999999";
    const message = "Olá! Gostaria de saber mais sobre os trailers TrailerCamp.";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const scrollToModels = () => {
    const element = document.getElementById('models');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://pixabay.com/get/g1e6f86dfaf15069bb329f1f997c9f7608c9f3d28166f2c757dc06622cde7fb2c77f13efce37ab3d526b55e2460aa48780aa59f0d7d4eb17caab940000922082c_1280.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Seu próximo <span className="brand-yellow">trailer</span> está aqui
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Explore o mundo com liberdade e conforto. Trailers robustos, confiáveis e personalizados para suas aventuras.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={openWhatsApp}
            className="bg-whatsapp hover:bg-green-600 text-white px-8 py-4 text-lg shadow-lg"
          >
            <MessageCircle className="mr-3 h-5 w-5" />
            Fale agora no WhatsApp
          </Button>
          <Button 
            onClick={scrollToModels}
            variant="outline" 
            className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-4 text-lg"
          >
            Ver Modelos
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown className="h-8 w-8" />
      </div>
    </section>
  );
}
