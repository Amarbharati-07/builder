import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectGalleryProps {
  images: string[];
  videos: string[];
  projectTitle: string;
}

export function ProjectGallery({ images, videos, projectTitle }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const allMedia = [...images, ...videos];

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1));
  };

  if (allMedia.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
        <p className="text-muted-foreground">No media available</p>
      </div>
    );
  }

  const currentMedia = allMedia[activeIndex];
  const isVideo = videos.includes(currentMedia);

  return (
    <div className="space-y-4">
      {/* Main Gallery */}
      <div className="relative bg-black rounded-lg overflow-hidden h-96 md:h-[500px]">
        {isVideo ? (
          <video
            src={currentMedia}
            className="w-full h-full object-cover"
            controls
            data-testid="video-gallery"
          />
        ) : (
          <img
            src={currentMedia}
            alt={`${projectTitle} gallery`}
            className="w-full h-full object-cover"
            data-testid="image-gallery"
          />
        )}

        {/* Navigation Buttons */}
        {allMedia.length > 1 && (
          <>
            <Button
              size="icon"
              variant="ghost"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black"
              onClick={goToPrevious}
              data-testid="button-gallery-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black"
              onClick={goToNext}
              data-testid="button-gallery-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm" data-testid="text-gallery-counter">
          {activeIndex + 1} / {allMedia.length}
        </div>
      </div>

      {/* Thumbnails */}
      {allMedia.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {allMedia.map((media, index) => {
            const isMediaVideo = videos.includes(media);
            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative aspect-square rounded overflow-hidden border-2 transition-all ${
                  activeIndex === index ? "border-primary" : "border-gray-200"
                }`}
                data-testid={`button-thumbnail-${index}`}
              >
                {isMediaVideo ? (
                  <>
                    <video
                      src={media}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  </>
                ) : (
                  <img
                    src={media}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
