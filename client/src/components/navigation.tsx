import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-gray-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <div className="bg-black px-4 py-2 rounded cursor-pointer">
              <span className="brand-yellow font-bold text-xl">TRAILER</span>
              <span className="text-white font-bold text-xl">CAMP</span>
            </div>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection('models')}
                className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
              >
                Modelos
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
              >
                Sobre
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
              >
                Contato
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-400"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-800">
              <button 
                onClick={() => scrollToSection('home')}
                className="block px-3 py-2 text-white hover:text-yellow-400 transition-colors duration-200 font-medium w-full text-left"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection('models')}
                className="block px-3 py-2 text-white hover:text-yellow-400 transition-colors duration-200 font-medium w-full text-left"
              >
                Modelos
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block px-3 py-2 text-white hover:text-yellow-400 transition-colors duration-200 font-medium w-full text-left"
              >
                Sobre
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block px-3 py-2 text-white hover:text-yellow-400 transition-colors duration-200 font-medium w-full text-left"
              >
                Contato
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
