import { type Amenity } from "@shared/schema";

interface AmenitiesGridProps {
  amenities: Amenity[];
}

export function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  return (
    <div className="amenities-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {amenities.map((amenity, index) => (
        <div key={index} className="amenity-item flex flex-col items-center text-center group">
          <div className="image-box relative w-full aspect-square mb-3 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
              src={amenity.image}
              alt={amenity.name}
              className="amenity-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              data-testid={`image-amenity-${amenity.name}`}
            />
          </div>
          <h4 className="name font-semibold text-sm text-foreground" data-testid={`text-amenity-${amenity.name}`}>
            {amenity.name}
          </h4>
        </div>
      ))}
    </div>
  );
}
