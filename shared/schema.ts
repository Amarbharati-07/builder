import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === PROJECTS ===
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  status: text("status").notNull(), // 'ongoing', 'completed', 'upcoming'
  location: text("location").notNull(),
  address: text("address").notNull(),
  landmark: text("landmark").notNull(),
  price: text("price").notNull(),
  pricePerSqft: text("price_per_sqft").notNull(),
  type: text("type").notNull(), // 'Residential', 'Commercial'
  description: text("description").notNull(),
  amenities: jsonb("amenities").$type<string[]>().notNull(),
  images: jsonb("images").$type<string[]>().notNull(),
  coverImage: text("cover_image").notNull(),
  reraId: text("rera_id").notNull(),
  reraQRCode: text("rera_qr_code").notNull(),
  possessionDate: text("possession_date"),
  model3D: text("model_3d"),
  brochure: text("brochure"),
  floorPlans: jsonb("floor_plans").$type<string[]>().notNull().default([]),
  certificates: jsonb("certificates").$type<string[]>().notNull().default([]),
});

// === TESTIMONIALS ===
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  avatar: text("avatar"),
  videoUrl: text("video_url"),
});

// === JOBS (Careers) ===
export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  department: text("department").notNull(),
  location: text("location").notNull(),
  type: text("type").notNull(), // 'Full-time', etc.
  description: text("description").notNull(),
});

// === NEWS & EVENTS ===
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
});

// === LEADS ===
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message"),
  projectId: integer("project_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export const insertJobSchema = createInsertSchema(jobs).omit({ id: true });
export const insertNewsSchema = createInsertSchema(news).omit({ id: true });
export const insertLeadSchema = createInsertSchema(leads).omit({ id: true, createdAt: true });

// === TYPES ===
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type Job = typeof jobs.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;

export type News = typeof news.$inferSelect;
export type InsertNews = z.infer<typeof insertNewsSchema>;

export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;

// Chat type
export type ChatRequest = { message: string };
export type ChatResponse = { message: string };
