import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all trailers
  app.get("/api/trailers", async (req, res) => {
    try {
      const trailers = await storage.getTrailers();
      res.json(trailers);
    } catch (error) {
      res.status(500).json({ message: "Failed to get trailers" });
    }
  });

  // Get single trailer
  app.get("/api/trailers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid trailer ID" });
      }
      
      const trailer = await storage.getTrailer(id);
      if (!trailer) {
        return res.status(404).json({ message: "Trailer not found" });
      }
      
      res.json(trailer);
    } catch (error) {
      res.status(500).json({ message: "Failed to get trailer" });
    }
  });

  // Create inquiry
  app.post("/api/inquiries", async (req, res) => {
    try {
      const inquiry = insertInquirySchema.parse(req.body);
      const created = await storage.createInquiry(inquiry);
      res.status(201).json(created);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid inquiry data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create inquiry" });
    }
  });

  // Get all inquiries (for admin)
  app.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to get inquiries" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
