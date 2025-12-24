import { useState } from "react";
import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();
  const [filter, setFilter] = useState("all");

  const filteredProjects = projects?.filter(p => {
    if (filter === "all") return true;
    return p.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="bg-foreground text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Discover our collection of premium residential and commercial developments.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-24">
        {/* Filters */}
        <div className="flex justify-center mb-12">
          <Tabs defaultValue="all" onValueChange={setFilter} className="w-full max-w-xl">
            <TabsList className="grid w-full grid-cols-4 bg-white border border-border p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">All</TabsTrigger>
              <TabsTrigger value="ongoing" className="data-[state=active]:bg-primary data-[state=active]:text-white">Ongoing</TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-primary data-[state=active]:text-white">Completed</TabsTrigger>
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-primary data-[state=active]:text-white">Upcoming</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[400px] bg-gray-200 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects?.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && filteredProjects?.length === 0 && (
          <div className="text-center py-24 text-muted-foreground">
            No projects found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
