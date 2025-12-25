import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Zap, Wifi, Dumbbell, Shield, Droplet, Building, Trees, MapPin, FileText, Download, Map, Phone, Mail, Lock, RotateCw, Award, Leaf, Users, Star, Play, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function VideoGallerySection({ videos }: { videos: string[] }) {
  if (!videos || videos.length === 0) return null;

  return (
    <section className="mb-16">
      <h2 className="font-serif text-3xl font-bold mb-8 flex items-center gap-3">
        <Video className="w-8 h-8 text-primary" />
        Experience the Space
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videos.map((video, idx) => (
          <div key={idx} className="relative group rounded-xl overflow-hidden shadow-2xl bg-black aspect-video border-2 border-border/50">
            <video 
              src={video} 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500"
              controls
              poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:scale-110 transition duration-500">
               <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center shadow-2xl">
                 <Play className="w-8 h-8 text-white fill-current ml-1" />
               </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
               <p className="font-bold text-lg">Project Walkthrough - {idx + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TeamSection() {
  const team = [
    { name: "John Doe", role: "Chief Architect", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" },
    { name: "Jane Smith", role: "Lead Designer", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" },
    { name: "Robert Wilson", role: "Project Manager", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" },
  ];

  return (
    <section className="mb-16">
      <h2 className="font-serif text-3xl font-bold mb-8 text-center">Our Leadership Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {team.map((member, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center group"
          >
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-primary/20 group-hover:border-primary transition duration-300">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-lg">{member.name}</h3>
            <p className="text-muted-foreground text-sm">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function TrustCertificatesSection() {
  const certs = [
    { title: "ISO 9001:2015", subtitle: "Quality Management" },
    { title: "IGBC Gold", subtitle: "Green Building" },
    { title: "National Award", subtitle: "Excellence 2024" },
  ];

  return (
    <section className="mb-16 py-12 bg-gray-50 rounded-2xl">
      <h2 className="font-serif text-3xl font-bold mb-8 text-center">Trust & Excellence</h2>
      <div className="flex flex-wrap justify-center gap-12">
        {certs.map((cert, idx) => (
          <div key={idx} className="text-center">
            <Award className="w-16 h-16 text-primary mx-auto mb-4 opacity-80" />
            <h3 className="font-bold text-lg">{cert.title}</h3>
            <p className="text-muted-foreground text-xs uppercase tracking-widest">{cert.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const amenityIcons: { [key: string]: typeof MapPin } = {
  "Clubhouse": Building,
  "Banquet Hall": Building,
  "Kids Play Area": Zap,
  "CCTV & Security": Shield,
  "Rainwater Harvesting": Droplet,
  "STP": Droplet,
  "Landscape / Maze Garden": Trees,
  "Infinity Pool": Zap,
  "Sky Lounge": Zap,
  "Private Theatre": Zap,
  "Concierge Service": Building,
  "Spa & Wellness": Zap,
  "Jogging Track": Dumbbell,
  "Children's Play Area": Zap,
  "Yoga Deck": Dumbbell,
  "24/7 Security": Shield,
  "High-speed Internet": Wifi,
  "Conference Rooms": Building,
  "Food Court": Building,
};

export function PremiumOverviewSection({ project }: { project: any }) {
  return (
    <section className="mb-16">
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl p-8 md:p-12 border-2 border-amber-200 shadow-lg">
        <h2 className="font-serif text-3xl font-bold mb-6">Premium Lifestyle Experience</h2>
        <p className="text-gray-700 leading-relaxed mb-8 text-lg">
          {project.description}
        </p>

        {/* Connectivity & Amenities Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-white rounded-lg border border-amber-100">
          <div>
            <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Connectivity
            </h3>
            <p className="text-sm text-gray-700">Prime location with easy access to metro stations, shopping centers, schools, and hospitals.</p>
          </div>
          <div>
            <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Lifestyle
            </h3>
            <p className="text-sm text-gray-700">World-class amenities including premium clubhouse, sports facilities, and recreational spaces.</p>
          </div>
        </div>

        {/* Offer Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg text-white">
          <div className="text-center border-r border-white/20 md:last:border-r-0">
            <p className="text-sm uppercase tracking-wider font-semibold opacity-90">Limited Time Offer</p>
            <p className="text-2xl font-bold mt-2">Pay 20% Now</p>
            <p className="text-xs mt-1 opacity-80">Rest on flexible payment plan</p>
          </div>
          <div className="text-center border-r border-white/20 md:last:border-r-0">
            <p className="text-sm uppercase tracking-wider font-semibold opacity-90">Assured Returns</p>
            <p className="text-2xl font-bold mt-2">Rental Assurance</p>
            <p className="text-xs mt-1 opacity-80">Guaranteed rental income available</p>
          </div>
          <div className="text-center">
            <p className="text-sm uppercase tracking-wider font-semibold opacity-90">Festival Special</p>
            <p className="text-2xl font-bold mt-2">₹5L Discount</p>
            <p className="text-xs mt-1 opacity-80">On selected units this season</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function KeyBenefitsSection() {
  const benefits = [
    { icon: Trees, title: "Township Greens", desc: "20 acres of lush green landscaping" },
    { icon: Building, title: "Grand Entrance", desc: "World-class architectural design" },
    { icon: Zap, title: "Podium Lifestyle", desc: "Elevated living experience" },
    { icon: Dumbbell, title: "Olympic Pool", desc: "International standard facility" },
    { icon: Shield, title: "Sports Club", desc: "Multi-sport recreation facility" },
    { icon: Award, title: "Premium Quality", desc: "RERA certified construction" },
  ];

  return (
    <section className="mb-16">
      <h2 className="font-serif text-3xl font-bold mb-12 text-center">Key Highlights & Benefits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, idx) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200 hover:shadow-lg transition"
            >
              <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">{benefit.title}</h3>
              <p className="text-sm text-gray-700">{benefit.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export function AmenitiesWithIconsSection({ amenities }: { amenities: string[] }) {
  const [showAll, setShowAll] = useState(false);
  const displayedAmenities = showAll ? amenities : amenities.slice(0, 6);

  return (
    <section className="mb-16">
      <h2 className="font-serif text-3xl font-bold mb-8">World-Class Amenities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="wait">
          {displayedAmenities.map((amenity, idx) => {
            const IconComponent = amenityIcons[amenity] || Shield;
            return (
              <motion.div
                key={amenity}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition group cursor-pointer"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <IconComponent className="w-5 h-5 text-blue-600 group-hover:text-white transition" />
                </div>
                <span className="font-medium text-gray-900">{amenity}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      {amenities.length > 6 && (
        <motion.button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 mx-auto block px-6 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg font-semibold transition flex items-center gap-2"
        >
          {showAll ? "Show Less" : "Show All"} Amenities
          <ChevronDown className={`w-4 h-4 transition ${showAll ? "rotate-180" : ""}`} />
        </motion.button>
      )}
    </section>
  );
}

export function ResourcesSection({ project }: { project: any }) {
  return (
    <section className="mb-16">
      <h2 className="font-serif text-3xl font-bold mb-8">Project Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.brochure && (
          <a
            href={project.brochure}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 border-2 border-blue-400 bg-blue-50 rounded-lg hover:bg-blue-100 transition group cursor-pointer"
          >
            <Download className="w-10 h-10 text-blue-600 mb-3 group-hover:scale-110 transition" />
            <h3 className="font-bold text-lg mb-2">Download Brochure</h3>
            <p className="text-sm text-gray-700">Complete project specifications and floor plans</p>
          </a>
        )}
        <div className="p-6 border-2 border-green-400 bg-green-50 rounded-lg hover:bg-green-100 transition group cursor-pointer">
          <FileText className="w-10 h-10 text-green-600 mb-3 group-hover:scale-110 transition" />
          <h3 className="font-bold text-lg mb-2">View Floor Plans</h3>
          <p className="text-sm text-gray-700">Detailed layout and configuration options</p>
        </div>
      </div>
    </section>
  );
}

export function LocationSection({ project }: { project: any }) {
  return (
    <section className="mb-16">
      <h2 className="font-serif text-3xl font-bold mb-8 flex items-center gap-3">
        <MapPin className="w-8 h-8 text-blue-600" />
        Location & Connectivity
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 uppercase font-semibold mb-1">Full Address</p>
            <p className="text-lg font-medium text-gray-900">{project.address}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 uppercase font-semibold mb-1">Landmark</p>
            <p className="text-lg font-medium text-gray-900">{project.landmark}</p>
          </div>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-semibold"
          >
            <Map className="w-4 h-4" />
            View on Google Maps
          </a>
        </div>
        <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center border-2 border-gray-300">
          <div className="text-center">
            <Map className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Map Integration (Placeholder)</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ConstructionUpdatesSection() {
  const towers = [
    { name: "Tower A", possession: "Q4 2025", milestones: ["Slab completed till 20 floors", "Blockwork in progress", "Plastering started"] },
    { name: "Tower B", possession: "Q2 2026", milestones: ["Slab completed till 15 floors", "Blockwork on floors 1-10", "Foundation work ongoing"] },
    { name: "Tower C", possession: "Q4 2026", milestones: ["Foundation stage", "Structural design finalized", "Land preparation complete"] },
  ];

  return (
    <section className="mb-16">
      <h2 className="font-serif text-3xl font-bold mb-8 flex items-center gap-3">
        <RotateCw className="w-8 h-8 text-orange-600" />
        Construction Updates
      </h2>
      <div className="space-y-6">
        {towers.map((tower, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="p-6 border-2 border-orange-200 bg-orange-50 rounded-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xl text-gray-900">{tower.name}</h3>
              <Badge className="bg-orange-600 text-white">Possession: {tower.possession}</Badge>
            </div>
            <div className="space-y-2">
              {tower.milestones.map((milestone, mIdx) => (
                <div key={mIdx} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-700">{milestone}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function RERAComplianceSection({ project }: { project: any }) {
  return (
    <section className="mb-16">
      <h2 className="font-serif text-3xl font-bold mb-8 flex items-center gap-3">
        <Lock className="w-8 h-8 text-green-600" />
        RERA Compliance & Legal
      </h2>
      <div className="bg-green-50 border-2 border-green-300 rounded-lg p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Tower A - RERA Registration</h3>
            <p className="text-2xl font-bold text-green-700 mb-2">{project.reraId}</p>
            <p className="text-sm text-gray-700">Official RERA Registration Number</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Tower B - RERA Registration</h3>
            <p className="text-2xl font-bold text-green-700 mb-2">P51800005679</p>
            <p className="text-sm text-gray-700">Official RERA Registration Number</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Tower C - RERA Registration</h3>
            <p className="text-2xl font-bold text-green-700 mb-2">P51800005680</p>
            <p className="text-sm text-gray-700">Official RERA Registration Number</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg border border-green-200">
          <p className="text-sm text-gray-700 mb-4 italic">
            "This project is registered with the Real Estate Regulatory Authority. All statutory approvals and compliance certifications are current and valid. Please verify registration details on the official RERA portal using the QR codes provided."
          </p>
          <a href="#" className="text-blue-600 hover:underline text-sm font-semibold">
            Official RERA Verification Link →
          </a>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="bg-white p-6 rounded-lg border-2 border-gray-300">
            <img
              src={project.reraQRCode}
              alt="RERA QR Code"
              className="w-40 h-40 object-contain mx-auto"
            />
            <p className="text-center text-xs text-gray-600 mt-3">Scan to verify on official RERA portal</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RelatedProjectsSection({ allProjects, currentProjectId }: { allProjects: any[]; currentProjectId: number }) {
  const relatedProjects = allProjects?.filter(p => p.id !== currentProjectId).slice(0, 3);

  if (!relatedProjects || relatedProjects.length === 0) return null;

  return (
    <section className="mb-16">
      <h2 className="font-serif text-3xl font-bold mb-8">Similar Projects You Might Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition cursor-pointer group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
              <Badge className="absolute top-4 left-4 bg-blue-600">{project.status}</Badge>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{project.title}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-1 mb-3">
                <MapPin className="w-4 h-4" />
                {project.location}
              </p>
              <p className="text-xs text-gray-500 mb-3">{project.type}</p>
              <p className="font-bold text-blue-600">{project.pricePerSqft}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
