import { useState } from "react";
import { useProjects } from "@/hooks/use-projects";
import { motion } from "framer-motion";
import "@/styles/filter-bar.css";
import { ProjectCard } from "@/components/ProjectCard";

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

      {/* Projects Section Wrapper - Perfectly Centered */}
      <div className="projects-section-wrapper">
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
              >
                <ProjectCard project={project} />
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
