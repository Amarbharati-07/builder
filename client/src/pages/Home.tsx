import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Clock, Award, Building } from "lucide-react";
import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectFilter } from "@/components/ProjectFilter";
import { Button } from "@/components/ui/button";
import heroVideo from "@assets/generated_videos/cinematic_architectural_background_video_for_hero_section.mp4";
import "./Home.css";

export default function Home() {
  const { data: projects, isLoading: loadingProjects } = useProjects();
  const [selectedType, setSelectedType] = useState<"All" | "Residential" | "Commercial" | "Completed" | "Ongoing" | "Upcoming">("All");

  // Filter projects based on selected type
  const filteredProjects = projects?.filter(p => {
    const filter = selectedType.toLowerCase();
    if (filter === "all") return true;
    if (filter === "residential") return p.type.toLowerCase() === "residential";
    if (filter === "commercial") return p.type.toLowerCase() === "commercial";
    if (filter === "completed") return p.status === "completed";
    if (filter === "ongoing") return p.status === "ongoing";
    if (filter === "upcoming") return p.status === "upcoming";
    return true;
  }) || [];

  return (
    <div className="page-home">
      {/* Hero Section */}
      <section className="hero">
        {/* Hero Background - Cinematic Architectural Video */}
        <div className="hero-bg">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="hero-video"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="hero-subtitle">
              Architectural Masterpieces
            </span>
            <h1 className="hero-title">
              Designing <br />
              <span className="text-gold">Your Legacy</span>
            </h1>
            <p className="hero-desc">
              We create spaces that transcend the ordinary. Experience the perfect harmony of luxury, comfort, and sustainable design.
            </p>
            <div className="hero-btns">
              <Link href="/projects">
                <Button size="lg" className="btn-explore">
                  Explore Projects
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="btn-contact">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span className="scroll-text">Scroll</span>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-visual">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="about-accent" />
                {/* Modern Interior Image */}
                <img 
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop" 
                  alt="Interior Design" 
                  className="about-img"
                />
                <div className="about-badge">
                  <span className="badge-number">25+</span>
                  <span className="badge-text">Years of Building Excellence</span>
                </div>
              </motion.div>
            </div>
            
            <div className="about-info">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="about-title">
                  Where Innovation Meets <span className="text-primary">Elegance</span>
                </h2>
                <p className="about-desc">
                  At Luxe Estates, we don't just build structures; we craft lifestyles. 
                  Our commitment to quality, attention to detail, and architectural innovation 
                  has established us as the premier luxury developer in the region.
                </p>
                
                <div className="stats-grid">
                  <div className="stat-item">
                    <Award className="stat-icon" />
                    <h4 className="stat-title">Award Winning</h4>
                    <p className="stat-desc">Recognized globally for design excellence.</p>
                  </div>
                  <div className="stat-item">
                    <Building className="stat-icon" />
                    <h4 className="stat-title">Premium Spaces</h4>
                    <p className="stat-desc">Over 5 million sqft of luxury developed.</p>
                  </div>
                  <div className="stat-item">
                    <Clock className="stat-icon" />
                    <h4 className="stat-title">On-Time Delivery</h4>
                    <p className="stat-desc">We value your time as much as you do.</p>
                  </div>
                </div>

                <Link href="/experience">
                  <Button variant="ghost" className="btn-story">
                    Read our story <ArrowRight className="btn-icon" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="featured-projects">
        <div className="container">
          <div className="section-header">
            <div className="header-text">
              <span className="section-label">Portfolio</span>
              <h2 className="section-title">Our Premium Projects</h2>
            </div>
            <Link href="/projects">
              <Button variant="outline" className="btn-view-all">
                View All Projects
              </Button>
            </Link>
          </div>

          {/* Filter Section */}
          <ProjectFilter selectedType={selectedType} onFilterChange={setSelectedType} />

          {loadingProjects ? (
            <div className="projects-grid">
              {[1, 2, 3].map(i => (
                <div key={i} className="skeleton-card" />
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="projects-grid">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-text" data-testid="text-no-projects">
                No projects found for the selected category
              </p>
            </div>
          )}
          
          <div className="mobile-view-btn">
            <Link href="/projects">
              <Button variant="outline" className="btn-view-all-mobile">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
