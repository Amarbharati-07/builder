import { type Project } from "@shared/schema";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight, BedDouble, Bath, Square } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  // Use coverImage or a fallback if needed. In a real app, this would be validated.
  const imageUrl = project.coverImage;

  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="group cursor-pointer">
        <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col bg-white">
          <div className="relative h-[250px] overflow-hidden">
            <img 
              src={imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-black/70 hover:bg-black/80 text-white backdrop-blur-sm border-none uppercase tracking-wider text-xs px-3 py-1">
                {project.status}
              </Badge>
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          </div>
          <CardContent className="p-6 flex-grow flex flex-col">
            <div className="mb-2">
              <span className="text-primary font-medium text-sm tracking-wide uppercase">{project.type}</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center text-muted-foreground mb-4 text-sm">
              <MapPin className="w-4 h-4 mr-1 text-primary" />
              {project.location}
            </div>
            
            <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-border mb-4">
              <div className="flex flex-col items-center justify-center text-center">
                <BedDouble className="w-5 h-5 mb-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">3-5 Beds</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center border-l border-border">
                <Bath className="w-5 h-5 mb-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Luxury</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center border-l border-border">
                <Square className="w-5 h-5 mb-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">3000+ sqft</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <span className="text-lg font-bold text-foreground">{project.price}</span>
              <span className="flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                Details <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
