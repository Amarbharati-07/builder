import { useTestimonials } from "@/hooks/use-content";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { LeadForm } from "@/components/LeadForm";

export default function Experience() {
  const { data: testimonials, isLoading } = useTestimonials();

  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="bg-foreground text-white py-20 mb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">Customer Experience</h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Our commitment to excellence is reflected in the trust and satisfaction of our residents.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-24">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-lg" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {testimonials?.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow"
              >
                <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gray-200 rounded-full mr-4 overflow-hidden">
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                        {t.name[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{t.name}</h3>
                    <span className="text-sm text-muted-foreground">{t.role}</span>
                  </div>
                </div>
                <p className="text-muted-foreground italic leading-relaxed text-lg">
                  "{t.content}"
                </p>
                {t.videoUrl && (
                  <div className="mt-6">
                    <a href={t.videoUrl} target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-medium hover:underline">
                      Watch Video Testimonial &rarr;
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        <div className="bg-secondary rounded-2xl p-8 md:p-16 text-center max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-bold mb-4">We Value Your Feedback</h2>
          <p className="text-muted-foreground mb-8">
            Have you visited one of our properties recently? We'd love to hear from you.
          </p>
          <div className="max-w-md mx-auto text-left">
            <LeadForm />
          </div>
        </div>
      </div>
    </div>
  );
}
