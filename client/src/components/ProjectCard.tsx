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
    <div className="card-wrapper">
      <Card className="project-card">
        {/* Image Container */}
        <div className="card-visual">
          <img 
            src={imageUrl} 
            alt={project.title} 
            className="card-img"
          />
          <div className="card-badges">
            <Badge className={`badge-status ${project.status.toLowerCase()}`}>
              {project.status}
            </Badge>
            <Badge variant="secondary" className="badge-type">
              {project.type}
            </Badge>
          </div>
          <div className="card-overlay" />
        </div>

        <CardContent className="card-info">
          {/* Project Name & Price */}
          <div className="info-header">
            <h3 className="info-title">
              {project.title}
            </h3>
            <p className="info-price">{project.price}</p>
          </div>

          {/* Location */}
          <div className="info-loc">
            <MapPin className="loc-icon" />
            <span className="loc-address">{project.location}</span>
          </div>

          {/* Real Estate Configuration Area */}
          <div className="price-box">
            {project.configurations && project.configurations.length > 0 ? (
              project.configurations.map((config, idx) => (
                <div key={idx} className="bhk-item">
                  <div className="bhk-info">
                    <span className="bhk-type">{config.type}</span>
                    <span className="bhk-area">{config.carpetAreaRange} sq.ft.</span>
                  </div>
                  <span className="bhk-price">{config.priceRange}</span>
                </div>
              ))
            ) : (
              <div className="no-config">Contact for configurations</div>
            )}
          </div>

          {/* RERA Info */}
          <div className="rera-box">
            <div className="rera-id">
              <div className="rera-icon-box">
                <Zap className="rera-icon" />
              </div>
              <span className="rera-text">RERA: {project.reraId}</span>
            </div>
            <div className="rera-status">
              <div className="status-dot" />
              Verified
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="card-actions">
            <Link href={`/projects/${project.slug}`}>
              <Button className="btn-details" size="sm">
                View Project Details <ArrowRight className="btn-icon" />
              </Button>
            </Link>
            <div className="btn-group">
              <Button variant="outline" size="sm" className="btn-call">
                <Phone className="btn-icon-sm" /> Call
              </Button>
              <Link href="/contact" className="w-full">
                <Button variant="secondary" size="sm" className="btn-enquire">
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
