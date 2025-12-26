import { type Project } from "@shared/schema";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight, Zap } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  // Use coverImage or a fallback if needed. In a real app, this would be validated.
  const imageUrl = project.coverImage;

  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="group cursor-pointer h-full">
        <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col bg-white hover:-translate-y-2">
          {/* Image Container */}
          <div className="relative h-[300px] overflow-hidden bg-gray-100">
            <img 
              src={imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary/90 hover:bg-primary text-white backdrop-blur-sm border-none uppercase tracking-wider text-xs px-3 py-1 font-semibold">
                {project.status}
              </Badge>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-500" />
          </div>

          <CardContent className="p-6 flex-grow flex flex-col">
            {/* Category */}
            <div className="mb-3">
              <span className="text-primary font-semibold text-xs tracking-widest uppercase">{project.type}</span>
            </div>

            {/* Project Name */}
            <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {project.title}
            </h3>

            {/* Location */}
            <div className="flex items-center text-muted-foreground mb-4 text-sm">
              <MapPin className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
              <span className="line-clamp-1">{project.location}</span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-border mb-4" />

            {/* Price & RERA Info */}
            <div className="space-y-3 mb-4">
              <div>
                <span className="text-xs text-muted-foreground font-semibold uppercase">Price per Sq. Ft.</span>
                <p className="text-lg font-bold text-foreground mt-1">{project.price}</p>
              </div>
              {project.reraId && (
                <div>
                  <span className="text-xs text-muted-foreground font-semibold uppercase">RERA ID</span>
                  <p className="text-sm font-mono text-foreground/80 mt-1 flex items-center gap-1">
                    {project.reraId}
                    <Zap className="w-3 h-3 text-green-600" />
                  </p>
                </div>
              )}
            </div>

            {/* Footer CTA */}
            <div className="mt-auto">
              <span className="flex items-center text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform duration-300">
                View Details <ArrowRight className="w-4 h-4 ml-2" />
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
