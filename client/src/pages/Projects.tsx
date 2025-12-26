import { useState } from "react";
import { useProjects } from "@/hooks/use-projects";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, DollarSign, QrCode, X, Check, Eye, Download, Grid3x3, Image as ImageIcon } from "lucide-react";
import type { Project } from "@shared/schema";
import "@/styles/filter-bar.css";
import { Link } from "wouter";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();
  const [activeFilter, setActiveFilter] = useState("all");

  // Get filtered projects based on active filter
  const getFilteredProjects = () => {
    if (!projects) return [];
    const filter = activeFilter.toLowerCase();
    if (filter === "all") return projects;
    if (filter === "residential") return projects.filter(p => p.type.toLowerCase() === "residential");
    if (filter === "commercial") return projects.filter(p => p.type.toLowerCase() === "commercial");
    if (filter === "completed") return projects.filter(p => p.status === "completed");
    if (filter === "ongoing") return projects.filter(p => p.status === "ongoing");
    if (filter === "upcoming") return projects.filter(p => p.status === "upcoming");
    return projects;
  };

  const filteredProjects = getFilteredProjects();

  const FILTER_OPTIONS = [
    { value: "all", label: "All Projects" },
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "completed", label: "Completed" },
    { value: "ongoing", label: "Ongoing" },
    { value: "upcoming", label: "Upcoming" },
  ];

  return (
    <div className="page-projects">
      {/* Hero Section */}
      <div className="hero-simple">
        <div className="container">
          <h1 className="hero-title">
            Our Premium Projects
          </h1>
          <p className="hero-desc">
            Discover our collection of luxury residential and commercial developments across prime locations.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <nav className="filters" aria-label="Project categories">
        <div className="filters-wrapper">
          {FILTER_OPTIONS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              data-testid={`button-filter-${filter.value}`}
              className={`filter-btn ${activeFilter === filter.value ? "active" : ""}`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Projects Grid */}
      <div className="container projects-container">
        {isLoading ? (
          <div className="projects-skeleton">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="skeleton-card"
              />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="projects-list">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="project-item"
              >
                {/* Project Card */}
                <div className="project-card">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="project-img"
                  />
                  <div className="project-overlay" />
                  <div className="project-content">
                    <div className="project-badges">
                      <Badge className={`status-badge ${project.status === "ongoing" ? "ongoing" : project.status === "completed" ? "completed" : "upcoming"}`} data-testid={`badge-status-${project.slug}`}>
                        {project.status.toUpperCase()}
                      </Badge>
                      <Badge className="type-badge" data-testid={`badge-type-${project.slug}`}>
                        {project.type}
                      </Badge>
                    </div>
                    <div className="project-info">
                      <h2 className="project-title" data-testid={`text-title-${project.slug}`}>
                        {project.title}
                      </h2>
                      <div className="project-loc">
                        <div className="loc-item">
                          <MapPin className="loc-icon" />
                          <div>
                            <p className="loc-address" data-testid={`text-address-${project.slug}`}>{project.address}</p>
                            <p className="loc-landmark" data-testid={`text-landmark-${project.slug}`}>{project.landmark}</p>
                          </div>
                        </div>
                      </div>
                      <div className="project-details">
                        <div className="detail-item">
                          <div className="detail-icon-box">
                            <DollarSign className="detail-icon" />
                          </div>
                          <div>
                            <p className="detail-label">Price</p>
                            <p className="detail-value" data-testid={`text-price-${project.slug}`}>{project.pricePerSqft || project.price}</p>
                          </div>
                        </div>
                        <div className="detail-item">
                          <div className="detail-icon-box">
                            <Building2 className="detail-icon" />
                          </div>
                          <div>
                            <p className="detail-label">RERA ID</p>
                            <p className="detail-value" data-testid={`text-rera-${project.slug}`}>{project.reraId}</p>
                          </div>
                        </div>
                        <div className="detail-item">
                          <div className="detail-icon-box">
                            <QrCode className="detail-icon" />
                          </div>
                          <div>
                            <p className="detail-label">RERA Verified</p>
                            <p className="detail-value">Scan QR Code</p>
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/projects/${project.slug}`}
                        data-testid={`link-know-more-${project.slug}`}
                        className="btn-more"
                      >
                        Know More
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p className="empty-text">No projects match the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
