import { type Project } from "@shared/schema";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, DollarSign, QrCode } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-item">
      <div className="project-card">
        <img
          src={project.coverImage}
          alt={project.title}
          className="project-img"
          data-testid={`img-cover-${project.slug}`}
        />
        <div className="project-overlay" />
        <div className="project-content">
          <div className="project-badges">
            <Badge 
              className={`status-badge ${project.status === "ongoing" ? "ongoing" : project.status === "completed" ? "completed" : "upcoming"}`}
              data-testid={`badge-status-${project.slug}`}
            >
              {project.status.toUpperCase()}
            </Badge>
            <Badge className="type-badge" data-testid={`badge-type-${project.slug}`}>
              {project.type}
            </Badge>
          </div>
          
          <div className="project-info">
            <h2 className="project-title" data-testid={`text-title-${project.slug}`}>
              {project.title}
            </h2>
            
            <div className="project-loc">
              <div className="loc-item">
                <MapPin className="loc-icon" />
                <div>
                  <p className="loc-address" data-testid={`text-address-${project.slug}`}>
                    {project.address}
                  </p>
                  <p className="loc-landmark" data-testid={`text-landmark-${project.slug}`}>
                    {project.landmark}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="project-details">
              <div className="detail-item">
                <div className="detail-icon-box">
                  <DollarSign className="detail-icon" />
                </div>
                <div>
                  <p className="detail-label">Price</p>
                  <p className="detail-value" data-testid={`text-price-${project.slug}`}>
                    {project.pricePerSqft || project.price}
                  </p>
                </div>
              </div>
              
              <div className="detail-item">
                <div className="detail-icon-box">
                  <Building2 className="detail-icon" />
                </div>
                <div>
                  <p className="detail-label">RERA ID</p>
                  <p className="detail-value" data-testid={`text-rera-${project.slug}`}>
                    {project.reraId}
                  </p>
                </div>
              </div>
              
              <div className="detail-item">
                <div className="detail-icon-box">
                  <QrCode className="detail-icon" />
                </div>
                <div>
                  <p className="detail-label">RERA Verified</p>
                  <p className="detail-value">Scan QR Code</p>
                </div>
              </div>
            </div>
            
            <Link
              href={`/projects/${project.slug}`}
              data-testid={`link-know-more-${project.slug}`}
              className="btn-more"
            >
              Know More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
