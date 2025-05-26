import { users, trailers, inquiries, type User, type InsertUser, type Trailer, type InsertTrailer, type Inquiry, type InsertInquiry } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getTrailers(): Promise<Trailer[]>;
  getTrailer(id: number): Promise<Trailer | undefined>;
  createTrailer(trailer: InsertTrailer): Promise<Trailer>;
  
  getInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private trailers: Map<number, Trailer>;
  private inquiries: Map<number, Inquiry>;
  private currentUserId: number;
  private currentTrailerId: number;
  private currentInquiryId: number;

  constructor() {
    this.users = new Map();
    this.trailers = new Map();
    this.inquiries = new Map();
    this.currentUserId = 1;
    this.currentTrailerId = 1;
    this.currentInquiryId = 1;
    
    // Initialize with sample trailers
    this.initializeTrailers();
  }

  private initializeTrailers() {
    const sampleTrailers: InsertTrailer[] = [
      {
        name: "Adventure Pro",
        description: "Perfeito para longas viagens com toda família",
        price: "Sob consulta",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        images: [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        specifications: "Trailer completo com cozinha, banheiro e área de descanso. Ideal para famílias.",
        weight: "1.200kg",
        capacity: "4 pessoas",
        materials: "Alumínio e fibra de vidro",
        dimensions: "5.2m x 2.1m x 2.8m"
      },
      {
        name: "Compact Explorer",
        description: "Ideal para casais em busca de aventura",
        price: "Sob consulta",
        image: "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        images: [
          "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        specifications: "Compacto mas completo, com todas as comodidades essenciais.",
        weight: "800kg",
        capacity: "2 pessoas",
        materials: "Alumínio e ABS",
        dimensions: "4.2m x 1.8m x 2.5m"
      },
      {
        name: "Luxury Elite",
        description: "Máximo conforto para suas viagens",
        price: "Sob consulta",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        images: [
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        specifications: "O mais luxuoso da linha, com acabamento premium e equipamentos de última geração.",
        weight: "1.500kg",
        capacity: "6 pessoas",
        materials: "Fibra de carbono e alumínio",
        dimensions: "6.5m x 2.3m x 3.0m"
      },
      {
        name: "Off-Road Master",
        description: "Para terrenos mais desafiadores",
        price: "Sob consulta",
        image: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        images: [
          "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        specifications: "Construído para enfrentar qualquer terreno com suspensão reforçada.",
        weight: "1.300kg",
        capacity: "4 pessoas",
        materials: "Aço galvanizado e alumínio",
        dimensions: "5.0m x 2.0m x 2.7m"
      },
      {
        name: "Family Plus",
        description: "Espaço amplo para toda a família",
        price: "Sob consulta",
        image: "https://pixabay.com/get/gfeb2a4f1d27b060a0ad3d05eaa153dba189cc97c413c2e0ce3d10f048ffa3fb1e19766fcf9c273c377b8f8da5be50ad8c4606b3fe1772b7dd1e0a1bc46803521_1280.jpg",
        images: [
          "https://pixabay.com/get/gfeb2a4f1d27b060a0ad3d05eaa153dba189cc97c413c2e0ce3d10f048ffa3fb1e19766fcf9c273c377b8f8da5be50ad8c4606b3fe1772b7dd1e0a1bc46803521_1280.jpg",
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        specifications: "Amplo espaço interno com múltiplas áreas funcionais.",
        weight: "1.400kg",
        capacity: "8 pessoas",
        materials: "Alumínio e fibra de vidro",
        dimensions: "7.0m x 2.4m x 3.2m"
      },
      {
        name: "Vintage Classic",
        description: "Design clássico com modernidade",
        price: "Sob consulta",
        image: "https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        images: [
          "https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        specifications: "Estilo vintage com todas as comodidades modernas.",
        weight: "1.100kg",
        capacity: "3 pessoas",
        materials: "Alumínio polido e madeira",
        dimensions: "4.8m x 2.0m x 2.6m"
      }
    ];

    sampleTrailers.forEach(trailer => {
      this.createTrailer(trailer);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getTrailers(): Promise<Trailer[]> {
    return Array.from(this.trailers.values());
  }

  async getTrailer(id: number): Promise<Trailer | undefined> {
    return this.trailers.get(id);
  }

  async createTrailer(insertTrailer: InsertTrailer): Promise<Trailer> {
    const id = this.currentTrailerId++;
    const trailer: Trailer = { ...insertTrailer, id };
    this.trailers.set(id, trailer);
    return trailer;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const inquiry: Inquiry = { ...insertInquiry, id };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
}

export const storage = new MemStorage();
