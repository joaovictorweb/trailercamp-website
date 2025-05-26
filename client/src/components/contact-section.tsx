import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertInquirySchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

const contactFormSchema = insertInquirySchema.extend({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ContactFormData) => apiRequest("POST", "/api/inquiries", data),
    onSuccess: () => {
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato! Retornaremos em breve.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
    },
    onError: () => {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  const openWhatsApp = () => {
    const whatsappNumber = "5511999999999";
    const message = "Olá! Preciso de atendimento rápido sobre os trailers TrailerCamp.";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Entre em <span className="brand-yellow">Contato</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Estamos prontos para ajudar você a encontrar o trailer perfeito para suas aventuras.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-8">Solicite mais informações</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Nome completo</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Seu nome completo" 
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">E-mail</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="seu@email.com" 
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Telefone</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel"
                          placeholder="(11) 99999-9999" 
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Mensagem</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Conte-nos sobre seu interesse..." 
                          rows={4}
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className="w-full bg-yellow-400 text-black hover:bg-yellow-500 py-3"
                >
                  {mutation.isPending ? "Enviando..." : "Enviar mensagem"}
                </Button>
              </form>
            </Form>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-8">Informações de contato</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="brand-yellow h-6 w-6 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Endereço</h4>
                    <p className="text-gray-400">
                      Rua dos Trailers, 123<br />
                      Industrial Park - São Paulo, SP<br />
                      CEP: 01234-567
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="brand-yellow h-6 w-6 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Telefone</h4>
                    <p className="text-gray-400">(11) 3456-7890</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="brand-yellow h-6 w-6 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">E-mail</h4>
                    <p className="text-gray-400">contato@trailercamp.com.br</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="brand-yellow h-6 w-6 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Horário de atendimento</h4>
                    <p className="text-gray-400">
                      Segunda a Sexta: 8h às 18h<br />
                      Sábado: 8h às 12h
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg mb-4">Precisa de atendimento rápido?</h4>
                <Button 
                  onClick={openWhatsApp}
                  className="w-full bg-whatsapp hover:bg-green-600 text-white py-3"
                >
                  <MessageCircle className="mr-3 h-5 w-5" />
                  Falar no WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
