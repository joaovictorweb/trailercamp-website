import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const openWhatsApp = () => {
    const whatsappNumber = "5511999999999";
    const message = "Olá! Gostaria de saber mais sobre os trailers TrailerCamp.";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        onClick={openWhatsApp}
        className="bg-whatsapp hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-200 hover:scale-110"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}
