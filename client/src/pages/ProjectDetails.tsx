import { useRoute } from "wouter";
import { useProjects } from "@/hooks/use-projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectGallery } from "@/components/ProjectGallery";
import { AmenitiesGrid } from "@/components/AmenitiesGrid";
import { ConnectivitySection } from "@/components/ConnectivitySection";
import { ArrowLeft, MapPin, Home, CheckCircle } from "lucide-react";
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
    <div className="flex flex-col">
      {/* Header with back button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section with Gallery */}
      <section className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <ProjectGallery
            images={project.images}
            videos={project.videos}
            projectTitle={project.title}
          />
        </div>
      </section>

      {/* Project Overview */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-start gap-4 flex-wrap">
                  <Badge className={`${statusColors[project.status.toLowerCase()]} text-white text-xs uppercase`} data-testid={`badge-status-${project.status}`}>
                    {project.status}
                  </Badge>
                  <Badge variant="outline" data-testid={`badge-type-${project.type}`}>
                    {project.type}
                  </Badge>
                </div>
                <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground" data-testid="text-project-title">
                  {project.title}
                </h1>
              </div>

              <div className="prose prose-sm max-w-none mb-12">
                <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-project-description">
                  {project.description}
                </p>
              </div>

              {/* Key Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 pb-12 border-b">
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-widest" data-testid="text-builder">
                    Builder / Developer
                  </h3>
                  <p className="text-lg text-foreground">{project.builderName}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-widest">RERA ID</h3>
                  <p className="text-lg text-foreground flex items-center gap-2" data-testid="text-rera-id">
                    {project.reraId}
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-widest">Possession Date</h3>
                  <p className="text-lg text-foreground" data-testid="text-possession-date">
                    {project.possessionDate || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-widest">Address</h3>
                  <p className="text-lg text-foreground flex items-start gap-2" data-testid="text-address">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                    {project.address}
                  </p>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="mb-12">
                <h2 className="font-serif text-3xl font-bold mb-6 text-foreground">Pricing</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-muted-foreground text-sm uppercase mb-2">Price Per Sq. Ft.</h3>
                    <p className="font-serif text-3xl font-bold text-foreground" data-testid="text-price-per-sqft">
                      {project.pricePerSqft}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-muted-foreground text-sm uppercase mb-2">Starting Price</h3>
                    <p className="font-serif text-3xl font-bold text-foreground" data-testid="text-price">
                      {project.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-1">
              <div className="bg-primary text-white p-8 rounded-lg sticky top-24">
                <h3 className="text-2xl font-bold mb-4">Interested in this property?</h3>
                <p className="text-white/90 mb-6">Connect with our property specialists to learn more.</p>
                <Link href="/contact">
                  <Button size="lg" className="w-full bg-white text-primary hover:bg-gray-100">
                    Enquire Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-4xl font-bold mb-12 text-foreground">Amenities & Facilities</h2>
          <AmenitiesGrid amenities={project.amenities} />
        </div>
      </section>

      {/* Connectivity Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-4xl font-bold mb-12 text-foreground">Nearby Connectivity</h2>
          <ConnectivitySection connectivity={project.connectivity} />
        </div>
      </section>

      {/* Certificates Section */}
      {project.certificates && project.certificates.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-4xl font-bold mb-12 text-foreground">Certifications & Awards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.certificates.map((cert, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border shadow-sm" data-testid={`card-certificate-${index}`}>
                  <CheckCircle className="w-8 h-8 text-primary mb-3" />
                  <p className="font-semibold text-foreground">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
