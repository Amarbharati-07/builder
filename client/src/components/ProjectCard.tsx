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
    <div className="group h-full">
      <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col bg-white hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative h-[240px] overflow-hidden bg-gray-100">
          <img 
            src={imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className={`${statusColors[project.status.toLowerCase()]} hover:opacity-90 text-white backdrop-blur-sm border-none uppercase tracking-wider text-[10px] px-2 py-0.5 font-bold shadow-lg`}>
              {project.status}
            </Badge>
            <Badge variant="secondary" className="bg-white/90 text-foreground text-[10px] uppercase font-bold shadow-sm">
              {project.type}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
        </div>

        <CardContent className="p-5 flex-grow flex flex-col">
          {/* Project Name & Price */}
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
              {project.title}
            </h3>
            <p className="text-primary font-bold text-base whitespace-nowrap">{project.price}</p>
          </div>

          {/* Location */}
          <div className="flex items-center text-muted-foreground mb-4 text-xs">
            <MapPin className="w-3.5 h-3.5 mr-1.5 text-primary flex-shrink-0" />
            <span className="line-clamp-1">{project.location}</span>
          </div>

          {/* Real Estate Configuration Area */}
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4 space-y-2">
            {project.configurations && project.configurations.length > 0 ? (
              project.configurations.map((config, idx) => (
                <div key={idx} className="flex justify-between items-center text-[11px] border-b border-gray-100 last:border-0 pb-1 last:pb-0">
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground uppercase">{config.type}</span>
                    <span className="text-[9px] text-muted-foreground">{config.carpetAreaRange} sq.ft.</span>
                  </div>
                  <span className="font-bold text-primary">{config.priceRange}</span>
                </div>
              ))
            ) : (
              <div className="text-[11px] text-muted-foreground py-1">Contact for configurations</div>
            )}
          </div>

          {/* RERA Info */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                <Zap className="w-3 h-3 text-primary" />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground tracking-tight">RERA: {project.reraId}</span>
            </div>
            <div className="flex items-center gap-1 text-green-600 font-bold text-[10px] uppercase tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
              Verified
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="mt-auto space-y-2">
            <Link href={`/projects/${project.slug}`}>
              <Button className="w-full font-bold text-xs uppercase tracking-widest py-5 group/btn" size="sm">
                View Project Details <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="font-bold text-[10px] uppercase h-9 border-primary/20 hover:bg-primary/5 text-primary">
                <Phone className="mr-1.5 w-3 h-3" /> Call
              </Button>
              <Link href="/contact" className="w-full">
                <Button variant="secondary" size="sm" className="w-full font-bold text-[10px] uppercase h-9">
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
