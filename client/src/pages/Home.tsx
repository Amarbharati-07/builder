import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star, Clock, Award, Building } from "lucide-react";
import { useProjects } from "@/hooks/use-projects";
import { useTestimonials } from "@/hooks/use-content";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { KeyBenefitsSection, TeamSection, TrustCertificatesSection } from "@/components/ProjectSections";

export default function Home() {
  const { data: projects, isLoading: loadingProjects } = useProjects();
  const { data: testimonials } = useTestimonials();

  // Featured projects are just the first 3 for this example
  const featuredProjects = projects?.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Hero Background - Architecture Skyscraper */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Luxury Architecture" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        <div className="container relative z-10 px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="block font-sans text-sm md:text-base tracking-[0.2em] uppercase mb-4 text-primary font-medium">
              Architectural Masterpieces
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Designing <br />
              <span className="text-gradient-gold text-transparent bg-clip-text">Your Legacy</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 mb-10 font-light leading-relaxed">
              We create spaces that transcend the ordinary. Experience the perfect harmony of luxury, comfort, and sustainable design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/projects">
                <Button size="lg" className="rounded-none bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
                  Explore Projects
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="rounded-none border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent mx-auto mb-2" />
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* About / Stats Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-gray-100 rounded-full z-0" />
                {/* Modern Interior Image */}
                <img 
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop" 
                  alt="Interior Design" 
                  className="relative z-10 rounded-sm shadow-2xl w-full max-w-md mx-auto lg:mx-0"
                />
                <div className="absolute -bottom-10 -right-10 w-full max-w-[200px] bg-primary p-6 text-white hidden md:block shadow-lg z-20">
                  <span className="block text-4xl font-serif font-bold mb-1">25+</span>
                  <span className="text-sm font-medium opacity-90">Years of Building Excellence</span>
                </div>
              </motion.div>
            </div>
            
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">
                  Where Innovation Meets <span className="text-primary">Elegance</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  At Luxe Estates, we don't just build structures; we craft lifestyles. 
                  Our commitment to quality, attention to detail, and architectural innovation 
                  has established us as the premier luxury developer in the region.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
                  <div className="flex flex-col">
                    <Award className="w-10 h-10 text-primary mb-3" />
                    <h4 className="font-bold text-xl mb-1">Award Winning</h4>
                    <p className="text-sm text-muted-foreground">Recognized globally for design excellence.</p>
                  </div>
                  <div className="flex flex-col">
                    <Building className="w-10 h-10 text-primary mb-3" />
                    <h4 className="font-bold text-xl mb-1">Premium Spaces</h4>
                    <p className="text-sm text-muted-foreground">Over 5 million sqft of luxury developed.</p>
                  </div>
                  <div className="flex flex-col">
                    <Clock className="w-10 h-10 text-primary mb-3" />
                    <h4 className="font-bold text-xl mb-1">On-Time Delivery</h4>
                    <p className="text-sm text-muted-foreground">We value your time as much as you do.</p>
                  </div>
                </div>

                <Link href="/experience">
                  <Button variant="link" className="text-primary p-0 h-auto font-semibold text-lg hover:text-primary/80">
                    Read our story <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-primary font-medium tracking-widest uppercase text-sm block mb-2">Portfolio</span>
              <h2 className="font-serif text-4xl font-bold text-foreground">Featured Projects</h2>
            </div>
            <Link href="/projects">
              <Button variant="outline" className="hidden md:flex mt-4 md:mt-0 border-foreground hover:bg-foreground hover:text-white transition-colors">
                View All Projects
              </Button>
            </Link>
          </div>

          {loadingProjects ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-[450px] bg-gray-200 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects?.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="mt-8 md:hidden flex justify-center">
            <Link href="/projects">
              <Button variant="outline" className="border-foreground hover:bg-foreground hover:text-white transition-colors">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-24 bg-foreground text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="font-serif text-4xl font-bold mb-16">Client Experiences</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials?.slice(0, 2).map((t) => (
                <div key={t.id} className="bg-white/5 backdrop-blur-sm p-8 text-left border border-white/10 hover:border-primary/50 transition-colors rounded-sm">
                  <div className="flex text-primary mb-4">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-white/80 mb-6 italic leading-relaxed">"{t.content}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white/10 rounded-full mr-3 flex items-center justify-center font-serif text-primary">
                      {t.name[0]}
                    </div>
                    <div>
                      <h5 className="font-bold text-sm">{t.name}</h5>
                      <span className="text-xs text-white/50">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Preview */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4">Why Choose Luxe Estates?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Experience unparalleled luxury with our premium offerings</p>
          </div>
          <KeyBenefitsSection />
        </div>
      </section>

      {/* Professional Additions */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <TrustCertificatesSection />
          <TeamSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Ready to find your dream home?</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Schedule a private viewing of our properties or talk to our experts about your requirements.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-none px-10 py-6 text-lg">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
