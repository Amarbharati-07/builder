import { type Project } from "@shared/schema";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight, Zap, Phone, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProjectCard({ project }: { project: Project }) {
  const imageUrl = project.coverImage;

  const statusColors: Record<string, string> = {
    ongoing: "bg-blue-600",
    completed: "bg-green-600",
    upcoming: "bg-amber-600",
  };

  return (
    <div className="project-card-wrapper h-full">
      <Card className="project-card overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col bg-white hover:-translate-y-2">
        {/* Image Container */}
        <div className="project-img-box relative h-[240px] overflow-hidden bg-gray-100">
          <img 
            src={imageUrl} 
            alt={project.title} 
            className="project-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="status-badges absolute top-4 left-4 flex gap-2">
            <Badge className={`status ${statusColors[project.status.toLowerCase()]} hover:opacity-90 text-white backdrop-blur-sm border-none uppercase tracking-wider text-[10px] px-2 py-0.5 font-bold shadow-lg`}>
              {project.status}
            </Badge>
            <Badge variant="secondary" className="type-badge bg-white/90 text-foreground text-[10px] uppercase font-bold shadow-sm">
              {project.type}
            </Badge>
          </div>
          <div className="overlay absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
        </div>

        <CardContent className="project-info p-5 flex-grow flex flex-col">
          {/* Project Name & Price */}
          <div className="project-header flex justify-between items-start gap-2 mb-2">
            <h3 className="project-title font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
              {project.title}
            </h3>
            <p className="price text-primary font-bold text-base whitespace-nowrap">{project.price}</p>
          </div>

          {/* Location */}
          <div className="location flex items-center text-muted-foreground mb-4 text-xs">
            <MapPin className="icon w-3.5 h-3.5 mr-1.5 text-primary flex-shrink-0" />
            <span className="address line-clamp-1">{project.location}</span>
          </div>

          {/* Real Estate Configuration Area */}
          <div className="price-box bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4 space-y-2">
            {project.configurations && project.configurations.length > 0 ? (
              project.configurations.map((config, idx) => (
                <div key={idx} className="bhk-item flex justify-between items-center text-[11px] border-b border-gray-100 last:border-0 pb-1 last:pb-0">
                  <div className="bhk-info flex flex-col">
                    <span className="bhk font-bold text-foreground uppercase">{config.type}</span>
                    <span className="area text-[9px] text-muted-foreground">{config.carpetAreaRange} sq.ft.</span>
                  </div>
                  <span className="price-tag font-bold text-primary">{config.priceRange}</span>
                </div>
              ))
            ) : (
              <div className="no-config text-[11px] text-muted-foreground py-1">Contact for configurations</div>
            )}
          </div>

          {/* RERA Info */}
          <div className="rera-box flex items-center justify-between mb-5">
            <div className="rera-id flex items-center gap-1.5">
              <div className="icon-bg w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                <Zap className="icon w-3.5 h-3.5 text-primary" />
              </div>
              <span className="rera-text text-[10px] font-mono text-muted-foreground tracking-tight">RERA: {project.reraId}</span>
            </div>
            <div className="verified flex items-center gap-1 text-green-600 font-bold text-[10px] uppercase tracking-wider">
              <div className="dot w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
              Verified
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="project-actions mt-auto space-y-2">
            <Link href={`/projects/${project.slug}`}>
              <Button className="btn btn-primary w-full font-bold text-xs uppercase tracking-widest py-5 group/btn" size="sm">
                View Project Details <ArrowRight className="icon w-3.5 h-3.5 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
            <div className="cta-grid grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="btn btn-outline font-bold text-[10px] uppercase h-9 border-primary/20 hover:bg-primary/5 text-primary">
                <Phone className="icon mr-1.5 w-3 h-3" /> Call
              </Button>
              <Link href="/contact" className="w-full">
                <Button variant="secondary" size="sm" className="btn btn-secondary w-full font-bold text-[10px] uppercase h-9">
                  Enquire
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
