import {
  projects, testimonials, jobs, news, leads,
  type InsertProject, type InsertTestimonial, type InsertJob, type InsertNews, type InsertLead,
  type Project, type Testimonial, type Job, type News, type Lead, type Amenity, type Connectivity
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
    const allProjects: Project[] = [
      // Residential Projects
      {
        id: this.currentId++,
        title: "Luxe Heritage",
        slug: "luxe-heritage",
        status: "ongoing",
        location: "Kalyan, Maharashtra",
        address: "123 Heritage Plaza, Kalyan, Maharashtra - 421306",
        landmark: "Near Kalyan Railway Station",
        builderName: "Luxe Developments Ltd.",
        price: "Starting ₹2.5 Cr*",
        pricePerSqft: "₹15,000/sqft",
        type: "Residential",
        description: "A masterpiece of modern living with premium finishes and smart home integration.",
        amenities: [
          { name: "Swimming Pool", image: "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=1000&auto=format&fit=crop" },
          { name: "Gym", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" },
          { name: "Garden", image: "https://images.unsplash.com/photo-1585320817134-ab627ae9c73e?q=80&w=1000&auto=format&fit=crop" },
          { name: "Children Play Area", image: "https://images.unsplash.com/photo-1576766381006-5a84d30eaed0?q=80&w=1000&auto=format&fit=crop" },
          { name: "Clubhouse", image: "https://images.unsplash.com/photo-1549891072-99f7dbb41c4f?q=80&w=1000&auto=format&fit=crop" },
          { name: "24/7 Security", image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop" },
          { name: "Parking", image: "https://images.unsplash.com/photo-1597524007969-4b3eb25a82d6?q=80&w=1000&auto=format&fit=crop" }
        ],
        images: [
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1512917774080-9b2b17855449?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1974&auto=format&fit=crop"
        ],
        coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1974&auto=format&fit=crop",
        reraId: "MH-KALYAN-001234",
        reraQRCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MH-KALYAN-001234",
        possessionDate: "Dec 2025",
        model3D: null,
        brochure: null,
        floorPlans: [],
        certificates: ["ISO 9001:2015", "IGBC Gold"],
        videos: ["https://assets.mixkit.co/videos/preview/mixkit-modern-architecture-building-in-the-city-1188-large.mp4"],
        connectivity: [
          { type: "Hospital", distance: "2.5 km" },
          { type: "Metro Station", distance: "1.2 km" },
          { type: "Railway Station", distance: "0.8 km" },
          { type: "Bus Stop", distance: "0.5 km" },
          { type: "Market/School", distance: "1.5 km" }
        ]
      },
      {
        id: this.currentId++,
        title: "Royal Meadows",
        slug: "royal-meadows",
        status: "ongoing",
        location: "Kalyan, Maharashtra",
        address: "456 Green Valley, Kalyan, Maharashtra - 421306",
        landmark: "Near Kalyan Hospital",
        builderName: "Royal Constructions India",
        price: "Starting ₹1.8 Cr*",
        pricePerSqft: "₹12,000/sqft",
        type: "Residential",
        description: "Serene residential community with landscaped gardens and eco-friendly designs.",
        amenities: [
          { name: "Swimming Pool", image: "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=1000&auto=format&fit=crop" },
          { name: "Gym", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" },
          { name: "Garden", image: "https://images.unsplash.com/photo-1585320817134-ab627ae9c73e?q=80&w=1000&auto=format&fit=crop" },
          { name: "Children Play Area", image: "https://images.unsplash.com/photo-1576766381006-5a84d30eaed0?q=80&w=1000&auto=format&fit=crop" },
          { name: "Clubhouse", image: "https://images.unsplash.com/photo-1549891072-99f7dbb41c4f?q=80&w=1000&auto=format&fit=crop" }
        ],
        images: [
          "https://images.unsplash.com/photo-1512917774080-9b2b17855449?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1974&auto=format&fit=crop"
        ],
        coverImage: "https://images.unsplash.com/photo-1512917774080-9b2b17855449?q=80&w=1974&auto=format&fit=crop",
        reraId: "MH-KALYAN-005678",
        reraQRCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MH-KALYAN-005678",
        possessionDate: "Mar 2026",
        model3D: null,
        brochure: null,
        floorPlans: [],
        certificates: ["LEED Certified"],
        videos: [],
        connectivity: [
          { type: "Hospital", distance: "1.0 km" },
          { type: "Metro Station", distance: "2.5 km" },
          { type: "Railway Station", distance: "1.5 km" },
          { type: "Bus Stop", distance: "0.3 km" },
          { type: "Market/School", distance: "1.8 km" }
        ]
      },
      {
        id: this.currentId++,
        title: "Skyline Towers",
        slug: "skyline-towers",
        status: "completed",
        location: "Kalyan, Maharashtra",
        address: "789 Sky Heights, Kalyan, Maharashtra - 421306",
        landmark: "Near Highway Access",
        builderName: "Skyline Developers",
        price: "₹3.2 Cr - ₹5.5 Cr",
        pricePerSqft: "₹18,000/sqft",
        type: "Residential",
        description: "Ultra-luxury residential towers with panoramic city views and premium amenities.",
        amenities: [
          { name: "Swimming Pool", image: "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=1000&auto=format&fit=crop" },
          { name: "Gym", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" },
          { name: "Garden", image: "https://images.unsplash.com/photo-1585320817134-ab627ae9c73e?q=80&w=1000&auto=format&fit=crop" },
          { name: "Children Play Area", image: "https://images.unsplash.com/photo-1576766381006-5a84d30eaed0?q=80&w=1000&auto=format&fit=crop" },
          { name: "Clubhouse", image: "https://images.unsplash.com/photo-1549891072-99f7dbb41c4f?q=80&w=1000&auto=format&fit=crop" },
          { name: "24/7 Security", image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop" }
        ],
        images: [
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1974&auto=format&fit=crop"
        ],
        coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1974&auto=format&fit=crop",
        reraId: "MH-KALYAN-009012",
        reraQRCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MH-KALYAN-009012",
        possessionDate: "Jan 2024",
        model3D: null,
        brochure: null,
        floorPlans: [],
        certificates: ["ISO 9001:2015", "Green Building"],
        videos: [],
        connectivity: [
          { type: "Hospital", distance: "3.0 km" },
          { type: "Metro Station", distance: "2.8 km" },
          { type: "Railway Station", distance: "3.5 km" },
          { type: "Bus Stop", distance: "1.2 km" },
          { type: "Market/School", distance: "2.0 km" }
        ]
      },
      {
        id: this.currentId++,
        title: "Elite Residences",
        slug: "elite-residences",
        status: "upcoming",
        location: "Kalyan, Maharashtra",
        address: "321 Elite Plaza, Kalyan, Maharashtra - 421306",
        landmark: "Near Business District",
        builderName: "Elite Properties Group",
        price: "Starting ₹2.2 Cr*",
        pricePerSqft: "₹14,000/sqft",
        type: "Residential",
        description: "Contemporary luxury living with smart home technology and sustainable features.",
        amenities: [
          { name: "Swimming Pool", image: "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=1000&auto=format&fit=crop" },
          { name: "Gym", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" },
          { name: "Garden", image: "https://images.unsplash.com/photo-1585320817134-ab627ae9c73e?q=80&w=1000&auto=format&fit=crop" },
          { name: "Clubhouse", image: "https://images.unsplash.com/photo-1549891072-99f7dbb41c4f?q=80&w=1000&auto=format&fit=crop" },
          { name: "Parking", image: "https://images.unsplash.com/photo-1597524007969-4b3eb25a82d6?q=80&w=1000&auto=format&fit=crop" }
        ],
        images: [
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1974&auto=format&fit=crop"
        ],
        coverImage: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1974&auto=format&fit=crop",
        reraId: "MH-KALYAN-003456",
        reraQRCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MH-KALYAN-003456",
        possessionDate: "Jun 2026",
        model3D: null,
        brochure: null,
        floorPlans: [],
        certificates: ["FSC Certified"],
        videos: [],
        connectivity: [
          { type: "Hospital", distance: "2.2 km" },
          { type: "Metro Station", distance: "1.8 km" },
          { type: "Railway Station", distance: "1.0 km" },
          { type: "Bus Stop", distance: "0.6 km" },
          { type: "Market/School", distance: "1.3 km" }
        ]
      },
      {
        id: this.currentId++,
        title: "Prime Heights",
        slug: "prime-heights",
        status: "ongoing",
        location: "Kalyan, Maharashtra",
        address: "654 Prime Avenue, Kalyan, Maharashtra - 421306",
        landmark: "Near Shopping Mall",
        builderName: "Prime Real Estate",
        price: "Starting ₹2.0 Cr*",
        pricePerSqft: "₹13,500/sqft",
        type: "Residential",
        description: "Modern residential complex with world-class facilities and strategic location.",
        amenities: [
          { name: "Swimming Pool", image: "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=1000&auto=format&fit=crop" },
          { name: "Gym", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" },
          { name: "Children Play Area", image: "https://images.unsplash.com/photo-1576766381006-5a84d30eaed0?q=80&w=1000&auto=format&fit=crop" },
          { name: "Clubhouse", image: "https://images.unsplash.com/photo-1549891072-99f7dbb41c4f?q=80&w=1000&auto=format&fit=crop" },
          { name: "24/7 Security", image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop" }
        ],
        images: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1512917774080-9b2b17855449?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1974&auto=format&fit=crop"
        ],
        coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1974&auto=format&fit=crop",
        reraId: "MH-KALYAN-007890",
        reraQRCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MH-KALYAN-007890",
        possessionDate: "Sep 2025",
        model3D: null,
        brochure: null,
        floorPlans: [],
        certificates: ["Energy Star"],
        videos: [],
        connectivity: [
          { type: "Hospital", distance: "1.8 km" },
          { type: "Metro Station", distance: "2.0 km" },
          { type: "Railway Station", distance: "1.3 km" },
          { type: "Bus Stop", distance: "0.7 km" },
          { type: "Market/School", distance: "1.6 km" }
        ]
      },
      // Commercial Projects
      {
        id: this.currentId++,
        title: "Corporate Plaza",
        slug: "corporate-plaza",
        status: "ongoing",
        location: "Kalyan, Maharashtra",
        address: "999 Business Hub, Kalyan, Maharashtra - 421306",
        landmark: "Near Business Park",
        builderName: "Corporate Developments",
        price: "Starting ₹50 L/unit",
        pricePerSqft: "₹8,500/sqft",
        type: "Commercial",
        description: "State-of-the-art commercial complex for offices, retail, and business services.",
        amenities: [
          { name: "Conference Hall", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" },
          { name: "Parking", image: "https://images.unsplash.com/photo-1597524007969-4b3eb25a82d6?q=80&w=1000&auto=format&fit=crop" },
          { name: "24/7 Security", image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop" },
          { name: "Food Court", image: "https://images.unsplash.com/photo-1585328707852-ffe660dbf857?q=80&w=1000&auto=format&fit=crop" },
          { name: "Reception Area", image: "https://images.unsplash.com/photo-1587280191519-2f0ee0abda25?q=80&w=1000&auto=format&fit=crop" }
        ],
        images: [
          "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1974&auto=format&fit=crop"
        ],
        coverImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1974&auto=format&fit=crop",
        reraId: "MH-KALYAN-COM-001",
        reraQRCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MH-KALYAN-COM-001",
        possessionDate: "Apr 2026",
        model3D: null,
        brochure: null,
        floorPlans: [],
        certificates: ["IGBC Platinum"],
        videos: [],
        connectivity: [
          { type: "Hospital", distance: "2.5 km" },
          { type: "Metro Station", distance: "1.5 km" },
          { type: "Railway Station", distance: "2.0 km" },
          { type: "Bus Stop", distance: "0.8 km" },
          { type: "Market/School", distance: "1.2 km" }
        ]
      },
      {
        id: this.currentId++,
        title: "Retail Hub",
        slug: "retail-hub",
        status: "completed",
        location: "Kalyan, Maharashtra",
        address: "555 Shopping Center, Kalyan, Maharashtra - 421306",
        landmark: "Downtown Area",
        builderName: "Retail Solutions Ltd",
        price: "₹40 L - ₹2.5 Cr",
        pricePerSqft: "₹7,500/sqft",
        type: "Commercial",
        description: "Premium retail and entertainment destination with modern infrastructure.",
        amenities: [
          { name: "Parking", image: "https://images.unsplash.com/photo-1597524007969-4b3eb25a82d6?q=80&w=1000&auto=format&fit=crop" },
          { name: "Food Court", image: "https://images.unsplash.com/photo-1585328707852-ffe660dbf857?q=80&w=1000&auto=format&fit=crop" },
          { name: "24/7 Security", image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop" },
          { name: "Entertainment Zone", image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=1000&auto=format&fit=crop" },
          { name: "ATM/Banking", image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1000&auto=format&fit=crop" }
        ],
        images: [
          "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1487184988519-e21cc028cb29?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1974&auto=format&fit=crop"
        ],
        coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1974&auto=format&fit=crop",
        reraId: "MH-KALYAN-COM-002",
        reraQRCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MH-KALYAN-COM-002",
        possessionDate: "Oct 2023",
        model3D: null,
        brochure: null,
        floorPlans: [],
        certificates: ["LEED Gold"],
        videos: [],
        connectivity: [
          { type: "Hospital", distance: "1.0 km" },
          { type: "Metro Station", distance: "0.5 km" },
          { type: "Railway Station", distance: "0.8 km" },
          { type: "Bus Stop", distance: "0.2 km" },
          { type: "Market/School", distance: "0.4 km" }
        ]
      },
      {
        id: this.currentId++,
        title: "Tech Park",
        slug: "tech-park",
        status: "ongoing",
        location: "Kalyan, Maharashtra",
        address: "888 Innovation Drive, Kalyan, Maharashtra - 421306",
        landmark: "Industrial Zone",
        builderName: "Tech Infrastructure",
        price: "Starting ₹75 L/unit",
        pricePerSqft: "₹9,000/sqft",
        type: "Commercial",
        description: "Specialized technology park with advanced IT infrastructure and facilities.",
        amenities: [
          { name: "Conference Hall", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" },
          { name: "Cafeteria", image: "https://images.unsplash.com/photo-1585328707852-ffe660dbf857?q=80&w=1000&auto=format&fit=crop" },
          { name: "Parking", image: "https://images.unsplash.com/photo-1597524007969-4b3eb25a82d6?q=80&w=1000&auto=format&fit=crop" },
          { name: "24/7 Security", image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop" }
        ],
        images: [
          "https://images.unsplash.com/photo-1487184988519-e21cc028cb29?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1974&auto=format&fit=crop"
        ],
        coverImage: "https://images.unsplash.com/photo-1487184988519-e21cc028cb29?q=80&w=1974&auto=format&fit=crop",
        reraId: "MH-KALYAN-COM-003",
        reraQRCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MH-KALYAN-COM-003",
        possessionDate: "Aug 2026",
        model3D: null,
        brochure: null,
        floorPlans: [],
        certificates: ["ISO 27001"],
        videos: [],
        connectivity: [
          { type: "Hospital", distance: "3.5 km" },
          { type: "Metro Station", distance: "3.0 km" },
          { type: "Railway Station", distance: "2.8 km" },
          { type: "Bus Stop", distance: "1.5 km" },
          { type: "Market/School", distance: "2.5 km" }
        ]
      },
      {
        id: this.currentId++,
        title: "Medical Complex",
        slug: "medical-complex",
        status: "upcoming",
        location: "Kalyan, Maharashtra",
        address: "222 Healthcare Hub, Kalyan, Maharashtra - 421306",
        landmark: "Medical District",
        builderName: "Healthcare Developments",
        price: "Starting ₹1 Cr/unit",
        pricePerSqft: "₹10,000/sqft",
        type: "Commercial",
        description: "Integrated medical and healthcare complex with modern diagnostic facilities.",
        amenities: [
          { name: "Parking", image: "https://images.unsplash.com/photo-1597524007969-4b3eb25a82d6?q=80&w=1000&auto=format&fit=crop" },
          { name: "Reception Area", image: "https://images.unsplash.com/photo-1587280191519-2f0ee0abda25?q=80&w=1000&auto=format&fit=crop" },
          { name: "24/7 Security", image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop" },
          { name: "Cafeteria", image: "https://images.unsplash.com/photo-1585328707852-ffe660dbf857?q=80&w=1000&auto=format&fit=crop" }
        ],
        images: [
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1530634158240-6a66753bb4b6?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1576091160744-112099c9a260?q=80&w=1974&auto=format&fit=crop"
        ],
        coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1974&auto=format&fit=crop",
        reraId: "MH-KALYAN-COM-004",
        reraQRCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MH-KALYAN-COM-004",
        possessionDate: "Dec 2026",
        model3D: null,
        brochure: null,
        floorPlans: [],
        certificates: ["Healthcare Certified"],
        videos: [],
        connectivity: [
          { type: "Hospital", distance: "0.5 km" },
          { type: "Metro Station", distance: "2.0 km" },
          { type: "Railway Station", distance: "1.8 km" },
          { type: "Bus Stop", distance: "0.9 km" },
          { type: "Market/School", distance: "1.1 km" }
        ]
      }
    ];

    allProjects.forEach(project => {
      this.projects.set(project.id, project);
    });
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    return Array.from(this.projects.values()).find(p => p.slug === slug);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.currentId++;
    const newProject: Project = { 
      ...project, 
      id,
      possessionDate: project.possessionDate ?? null,
      model3D: project.model3D ?? null,
      brochure: project.brochure ?? null,
      floorPlans: project.floorPlans ?? [],
      certificates: project.certificates ?? [],
      videos: project.videos ?? [],
      connectivity: project.connectivity ?? []
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentId++;
    const newTestimonial: Testimonial = { 
      ...testimonial, 
      id,
      avatar: testimonial.avatar ?? null,
      videoUrl: testimonial.videoUrl ?? null
    };
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
    const newLead: Lead = { 
      ...lead, 
      id, 
      createdAt: new Date(),
      message: lead.message ?? null,
      projectId: lead.projectId ?? null
    };
    this.leads.set(id, newLead);
    return newLead;
  }
}

export const storage = new MemStorage();
