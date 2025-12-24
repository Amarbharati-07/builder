import { db } from "./db";
import {
  projects, testimonials, jobs, news, leads,
  type InsertProject, type InsertTestimonial, type InsertJob, type InsertNews, type InsertLead,
  type Project, type Testimonial, type Job, type News, type Lead
} from "@shared/schema";
import { eq } from "drizzle-orm";

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

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.slug, slug));
    return project;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
    return newTestimonial;
  }

  async getJobs(): Promise<Job[]> {
    return await db.select().from(jobs);
  }

  async createJob(job: InsertJob): Promise<Job> {
    const [newJob] = await db.insert(jobs).values(job).returning();
    return newJob;
  }

  async getNews(): Promise<News[]> {
    return await db.select().from(news);
  }

  async createNews(item: InsertNews): Promise<News> {
    const [newItem] = await db.insert(news).values(item).returning();
    return newItem;
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db.insert(leads).values(lead).returning();
    return newLead;
  }
}

export const storage = new DatabaseStorage();
