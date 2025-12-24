import { useRoute } from "wouter";
import { useProject } from "@/hooks/use-projects";
import { LeadForm } from "@/components/LeadForm";
import { Badge } from "@/components/ui/badge";
import { Check, MapPin, Calendar, Home, ArrowLeft, QrCode, Building2, DollarSign, Eye, Download, Grid3x3, Image } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function ProjectDetails() {
  const [, params] = useRoute("/projects/:slug");
  const { data: project, isLoading, error } = useProject(params?.slug || "");

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <Link href="/projects"><Button>Back to Projects</Button></Link>
      </div>
    );
  }

  // Amenities are stored as strings in JSONB
  const amenities = project.amenities as string[];
  const images = project.images as string[];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[70vh] w-full bg-black">
        <img 
          src={project.coverImage} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 bg-gradient-to-t from-black via-black/50 to-transparent text-white">
          <div className="container mx-auto">
            <Link href="/projects">
              <Button variant="link" className="text-white/80 p-0 mb-4 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
              </Button>
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-primary text-white border-none">{project.status}</Badge>
              <Badge variant="outline" className="text-white border-white/30">{project.type}</Badge>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
            <div className="flex flex-col md:flex-row gap-6 md:items-center text-lg">
              <div className="flex items-center"><MapPin className="mr-2 text-primary h-5 w-5" /> {project.location}</div>
              <div className="hidden md:block w-px h-6 bg-white/30" />
              <div className="flex items-center text-primary font-semibold">{project.price}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="font-serif text-3xl font-bold mb-6">Overview</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                {project.description}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border-2 border-amber-200">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600 uppercase tracking-wide font-semibold">Price per Sq.ft</span>
                  <span className="font-bold text-lg text-amber-700">{project.pricePerSqft}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600 uppercase tracking-wide font-semibold">Possession</span>
                  <span className="font-medium">{project.possessionDate || "Ready to Move"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600 uppercase tracking-wide font-semibold">Status</span>
                  <span className="font-medium capitalize px-3 py-1 bg-white rounded w-fit">{project.status}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600 uppercase tracking-wide font-semibold">Type</span>
                  <span className="font-medium">{project.type}</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-8">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center p-4 border border-border rounded-lg hover:border-primary transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 3D Model Section */}
            {project.model3D && (
              <section>
                <h2 className="font-serif text-3xl font-bold mb-8 flex items-center gap-3">
                  <Eye className="w-8 h-8 text-primary" />
                  3D Model View
                </h2>
                <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center border-2 border-gray-200">
                  <img
                    src={project.model3D}
                    alt="3D Model"
                    className="w-full h-full object-cover"
                  />
                </div>
              </section>
            )}

            {/* Brochure Section */}
            {project.brochure && (
              <section>
                <h2 className="font-serif text-3xl font-bold mb-8 flex items-center gap-3">
                  <Download className="w-8 h-8 text-primary" />
                  Brochure & Documents
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <a
                    href={project.brochure}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-6 border-2 border-primary rounded-lg hover:bg-primary/5 transition text-center group cursor-pointer"
                  >
                    <Download className="w-12 h-12 text-primary mx-auto mb-3 group-hover:scale-110 transition" />
                    <h3 className="font-bold mb-2">Download Brochure</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete project brochure with specifications
                    </p>
                  </a>
                  <div className="p-6 border-2 border-gray-300 rounded-lg text-center">
                    <Image className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="font-bold mb-2">High Resolution Images</h3>
                    <p className="text-sm text-muted-foreground">
                      Professional photography gallery
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Floor Plans Section */}
            {(project.floorPlans as string[]).length > 0 && (
              <section>
                <h2 className="font-serif text-3xl font-bold mb-8 flex items-center gap-3">
                  <Grid3x3 className="w-8 h-8 text-primary" />
                  Floor Plans
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(project.floorPlans as string[]).map((plan, idx) => (
                    <div key={idx} className="rounded-lg overflow-hidden border-2 border-gray-200 hover:border-primary transition cursor-pointer group">
                      <img
                        src={plan}
                        alt={`Floor Plan ${idx + 1}`}
                        className="w-full h-80 object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Amenities Images Gallery Section */}
            <section>
              <h2 className="font-serif text-3xl font-bold mb-8 flex items-center gap-3">
                <Image className="w-8 h-8 text-primary" />
                Project Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="rounded-lg overflow-hidden h-72 cursor-pointer group">
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>
                ))}
                {images.length === 0 && (
                  <div className="col-span-full h-40 bg-gray-100 flex items-center justify-center text-muted-foreground rounded-lg">
                    No gallery images available
                  </div>
                )}
              </div>
            </section>

            {/* RERA Section */}
            <section className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg border-2 border-blue-200">
              <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
                <QrCode className="w-8 h-8 text-blue-600" />
                RERA Certification
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold">
                      RERA Registration Number
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{project.reraId}</p>
                  </div>
                  <p className="text-gray-700 text-sm">
                    This project is registered with the Real Estate Regulatory Authority. Scan the QR code to verify the registration status on the official RERA portal.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200">
                    <img
                      src={project.reraQRCode}
                      alt="RERA QR Code"
                      className="w-48 h-48 object-contain"
                    />
                    <p className="text-center text-xs text-gray-600 mt-4">
                      Scan to verify on RERA portal
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white border border-border shadow-xl rounded-xl p-8">
                <h3 className="font-serif text-2xl font-bold mb-2">Interested?</h3>
                <p className="text-muted-foreground mb-6">Fill out the form below to book a site visit or get a brochure.</p>
                <LeadForm projectId={project.id} />
                
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm text-center text-muted-foreground mb-4">Or call us directly</p>
                  <a href="tel:+15551234567" className="block w-full py-3 text-center border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors rounded-md">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-border lg:hidden z-40 flex gap-3 shadow-lg">
        <a href="tel:+15551234567" className="flex-1">
          <Button variant="outline" className="w-full h-12">Call Now</Button>
        </a>
        <Dialog>
          <DialogTrigger asChild>
             <Button className="flex-1 h-12 bg-primary text-white">Enquire</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Enquire about {project.title}</DialogTitle>
            </DialogHeader>
            <LeadForm projectId={project.id} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
