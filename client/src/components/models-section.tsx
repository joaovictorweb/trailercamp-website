import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { type Trailer } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ModelsSection() {
  const { data: trailers, isLoading } = useQuery<Trailer[]>({
    queryKey: ["/api/trailers"],
  });

  if (isLoading) {
    return (
      <section id="models" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Nossos <span className="brand-yellow">Modelos</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-gray-800 border-gray-700 animate-pulse">
                <div className="h-64 bg-gray-700 rounded-t-xl"></div>
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-700 rounded w-24"></div>
                    <div className="h-10 bg-gray-700 rounded w-28"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="models" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nossos <span className="brand-yellow">Modelos</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Cada trailer é cuidadosamente projetado para oferecer máximo conforto e durabilidade em suas aventuras.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trailers?.map((trailer) => (
            <Card 
              key={trailer.id} 
              className="bg-gray-800 border-gray-700 overflow-hidden shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={trailer.image} 
                  alt={trailer.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">{trailer.name}</h3>
                <p className="text-gray-400 mb-4">{trailer.description}</p>
                <div className="flex justify-between items-center">
                  <span className="brand-yellow font-bold text-lg">{trailer.price}</span>
                  <Link href={`/trailer/${trailer.id}`}>
                    <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
                      Ver detalhes
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
