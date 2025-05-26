import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Trailer } from "@shared/schema";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";

export default function TrailerDetail() {
  const { id } = useParams();
  
  const { data: trailer, isLoading, error } = useQuery<Trailer>({
    queryKey: [`/api/trailers/${id}`],
    enabled: !!id,
  });

  const openWhatsApp = () => {
    const whatsappNumber = "5511999999999";
    const message = `Olá! Gostaria de saber mais sobre o trailer ${trailer?.name}.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando trailer...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !trailer) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Trailer não encontrado</h1>
            <Link href="/">
              <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao início
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/">
            <Button variant="outline" className="mb-8 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar aos modelos
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-video rounded-xl overflow-hidden">
                <img 
                  src={trailer.image} 
                  alt={trailer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {trailer.images.slice(0, 3).map((img, idx) => (
                  <div key={idx} className="aspect-video rounded-lg overflow-hidden">
                    <img 
                      src={img} 
                      alt={`${trailer.name} - ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{trailer.name}</h1>
                <p className="text-xl text-gray-300 mb-6">{trailer.description}</p>
                <div className="text-2xl font-bold brand-yellow">{trailer.price}</div>
              </div>

              {/* Specifications */}
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Especificações Técnicas</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Peso:</span>
                      <span>{trailer.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Capacidade:</span>
                      <span>{trailer.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Materiais:</span>
                      <span>{trailer.materials}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Dimensões:</span>
                      <span>{trailer.dimensions}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Descrição</h3>
                  <p className="text-gray-300">{trailer.specifications}</p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button 
                  onClick={openWhatsApp}
                  className="w-full bg-whatsapp hover:bg-green-600 text-white text-lg py-6"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Falar no WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black text-lg py-6"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Solicitar mais informações
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
