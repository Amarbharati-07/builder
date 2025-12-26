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
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <div className="bg-foreground text-white py-16 mb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Our Premium Projects
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Discover our collection of luxury residential and commercial developments across prime locations.
          </p>
        </div>
      </div>

      {/* Unified Filter Bar */}
      <nav className="filter-bar-container" aria-label="Project categories">
        <div className="filter-bar-wrapper">
          {FILTER_OPTIONS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              data-testid={`button-filter-${filter.value}`}
              className={`filter-button ${activeFilter === filter.value ? "active" : ""}`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 pb-24">
        {isLoading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[500px] md:h-[600px] bg-gray-200 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="space-y-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                {/* Project Card */}
                <div className="relative h-[400px] md:h-[550px] rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between">
                    <div className="flex gap-2 flex-wrap">
                      <Badge className={`text-white border-none font-semibold ${project.status === "ongoing" ? "bg-blue-600" : project.status === "completed" ? "bg-green-600" : "bg-orange-600"}`} data-testid={`badge-status-${project.slug}`}>
                        {project.status.toUpperCase()}
                      </Badge>
                      <Badge className="bg-white/20 text-white border border-white/30 font-semibold" data-testid={`badge-type-${project.slug}`}>
                        {project.type}
                      </Badge>
                    </div>
                    <div className="text-white space-y-4">
                      <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight" data-testid={`text-title-${project.slug}`}>
                        {project.title}
                      </h2>
                      <div className="flex flex-col gap-2 text-white/90">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium" data-testid={`text-address-${project.slug}`}>{project.address}</p>
                            <p className="text-sm text-white/70" data-testid={`text-landmark-${project.slug}`}>{project.landmark}</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                            <DollarSign className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs text-white/70 uppercase tracking-wider">Price</p>
                            <p className="font-bold text-lg" data-testid={`text-price-${project.slug}`}>{project.pricePerSqft || project.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs text-white/70 uppercase tracking-wider">RERA ID</p>
                            <p className="font-bold text-lg" data-testid={`text-rera-${project.slug}`}>{project.reraId}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                            <QrCode className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs text-white/70 uppercase tracking-wider">RERA Verified</p>
                            <p className="font-bold text-sm">Scan QR Code</p>
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/projects/${project.slug}`}
                        data-testid={`link-know-more-${project.slug}`}
                        className="mt-6 px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition transform hover:scale-105 inline-block text-center"
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
          <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-lg">
            <p className="text-lg">No projects match the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
