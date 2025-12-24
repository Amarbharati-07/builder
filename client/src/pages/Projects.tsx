import { useState } from "react";
import { useProjects } from "@/hooks/use-projects";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, DollarSign, QrCode } from "lucide-react";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();
  const [selectedType, setSelectedType] = useState("all");

  const filteredProjects = projects?.filter(p => {
    if (selectedType === "all") return true;
    return p.type.toLowerCase() === selectedType.toLowerCase();
  });

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

      {/* Category Filters */}
      <div className="container mx-auto px-4 mb-16">
        <div className="flex justify-center gap-4">
          {[
            { value: "all", label: "All Projects" },
            { value: "residential", label: "Residential" },
            { value: "commercial", label: "Commercial" },
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedType(cat.value)}
              className={`px-6 py-2.5 rounded-lg font-semibold transition ${
                selectedType === cat.value
                  ? "bg-amber-600 text-white"
                  : "border-2 border-gray-300 text-gray-700 hover:border-amber-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

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
        ) : (
          <div className="space-y-12">
            {filteredProjects?.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                {/* Full-Width Project Block */}
                <div className="relative h-[400px] md:h-[550px] rounded-xl overflow-hidden shadow-2xl">
                  {/* Background Image */}
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* Dark Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between">
                    {/* Top Section - Status Badge */}
                    <div className="flex gap-2 flex-wrap">
                      <Badge
                        className={`text-white border-none font-semibold ${
                          project.status === "ongoing"
                            ? "bg-blue-600"
                            : project.status === "completed"
                            ? "bg-green-600"
                            : "bg-orange-600"
                        }`}
                      >
                        {project.status.toUpperCase()}
                      </Badge>
                      <Badge className="bg-white/20 text-white border border-white/30 font-semibold">
                        {project.type}
                      </Badge>
                    </div>

                    {/* Bottom Section - Project Info */}
                    <div className="text-white space-y-4">
                      {/* Project Title */}
                      <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight">
                        {project.title}
                      </h2>

                      {/* Location & Landmark */}
                      <div className="flex flex-col gap-2 text-white/90">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">{project.address}</p>
                            <p className="text-sm text-white/70">{project.landmark}</p>
                          </div>
                        </div>
                      </div>

                      {/* Pricing & RERA Section */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                        {/* Price Per Sqft */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                            <DollarSign className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs text-white/70 uppercase tracking-wider">
                              Price per sq.ft
                            </p>
                            <p className="font-bold text-lg">{project.pricePerSqft}</p>
                          </div>
                        </div>

                        {/* RERA ID */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs text-white/70 uppercase tracking-wider">
                              RERA ID
                            </p>
                            <p className="font-bold text-lg">{project.reraId}</p>
                          </div>
                        </div>

                        {/* RERA QR Code */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                            <QrCode className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs text-white/70 uppercase tracking-wider">
                              RERA Verified
                            </p>
                            <p className="font-bold text-sm">Scan QR Code</p>
                          </div>
                        </div>
                      </div>

                      {/* View More Button */}
                      <Link href={`/projects/${project.slug}`}>
                        <button className="mt-6 px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition transform hover:scale-105 inline-block">
                          Know More
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && filteredProjects?.length === 0 && (
          <div className="text-center py-24 text-gray-500">
            <p className="text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
