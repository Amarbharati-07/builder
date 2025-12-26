import { useRoute } from "wouter";
import { useProjects } from "@/hooks/use-projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectGallery } from "@/components/ProjectGallery";
import { AmenitiesGrid } from "@/components/AmenitiesGrid";
import { ConnectivitySection } from "@/components/ConnectivitySection";
import { ArrowLeft, MapPin, Home, CheckCircle, Zap, Info } from "lucide-react";
import { Link } from "wouter";

export default function ProjectDetail() {
  const [match, params] = useRoute("/projects/:slug");
  const { data: projects } = useProjects();
  const project = projects?.find(p => p.slug === params?.slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    "ongoing": "bg-yellow-500",
    "completed": "bg-green-500",
    "upcoming": "bg-blue-500",
  };

  return (
    <div className="detail-page">
      {/* Header with back button */}
      <div className="page-header">
        <div className="container">
          <Link href="/">
            <Button variant="ghost" className="btn-back">
              <ArrowLeft className="btn-icon-sm" />
              Back
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section with Gallery */}
      <section className="section-hero">
        <div className="container">
          <ProjectGallery
            images={project.images}
            videos={project.videos}
            projectTitle={project.title}
          />
        </div>
      </section>

      {/* Project Overview */}
      <section className="section-overview">
        <div className="container">
          <div className="overview-grid">
            {/* Main Info */}
            <div className="overview-main">
              <div className="overview-header">
                <div className="badge-group">
                  <Badge className={`badge-status ${project.status.toLowerCase()}`} data-testid={`badge-status-${project.status}`}>
                    {project.status}
                  </Badge>
                  <Badge variant="outline" className="badge-type" data-testid={`badge-type-${project.type}`}>
                    {project.type}
                  </Badge>
                </div>
                <h1 className="overview-title" data-testid="text-project-title">
                  {project.title}
                </h1>
              </div>

              <div className="overview-description">
                <p className="description-text" data-testid="text-project-description">
                  {project.description}
                </p>
              </div>

              {/* Key Details Grid */}
              <div className="details-grid">
                <div className="detail-item">
                  <h3 className="detail-label" data-testid="text-builder">
                    Builder / Developer
                  </h3>
                  <p className="detail-value">{project.builderName}</p>
                </div>
                <div className="detail-item">
                  <h3 className="detail-label">RERA ID</h3>
                  <div className="rera-info">
                    <p className="detail-value" data-testid="text-rera-id">
                      {project.reraId}
                      <CheckCircle className="rera-icon" />
                    </p>
                    {project.reraQRCode && (
                      <img src={project.reraQRCode} alt="RERA QR Code" className="rera-qr" />
                    )}
                  </div>
                </div>
                <div className="detail-item">
                  <h3 className="detail-label">Possession Date</h3>
                  <p className="detail-value" data-testid="text-possession-date">
                    {project.possessionDate || "N/A"}
                  </p>
                </div>
                <div className="detail-item">
                  <h3 className="detail-label">Address</h3>
                  <p className="detail-value-icon">
                    <MapPin className="icon-primary" />
                    {project.address}
                  </p>
                </div>
              </div>

              {/* Configuration & Pricing */}
              {project.configurations && project.configurations.length > 0 && (
                <div className="section-pricing">
                  <div className="pricing-header">
                    <div className="pricing-icon-box">
                      <Zap className="pricing-icon" />
                    </div>
                    <h2 className="pricing-title">Configuration & Pricing</h2>
                  </div>
                  <div className="table-wrapper">
                    <table className="pricing-table">
                      <thead>
                        <tr className="table-head-row">
                          <th className="table-th">Typology</th>
                          <th className="table-th">Carpet Area (sq.ft.)</th>
                          <th className="table-th">Price</th>
                          <th className="table-th-empty"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {project.configurations.map((config, idx) => (
                          <tr key={idx} className="table-body-row">
                            <td className="table-td-bold">{config.type}</td>
                            <td className="table-td-muted">{config.carpetAreaRange} sq.ft.</td>
                            <td className="table-td-price">{config.priceRange}</td>
                            <td className="table-td-action">
                              <Link href="/contact">
                                <Button size="sm" variant="outline" className="btn-table">Details</Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="pricing-note">
                    <Info className="note-icon" />
                    * Pricing is calculated based on current market trends and base rate. Govt. taxes extra.
                  </p>
                </div>
              )}

              {/* Tower Details */}
              {project.towerDetails && project.towerDetails.length > 0 && (
                <div className="section-tower">
                  <h2 className="section-title">Project Layout</h2>
                  <div className="tower-grid">
                    {project.towerDetails.map((tower, idx) => (
                      <div key={idx} className="tower-item">
                        <h4 className="tower-name">{tower.name}</h4>
                        <div className="tower-stats">
                          <span>Floors: {tower.floors}</span>
                          <span>Total Units: {tower.units}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Floor Plans */}
              {project.floorPlans && project.floorPlans.length > 0 && (
                <div className="section-plans">
                  <h2 className="section-title">Floor Plans</h2>
                  <div className="plans-grid">
                    {project.floorPlans.map((plan, idx) => (
                      <div key={idx} className="plan-item">
                        <img 
                          src={plan} 
                          alt={`Floor Plan ${idx + 1}`} 
                          className="plan-img"
                        />
                        <div className="plan-overlay">
                          <Button variant="secondary" size="sm" className="btn-view-plan">View Plan</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Walkthrough Video */}
              {project.walkthroughVideo && (
                <div className="section-walkthrough">
                  <h2 className="section-title">Project Walkthrough</h2>
                  <div className="video-container">
                    <video controls className="walkthrough-video">
                      <source src={project.walkthroughVideo} type="video/mp4" />
                    </video>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar CTA */}
            <div className="overview-sidebar">
              <div className="cta-sidebar">
                <h3 className="sidebar-title">Interested in this property?</h3>
                <p className="sidebar-text">Connect with our property specialists to learn more about early bird offers.</p>
                <div className="sidebar-actions">
                  <Link href="/contact">
                    <Button size="lg" className="btn-sidebar-primary">
                      Enquire Now
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="btn-sidebar-outline">
                    Call Now: +91 999 000 0000
                  </Button>
                  {project.brochure && (
                    <a href={project.brochure} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="lg" className="btn-sidebar-ghost">
                        Download Brochure
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="section-amenities">
        <div className="container">
          <h2 className="section-title-large">Amenities & Facilities</h2>
          <AmenitiesGrid amenities={project.amenities} />
        </div>
      </section>

      {/* Connectivity Section */}
      <section className="section-connectivity">
        <div className="container">
          <h2 className="section-title-large">Nearby Connectivity</h2>
          <ConnectivitySection connectivity={project.connectivity} />
        </div>
      </section>

      {/* Certificates Section */}
      {project.certificates && project.certificates.length > 0 && (
        <section className="section-certificates">
          <div className="container">
            <h2 className="section-title-large">Certifications & Awards</h2>
            <div className="certificates-grid">
              {project.certificates.map((cert, index) => (
                <div key={index} className="certificate-item" data-testid={`card-certificate-${index}`}>
                  <CheckCircle className="certificate-icon" />
                  <p className="certificate-text">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
