import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";

// Initialize OpenAI client
// Replit AI integration automatically sets OPENAI_API_KEY if the blueprint is used.
// If not, this might fail unless the user provides a key, but for this demo we'll try-catch or use a mock if it fails?
// Actually, standard practice in Replit AI blueprint is just new OpenAI().
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "mock-key" });

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProjectBySlug(req.params.slug);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  });

  // Testimonials
  app.get(api.testimonials.list.path, async (req, res) => {
    const items = await storage.getTestimonials();
    res.json(items);
  });

  // Jobs
  app.get(api.jobs.list.path, async (req, res) => {
    const items = await storage.getJobs();
    res.json(items);
  });

  // News
  app.get(api.news.list.path, async (req, res) => {
    const items = await storage.getNews();
    res.json(items);
  });

  // Leads
  app.post(api.leads.create.path, async (req, res) => {
    try {
      const input = api.leads.create.input.parse(req.body);
      await storage.createLead(input);
      res.status(201).json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Chatbot
  app.post(api.chat.send.path, async (req, res) => {
    try {
      const { message } = api.chat.send.input.parse(req.body);
      
      // Basic check if API key is present
      if (!process.env.OPENAI_API_KEY) {
         // Mock response if no key (e.g. integration not fully set up or waiting)
         return res.json({ 
           message: "Thank you for your message. Our sales team will contact you shortly. (AI Chat requires OpenAI API Key or Replit AI Integration)" 
         });
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful, professional AI assistant for a luxury real estate builder. Provide polite, concise, and helpful answers about buying homes, amenities, and booking site visits. Do not invent specific prices or dates if not known." },
          { role: "user", content: message }
        ],
      });

      res.json({ message: completion.choices[0].message.content || "I apologize, I couldn't generate a response." });
    } catch (err) {
      console.error("Chat error:", err);
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await storage.createProject({
      title: "The Grand Horizon",
      slug: "grand-horizon",
      status: "ongoing",
      location: "Downtown Skyline",
      price: "Starts from ₹2.5 Cr",
      type: "Residential",
      description: "Experience the pinnacle of luxury living at The Grand Horizon. Offering panoramic views of the city skyline, these ultra-spacious 3 & 4 BHK residences are designed for those who have arrived.",
      amenities: ["Infinity Pool", "Sky Lounge", "Private Theatre", "Concierge Service", "Spa & Wellness"],
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80"
      ],
      coverImage: "https://images.unsplash.com/photo-1600596542815-2495db98dada?auto=format&fit=crop&q=80",
      reraId: "P51800001234",
      possessionDate: "Dec 2026"
    });

    await storage.createProject({
      title: "Emerald Gardens",
      slug: "emerald-gardens",
      status: "completed",
      location: "Green Valley",
      price: "Sold Out",
      type: "Residential",
      description: "A serene oasis in the middle of the bustling city. Emerald Gardens offers 2 BHK apartments surrounded by lush greenery and landscaped gardens.",
      amenities: ["Jogging Track", "Children's Play Area", "Clubhouse", "Yoga Deck"],
      images: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80"
      ],
      coverImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80",
      reraId: "P51800005678",
      possessionDate: "Ready to Move"
    });

    await storage.createProject({
      title: "Tech Plaza",
      slug: "tech-plaza",
      status: "upcoming",
      location: "Business District",
      price: "Starts from ₹15,000/sqft",
      type: "Commercial",
      description: "Next-gen office spaces for the modern enterprise. Smart building features, high-speed elevators, and premium retail spaces.",
      amenities: ["24/7 Security", "High-speed Internet", "Conference Rooms", "Food Court"],
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
      ],
      coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
      reraId: "P51800009012",
      possessionDate: "Coming Soon"
    });
  }

  const existingTestimonials = await storage.getTestimonials();
  if (existingTestimonials.length === 0) {
    await storage.createTestimonial({
      name: "Rajesh Kumar",
      role: "CEO, TechSolutions",
      content: "Buying a home at Grand Horizon was the best decision. The amenities are world-class and the build quality is impeccable.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
    });
    await storage.createTestimonial({
      name: "Priya Singh",
      role: "Architect",
      content: "As an architect myself, I appreciate the attention to detail in their designs. Truly luxurious.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
    });
  }

  const existingJobs = await storage.getJobs();
  if (existingJobs.length === 0) {
    await storage.createJob({
      title: "Senior Sales Manager",
      department: "Sales",
      location: "Mumbai HQ",
      type: "Full-time",
      description: "We are looking for an experienced sales manager to lead our luxury segment."
    });
    await storage.createJob({
      title: "Site Engineer",
      department: "Construction",
      location: "Bangalore",
      type: "Full-time",
      description: "Oversee construction activities and ensure quality compliance."
    });
  }

  const existingNews = await storage.getNews();
  if (existingNews.length === 0) {
    await storage.createNews({
      title: "Grand Horizon Launch Event",
      date: "Oct 15, 2024",
      content: "We successfully launched our flagship project with a gala dinner attended by industry leaders.",
      category: "Events",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80"
    });
    await storage.createNews({
      title: "Best Luxury Developer Award",
      date: "Nov 20, 2024",
      content: "We are honored to receive the Best Luxury Developer award at the National Real Estate Summit.",
      category: "Awards",
      image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80"
    });
  }
}
