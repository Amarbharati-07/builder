import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

// Hook for Testimonials
export function useTestimonials() {
  return useQuery({
    queryKey: [api.testimonials.list.path],
    queryFn: async () => {
      const res = await fetch(api.testimonials.list.path);
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return api.testimonials.list.responses[200].parse(await res.json());
    },
  });
}

// Hook for Jobs
export function useJobs() {
  return useQuery({
    queryKey: [api.jobs.list.path],
    queryFn: async () => {
      const res = await fetch(api.jobs.list.path);
      if (!res.ok) throw new Error("Failed to fetch jobs");
      return api.jobs.list.responses[200].parse(await res.json());
    },
  });
}

// Hook for News
export function useNews() {
  return useQuery({
    queryKey: [api.news.list.path],
    queryFn: async () => {
      const res = await fetch(api.news.list.path);
      if (!res.ok) throw new Error("Failed to fetch news");
      return api.news.list.responses[200].parse(await res.json());
    },
  });
}
