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
    <div className="project-detail flex flex-col">
      {/* Header with back button */}
      <div className="detail-header bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Link href="/">
            <Button variant="ghost" className="btn btn-back flex items-center gap-2 mb-4">
              <ArrowLeft className="icon w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section with Gallery */}
      <section className="hero-gallery bg-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <ProjectGallery
            images={project.images}
            videos={project.videos}
            projectTitle={project.title}
          />
        </div>
      </section>

      {/* Project Overview */}
      <section className="overview bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="overview-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="main-info lg:col-span-2">
              <div className="title-box flex flex-col gap-4 mb-8">
                <div className="badges flex items-start gap-4 flex-wrap">
                  <Badge className={`status ${statusColors[project.status.toLowerCase()]} text-white text-xs uppercase`} data-testid={`badge-status-${project.status}`}>
                    {project.status}
                  </Badge>
                  <Badge variant="outline" className="type-badge" data-testid={`badge-type-${project.type}`}>
                    {project.type}
                  </Badge>
                </div>
                <h1 className="project-title font-serif text-3xl md:text-5xl font-bold text-foreground" data-testid="text-project-title">
                  {project.title}
                </h1>
              </div>

              <div className="description prose prose-sm max-w-none mb-12">
                <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-project-description">
                  {project.description}
                </p>
              </div>

              {/* Key Details Grid */}
              <div className="details-grid grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 pb-12 border-b">
                <div className="detail-item">
                  <h3 className="label font-semibold text-foreground mb-2 text-sm uppercase tracking-widest" data-testid="text-builder">
                    Builder / Developer
                  </h3>
                  <p className="value text-lg text-foreground">{project.builderName}</p>
                </div>
                <div className="detail-item">
                  <h3 className="label font-semibold text-foreground mb-2 text-sm uppercase tracking-widest">RERA ID</h3>
                  <div className="rera-info flex items-center gap-4">
                    <p className="value text-lg text-foreground flex items-center gap-2" data-testid="text-rera-id">
                      {project.reraId}
                      <CheckCircle className="icon w-4 h-4 text-green-500" />
                    </p>
                    {project.reraQRCode && (
                      <img src={project.reraQRCode} alt="RERA QR Code" className="qr-code w-12 h-12 border p-1 rounded bg-white shadow-sm" />
                    )}
                  </div>
                </div>
                <div className="detail-item">
                  <h3 className="label font-semibold text-foreground mb-2 text-sm uppercase tracking-widest">Possession Date</h3>
                  <p className="value text-lg text-foreground" data-testid="text-possession-date">
                    {project.possessionDate || "N/A"}
                  </p>
                </div>
                <div className="detail-item">
                  <h3 className="label font-semibold text-foreground mb-2 text-sm uppercase tracking-widest">Address</h3>
                  <p className="value text-lg text-foreground flex items-start gap-2" data-testid="text-address">
                    <MapPin className="icon w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                    {project.address}
                  </p>
                </div>
              </div>

              {/* Configuration & Pricing */}
              {project.configurations && project.configurations.length > 0 && (
                <div className="pricing-section mb-12">
                  <div className="section-header flex items-center gap-3 mb-6">
                    <div className="icon-bg w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Zap className="icon w-5 h-5 text-primary" />
                    </div>
                    <h2 className="section-title font-serif text-3xl font-bold text-foreground">Configuration & Pricing</h2>
                  </div>
                  <div className="pricing-table-wrapper overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                    <table className="pricing-table w-full border-collapse">
                      <thead>
                        <tr className="table-header bg-gray-50 text-left border-b border-gray-200">
                          <th className="p-4 md:p-6 font-bold uppercase text-xs tracking-wider text-muted-foreground">Typology</th>
                          <th className="p-4 md:p-6 font-bold uppercase text-xs tracking-wider text-muted-foreground">Carpet Area (sq.ft.)</th>
                          <th className="p-4 md:p-6 font-bold uppercase text-xs tracking-wider text-muted-foreground">Price</th>
                          <th className="p-4 md:p-6 text-right"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {project.configurations.map((config, idx) => (
                          <tr key={idx} className="table-row hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-0">
                            <td className="p-4 md:p-6 font-bold text-foreground">{config.type}</td>
                            <td className="p-4 md:p-6 text-muted-foreground font-medium">{config.carpetAreaRange} sq.ft.</td>
                            <td className="p-4 md:p-6 font-black text-primary md:text-lg">{config.priceRange}</td>
                            <td className="p-4 md:p-6 text-right">
                              <Link href="/contact">
                                <Button size="sm" variant="outline" className="btn btn-outline font-bold text-[10px] uppercase">Details</Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="note mt-4 text-[10px] text-muted-foreground flex items-center gap-1.5 italic">
                    <Info className="icon w-3 h-3" />
                    * Pricing is calculated based on current market trends and base rate. Govt. taxes extra.
                  </p>
                </div>
              )}

              {/* Tower Details */}
              {project.towerDetails && project.towerDetails.length > 0 && (
                <div className="tower-section mb-12">
                  <h2 className="section-title font-serif text-3xl font-bold mb-6 text-foreground">Project Layout</h2>
                  <div className="tower-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.towerDetails.map((tower, idx) => (
                      <div key={idx} className="tower-item p-4 border rounded-lg bg-gray-50">
                        <h4 className="tower-name font-bold text-lg mb-2">{tower.name}</h4>
                        <div className="tower-stats flex justify-between text-sm text-muted-foreground">
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
                <div className="plans-section mb-12">
                  <h2 className="section-title font-serif text-3xl font-bold mb-6 text-foreground">Floor Plans</h2>
                  <div className="plans-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {project.floorPlans.map((plan, idx) => (
                      <div key={idx} className="plan-item group relative aspect-video overflow-hidden rounded-lg border">
                        <img 
                          src={plan} 
                          alt={`Floor Plan ${idx + 1}`} 
                          className="plan-img w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="plan-overlay absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button variant="secondary" size="sm" className="btn btn-secondary">View Plan</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Walkthrough Video */}
              {project.walkthroughVideo && (
                <div className="walkthrough-section mb-12">
                  <h2 className="section-title font-serif text-3xl font-bold mb-6 text-foreground">Project Walkthrough</h2>
                  <div className="video-box aspect-video rounded-lg overflow-hidden border bg-black shadow-xl">
                    <video controls className="video w-full h-full object-cover">
                      <source src={project.walkthroughVideo} type="video/mp4" />
                    </video>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar CTA */}
            <div className="sidebar lg:col-span-1">
              <div className="cta-box bg-primary text-white p-8 rounded-lg sticky top-24 shadow-2xl">
                <h3 className="cta-title text-2xl font-bold mb-4">Interested in this property?</h3>
                <p className="cta-text text-white/90 mb-6">Connect with our property specialists to learn more about early bird offers.</p>
                <div className="cta-actions space-y-4">
                  <Link href="/contact">
                    <Button size="lg" className="btn btn-white w-full bg-white text-primary hover:bg-gray-100 font-bold">
                      Enquire Now
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="btn btn-outline-white w-full border-white text-white hover:bg-white/10 font-bold">
                    Call Now: +91 999 000 0000
                  </Button>
                  {project.brochure && (
                    <a href={project.brochure} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="lg" className="btn btn-ghost-white w-full text-white hover:bg-white/10 mt-4 border border-white/30">
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
      <section className="amenities bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title font-serif text-4xl font-bold mb-12 text-foreground">Amenities & Facilities</h2>
          <AmenitiesGrid amenities={project.amenities} />
        </div>
      </section>

      {/* Connectivity Section */}
      <section className="connectivity bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title font-serif text-4xl font-bold mb-12 text-foreground">Nearby Connectivity</h2>
          <ConnectivitySection connectivity={project.connectivity} />
        </div>
      </section>

      {/* Certificates Section */}
      {project.certificates && project.certificates.length > 0 && (
        <section className="certificates bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="section-title font-serif text-4xl font-bold mb-12 text-foreground">Certifications & Awards</h2>
            <div className="certificates-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.certificates.map((cert, index) => (
                <div key={index} className="certificate-item bg-white p-6 rounded-lg border shadow-sm" data-testid={`card-certificate-${index}`}>
                  <CheckCircle className="icon w-8 h-8 text-primary mb-3" />
                  <p className="certificate-name font-semibold text-foreground">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
