import { type Amenity } from "@shared/schema";

interface AmenitiesGridProps {
  amenities: Amenity[];
}

export function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {amenities.map((amenity, index) => (
        <div key={index} className="flex flex-col items-center text-center group">
          <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
              src={amenity.image}
              alt={amenity.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              data-testid={`image-amenity-${amenity.name}`}
            />
          </div>
          <h4 className="font-semibold text-sm text-foreground" data-testid={`text-amenity-${amenity.name}`}>
            {amenity.name}
          </h4>
        </div>
      ))}
    </div>
  );
}
