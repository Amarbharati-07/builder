import { useJobs } from "@/hooks/use-content";
import { MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LeadForm } from "@/components/LeadForm";

export default function Careers() {
  const { data: jobs, isLoading } = useJobs();

  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center py-32 relative">
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">Build Your Career With Us</h1>
          <p className="max-w-2xl mx-auto text-lg text-white/90">
            Join a team of visionaries, architects, and creators dedicated to redefining luxury living.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-bold mb-12 text-center">Current Openings</h2>
          
          <div className="space-y-6">
            {isLoading ? (
              [1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-lg" />)
            ) : (
              jobs?.map((job) => (
                <div key={job.id} className="bg-white border border-gray-200 p-6 md:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-foreground">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center bg-gray-50 px-3 py-1 rounded-full"><Briefcase className="w-4 h-4 mr-2" /> {job.department}</span>
                      <span className="flex items-center bg-gray-50 px-3 py-1 rounded-full"><MapPin className="w-4 h-4 mr-2" /> {job.location}</span>
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">{job.type}</span>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2">{job.description}</p>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-black text-white hover:bg-black/80 shrink-0">Apply Now</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Apply for {job.title}</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                         <p className="text-sm text-muted-foreground mb-4">Please submit your details below and our HR team will contact you.</p>
                         <LeadForm className="mt-0" />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
