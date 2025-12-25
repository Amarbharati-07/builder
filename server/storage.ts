import {
  projects, testimonials, jobs, news, leads,
  type InsertProject, type InsertTestimonial, type InsertJob, type InsertNews, type InsertLead,
  type Project, type Testimonial, type Job, type News, type Lead
} from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  getJobs(): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;

  getNews(): Promise<News[]>;
  createNews(item: InsertNews): Promise<News>;

  createLead(lead: InsertLead): Promise<Lead>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private testimonials: Map<number, Testimonial>;
  private jobs: Map<number, Job>;
  private news: Map<number, News>;
  private leads: Map<number, Lead>;
  private currentId: number;

  constructor() {
    this.projects = new Map();
    this.testimonials = new Map();
    this.jobs = new Map();
    this.news = new Map();
    this.leads = new Map();
    this.currentId = 1;

    // Seed initial data
    this.seedData();
  }

  private seedData() {
    const dummyProject: Project = {
      id: this.currentId++,
      title: "Luxe Heritage",
      slug: "luxe-heritage",
      status: "ongoing",
      location: "Beverly Hills",
      address: "123 Luxury Lane",
      landmark: "Golden Mile",
      price: "Starting ₹2.5 Cr*",
      pricePerSqft: "₹12,500/sqft",
      type: "Residential",
      description: "A masterpiece of modern living.",
      amenities: ["Clubhouse", "Infinity Pool", "24/7 Security"],
      images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"],
      coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
      reraId: "P51800001234",
      reraQRCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=RERA1234",
      possessionDate: "Dec 2025",
      model3D: null,
      brochure: null,
      floorPlans: [],
      certificates: ["ISO 9001:2015", "IGBC Gold"],
      videos: ["https://assets.mixkit.co/videos/preview/mixkit-modern-architecture-building-in-the-city-1188-large.mp4"]
    };
    this.projects.set(dummyProject.id, dummyProject);
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    return Array.from(this.projects.values()).find(p => p.slug === slug);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.currentId++;
    const newProject: Project = { ...project, id };
    this.projects.set(id, newProject);
    return newProject;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentId++;
    const newTestimonial: Testimonial = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  async getJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values());
  }

  async createJob(job: InsertJob): Promise<Job> {
    const id = this.currentId++;
    const newJob: Job = { ...job, id };
    this.jobs.set(id, newJob);
    return newJob;
  }

  async getNews(): Promise<News[]> {
    return Array.from(this.news.values());
  }

  async createNews(item: InsertNews): Promise<News> {
    const id = this.currentId++;
    const newNews: News = { ...item, id };
    this.news.set(id, newNews);
    return newNews;
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const id = this.currentId++;
    const newLead: Lead = { ...lead, id, createdAt: new Date() };
    this.leads.set(id, newLead);
    return newLead;
  }
}

export const storage = new MemStorage();
