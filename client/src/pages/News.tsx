import { useNews } from "@/hooks/use-content";
import { format } from "date-fns"; // Standard date formatting if needed, but we'll stick to string from API for now
import { Calendar, Tag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function News() {
  const { data: newsItems, isLoading } = useNews();

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="bg-white py-16 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-center">News & Media</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-lg" />)}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {newsItems?.map((item) => (
              <Card key={item.id} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow bg-white flex flex-col h-full">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {item.date}</span>
                    <span className="flex items-center text-primary"><Tag className="w-3 h-3 mr-1" /> {item.category}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold leading-tight hover:text-primary transition-colors cursor-pointer">
                    {item.title}
                  </h3>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                    {item.content}
                  </p>
                  <button className="mt-4 text-primary font-medium text-sm hover:underline">
                    Read More
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
