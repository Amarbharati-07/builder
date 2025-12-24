import { LeadForm } from "@/components/LeadForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Contact() {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-center mb-16">Get in Touch</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Contact Info */}
          <div>
            <h2 className="font-serif text-2xl font-bold mb-8">Headquarters</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 mr-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Visit Us</h3>
                  <p className="text-muted-foreground">123 Luxury Lane, Golden Mile,<br />Beverly Hills, CA 90210</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 mr-4">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Call Us</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567<br />+1 (555) 987-6543</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 mr-4">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <p className="text-muted-foreground">sales@luxeestates.com<br />info@luxeestates.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 mr-4">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Working Hours</h3>
                  <p className="text-muted-foreground">Mon - Sat: 9:00 AM - 7:00 PM<br />Sunday: By Appointment</p>
                </div>
              </div>
            </div>

            {/* Placeholder Map */}
            <div className="mt-12 h-64 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.733248043701!2d-118.40035632426022!3d34.07223007324838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1708453486264!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
            <h2 className="font-serif text-2xl font-bold mb-6">Send Us a Message</h2>
            <p className="text-muted-foreground mb-8">Fill out the form below and our team will get back to you within 24 hours.</p>
            <LeadForm />
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto py-16 border-t border-gray-100">
          <h2 className="font-serif text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-medium text-lg">What are your payment plans?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We offer construction-linked plans, time-linked plans, and down-payment schemes. Specific plans vary by project.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-medium text-lg">Do you offer customization options?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, for our luxury segments, we offer interior customization options during early construction phases.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-medium text-lg">How do I book a site visit?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                You can book a site visit by filling out the form on this page or any project page, or by calling our sales team directly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
