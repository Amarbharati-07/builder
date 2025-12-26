import { useState } from "react";
import { useProjects } from "@/hooks/use-projects";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, DollarSign, QrCode, X, Check, Eye, Download, Grid3x3, Image as ImageIcon } from "lucide-react";
import type { Project } from "@shared/schema";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();
  const [selectedType, setSelectedType] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects?.filter(p => {
    if (selectedType === "all") return true;
    return p.type.toLowerCase() === selectedType.toLowerCase();
  });

  const amenities = selectedProject?.amenities;
  const images = selectedProject?.images as string[] | undefined;

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
        <div className="flex justify-center gap-4 flex-wrap">
          {[
            { value: "all", label: "All Projects" },
            { value: "residential", label: "Residential" },
            { value: "commercial", label: "Commercial" },
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedType(cat.value)}
              data-testid={`button-category-${cat.value}`}
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
                        data-testid={`badge-status-${project.slug}`}
                      >
                        {project.status.toUpperCase()}
                      </Badge>
                      <Badge className="bg-white/20 text-white border border-white/30 font-semibold" data-testid={`badge-type-${project.slug}`}>
                        {project.type}
                      </Badge>
                    </div>

                    {/* Bottom Section - Project Info */}
                    <div className="text-white space-y-4">
                      {/* Project Title */}
                      <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight" data-testid={`text-title-${project.slug}`}>
                        {project.title}
                      </h2>

                      {/* Location & Landmark */}
                      <div className="flex flex-col gap-2 text-white/90">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium" data-testid={`text-address-${project.slug}`}>{project.address}</p>
                            <p className="text-sm text-white/70" data-testid={`text-landmark-${project.slug}`}>{project.landmark}</p>
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
                            <p className="font-bold text-lg" data-testid={`text-price-${project.slug}`}>{project.pricePerSqft}</p>
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
                            <p className="font-bold text-lg" data-testid={`text-rera-${project.slug}`}>{project.reraId}</p>
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

                      {/* Know More Button */}
                      <button
                        onClick={() => setSelectedProject(project)}
                        data-testid={`button-know-more-${project.slug}`}
                        className="mt-6 px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition transform hover:scale-105 inline-block"
                      >
                        Know More
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && filteredProjects?.length === 0 && (
          <div className="text-center py-24 text-gray-500">
            <p className="text-lg" data-testid="text-no-projects">No projects found in this category.</p>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto"
            data-testid="modal-project-details"
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl mx-auto my-8 bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header with Close Button */}
              <div className="relative h-96 md:h-[500px] overflow-hidden">
                <img
                  src={selectedProject.coverImage}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  data-testid="button-close-modal"
                  className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition backdrop-blur-sm"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Title & Basic Info */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                  <div className="flex gap-2 mb-4">
                    <Badge
                      className={`text-white border-none font-semibold ${
                        selectedProject.status === "ongoing"
                          ? "bg-blue-600"
                          : selectedProject.status === "completed"
                          ? "bg-green-600"
                          : "bg-orange-600"
                      }`}
                    >
                      {selectedProject.status.toUpperCase()}
                    </Badge>
                    <Badge className="bg-white/20 text-white border border-white/30">
                      {selectedProject.type}
                    </Badge>
                  </div>
                  <h1 className="font-serif text-3xl md:text-4xl font-bold text-white" data-testid="text-modal-title">
                    {selectedProject.title}
                  </h1>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Overview */}
                    <section>
                      <h2 className="font-serif text-2xl font-bold mb-4">Overview</h2>
                      <p className="text-gray-700 leading-relaxed" data-testid="text-description">
                        {selectedProject.description}
                      </p>
                    </section>

                    {/* Key Details */}
                    <section>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <div>
                          <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Price per Sq.ft</p>
                          <p className="font-bold text-amber-700" data-testid="text-modal-price">{selectedProject.pricePerSqft}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Possession</p>
                          <p className="font-medium" data-testid="text-possession">{selectedProject.possessionDate || "Ready to Move"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Status</p>
                          <p className="font-medium capitalize" data-testid="text-modal-status">{selectedProject.status}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Type</p>
                          <p className="font-medium" data-testid="text-modal-type">{selectedProject.type}</p>
                        </div>
                      </div>
                    </section>

                    {/* Address & Location */}
                    <section>
                      <h2 className="font-serif text-2xl font-bold mb-4 flex items-center gap-2">
                        <MapPin className="w-6 h-6 text-amber-600" />
                        Location Details
                      </h2>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600 uppercase font-semibold">Full Address</p>
                          <p className="font-medium text-lg" data-testid="text-modal-address">{selectedProject.address}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 uppercase font-semibold">Landmark</p>
                          <p className="font-medium text-lg" data-testid="text-modal-landmark">{selectedProject.landmark}</p>
                        </div>
                      </div>
                    </section>

                    {/* Amenities */}
                    {amenities && amenities.length > 0 && (
                      <section>
                        <h2 className="font-serif text-2xl font-bold mb-4">Amenities</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {amenities.map((amenity, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-amber-300 transition" data-testid={`item-amenity-${idx}`}>
                              <Check className="w-5 h-5 text-amber-600 flex-shrink-0" />
                              <span className="font-medium text-sm">{amenity.name}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* 3D Model Section */}
                    {selectedProject.model3D && (
                      <section>
                        <h2 className="font-serif text-2xl font-bold mb-4 flex items-center gap-2">
                          <Eye className="w-6 h-6 text-amber-600" />
                          3D Model View
                        </h2>
                        <div className="relative h-72 md:h-96 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center border border-gray-300">
                          <img
                            src={selectedProject.model3D}
                            alt="3D Model"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </section>
                    )}

                    {/* Brochure Section */}
                    {selectedProject.brochure && (
                      <section>
                        <h2 className="font-serif text-2xl font-bold mb-4 flex items-center gap-2">
                          <Download className="w-6 h-6 text-amber-600" />
                          Brochure & Documents
                        </h2>
                        <a
                          href={selectedProject.brochure}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-4 border-2 border-amber-300 rounded-lg hover:bg-amber-50 transition text-center group cursor-pointer"
                          data-testid="button-download-brochure"
                        >
                          <Download className="w-8 h-8 text-amber-600 mx-auto mb-2 group-hover:scale-110 transition" />
                          <h3 className="font-bold mb-1">Download Brochure</h3>
                          <p className="text-sm text-gray-600">Complete project brochure with specifications</p>
                        </a>
                      </section>
                    )}

                    {/* Floor Plans */}
                    {selectedProject.floorPlans && (selectedProject.floorPlans as string[]).length > 0 && (
                      <section>
                        <h2 className="font-serif text-2xl font-bold mb-4 flex items-center gap-2">
                          <Grid3x3 className="w-6 h-6 text-amber-600" />
                          Floor Plans
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {(selectedProject.floorPlans as string[]).map((plan, idx) => (
                            <div key={idx} className="rounded-lg overflow-hidden border border-gray-300 hover:border-amber-300 transition cursor-pointer group" data-testid={`item-floor-plan-${idx}`}>
                              <img
                                src={plan}
                                alt={`Floor Plan ${idx + 1}`}
                                className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Gallery */}
                    {images && images.length > 0 && (
                      <section>
                        <h2 className="font-serif text-2xl font-bold mb-4 flex items-center gap-2">
                          <ImageIcon className="w-6 h-6 text-amber-600" />
                          Project Gallery
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {images.map((img, idx) => (
                            <div key={idx} className="rounded-lg overflow-hidden h-48 cursor-pointer group border border-gray-200" data-testid={`item-image-${idx}`}>
                              <img
                                src={img}
                                alt={`Gallery ${idx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>

                  {/* RERA Section - Sidebar */}
                  <div className="lg:col-span-1">
                    <section className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200 sticky top-0">
                      <h2 className="font-serif text-2xl font-bold mb-4 flex items-center gap-2">
                        <QrCode className="w-6 h-6 text-blue-600" />
                        RERA Certification
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">RERA Registration Number</p>
                          <p className="text-lg font-bold text-gray-900 mt-1" data-testid="text-modal-rera">{selectedProject.reraId}</p>
                        </div>
                        <p className="text-sm text-gray-700">
                          This project is registered with the Real Estate Regulatory Authority. Scan the QR code to verify the registration status on the official RERA portal.
                        </p>
                        <div className="bg-white p-4 rounded-lg border border-gray-300">
                          <img
                            src={selectedProject.reraQRCode}
                            alt="RERA QR Code"
                            className="w-full h-auto object-contain"
                            data-testid="image-rera-qr"
                          />
                          <p className="text-center text-xs text-gray-600 mt-3">Scan to verify on RERA portal</p>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
